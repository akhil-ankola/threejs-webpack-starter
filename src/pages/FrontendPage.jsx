/**
 * FrontendPage
 * ─────────────────────────────────────────────────────────────
 * Public-facing page route: /home, /about, /contact-us, etc.
 *
 * Flow:
 *   1. React Router passes :slug via useParams()
 *   2. usePublicPage(slug) loads the page from storage
 *   3. PageRenderer maps each section to its React component
 *
 * To connect a backend:
 *   - Replace loadPageBySlug() in usePublicPages.js with a fetch() call
 *   - This component does not change.
 */

import { useParams, Link } from "react-router-dom";
import { usePublicPage } from "../hooks/usePublicPages";
import PublicHeader from "../components/frontend/PublicHeader";
import PublicFooter from "../components/frontend/PublicFooter";
import PageRenderer from "../components/frontend/PageRenderer";

export default function FrontendPage() {
  const { slug }               = useParams();
  const { page, loading, notFound } = usePublicPage(slug);

  // ── Loading state ────────────────────────────────────────────
  if (loading) {
    return (
      <div style={fullPage}>
        <PublicHeader />
        <div style={centerBox}>
          <div style={spinner} />
          <p style={{ color: "#888", fontSize: 14, marginTop: 16 }}>Loading page…</p>
        </div>
        <PublicFooter />
      </div>
    );
  }

  // ── 404 — page not saved / slug not found ────────────────────
  if (notFound || !page) {
    return (
      <div style={fullPage}>
        <PublicHeader />
        <div style={centerBox}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
          <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 800, color: "#111" }}>
            Page not found
          </h1>
          <p style={{ color: "#777", fontSize: 15, marginBottom: 28, maxWidth: 380, textAlign: "center", lineHeight: 1.6 }}>
            The page <code style={{ background: "#f3f0ff", color: "#6d28d9", padding: "1px 6px", borderRadius: 4 }}>/{slug}</code> doesn't exist or hasn't been saved yet.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Link to="/dashboard" style={btnPrimary}>Open Dashboard</Link>
            <Link to="/home" style={btnSecondary}>← Home</Link>
          </div>
          <p style={{ marginTop: 20, fontSize: 12, color: "#bbb" }}>
            Tip: Create this page in the dashboard, then save it to make it appear here.
          </p>
        </div>
        <PublicFooter />
      </div>
    );
  }

  // ── Happy path ───────────────────────────────────────────────
  return (
    <div style={fullPage}>
      <PublicHeader />
      <PageRenderer page={page} />
      <PublicFooter />
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────
const fullPage = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  fontFamily: "'Inter','Segoe UI',sans-serif",
};

const centerBox = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "60px 24px",
  textAlign: "center",
};

const spinner = {
  width: 36,
  height: 36,
  border: "3px solid #ede9fe",
  borderTopColor: "#6d28d9",
  borderRadius: "50%",
  animation: "pb-spin 0.8s linear infinite",
};

const btnPrimary = {
  padding: "10px 22px",
  background: "#6d28d9",
  color: "#fff",
  borderRadius: 9,
  fontWeight: 700,
  fontSize: 14,
  textDecoration: "none",
};

const btnSecondary = {
  padding: "10px 22px",
  background: "#f3f3f5",
  color: "#444",
  borderRadius: 9,
  fontWeight: 600,
  fontSize: 14,
  textDecoration: "none",
};
