/**
 * useSavePage.js
 * ─────────────────────────────────────────────────────────────
 * Encapsulates all save-related logic for the page builder.
 *
 * Responsibilities
 * ─────────────────
 * 1. Auto-save the ACTIVE page 1.5 s after it stops changing
 * 2. Expose a manual `saveCurrentPage()` for the Save button
 * 3. Track save status per page: "idle" | "saving" | "saved" | "error"
 * 4. Bootstrap: load all pages from storage on first mount
 *
 * Usage (inside PageBuilderProvider)
 * ────────────────────────────────────
 *   const { saveStatus, saveCurrentPage, lastSavedAt, isLoading } =
 *     useSavePage(pages, setPages, selPageId);
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { loadAllPages, savePage, saveAllPages } from "../services/pageService";

/** How long after the last change before auto-save fires (ms) */
const AUTO_SAVE_DELAY = 1500;

/**
 * @param {Array}    pages       Current pages array from state
 * @param {Function} setPages    State setter
 * @param {number}   selPageId  Currently selected page ID (or null)
 */
export function useSavePage(pages, setPages, selPageId) {
  // "idle" | "saving" | "saved" | "error"
  const [saveStatus, setSaveStatus] = useState("idle");
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true until first storage load

  // Track whether pages was loaded from storage (skip auto-save on hydration)
  const hydratedRef = useRef(false);
  const autoSaveTimerRef = useRef(null);

  // ── Bootstrap: load from storage on mount ──────────────────
  useEffect(() => {
    setIsLoading(true);
    loadAllPages().then((stored) => {
      if (stored && stored.length > 0) {
        setPages(stored);
      }
      hydratedRef.current = true;
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Auto-save: fires 1.5 s after the active page changes ───
  useEffect(() => {
    // Don't auto-save during hydration or if no page is selected
    if (!hydratedRef.current || !selPageId) return;

    const activePage = pages.find((p) => p.id === selPageId);
    if (!activePage) return;

    // Clear any pending timer
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    setSaveStatus("saving");

    autoSaveTimerRef.current = setTimeout(async () => {
      try {
        const result = await savePage(activePage);
        if (result.success) {
          setSaveStatus("saved");
          setLastSavedAt(result.savedAt);
          // Reset to idle after 3 s so the UI doesn't stay "Saved" forever
          setTimeout(() => setSaveStatus("idle"), 3000);
        } else {
          setSaveStatus("error");
        }
      } catch {
        setSaveStatus("error");
      }
    }, AUTO_SAVE_DELAY);

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
    // We deliberately only watch pages — not selPageId — so switching pages
    // doesn't trigger a spurious auto-save of the new page.
  }, [pages, selPageId]);

  // ── Manual save: called from the Save button ────────────────
  const saveCurrentPage = useCallback(async () => {
    if (!selPageId) return;
    const activePage = pages.find((p) => p.id === selPageId);
    if (!activePage) return;

    // Cancel any pending auto-save
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    setSaveStatus("saving");
    try {
      const result = await savePage(activePage);
      if (result.success) {
        setSaveStatus("saved");
        setLastSavedAt(result.savedAt);
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
  }, [pages, selPageId]);

  // ── Save all pages (used for "Export & Save All") ───────────
  const saveAll = useCallback(async () => {
    setSaveStatus("saving");
    try {
      const result = await saveAllPages(pages);
      if (result.success) {
        setSaveStatus("saved");
        setLastSavedAt(new Date().toISOString());
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
  }, [pages]);

  return {
    saveStatus,    // "idle" | "saving" | "saved" | "error"
    lastSavedAt,   // ISO string of last successful save, or null
    isLoading,     // true while hydrating from storage
    saveCurrentPage,
    saveAll,
  };
}
