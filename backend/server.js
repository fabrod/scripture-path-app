/**
 * Scripture Path backend — API-key proxy + content endpoints.
 * No auth, no database. Deploys to Render (Root Directory: backend,
 * Build: npm install, Start: node server.js).
 *
 * Env vars (all optional except where noted):
 *   PORT               — default 3001
 *   ESV_API_KEY        — Crossway ESV API key (api.esv.org)
 *   NLT_API_KEY        — Tyndale NLT API key
 *   API_BIBLE_KEY      — api.bible key (for NKJV)
 *   GOOGLE_PLACES_KEY  — Google Places API key (church finder)
 *   RESEND_API_KEY     — Resend key (contact form + prayer forwarding)
 *   CONTACT_EMAIL      — defaults to fabrod035@gmail.com
 */
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json({ limit: '256kb' }));

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'fabrod035@gmail.com';

// ---------- In-memory cache ----------
// Bible text never changes, so cache aggressively. Render's filesystem is
// ephemeral, but process memory persists across requests on a warm instance.
// No external memcached/Redis needed at this scale.
const cache = new Map();
const CACHE_TTL = {
  bible: 24 * 3600 * 1000,   // chapter text is immutable → 24h
  devotional: 3600 * 1000,   // rotates daily → 1h (key includes date)
  explain: 24 * 3600 * 1000, // seeded content → 24h
  search: 6 * 3600 * 1000,   // 6h
};
function cacheGet(key) {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > hit.ttl) { cache.delete(key); return null; }
  hit.hits = (hit.hits || 0) + 1;
  return hit.value;
}
function cacheSet(key, value, ttl) {
  if (cache.size > 2000) { // simple LRU-ish eviction: drop oldest 10%
    const keys = [...cache.keys()].slice(0, 200);
    keys.forEach((k) => cache.delete(k));
  }
  cache.set(key, { value, at: Date.now(), ttl });
}
app.get('/api/cache-stats', (_req, res) => {
  res.json({ entries: cache.size });
});

// ---------- Bundled KJV (public domain) for search + fallback ----------
let KJV = null;
try {
  const zlib = require('zlib');
  const gzPath = path.join(__dirname, 'data', 'kjv.json.gz');
  const rawPath = path.join(__dirname, 'data', 'kjv.json');
  if (fs.existsSync(gzPath)) {
    KJV = JSON.parse(zlib.gunzipSync(fs.readFileSync(gzPath)).toString('utf8'));
  } else {
    KJV = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
  }
  console.log(`KJV loaded: ${Object.keys(KJV).length} books`);
} catch (e) {
  console.log('KJV bundle not found — /api/search will use reference lookup only');
}

const { DEVOTIONALS } = require('./data/devotionals');
const { EXPLANATIONS } = require('./data/explanations');
const { BOOKS } = require('./data/books');
const { TOPICS } = require('./data/topics');

// ---------- Helpers ----------
const stripTags = (s) => (s || '').replace(/<[^>]+>/g, '').trim();

async function fetchJson(url, headers = {}) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`upstream ${res.status}`);
  return res.json();
}

// ---------- Health ----------
app.get('/health', (_req, res) => res.json({ ok: true }));

// ---------- Privacy policy (App Store requirement) ----------
app.get('/privacy', (_req, res) => {
  res.type('html').send(`<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Privacy Policy — Scripture Path</title>
<style>body{font-family:Georgia,serif;max-width:680px;margin:40px auto;padding:0 20px;line-height:1.7;color:#2b2118;background:#faf8f4}h1{color:#b3402a}</style>
</head><body>
<h1>Privacy Policy — Scripture Path</h1>
<p><em>Last updated: October 2026</em></p>
<p>Scripture Path is built to respect your privacy. <strong>We do not require accounts, and we do not track you.</strong></p>
<h2>What stays on your device</h2>
<p>Your bookmarks, notes, prayer list, reading preferences, and settings are stored only on your device. They are never uploaded to our servers.</p>
<h2>What we receive</h2>
<p>When you use the app, our servers may briefly process:</p>
<ul>
<li>Bible chapter requests (to fetch public-domain Scripture text),</li>
<li>Church-finder searches (your approximate location is used once to find nearby churches and is not stored),</li>
<li>Contact-form and prayer-request messages you choose to send (forwarded to our support inbox).</li>
</ul>
<p>We do not sell, share, or use this information for advertising or analytics.</p>
<h2>Third-party services</h2>
<p>Scripture text is provided through public Bible APIs. Church results come from Google Places. These services have their own privacy policies.</p>
<h2>Contact</h2>
<p>Questions? Email us at ${CONTACT_EMAIL}.</p>
<p>© 2026 Real Scripture Path Inc.</p>
</body></html>`);
});

// ---------- Bible chapter ----------
// GET /api/bible/:translation/:book/:chapter
app.get('/api/bible/:translation/:book/:chapter', async (req, res) => {
  const { translation, book, chapter } = req.params;
  const t = translation.toLowerCase();
  const cacheKey = `bible:${t}:${book}:${chapter}`;
  const cached = cacheGet(cacheKey);
  if (cached) return res.json(cached);
  const send = (obj) => { cacheSet(cacheKey, obj, CACHE_TTL.bible); return res.json(obj); };
  try {
    // Licensed translations via backend-held keys
    if (t === 'esv' && process.env.ESV_API_KEY) {
      const data = await fetchJson(
        `https://api.esv.org/v3/passage/text/?q=${encodeURIComponent(book + ' ' + chapter)}&include-headings=false&include-footnotes=false`,
        { Authorization: `Token ${process.env.ESV_API_KEY}` }
      );
      const verses = data.passages?.[0]?.split('\n').filter(Boolean) || [];
      return send({ reference: `${book} ${chapter}`, translation: 'ESV', verses: verses.map((text, i) => ({ verse: i + 1, text: text.trim() })) });
    }
    if (t === 'nlt' && process.env.NLT_API_KEY) {
      const data = await fetchJson(
        `https://api.nlt.to/api/passages?ref=${encodeURIComponent(book + ' ' + chapter)}&key=${process.env.NLT_API_KEY}`
      );
      return send({ reference: `${book} ${chapter}`, translation: 'NLT', verses: data });
    }
    if (t === 'nkjv' && process.env.API_BIBLE_KEY) {
      // API.Bible: NKJV bible id de4e12af7f28f599-02
      const data = await fetchJson(
        `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/passages/${encodeURIComponent(book)}.${chapter}?content-type=text`,
        { 'api-key': process.env.API_BIBLE_KEY }
      );
      return send({ reference: `${book} ${chapter}`, translation: 'NKJV', verses: [{ verse: 0, text: stripTags(data?.data?.content) }] });
    }
    // Public domain via bible-api.com (no key)
    const data = await fetchJson(
      `https://bible-api.com/${encodeURIComponent(book + ' ' + chapter)}?translation=${t}`
    );
    return send({
      reference: data.reference,
      translation: data.translation_name || t.toUpperCase(),
      verses: (data.verses || []).map((v) => ({ verse: v.verse, text: v.text.trim() })),
    });
  } catch (e) {
    // Fallback: bundled KJV for KJV requests
    if (t === 'kjv' && KJV?.[book]?.[chapter]) {
      const verses = Object.entries(KJV[book][chapter]).map(([verse, text]) => ({ verse: Number(verse), text }));
      return send({ reference: `${book} ${chapter}`, translation: 'KJV', verses });
    }
    res.status(502).json({ error: 'bible text unavailable', detail: String(e.message || e) });
  }
});

// ---------- Search ----------
// GET /api/search?q=...  → reference lookup + topic verses + full-text (KJV bundle)
const REF_RE = /^((?:[123]\s)?[A-Za-z ]+)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/;
app.get('/api/search', async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json({ results: [] });
  const cacheKey = `search:${q.toLowerCase()}`;
  const cached = cacheGet(cacheKey);
  if (cached) return res.json(cached);
  const send = (obj) => { cacheSet(cacheKey, obj, CACHE_TTL.search); return res.json(obj); };

  // 1. Verse reference? e.g. "John 3:16", "Psalm 23"
  const m = q.match(REF_RE);
  if (m) {
    try {
      const data = await fetchJson(`https://bible-api.com/${encodeURIComponent(q)}?translation=kjv`);
      return send({ results: (data.verses || []).map((v) => ({ reference: `${data.reference}:${v.verse}`, text: v.text.trim() })) });
    } catch { /* fall through */ }
  }

  // 2. Popular topic?
  const topic = TOPICS[q.toLowerCase()];
  if (topic) return send({ results: topic, topic: q });

  // 3. Full-text search over bundled KJV
  if (KJV) {
    const needle = q.toLowerCase();
    const results = [];
    for (const [book, chapters] of Object.entries(KJV)) {
      for (const [ch, verses] of Object.entries(chapters)) {
        for (const [v, text] of Object.entries(verses)) {
          if (text.toLowerCase().includes(needle)) {
            results.push({ reference: `${book} ${ch}:${v}`, text });
            if (results.length >= 50) break;
          }
        }
        if (results.length >= 50) break;
      }
      if (results.length >= 50) break;
    }
    return send({ results });
  }

  return send({ results: [] });
});

// ---------- Devotional ----------
// GET /api/devotional → today's devotional (rotates daily)
app.get('/api/devotional', (_req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const cacheKey = `devotional:${today}`;
  const cached = cacheGet(cacheKey);
  if (cached) return res.json(cached);
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 864e5);
  const d = DEVOTIONALS[dayOfYear % DEVOTIONALS.length];
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const out = { ...d, date };
  cacheSet(cacheKey, out, CACHE_TTL.devotional);
  res.json(out);
});

// ---------- Chapter explanation ----------
// GET /api/explain/:book/:chapter
app.get('/api/explain/:book/:chapter', (req, res) => {
  const key = `${req.params.book} ${req.params.chapter}`;
  const cacheKey = `explain:${key}`;
  const cached = cacheGet(cacheKey);
  if (cached) return res.json(cached);
  const send = (obj) => { cacheSet(cacheKey, obj, CACHE_TTL.explain); return res.json(obj); };
  const found = EXPLANATIONS[key];
  if (found) return send({ reference: key, ...found });
  const bookInfo = BOOKS[req.params.book];
  return send({
    reference: key,
    summary: `An explanation for ${key} is on its way.`,
    context: bookInfo ? `Part of ${req.params.book}. ${bookInfo.overview}` : '',
    themes: bookInfo?.themes || [],
    generated: false,
  });
});

// ---------- Book overview ----------
// GET /api/book/:book  (shown on the first chapter of each book)
app.get('/api/book/:book', (req, res) => {
  const cacheKey = `book:${req.params.book}`;
  const cached = cacheGet(cacheKey);
  if (cached) return res.json(cached);
  const info = BOOKS[req.params.book];
  if (!info) return res.status(404).json({ error: 'unknown book' });
  const out = { book: req.params.book, ...info };
  cacheSet(cacheKey, out, CACHE_TTL.explain);
  res.json(out);
});

// ---------- Churches ----------
// GET /api/churches?lat=..&lng=..
app.get('/api/churches', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'lat and lng required' });
  if (!process.env.GOOGLE_PLACES_KEY) {
    return res.status(501).json({ error: 'church finder not configured yet' });
  }
  try {
    const data = await fetchJson(
      'https://places.googleapis.com/v1/places:searchNearby',
      { 'Content-Type': 'application/json', 'X-Goog-Api-Key': process.env.GOOGLE_PLACES_KEY, 'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location' }
    );
    const churches = (data.places || []).map((p) => ({
      name: p.displayName?.text, address: p.formattedAddress,
      lat: p.location?.latitude, lng: p.location?.longitude,
    }));
    res.json({ churches });
  } catch (e) {
    res.status(502).json({ error: 'places unavailable', detail: String(e.message || e) });
  }
});

// ---------- Prayers (no accounts) ----------
// GET /api/prayers → featured community prayers (curated)
app.get('/api/prayers', (_req, res) => {
  res.json({ prayers: require('./data/prayers').PRAYERS });
});

// POST /api/prayer → forwards to support inbox (no storage, no account)
app.post('/api/prayer', async (req, res) => {
  const { text } = req.body || {};
  if (!text || !text.trim()) return res.status(400).json({ error: 'text required' });
  await sendEmail(`Prayer request — Scripture Path`, `A user shared this prayer request:\n\n${text.trim()}\n\n— sent from the Scripture Path app (no account)`);
  res.json({ ok: true });
});

// ---------- Contact ----------
// POST /api/contact → forwards to support inbox
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!message || !message.trim()) return res.status(400).json({ error: 'message required' });
  const ok = await sendEmail(
    `Contact — Scripture Path${name ? ` from ${name}` : ''}`,
    `From: ${name || '—'} <${email || '—'}>\n\n${message.trim()}`
  );
  if (!ok) return res.status(501).json({ error: 'contact form not configured yet' });
  res.json({ ok: true });
});

async function sendEmail(subject, body) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[email:unconfigured]', subject);
    return false;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'Scripture Path <noreply@realscripturepath.com>', to: [CONTACT_EMAIL], subject, text: body }),
    });
    return res.ok;
  } catch (e) {
    console.log('[email:failed]', String(e.message || e));
    return false;
  }
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`scripture-path backend on :${PORT}`));
