/**
 * storageAdapter.js
 * ─────────────────────────────────────────────────────────────
 * LOW-LEVEL storage primitive.
 *
 * This is the ONLY file that touches localStorage.
 * Every key is namespaced under "pb:" to avoid collisions.
 *
 * HOW TO MIGRATE TO A BACKEND
 * ────────────────────────────
 * Replace each function body with a fetch() / axios call.
 * The signatures (get/set/remove/keys) stay identical, so
 * nothing above this layer needs to change.
 *
 * Example swap for a REST API:
 *
 *   export async function adapterGet(key) {
 *     const res = await fetch(`/api/storage/${key}`, {
 *       headers: { Authorization: `Bearer ${getToken()}` },
 *     });
 *     if (!res.ok) return null;
 *     return res.json();          // already parsed
 *   }
 *
 *   export async function adapterSet(key, value) {
 *     await fetch(`/api/storage/${key}`, {
 *       method: "PUT",
 *       headers: { "Content-Type": "application/json", Authorization: ... },
 *       body: JSON.stringify(value),
 *     });
 *   }
 * ─────────────────────────────────────────────────────────────
 */

const NS = "pb:"; // namespace prefix for all keys

/**
 * Read and JSON-parse a value. Returns null on miss or parse error.
 * @param {string} key
 * @returns {Promise<any|null>}
 */
export async function adapterGet(key) {
  try {
    const raw = localStorage.getItem(NS + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * JSON-stringify and write a value.
 * @param {string} key
 * @param {any}    value
 * @returns {Promise<void>}
 */
export async function adapterSet(key, value) {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value));
  } catch (err) {
    // localStorage full — surface the error so callers can handle it
    throw new Error(`Storage write failed for "${key}": ${err.message}`);
  }
}

/**
 * Remove a single key.
 * @param {string} key
 * @returns {Promise<void>}
 */
export async function adapterRemove(key) {
  try {
    localStorage.removeItem(NS + key);
  } catch {
    // ignore
  }
}

/**
 * List all keys that start with a given prefix (without the namespace).
 * @param {string} [prefix=""]
 * @returns {Promise<string[]>}
 */
export async function adapterKeys(prefix = "") {
  try {
    return Object.keys(localStorage)
      .filter((k) => k.startsWith(NS + prefix))
      .map((k) => k.slice(NS.length)); // strip namespace
  } catch {
    return [];
  }
}

/**
 * Wipe every key in this namespace. Used for "Reset all data".
 * @returns {Promise<void>}
 */
export async function adapterClearAll() {
  try {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(NS));
    keys.forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}
