/**
 * pageService.js
 * ─────────────────────────────────────────────────────────────
 * Abstracts all API calls related to pages.
 * Currently uses localStorage for persistence.
 * Swap these implementations for real fetch/axios calls
 * when connecting to WordPress REST API, Shopify Admin API,
 * or any custom backend.
 * ─────────────────────────────────────────────────────────────
 */

const STORAGE_KEY = "page_builder_pages";

/**
 * Fetches all pages.
 * Replace with: GET /wp-json/pb/v1/pages
 */
export async function fetchPages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Persists the full pages array.
 * Replace with: POST /wp-json/pb/v1/pages/batch
 *
 * @param {Array} pages - Full pages state to save
 */
export async function savePages(pages) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    return { success: true };
  } catch (err) {
    console.error("Failed to save pages:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Saves a single page by ID.
 * Replace with: PUT /wp-json/pb/v1/pages/:id
 *
 * @param {Object} page - Page object to update
 */
export async function savePage(page) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const pages = raw ? JSON.parse(raw) : [];
    const updated = pages.map((p) => (p.id === page.id ? page : p));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true };
  } catch (err) {
    console.error("Failed to save page:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Deletes a page by ID.
 * Replace with: DELETE /wp-json/pb/v1/pages/:id
 *
 * @param {number} pageId
 */
export async function deletePage(pageId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const pages = raw ? JSON.parse(raw) : [];
    const filtered = pages.filter((p) => p.id !== pageId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return { success: true };
  } catch (err) {
    console.error("Failed to delete page:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Exports all pages as a downloadable JSON file.
 * Useful for headless CMS handoff or debugging.
 *
 * @param {Array} pages
 */
export function exportPagesJSON(pages) {
  const json = JSON.stringify(pages, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pages.json";
  a.click();
  URL.revokeObjectURL(url);
}
