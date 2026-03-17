/**
 * useRouter.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Zero-dependency hash router.
 *
 * URL scheme:
 *   /#/                          → Pages list
 *   /#/builder/:slug             → Edit existing page
 *   /#/builder/new/:slug         → Create new page
 *   /#/preview/:slug             → Public preview of saved page
 *
 * Uses window.location.hash so:
 *   • No server config needed (works with Vite dev server)
 *   • Full browser back/forward support
 *   • Shareable, bookmarkable URLs
 *   • Deep-link directly to any page
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useState, useEffect, useCallback } from "react";

// ─── Parse hash → route object ────────────────────────────────────────────────
function parseHash(hash) {
  // Strip leading "#/" or "#"
  const path = hash.replace(/^#\/?/, "").trim();
  const parts = path.split("/").filter(Boolean);

  if (parts.length === 0) {
    return { view: "list" };
  }

  // /#/builder/new/:slug
  if (parts[0] === "builder" && parts[1] === "new" && parts[2]) {
    return { view: "builder-new", slug: decodeURIComponent(parts[2]) };
  }

  // /#/builder/:slug
  if (parts[0] === "builder" && parts[1]) {
    return { view: "builder", slug: decodeURIComponent(parts[1]) };
  }

  // /#/preview/:slug
  if (parts[0] === "preview" && parts[1]) {
    return { view: "preview", slug: decodeURIComponent(parts[1]) };
  }

  return { view: "list" };
}

// ─── Build hash from route ────────────────────────────────────────────────────
export function buildHash(view, slug) {
  if (view === "list")        return "#/";
  if (view === "builder")     return `#/builder/${encodeURIComponent(slug)}`;
  if (view === "builder-new") return `#/builder/new/${encodeURIComponent(slug)}`;
  if (view === "preview")     return `#/preview/${encodeURIComponent(slug)}`;
  return "#/";
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useRouter() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  // Listen to popstate (back/forward) and hashchange
  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  /** Navigate programmatically — pushes to history */
  const navigate = useCallback((view, slug = "") => {
    const hash = buildHash(view, slug);
    // Only push if actually changing
    if (window.location.hash !== hash) {
      window.location.hash = hash;
      // hashchange event fires automatically → setRoute called
    }
  }, []);

  /** Replace current history entry (no back button entry) */
  const replace = useCallback((view, slug = "") => {
    const hash = buildHash(view, slug);
    window.history.replaceState(null, "", hash);
    setRoute(parseHash(hash));
  }, []);

  return { route, navigate, replace };
}
