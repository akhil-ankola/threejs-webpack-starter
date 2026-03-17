import { usePageBuilder } from "../../context/PageBuilderContext";

/**
 * Topbar
 * Top navigation bar. Shows branding and global actions:
 * - Export JSON: downloads the full pages structure
 * - (Extendable: Save to API, Preview, Publish)
 */
export default function Topbar() {
  const { pages, selPage } = usePageBuilder();

  const handleExportJSON = () => {
    const json = JSON.stringify(pages, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pages.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        height: 48,
        background: "#fff",
        borderBottom: "1px solid #e6e6e6",
        display: "flex",
        alignItems: "center",
        padding: "0 18px",
        gap: 12,
        flexShrink: 0,
        zIndex: 30,
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 26,
            height: 26,
            background: "#6d28d9",
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          ✦
        </div>
        <span style={{ fontWeight: 800, fontSize: 14, color: "#111", letterSpacing: -0.3 }}>
          PageBuilder
        </span>
      </div>

      {/* Separator */}
      <div style={{ flex: 1 }} />

      {/* Active page label */}
      {selPage && (
        <span
          style={{
            fontSize: 12,
            color: "#888",
            background: "#f3f3f5",
            padding: "3px 10px",
            borderRadius: 20,
          }}
        >
          Editing: <strong style={{ color: "#333" }}>{selPage.name}</strong>
        </span>
      )}

      {/* Export JSON */}
      <button
        onClick={handleExportJSON}
        title="Export all pages as JSON"
        style={{
          padding: "6px 14px",
          background: "#f3f0ff",
          color: "#6d28d9",
          border: "1.5px solid #c4b5fd",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 12,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        ↓ Export JSON
      </button>
    </div>
  );
}
