import Sidebar from "../components/sidebar/Sidebar";
import Canvas from "../components/canvas/Canvas";
import RightPanel from "../components/panels/RightPanel";
import Topbar from "../components/panels/Topbar";
import ElementPicker from "../components/modals/ElementPicker";
import SectionPicker from "../components/modals/SectionPicker";

export default function PageBuilderPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif", background: "#e8e8ee", overflow: "hidden" }}>
      <Topbar />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar />
        <Canvas />
        <RightPanel />
      </div>
      {/* Modals */}
      <SectionPicker />
      <ElementPicker />
    </div>
  );
}
