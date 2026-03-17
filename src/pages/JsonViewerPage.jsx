import { useState } from "react";
import { formatBytes } from "../utils/serializer";

export function JsonViewerPage({ payload, onClose }) {
  const [copied, setCopied] = useState(false);
  const jsonStr = JSON.stringify(payload, null, 2);

  const copy = async () => { await navigator.clipboard.writeText(jsonStr); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const download = () => {
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([jsonStr], { type: "application/json" })), download: `${payload?.page?.slug || "page"}.data.json` });
    a.click();
  };

  const sections = payload?.page?.sections || [];
  const totalEls = sections.reduce((a, s) => a + (s.elements?.length || 0), 0);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 3000, background: "#0d1117", display: "flex", flexDirection: "column", fontFamily: "inherit" }}>
      {/* Header */}
      <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <div>
          <div style={{ color: "#e6edf3", fontWeight: 700, fontSize: 14 }}>📄 {payload?.page?.slug}.data.json</div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 2 }}>
            {new Date(payload?.meta?.savedAt).toLocaleString()} · {formatBytes(jsonStr)}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        {/* Stats */}
        {[["Sections", sections.length],["Elements", totalEls],["Version", payload?.meta?.version]].map(([l,v]) => (
          <div key={l} style={{ textAlign: "center", padding: "0 12px", borderLeft: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ color: "#e6edf3", fontWeight: 700, fontSize: 15 }}>{v}</div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>{l}</div>
          </div>
        ))}
        <button onClick={copy} style={ab("#6d28d9")}>{copied ? "✓ Copied!" : "Copy JSON"}</button>
        <button onClick={download} style={ab("#059669")}>↓ Download</button>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px 14px", color: "rgba(255,255,255,0.6)", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>✕ Close</button>
      </div>

      {/* JSON */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
        <pre style={{ margin: 0, fontFamily: "'Fira Code','Cascadia Code','Consolas',monospace", fontSize: 12.5, lineHeight: 1.8 }}>
          {jsonStr.split("\n").map((line, i) => (
            <div key={i} style={{ display: "flex", gap: 16 }}>
              <span style={{ color: "rgba(255,255,255,0.15)", minWidth: 36, textAlign: "right", userSelect: "none", flexShrink: 0 }}>{i + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: colorize(line) }} />
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

function colorize(line) {
  return line
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/(".*?")(: )(".*?")/g,'<span style="color:#79c0ff">$1</span>$2<span style="color:#a5d6ff">$3</span>')
    .replace(/^(\s*)(".*?")(: )/g,'$1<span style="color:#79c0ff">$2</span>$3')
    .replace(/: (".*?")/g,': <span style="color:#a5d6ff">$1</span>')
    .replace(/: (\d+\.?\d*)/g,': <span style="color:#f0883e">$1</span>')
    .replace(/: (true|false|null)/g,': <span style="color:#ff7b72">$1</span>')
    .replace(/([{}[\]])/g,'<span style="color:#8b949e">$1</span>');
}

const ab = (bg) => ({ background: bg, border: "none", borderRadius: 8, padding: "7px 14px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" });
