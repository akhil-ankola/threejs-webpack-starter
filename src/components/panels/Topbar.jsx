import { Link } from "react-router-dom";
import { usePageBuilder } from "../../context/PageBuilderContext";

/**
 * Topbar — Phase 4
 * Adds a "View Page →" link that opens the current page's public URL in a new tab.
 */
export default function Topbar() {
  const {
    selPage,
    saveStatus,
    lastSavedAt,
    isLoading,
    saveCurrentPage,
    downloadCurrent,
    downloadAll,
  } = usePageBuilder();

  const statusConfig = {
    idle:   { label: null,       bg: "transparent", color: "#aaa" },
    saving: { label: "Saving…",  bg: "#fef9c3",     color: "#92400e" },
    saved:  { label: "✓ Saved",  bg: "#dcfce7",     color: "#166534" },
    error:  { label: "✕ Error",  bg: "#fee2e2",     color: "#991b1b" },
  };
  const st = statusConfig[saveStatus] || statusConfig.idle;

  const formattedTime = lastSavedAt
    ? new Date(lastSavedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : null;

  return (
    <div style={{ height: 48, background: "#fff", borderBottom: "1px solid #e6e6e6", display: "flex", alignItems: "center", padding: "0 18px", gap: 10, flexShrink: 0, zIndex: 30 }}>

      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 26, height: 26, background: "#6d28d9", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff" }}>✦</div>
        <span style={{ fontWeight: 800, fontSize: 14, color: "#111", letterSpacing: -0.3 }}>PageBuilder</span>
      </div>

      {isLoading && <span style={{ fontSize: 11, color: "#aaa", marginLeft: 4 }}>Loading…</span>}

      <div style={{ flex: 1 }} />

      {/* Active page chip */}
      {selPage && (
        <span style={{ fontSize: 12, color: "#888", background: "#f3f3f5", padding: "3px 10px", borderRadius: 20 }}>
          Editing: <strong style={{ color: "#333" }}>{selPage.name}</strong>
          {selPage.slug && (
            <span style={{ color: "#aaa", marginLeft: 4, fontFamily: "monospace", fontSize: 10 }}>/{selPage.slug}</span>
          )}
        </span>
      )}

      {/* View site link */}
      {selPage?.slug && (
        <a
          href={`/${selPage.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "5px 12px",
            background: "#f0fdf4",
            color: "#16a34a",
            border: "1.5px solid #bbf7d0",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 12,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          View Page ↗
        </a>
      )}

      {/* Save status badge */}
      {saveStatus !== "idle" && (
        <span style={{ fontSize: 11, fontWeight: 700, background: st.bg, color: st.color, padding: "3px 10px", borderRadius: 20, transition: "all 0.2s" }}>
          {st.label}
        </span>
      )}

      {/* Last saved time */}
      {formattedTime && saveStatus === "idle" && (
        <span style={{ fontSize: 10, color: "#bbb" }}>Saved {formattedTime}</span>
      )}

      {/* Save button */}
      <button
        onClick={saveCurrentPage}
        disabled={!selPage || saveStatus === "saving" || isLoading}
        title={selPage ? `Save "${selPage.name}"` : "Select a page first"}
        style={{
          padding: "6px 16px",
          background: selPage ? "#6d28d9" : "#e5e7eb",
          color: selPage ? "#fff" : "#9ca3af",
          border: "none", borderRadius: 8,
          fontWeight: 700, fontSize: 12,
          cursor: selPage ? "pointer" : "default",
          display: "flex", alignItems: "center", gap: 5,
          transition: "background 0.15s",
        }}
      >
        {saveStatus === "saving" ? <><Spinner /> Saving</> : <>💾 Save</>}
      </button>

      <div style={{ width: 1, height: 20, background: "#e5e7eb" }} />

      {/* Download buttons */}
      <button onClick={downloadCurrent} disabled={!selPage}
        title={selPage ? `Download ${selPage.slug || selPage.name}.json` : "Select a page first"}
        style={{ padding: "6px 12px", background: "#f3f0ff", color: selPage ? "#6d28d9" : "#aaa", border: "1.5px solid #c4b5fd", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: selPage ? "pointer" : "default", display: "flex", alignItems: "center", gap: 4 }}>
        ↓ Page JSON
      </button>

      <button onClick={downloadAll} title="Download all pages as all-pages.json"
        style={{ padding: "6px 12px", background: "#f8f8fb", color: "#555", border: "1.5px solid #e5e7eb", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
        ↓ All Pages
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <span style={{ width: 10, height: 10, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "pb-spin 0.7s linear infinite" }} />
  );
}
