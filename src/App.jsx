/**
 * App.jsx — Phase 4
 * ─────────────────────────────────────────────────────────────
 * Routing overview
 * ─────────────────
 *   /               → redirect to /home (or first saved page)
 *   /dashboard      → Page Builder admin panel (PageBuilderProvider)
 *   /:slug          → Public frontend page (no admin context)
 *   *               → 404 Not Found
 *
 * SEPARATION OF CONCERNS
 * ──────────────────────
 * The admin (/dashboard) and the public site (/:slug) are completely
 * independent React trees. PageBuilderProvider (with all editor state,
 * drag refs, selection state, etc.) is ONLY mounted for /dashboard.
 * Public pages are thin: load JSON → render sections.
 *
 * ADDING NEW TOP-LEVEL ROUTES
 * ────────────────────────────
 * Add a <Route> element inside <Routes>. The /:slug wildcard sits at
 * the bottom so it never intercepts dashboard or other named routes.
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PageBuilderProvider } from "./context/PageBuilderContext";
import PageBuilderPage from "./pages/PageBuilderPage";
import FrontendPage    from "./pages/FrontendPage";
import NotFoundPage    from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Root redirect ── */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* ── Admin dashboard — wrapped in PageBuilderProvider ── */}
        <Route
          path="/dashboard"
          element={
            <PageBuilderProvider>
              <PageBuilderPage />
            </PageBuilderProvider>
          }
        />

        {/* ── Public frontend pages — rendered from saved JSON ── */}
        <Route path="/:slug" element={<FrontendPage />} />

        {/* ── Catch-all 404 ── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
