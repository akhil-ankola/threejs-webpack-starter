import { useState } from "react";
import { ELEMENT_REGISTRY } from "../../constants/elements";
import { inputStyle } from "../shared/FormFields";

export function BuilderSidebar({ pages, selPageId, selPage, selSectionId, selElInfo, sideTab, onChangeSideTab, onSelectPage, onAddPage, onSelectSection, onSelectEl, onDeleteSection, onAddSection }) {
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");

  const submit = () => {
    if (!newName.trim()) return;
    onAddPage(newName.trim());
    setNewName(""); setShowNew(false);
  };

  return (
    <div style={{ width: 240, background: "#fff", borderRight: "1px solid #e6e6e6", display: "flex", flexDirection: "column", flexShrink: 0, height: "100%" }}>
      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #ebebeb", padding: "8px 6px 0" }}>
        {[["pages","Pages"],["layers","Layers"]].map(([k,l]) => {
          const off = k === "layers" && !selPageId;
          return <button key={k} onClick={() => !off && onChangeSideTab(k)} style={{ flex:1, background:"none", border:"none", padding:"8px 4px", fontSize:12, fontWeight:600, cursor: off?"default":"pointer", color: sideTab===k?"#6d28d9":off?"#ddd":"#999", borderBottom:`2.5px solid ${sideTab===k?"#6d28d9":"transparent"}`, marginBottom:-1 }}>{l}</button>;
        })}
      </div>

      {/* Pages */}
      {sideTab === "pages" && (
        <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column" }}>
          <Label>All Pages</Label>
          {pages.map((p) => (
            <button key={p.id} onClick={() => onSelectPage(p.id)}
              style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"10px 14px", background:"none", border:"none", cursor:"pointer", fontSize:13, textAlign:"left", ...(selPageId===p.id?{background:"#ede9fe",color:"#6d28d9",fontWeight:700}:{color:"#333"}) }}>
              <span>📄</span><span style={{ flex:1 }}>{p.name}</span>
              {selPageId===p.id && <span style={{ width:7,height:7,borderRadius:"50%",background:"#6d28d9",display:"inline-block" }} />}
            </button>
          ))}
          {showNew ? (
            <div style={{ padding:"8px 12px" }}>
              <input autoFocus style={{ ...inputStyle, marginBottom:7 }} placeholder="Page name…" value={newName} onChange={(e)=>setNewName(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&submit()} />
              <div style={{ display:"flex", gap:6 }}>
                <button onClick={submit} style={ab("#6d28d9","#fff")}>Create</button>
                <button onClick={()=>{setShowNew(false);setNewName("");}} style={ab("#f3f3f5","#555")}>Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={()=>setShowNew(true)} style={{ display:"flex",alignItems:"center",gap:6,width:"100%",padding:"11px 14px",background:"none",border:"none",borderTop:"1px solid #f0f0f0",marginTop:"auto",cursor:"pointer",fontSize:13,color:"#6d28d9",fontWeight:600 }}>
              <span style={{ fontSize:18 }}>+</span> New Page
            </button>
          )}
        </div>
      )}

      {/* Layers */}
      {sideTab === "layers" && selPage && (
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <Label>{selPage.name} · {selPage.sections.length} section{selPage.sections.length!==1?"s":""}</Label>
          <div style={{ flex:1, overflowY:"auto", padding:"6px 10px" }}>
            {selPage.sections.length === 0
              ? <div style={{ textAlign:"center",color:"#ccc",fontSize:12,padding:"24px 10px",lineHeight:1.7 }}>No sections yet.<br/><strong style={{ color:"#6d28d9" }}>+ Add Section</strong></div>
              : selPage.sections.map((sec) => (
                <LayerSection key={sec.id} section={sec} isSelected={selSectionId===sec.id} selElId={selElInfo?.elId} onSelect={onSelectSection} onSelectEl={onSelectEl} onDelete={onDeleteSection} />
              ))
            }
          </div>
          <div style={{ padding:"10px 12px", borderTop:"1px solid #f0f0f0" }}>
            <button onClick={onAddSection} style={{ width:"100%",padding:"10px 0",background:"#6d28d9",color:"#fff",border:"none",borderRadius:9,fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7,boxShadow:"0 3px 12px rgba(109,40,217,0.3)" }}>
              <span style={{ fontSize:18 }}>+</span> Add Section
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Label({ children }) {
  return <div style={{ padding:"10px 14px 4px", fontSize:10, fontWeight:700, color:"#c0c0c0", letterSpacing:1.2, textTransform:"uppercase" }}>{children}</div>;
}

function LayerSection({ section, isSelected, selElId, onSelect, onSelectEl, onDelete }) {
  return (
    <div style={{ marginBottom:4 }}>
      <div onClick={() => onSelect(section.id)} style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 10px",borderRadius:8,background:isSelected?"#ede9fe":"#f8f8fb",border:`1.5px solid ${isSelected?"#6d28d9":"transparent"}`,cursor:"pointer",userSelect:"none" }}>
        <span style={{ fontSize:12,color:"#ccc" }}>⠿</span>
        <span style={{ fontSize:12,fontWeight:600,color:isSelected?"#6d28d9":"#444",flex:1 }}>Section</span>
        <span style={{ fontSize:11,color:"#bbb" }}>{section.elements.length} el</span>
        <button onClick={(e)=>{e.stopPropagation();onDelete(section.id);}} style={{ background:"none",border:"none",cursor:"pointer",fontSize:12,color:"#d0d0d0",padding:"1px 4px",borderRadius:4 }}>✕</button>
      </div>
      {section.elements.map((el) => (
        <div key={el.id} onClick={(e)=>{e.stopPropagation();onSelectEl(el.id,section.id,null);}}
          style={{ display:"flex",alignItems:"center",gap:6,padding:"5px 10px 5px 24px",borderRadius:7,cursor:"pointer",background:selElId===el.id?"#f3f0ff":"none",color:selElId===el.id?"#6d28d9":"#666",fontSize:11 }}>
          <span>{ELEMENT_REGISTRY[el.type]?.icon}</span>
          <span style={{ fontWeight:500 }}>{ELEMENT_REGISTRY[el.type]?.label}</span>
        </div>
      ))}
    </div>
  );
}

const ab = (bg, color) => ({ flex:1, padding:"7px 0", background:bg, color, border:"none", borderRadius:7, fontWeight:600, fontSize:12, cursor:"pointer" });
