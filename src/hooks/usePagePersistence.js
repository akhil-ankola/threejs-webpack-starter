import { useEffect, useCallback } from "react";
import { savePages, fetchPages } from "../services/pageService";

/**
 * usePagePersistence
 * ─────────────────────────────────────────────────────────────
 * Handles loading pages from storage on mount and saving them
 * whenever the pages array changes.
 *
 * Usage:
 *   const { forceSave } = usePagePersistence(pages, setPages);
 *
 * @param {Array}    pages    - Current pages state
 * @param {Function} setPages - State setter from PageBuilderContext
 */
export function usePagePersistence(pages, setPages) {
  // Load from storage on first render
  useEffect(() => {
    fetchPages().then((stored) => {
      if (stored && stored.length > 0) {
        setPages(stored);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save whenever pages changes (debounced to 800ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      savePages(pages);
    }, 800);
    return () => clearTimeout(timer);
  }, [pages]);

  // Expose a manual save trigger for "Save" buttons
  const forceSave = useCallback(() => {
    savePages(pages);
  }, [pages]);

  return { forceSave };
}
