import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'scripture-path:bookmarks';
const NOTES_KEY = 'scripture-path:notes';
const PRAYERS_KEY = 'scripture-path:my-prayers';
const SETTINGS_KEY = 'scripture-path:settings';

async function read(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

async function write(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
  return value;
}

// --- Bookmarks: [{id, reference, text, translation, createdAt}] ---
export const getBookmarks = () => read(BOOKMARKS_KEY, []);
export async function addBookmark(bm) {
  const list = await getBookmarks();
  if (list.some((b) => b.id === bm.id)) return list;
  return write(BOOKMARKS_KEY, [{ ...bm, createdAt: Date.now() }, ...list]);
}
export async function removeBookmark(id) {
  const list = await getBookmarks();
  return write(BOOKMARKS_KEY, list.filter((b) => b.id !== id));
}

// --- Notes: [{id, reference, text, createdAt}] ---
export const getNotes = () => read(NOTES_KEY, []);
export async function addNote(note) {
  const list = await getNotes();
  return write(NOTES_KEY, [{ ...note, id: Date.now().toString(), createdAt: Date.now() }, ...list]);
}
export async function removeNote(id) {
  const list = await getNotes();
  return write(NOTES_KEY, list.filter((n) => n.id !== id));
}

// --- My prayers (on-device): [{id, text, answered, createdAt}] ---
export const getMyPrayers = () => read(PRAYERS_KEY, []);
export async function addMyPrayer(text) {
  const list = await getMyPrayers();
  return write(PRAYERS_KEY, [{ id: Date.now().toString(), text, answered: false, createdAt: Date.now() }, ...list]);
}
export async function togglePrayerAnswered(id) {
  const list = await getMyPrayers();
  return write(PRAYERS_KEY, list.map((p) => (p.id === id ? { ...p, answered: !p.answered } : p)));
}
export async function removeMyPrayer(id) {
  const list = await getMyPrayers();
  return write(PRAYERS_KEY, list.filter((p) => p.id !== id));
}

// --- Settings: { translation } ---
export const DEFAULT_SETTINGS = { translation: 'kjv' };
export const getSettings = () => read(SETTINGS_KEY, { ...DEFAULT_SETTINGS });
export const saveSettings = (s) => write(SETTINGS_KEY, s);
