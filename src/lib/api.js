import Constants from 'expo-constants';

/**
 * Base URL of our backend (API-key proxy + devotionals + explanations).
 * Set EXPO_PUBLIC_API_URL in .env for local dev, or in the
 * EAS build profile for production.
 */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  Constants.expoConfig?.extra?.apiUrl ||
  'http://localhost:3001';

async function get(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error(`request failed (${res.status}): ${path}`);
  return res.json();
}

async function post(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`request failed (${res.status}): ${path}`);
  return res.json();
}

export const api = {
  /** Chapter text: { reference, verses: [{verse, text}], translation } */
  chapter: (translation, book, chapter) =>
    get(`/api/bible/${translation}/${encodeURIComponent(book)}/${chapter}`),

  /** Verse search: { results: [{reference, text}] } */
  search: (q, translation = 'kjv') =>
    get(`/api/search?q=${encodeURIComponent(q)}&translation=${translation}`),

  /** Today's devotional: { date, title, theme, verse, reference, reflection, application } */
  devotional: () => get('/api/devotional'),

  /** Chapter explanation: { summary, context, themes } */
  explain: (book, chapter) =>
    get(`/api/explain/${encodeURIComponent(book)}/${chapter}`),

  /** Book overview (first chapter of each book): { overview, themes, keyVerses } */
  bookOverview: (book) => get(`/api/book/${encodeURIComponent(book)}`),

  /** Nearby churches: { churches: [{name, address, distance}] } */
  churches: (lat, lng) => get(`/api/churches?lat=${lat}&lng=${lng}`),

  /** Submit a prayer request (no account; device-id based) */
  submitPrayer: (text) => post('/api/prayer', { text }),

  /** Featured community prayers */
  prayers: () => get('/api/prayers'),

  /** Contact form → forwarded to support email */
  contact: (name, email, message) => post('/api/contact', { name, email, message }),
};
