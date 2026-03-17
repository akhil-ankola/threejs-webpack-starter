import { usePageBuilder } from "../../context/PageBuilderContext";
import PagesTab from "./PagesTab";
import LayersTab from "./LayersTab";

/**
 * Sidebar
 * Left panel with "Pages" and "Layers" tabs.
 * Pages tab: list and create pages.
 * Layers tab: tree of sections/elements for the active page.
 */
export default function Sidebar() {
  const { sideTab, selPageId, setSideTab } = usePageBuilder();

  const tabs = [
    { key: "pages", label: "Pages" },
    { key: "layers", label: "Layers" },
  ];

  return (
    <div
      style={{
        width: 240,
        background: "#fff",
        borderRight: "1px solid #e6e6e6",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #ebebeb",
          padding: "8px 6px 0",
        }}
      >
        {tabs.map(({ key, label }) => {
          const disabled = key === "layers" && !selPageId;
          return (
            <button
              key={key}
              onClick={() => !disabled && setSideTab(key)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                padding: "8px 4px",
                fontSize: 12,
                fontWeight: 600,
                cursor: disabled ? "default" : "pointer",
                color:
                  sideTab === key
                    ? "#6d28d9"
                    : disabled
                    ? "#ddd"
                    : "#999",
                borderBottom: `2.5px solid ${
                  sideTab === key ? "#6d28d9" : "transparent"
                }`,
                marginBottom: -1,
                transition: "all 0.14s",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {sideTab === "pages" && <PagesTab />}
      {sideTab === "layers" && <LayersTab />}
    </div>
  );
}
