import { useState } from "react";
import { usePageBuilder } from "../../context/PageBuilderContext";
import { getPageIndex } from "../../services/pageService";
import { inp } from "../../styles/common";

/**
 * PagesTab — Phase 3
 * Shows all pages with:
 *  - Save status dot (green = saved, grey = unsaved)
 *  - Per-page download button (↓)
 *  - Per-page delete button (✕)
 *  - New Page creation form
 */
export default function PagesTab() {
  const {
    pages,
    selPageId,
    showNewPage,
    newPageInput,
    saveStatus,
    setShowNewPage,
    setNewPageInput,
    selectPage,
    addPage,
    removePageById,
    downloadCurrent,
    saveCurrentPage,
  } = usePageBuilder();

  // Hover state for showing per-row actions
  const [hoveredId, setHoveredId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async (e, pageId) => {
    e.stopPropagation();
    if (confirmDeleteId === pageId) {
      await removePageById(pageId);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(pageId);
      // Auto-cancel confirm after 3s
      setTimeout(() => setConfirmDeleteId((cur) => cur === pageId ? null : cur), 3000);
    }
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    downloadCurrent();
  };

  const handleSave = (e) => {
    e.stopPropagation();
    saveCurrentPage();
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
      {/* Section label */}
      <div
        style={{
          padding: "10px 14px 4px",
          fontSize: 10, fontWeight: 700,
          color: "#c0c0c0", letterSpacing: 1.2,
          textTransform: "uppercase",
        }}
      >
        All Pages
      </div>

      {/* Page list */}
      {pages.map((p) => {
        const isSelected   = selPageId === p.id;
        const isHovered    = hoveredId === p.id;
        const isConfirm    = confirmDeleteId === p.id;
        const isSaving     = isSelected && saveStatus === "saving";
        const isSaved      = isSelected && saveStatus === "saved";

        return (
          <div
            key={p.id}
            onClick={() => { setConfirmDeleteId(null); selectPage(p.id); }}
            onMouseEnter={() => setHoveredId(p.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 12px",
              cursor: "pointer",
              fontSize: 13,
              userSelect: "none",
              ...(isSelected
                ? { background: "#ede9fe", color: "#6d28d9", fontWeight: 700 }
                : isHovered
                ? { background: "#f8f8fb", color: "#333" }
                : { color: "#333" }),
            }}
          >
            {/* Page icon */}
            <span style={{ fontSize: 13, flexShrink: 0 }}>📄</span>

            {/* Page name */}
            <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {p.name}
            </span>

            {/* Save status dot (always visible for selected page) */}
            {isSelected && (
              <span
                title={isSaving ? "Saving…" : isSaved ? "Saved" : "Auto-saved"}
                style={{
                  width: 7, height: 7,
                  borderRadius: "50%",
                  background: isSaving ? "#f59e0b" : isSaved ? "#22c55e" : "#6d28d9",
                  flexShrink: 0,
                  transition: "background 0.3s",
                }}
              />
            )}

            {/* Per-row action buttons (visible on hover for selected page) */}
            {isSelected && isHovered && (
              <div
                style={{ display: "flex", gap: 3, flexShrink: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Quick save */}
                <button
                  onClick={handleSave}
                  title="Save this page"
                  style={rowBtn("#f3f0ff", "#6d28d9")}
                >
                  💾
                </button>

                {/* Download this page's JSON */}
                <button
                  onClick={handleDownload}
                  title="Download page JSON"
                  style={rowBtn("#f0fdf4", "#16a34a")}
                >
                  ↓
                </button>

                {/* Delete page */}
                <button
                  onClick={(e) => handleDelete(e, p.id)}
                  title={isConfirm ? "Click again to confirm delete" : "Delete page"}
                  style={rowBtn(isConfirm ? "#fee2e2" : "#fff0f0", isConfirm ? "#991b1b" : "#e55")}
                >
                  {isConfirm ? "!" : "✕"}
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* Confirm-delete warning message */}
      {confirmDeleteId && (
        <div
          style={{
            margin: "0 10px 6px",
            padding: "7px 10px",
            background: "#fee2e2",
            borderRadius: 8,
            fontSize: 11,
            color: "#991b1b",
            fontWeight: 600,
            lineHeight: 1.5,
          }}
        >
          Click ✕ again to confirm delete. This cannot be undone.
        </div>
      )}

      {/* New page form / button */}
      {showNewPage ? (
        <div style={{ padding: "8px 12px" }}>
          <input
            autoFocus
            style={{ ...inp, marginBottom: 7 }}
            placeholder="Page name…"
            value={newPageInput}
            onChange={(e) => setNewPageInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPage()}
          />
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={addPage}
              style={{ flex: 1, padding: "7px 0", background: "#6d28d9", color: "#fff", border: "none", borderRadius: 7, fontWeight: 600, fontSize: 12, cursor: "pointer" }}
            >
              Create
            </button>
            <button
              onClick={() => setShowNewPage(false)}
              style={{ flex: 1, padding: "7px 0", background: "#f3f3f5", color: "#555", border: "none", borderRadius: 7, fontWeight: 600, fontSize: 12, cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowNewPage(true)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            width: "100%", padding: "11px 14px",
            background: "none", border: "none",
            borderTop: "1px solid #f0f0f0",
            marginTop: "auto", cursor: "pointer",
            fontSize: 13, color: "#6d28d9", fontWeight: 600,
          }}
        >
          <span style={{ fontSize: 18 }}>+</span> New Page
        </button>
      )}
    </div>
  );
}

const rowBtn = (bg, color) => ({
  background: bg,
  border: "none",
  borderRadius: 5,
  width: 22,
  height: 22,
  cursor: "pointer",
  fontSize: 11,
  color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  fontWeight: 700,
});
