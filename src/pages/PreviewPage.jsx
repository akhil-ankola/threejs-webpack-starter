/**
 * PreviewPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * URL: /#/preview/:slug
 *
 * Fetches the page by slug, deserializes the JSON, and renders it using
 * PageRenderer — the same pure-display components as the builder canvas.
 *
 * This proves the complete round-trip:
 *   Build  →  Save (JSON to DB)  →  /#/preview/:slug  →  Rendered from JSON
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useState, useEffect } from "react";
import { getPageBySlug }       from "../api/client";
import { deserializePage }     from "../utils/serializer";
import { PageRenderer }        from "../components/Canvas/PageRenderer";

export function PreviewPage({ slug, onEdit, onBack }) {
  const [page,    setPage]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    getPageBySlug(slug)
      .then((rec) => setPage(deserializePage(rec)))
      .catch((e)  => setError(e.message))
      .finally(()  => setLoading(false));
  }, [slug]);

  // Update browser title
  useEffect(() => {
    if (page) document.title = `${page.name} — Preview`;
    return () => { document.title = "PageBuilder"; };
  }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter','Segoe UI',sans-serif" }}>

      {/* ── Sticky preview toolbar ── */}
      <div style={{ background: "#1e1b4b", padding: "10px 20px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>

        <button onClick={onBack}
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 7, padding: "6px 12px", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          ← All Pages
        </button>

        {/* Current URL badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, padding: "5px 12px" }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>🔗</span>
          <span style={{ color: "#a78bfa", fontSize: 12, fontFamily: "monospace", letterSpacing: 0.3 }}>
            {window.location.href}
          </span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Live indicator */}
        <div style={{ background: "rgba(5,150,105,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 20, padding: "4px 12px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ color: "#34d399", fontSize: 11, fontWeight: 700 }}>Rendered from saved JSON</span>
        </div>

        <div style={{ flex: 1 }} />

        {page && (
          <button onClick={onEdit}
            style={{ background: "#6d28d9", border: "none", borderRadius: 7, padding: "7px 16px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(109,40,217,0.4)" }}>
            ✏ Edit Page
          </button>
        )}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>

      {/* ── Content ── */}
      {loading && <LoadState icon="⏳" msg="Loading page…" />}
      {error   && (
        <LoadState icon="⚠️" msg={error}>
          <p style={{ color: "#aaa", fontSize: 13 }}>Make sure the page has been saved in the builder first.</p>
          <button onClick={onEdit} style={{ padding: "9px 20px", background: "#6d28d9", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
            Open in Builder
          </button>
        </LoadState>
      )}

      {!loading && !error && page && (
        <>
          {/* JSON proof banner */}
          <div style={{ background: "#f0fdf4", borderBottom: "1px solid #bbf7d0", padding: "9px 24px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 15 }}>✅</span>
            <span style={{ fontSize: 12, color: "#166534" }}>
              Page <strong>"{page.name}"</strong> reconstructed entirely from JSON stored in the database.
              URL: <code style={{ background: "#dcfce7", padding: "1px 6px", borderRadius: 4 }}>{window.location.hash}</code>
            </span>
          </div>
          <PageRenderer page={page} />
        </>
      )}
    </div>
  );
}

function LoadState({ icon, msg, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 10, color: "#aaa" }}>
      <div style={{ fontSize: 40 }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "#555" }}>{msg}</div>
      {children}
    </div>
  );
}
