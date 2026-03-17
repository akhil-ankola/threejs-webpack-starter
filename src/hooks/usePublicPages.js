/**
 * usePublicPages.js
 * ─────────────────────────────────────────────────────────────
 * Lightweight hook used ONLY on the public-facing frontend.
 * Does NOT depend on PageBuilderContext — the public site has no
 * admin state; it just reads from storage and renders.
 *
 * When you connect a backend, replace the two service calls below
 * with API fetches — nothing else changes.
 */

import { useState, useEffect } from "react";
import { loadPageBySlug, getPublicPageIndex } from "../services/pageService";

/**
 * Load a single public page by its URL slug.
 *
 * @param {string} slug  e.g. "about-us"
 * @returns {{ page, loading, notFound }}
 */
export function usePublicPage(slug) {
  const [page, setPage]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    setPage(null);

    loadPageBySlug(slug).then((data) => {
      if (data) {
        setPage(data);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [slug]);

  return { page, loading, notFound };
}

/**
 * Load the full navigation index (id, name, slug) for every saved page.
 * Used by PublicHeader to build the nav links.
 *
 * @returns {{ navItems, loading }}
 */
export function usePublicNav() {
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getPublicPageIndex().then((items) => {
      setNavItems(items);
      setLoading(false);
    });
  }, []);

  return { navItems, loading };
}
