import Sidebar from "../components/sidebar/Sidebar";
import Canvas from "../components/canvas/Canvas";
import RightPanel from "../components/panels/RightPanel";
import Topbar from "../components/panels/Topbar";
import ElementPicker from "../components/modals/ElementPicker";

/**
 * PageBuilderPage
 * Top-level layout: stacks Topbar above the three-panel editor.
 * This is the only "page" in the app; additional pages can be added
 * (e.g. a Preview page) as the project grows.
 */
export default function PageBuilderPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "'Inter','Segoe UI',sans-serif",
        background: "#e8e8ee",
        overflow: "hidden",
      }}
    >
      {/* Top navigation bar */}
      <Topbar />

      {/* Three-column editor */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />
        <Canvas />
        <RightPanel />
      </div>

      {/* Modals (rendered at top of DOM via portal-like pattern) */}
      <ElementPicker />
    </div>
  );
}
