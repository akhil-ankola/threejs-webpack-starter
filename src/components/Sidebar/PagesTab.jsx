import { usePageBuilder } from "../../context/PageBuilderContext";
import { inp } from "../../styles/common";

/**
 * PagesTab
 * Lists all pages and provides a "New Page" creation form.
 */
export default function PagesTab() {
  const {
    pages,
    selPageId,
    showNewPage,
    newPageInput,
    setShowNewPage,
    setNewPageInput,
    selectPage,
    addPage,
  } = usePageBuilder();

  return (
    <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "10px 14px 4px",
          fontSize: 10,
          fontWeight: 700,
          color: "#c0c0c0",
          letterSpacing: 1.2,
          textTransform: "uppercase",
        }}
      >
        All Pages
      </div>

      {pages.map((p) => (
        <button
          key={p.id}
          onClick={() => selectPage(p.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            padding: "10px 14px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            textAlign: "left",
            ...(selPageId === p.id
              ? { background: "#ede9fe", color: "#6d28d9", fontWeight: 700 }
              : { color: "#333" }),
          }}
        >
          <span>📄</span>
          <span style={{ flex: 1 }}>{p.name}</span>
          {selPageId === p.id && (
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#6d28d9",
                display: "inline-block",
              }}
            />
          )}
        </button>
      ))}

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
              style={{
                flex: 1,
                padding: "7px 0",
                background: "#6d28d9",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Create
            </button>
            <button
              onClick={() => setShowNewPage(false)}
              style={{
                flex: 1,
                padding: "7px 0",
                background: "#f3f3f5",
                color: "#555",
                border: "none",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowNewPage(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            width: "100%",
            padding: "11px 14px",
            background: "none",
            border: "none",
            borderTop: "1px solid #f0f0f0",
            marginTop: "auto",
            cursor: "pointer",
            fontSize: 13,
            color: "#6d28d9",
            fontWeight: 600,
          }}
        >
          <span style={{ fontSize: 18 }}>+</span> New Page
        </button>
      )}
    </div>
  );
}
