/**
 * ElementRenderers.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Pure display components. Used by BOTH:
 *   1. The builder canvas (CanvasElement wraps these)
 *   2. The public PageRenderer (renders saved JSON directly)
 *
 * They receive props in the flat builder shape:
 *   { id, type, text, color, ... }
 *
 * The PageRenderer deserializes the DB schema back to this shape before
 * passing it here, so the same components render in both contexts.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useState } from "react";

export function HeadingRenderer({ el }) {
  const Tag = el.tag || "h2";
  return <Tag style={{ margin: 0, textAlign: el.align, color: el.color, fontSize: el.fontSize, fontWeight: el.fontWeight, lineHeight: 1.25 }}>{el.text}</Tag>;
}

export function TextRenderer({ el }) {
  return <p style={{ margin: 0, textAlign: el.align, color: el.color, fontSize: el.fontSize, lineHeight: el.lineHeight }}>{el.text}</p>;
}

export function ImageRenderer({ el }) {
  return (
    <div style={{ textAlign: el.align }}>
      <img src={el.src} alt={el.alt} style={{ width: `${el.width}%`, maxWidth: "100%", borderRadius: el.borderRadius, display: "inline-block", objectFit: "cover" }} />
    </div>
  );
}

export function ButtonRenderer({ el }) {
  return (
    <div style={{ textAlign: el.align }}>
      <button style={{ background: el.bgColor, color: el.textColor, border: "none", borderRadius: el.borderRadius, fontSize: el.fontSize, padding: `${el.paddingY}px ${el.paddingX}px`, fontWeight: 600, cursor: "pointer" }}>
        {el.text}
      </button>
    </div>
  );
}

export function DividerRenderer({ el }) {
  return (
    <div style={{ margin: `${el.marginY}px 0`, display: "flex", justifyContent: "center" }}>
      <hr style={{ width: `${el.width}%`, border: "none", borderTop: `${el.thickness}px ${el.style} ${el.color}`, margin: 0 }} />
    </div>
  );
}

export function SpacerRenderer({ el }) {
  return <div style={{ height: el.height }} />;
}

export function VideoRenderer({ el }) {
  return (
    <div style={{ position: "relative", aspectRatio: el.aspectRatio, borderRadius: 10, overflow: "hidden" }}>
      <iframe src={el.url} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }} allow="autoplay; encrypted-media" allowFullScreen title="Video" />
    </div>
  );
}

export function SliderRenderer({ el }) {
  const [cur, setCur] = useState(0);
  const n = el.slides.length;
  return (
    <div style={{ position: "relative", borderRadius: el.borderRadius, overflow: "hidden", userSelect: "none" }}>
      <img src={el.slides[cur].src} alt={el.slides[cur].caption} style={{ width: "100%", display: "block", maxHeight: 380, objectFit: "cover" }} />
      {el.showCaptions && el.slides[cur].caption && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.6))", color: "#fff", padding: "20px 16px 12px", fontSize: 14, fontWeight: 600 }}>{el.slides[cur].caption}</div>
      )}
      <button onClick={() => setCur((cur - 1 + n) % n)} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18 }}>‹</button>
      <button onClick={() => setCur((cur + 1) % n)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18 }}>›</button>
      <div style={{ position: "absolute", bottom: 8, right: 12, display: "flex", gap: 5 }}>
        {el.slides.map((_, i) => <div key={i} onClick={() => setCur(i)} style={{ width: 7, height: 7, borderRadius: "50%", background: i === cur ? "#fff" : "rgba(255,255,255,0.4)", cursor: "pointer" }} />)}
      </div>
    </div>
  );
}

export function TestimonialRenderer({ el }) {
  return (
    <div style={{ background: "#f8f7ff", border: `1.5px solid ${el.accentColor}22`, borderRadius: 12, padding: 24 }}>
      <div style={{ fontSize: 32, color: el.accentColor, marginBottom: 10, lineHeight: 1 }}>❝</div>
      <p style={{ margin: "0 0 18px", color: "#333", fontSize: 15, lineHeight: 1.75, fontStyle: "italic" }}>{el.quote}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: el.accentColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{el.avatarInitials}</div>
        <div>
          <div style={{ fontWeight: 700, color: "#111", fontSize: 14 }}>{el.name}</div>
          <div style={{ color: "#888", fontSize: 12 }}>{el.role}</div>
        </div>
      </div>
    </div>
  );
}

export function IconBoxRenderer({ el }) {
  return (
    <div style={{ textAlign: el.align, padding: "8px 0" }}>
      <div style={{ fontSize: 36, marginBottom: 10 }}>{el.icon}</div>
      <div style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 7 }}>{el.title}</div>
      <div style={{ color: "#666", fontSize: 13, lineHeight: 1.7 }}>{el.text}</div>
    </div>
  );
}

export function ColumnsRenderer({ el, renderEl }) {
  const split = el.split === "30/70" ? ["30%","70%"] : el.split === "70/30" ? ["70%","30%"] : ["50%","50%"];
  return (
    <div style={{ display: "flex", gap: el.gap }}>
      {(el.children || [[], []]).map((col, ci) => (
        <div key={ci} style={{ width: split[ci], minWidth: 0 }}>
          {col.map((child) => renderEl ? renderEl(child) : null)}
        </div>
      ))}
    </div>
  );
}

export const RENDERERS = {
  heading:     HeadingRenderer,
  text:        TextRenderer,
  image:       ImageRenderer,
  button:      ButtonRenderer,
  divider:     DividerRenderer,
  spacer:      SpacerRenderer,
  video:       VideoRenderer,
  slider:      SliderRenderer,
  testimonial: TestimonialRenderer,
  iconbox:     IconBoxRenderer,
  columns:     ColumnsRenderer,
};
