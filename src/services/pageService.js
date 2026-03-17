/**
 * pageService.js
 * ─────────────────────────────────────────────────────────────
 * SERVICE LAYER — business logic for page persistence.
 *
 * Sits between the React context and the storage adapter.
 * Components and hooks ONLY call this file — never the adapter
 * directly. That way, swapping the adapter (localStorage → API)
 * requires no changes anywhere else.
 *
 * STORAGE STRUCTURE (per-page isolation)
 * ────────────────────────────────────────
 *   localStorage key        value
 *   ──────────────────────────────────────────────────────────
 *   pb:index                PageIndex  (lightweight list)
 *   pb:page:home            PageData   (full JSON for "Home")
 *   pb:page:about           PageData   (full JSON for "About")
 *   pb:page:contact         PageData   (full JSON for "Contact")
 *
 * PageIndex:
 *   { version: 1, pages: [{ id, name, slug, updatedAt }] }
 *
 * PageData (each pb:page:{slug}):
 *   { id, name, slug, savedAt, sections: [...] }
 *
 * MIGRATING TO A BACKEND
 * ──────────────────────
 * 1. Open storageAdapter.js
 * 2. Replace adapterGet/adapterSet/adapterRemove with fetch()
 * 3. Done — nothing else changes.
 */

import { adapterGet, adapterSet, adapterRemove, adapterClearAll } from "./storageAdapter";

const INDEX_KEY = "index";
const pageKey   = (slug) => `page:${slug}`;

export function slugify(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function readIndex() {
  const idx = await adapterGet(INDEX_KEY);
  return idx ?? { version: 1, pages: [] };
}

async function writeIndex(idx) {
  await adapterSet(INDEX_KEY, idx);
}

/**
 * Load every page from storage.
 * Future backend: GET /api/pages
 * @returns {Promise<Array|null>}
 */
export async function loadAllPages() {
  const idx = await readIndex();
  if (!idx.pages.length) return null;
  const pages = await Promise.all(idx.pages.map((e) => adapterGet(pageKey(e.slug))));
  const valid = pages.filter(Boolean);
  return valid.length ? valid : null;
}

/**
 * Load a single page by ID.
 * Future backend: GET /api/pages/:id
 * @param {number} pageId
 * @returns {Promise<Object|null>}
 */
export async function loadPage(pageId) {
  const idx = await readIndex();
  const entry = idx.pages.find((p) => p.id === pageId);
  if (!entry) return null;
  return adapterGet(pageKey(entry.slug));
}

/**
 * Save (create or update) one page. Keeps the index in sync.
 * Future backend: PUT /api/pages/:id  or  POST /api/pages
 * @param {Object} page
 * @returns {Promise<{ success: boolean, savedAt: string, slug: string }>}
 */
export async function savePage(page) {
  const slug    = slugify(page.name) || `page-${page.id}`;
  const savedAt = new Date().toISOString();
  await adapterSet(pageKey(slug), { ...page, slug, savedAt });

  const idx = await readIndex();
  const i   = idx.pages.findIndex((p) => p.id === page.id);
  const entry = { id: page.id, name: page.name, slug, updatedAt: savedAt };
  if (i >= 0) idx.pages[i] = entry; else idx.pages.push(entry);
  await writeIndex(idx);

  return { success: true, savedAt, slug };
}

/**
 * Save every page (bulk). Used for "Save All" / initial hydration.
 * Future backend: POST /api/pages/batch
 * @param {Array} pages
 * @returns {Promise<{ success: boolean, results: Array }>}
 */
export async function saveAllPages(pages) {
  const results = await Promise.all(pages.map((p) => savePage(p)));
  return { success: results.every((r) => r.success), results };
}

/**
 * Delete a page by ID.
 * Future backend: DELETE /api/pages/:id
 * @param {number} pageId
 * @returns {Promise<{ success: boolean }>}
 */
export async function deletePage(pageId) {
  const idx   = await readIndex();
  const entry = idx.pages.find((p) => p.id === pageId);
  if (entry) {
    await adapterRemove(pageKey(entry.slug));
    idx.pages = idx.pages.filter((p) => p.id !== pageId);
    await writeIndex(idx);
  }
  return { success: true };
}

/**
 * Read the index only (no section data).
 * Future backend: GET /api/pages?fields=id,name,slug,updatedAt
 * @returns {Promise<Array<{ id, name, slug, updatedAt }>>}
 */
export async function getPageIndex() {
  const idx = await readIndex();
  return idx.pages;
}

/**
 * Wipe everything — used for "Reset to defaults".
 * Future backend: DELETE /api/pages (admin only)
 */
export async function clearAllStorage() {
  await adapterClearAll();
}

// ── Download helpers ──────────────────────────────────────────

/**
 * Download a single page's JSON. Filename: {slug}.json
 * @param {Object} page
 */
export function downloadPageJSON(page) {
  const slug    = slugify(page.name) || `page-${page.id}`;
  const payload = { ...page, slug, exportedAt: new Date().toISOString() };
  _triggerDownload(JSON.stringify(payload, null, 2), `${slug}.json`);
}

/**
 * Download all pages as one JSON file. Filename: all-pages.json
 * @param {Array} pages
 */
export function downloadAllPagesJSON(pages) {
  const payload = {
    exportedAt: new Date().toISOString(),
    totalPages: pages.length,
    pages: pages.map((p) => ({ ...p, slug: slugify(p.name) || `page-${p.id}` })),
  };
  _triggerDownload(JSON.stringify(payload, null, 2), "all-pages.json");
}

function _triggerDownload(content, filename) {
  const blob = new Blob([content], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Phase 4 additions ─────────────────────────────────────────

/**
 * Load a single page by its URL slug.
 * Used by the frontend renderer: FrontendPage reads /:slug and calls this.
 * Future backend: GET /api/pages/slug/:slug
 *
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function loadPageBySlug(slug) {
  return adapterGet(pageKey(slug));
}

/**
 * Check whether a slug is already in use.
 * Called during new-page creation for real-time validation.
 *
 * @param {string} slug
 * @param {number} [excludeId]  Skip this page ID (for rename flows)
 * @returns {Promise<boolean>}  true = slug is available
 */
export async function isSlugAvailable(slug, excludeId = null) {
  const idx = await readIndex();
  return !idx.pages.some(
    (p) => p.slug === slug && p.id !== excludeId
  );
}

/**
 * Return just the index for the public site nav (no section data).
 * Identical to getPageIndex — separated for semantic clarity.
 * Future backend: GET /api/pages/public-index
 *
 * @returns {Promise<Array<{ id, name, slug }>>}
 */
export async function getPublicPageIndex() {
  const idx = await readIndex();
  return idx.pages.map(({ id, name, slug }) => ({ id, name, slug }));
}
