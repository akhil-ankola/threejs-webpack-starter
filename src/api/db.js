/**
 * api/db.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Mock in-browser "database" backed by localStorage.
 *
 * REST API mirror:
 *   GET    /pages           → listPages()
 *   GET    /pages/:slug     → getPageBySlug(slug)
 *   GET    /pages/id/:id    → getPageById(id)
 *   POST   /pages           → createPage(payload)
 *   PUT    /pages/:slug     → updatePageBySlug(slug, payload)
 *   DELETE /pages/:id       → deletePage(id)
 *
 * Slug is the canonical identifier for URL routing.
 * ID is kept for internal references only.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const DB_KEY = "pagebuilder_db_v2";

const readDB  = () => { try { const r = localStorage.getItem(DB_KEY); return r ? JSON.parse(r) : { pages: [] }; } catch { return { pages: [] }; } };
const writeDB = (db) => localStorage.setItem(DB_KEY, JSON.stringify(db));
const delay   = (ms = 100) => new Promise((r) => setTimeout(r, ms));

// ─── Public API ───────────────────────────────────────────────────────────────

export async function listPages() {
  await delay();
  return readDB().pages.map(({ id, name, slug, _savedAt, meta }) => ({ id, name, slug, _savedAt, meta }));
}

export async function getPageBySlug(slug) {
  await delay();
  const page = readDB().pages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Page "${slug}" not found`);
  return page;
}

export async function getPageById(id) {
  await delay();
  const page = readDB().pages.find((p) => p.id === id);
  if (!page) throw new Error(`Page id=${id} not found`);
  return page;
}

export async function createPage(payload) {
  await delay(180);
  const db = readDB();
  if (db.pages.find((p) => p.slug === payload.page.slug))
    throw new Error(`Slug "${payload.page.slug}" already exists`);
  const record = { ...payload.page, meta: payload.meta, _savedAt: new Date().toISOString() };
  db.pages.push(record);
  writeDB(db);
  return record;
}

export async function updatePageBySlug(slug, payload) {
  await delay(180);
  const db  = readDB();
  const idx = db.pages.findIndex((p) => p.slug === slug);
  if (idx === -1) throw new Error(`Page "${slug}" not found`);
  const record = { ...payload.page, meta: payload.meta, _savedAt: new Date().toISOString() };
  db.pages[idx] = record;
  writeDB(db);
  return record;
}

// Keep ID-based update for backward compat
export async function updatePage(id, payload) {
  await delay(180);
  const db  = readDB();
  const idx = db.pages.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error(`Page id=${id} not found`);
  const record = { ...payload.page, meta: payload.meta, _savedAt: new Date().toISOString() };
  db.pages[idx] = record;
  writeDB(db);
  return record;
}

export async function deletePage(id) {
  await delay(120);
  const db = readDB();
  db.pages = db.pages.filter((p) => p.id !== id);
  writeDB(db);
  return { ok: true };
}

export async function seedIfEmpty(pages) {
  const db = readDB();
  if (db.pages.length === 0) { db.pages = pages; writeDB(db); }
}
