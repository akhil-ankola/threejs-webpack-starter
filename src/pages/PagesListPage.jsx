/**
 * PagesListPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * The "home" screen of the builder. Shows all pages saved in the database
 * with options to Edit, Preview, or Delete each one.
 * Also lets you create a brand-new page.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useState } from "react";
import { inputStyle } from "../components/shared/FormFields";

export function PagesListPage({ pages, loading, onEdit, onPreview, onDelete, onCreateNew }) {
  const [showNew, setShowNew]   = useState(false);
  const [newName, setNewName]   = useState("");
  const [newSlug, setNewSlug]   = useState("");
  const [nameErr, setNameErr]   = useState("");

  const handleSlugify = (name) => {
    setNewName(name);
    setNewSlug(name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
    setNameErr("");
  };

  const handleCreate = () => {
    if (!newName.trim()) { setNameErr("Page name is required."); return; }
    if (!newSlug.trim()) { setNameErr("Slug is required."); return; }
    if (pages.find((p) => p.slug === newSlug)) { setNameErr(`Slug "${newSlug}" already exists.`); return; }
    onCreateNew(newName.trim(), newSlug.trim());
    setShowNew(false); setNewName(""); setNewSlug(""); setNameErr("");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f4ff", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: "#1e1b4b", padding: "14px 32px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 20 }}>⚡</span>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>PageBuilder</span>
        <div style={{ flex: 1 }} />
        <button onClick={() => setShowNew(true)}
          style={{ padding: "8px 20px", background: "#6d28d9", color: "#fff", border: "none", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: "0 2px 8px rgba(109,40,217,0.4)" }}>
          + New Page
        </button>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>
        {/* Title */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#1e1b4b" }}>Your Pages</h1>
          <p style={{ margin: "6px 0 0", color: "#888", fontSize: 14 }}>
            {pages.length} page{pages.length !== 1 ? "s" : ""} saved in database
          </p>
        </div>

        {/* Create new form */}
        {showNew && (
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, marginBottom: 28, boxShadow: "0 4px 24px rgba(109,40,217,0.1)", border: "1.5px solid #ede9fe" }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1e1b4b", marginBottom: 16 }}>Create New Page</div>
            <div style={{ display: "flex", gap: 12, marginBottom: nameErr ? 6 : 16 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Page Name</label>
                <input style={inputStyle} placeholder="e.g. Contact Us" value={newName} onChange={(e) => handleSlugify(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCreate()} autoFocus />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>URL Slug</label>
                <input style={inputStyle} placeholder="e.g. contact-us" value={newSlug} onChange={(e) => { setNewSlug(e.target.value); setNameErr(""); }} onKeyDown={(e) => e.key === "Enter" && handleCreate()} />
              </div>
            </div>
            {nameErr && <div style={{ fontSize: 12, color: "#ef4444", marginBottom: 12 }}>⚠ {nameErr}</div>}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleCreate} style={{ padding: "9px 22px", background: "#6d28d9", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Create & Edit</button>
              <button onClick={() => { setShowNew(false); setNewName(""); setNewSlug(""); setNameErr(""); }} style={{ padding: "9px 16px", background: "#f3f3f5", color: "#555", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: 60, color: "#aaa" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
            Loading pages…
          </div>
        )}

        {/* Empty state */}
        {!loading && pages.length === 0 && !showNew && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>📄</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#444", marginBottom: 8 }}>No pages yet</div>
            <div style={{ fontSize: 14, marginBottom: 24 }}>Create your first page to get started</div>
            <button onClick={() => setShowNew(true)} style={{ padding: "11px 26px", background: "#6d28d9", color: "#fff", border: "none", borderRadius: 9, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>+ Create First Page</button>
          </div>
        )}

        {/* Pages grid */}
        {!loading && pages.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
            {pages.map((page) => (
              <PageCard key={page.id} page={page} onEdit={onEdit} onPreview={onPreview} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PageCard({ page, onEdit, onPreview, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const savedAt = page._savedAt ? new Date(page._savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
  const sectionCount = page.sections?.length || 0;
  const elementCount = page.sections?.reduce((a, s) => a + (s.elements?.length || 0), 0) || 0;

  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #ebebeb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", transition: "box-shadow 0.15s" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 24px rgba(109,40,217,0.12)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)")}>

      {/* Card thumbnail strip */}
      <div style={{ height: 6, background: "linear-gradient(90deg, #6d28d9, #a78bfa)" }} />

      <div style={{ padding: 20 }}>
        {/* Page icon + name */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📄</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1e1b4b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{page.name}</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>/{page.slug}</div>
          </div>
        </div>

        {/* Meta stats */}
        <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
          <Stat label="Sections" value={sectionCount} />
          <Stat label="Elements" value={elementCount} />
          <Stat label="Saved" value={savedAt} />
        </div>

        {/* Actions */}
        {confirmDelete ? (
          <div style={{ background: "#fff5f5", borderRadius: 8, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, color: "#ef4444", fontWeight: 600, marginBottom: 8 }}>Delete "{page.name}"?</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => onDelete(page.id)} style={{ flex: 1, padding: "7px 0", background: "#ef4444", color: "#fff", border: "none", borderRadius: 7, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Yes, delete</button>
              <button onClick={() => setConfirmDelete(false)} style={{ flex: 1, padding: "7px 0", background: "#f3f3f5", color: "#555", border: "none", borderRadius: 7, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => onEdit(page.slug)} style={{ flex: 1, padding: "8px 0", background: "#6d28d9", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>✏ Edit</button>
            <button onClick={() => onPreview(page.slug)} style={{ flex: 1, padding: "8px 0", background: "#f3f0ff", color: "#6d28d9", border: "1px solid #ede9fe", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>▷ Preview</button>
            <button onClick={() => setConfirmDelete(true)} style={{ padding: "8px 10px", background: "#fff5f5", color: "#ef4444", border: "1px solid #fee2e2", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>🗑</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1e1b4b" }}>{value}</div>
      <div style={{ fontSize: 10, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 };
