import Field from "../ui/Field";
import SelectInput from "../ui/SelectInput";
import ColorInput from "../ui/ColorInput";
import NumberInput from "../ui/NumberInput";
import { inp, ta, row } from "../../styles/common";

export default function ZigZagEditor({ section, onChange }) {
  const p = section.props;
  const c = section.config;
  const sc = (key, val) => onChange({ ...section, config: { ...c, [key]: val } });

  const updateRow = (i, key, val) => {
    const rows = p.rows.map((r, ri) => (ri === i ? { ...r, [key]: val } : r));
    onChange({ ...section, props: { ...p, rows } });
  };

  const addRow = () => {
    const rows = [
      ...p.rows,
      {
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=80",
        heading: "New Row Heading",
        text: "Add your content here.",
        ctaText: "Learn More",
        ctaUrl: "#",
        layout: p.rows.length % 2 === 0 ? "left" : "right",
      },
    ];
    onChange({ ...section, props: { ...p, rows } });
  };

  const removeRow = (i) => {
    if (p.rows.length <= 1) return;
    const rows = p.rows.filter((_, ri) => ri !== i);
    onChange({ ...section, props: { ...p, rows } });
  };

  return (
    <>
      {/* Rows */}
      {p.rows.map((r, i) => (
        <div key={i} style={{ background: "#f8f8fb", borderRadius: 10, padding: 12, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 1 }}>Row {i + 1}</span>
            <button onClick={() => removeRow(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: 13 }}>✕</button>
          </div>
          <Field label="Image URL">
            <input style={inp} value={r.image} onChange={(e) => updateRow(i, "image", e.target.value)} />
          </Field>
          <Field label="Heading">
            <input style={inp} value={r.heading} onChange={(e) => updateRow(i, "heading", e.target.value)} />
          </Field>
          <Field label="Text">
            <textarea style={ta} value={r.text} onChange={(e) => updateRow(i, "text", e.target.value)} />
          </Field>
          <div style={row}>
            <Field label="CTA Text" half>
              <input style={inp} value={r.ctaText} onChange={(e) => updateRow(i, "ctaText", e.target.value)} />
            </Field>
            <Field label="Layout" half>
              <SelectInput value={r.layout} onChange={(v) => updateRow(i, "layout", v)} options={[["left", "Img Left"], ["right", "Img Right"]]} />
            </Field>
          </div>
        </div>
      ))}

      <button onClick={addRow} style={addBtn}>+ Add Row</button>

      <div style={sectionLabel}>Style</div>
      <div style={row}>
        <Field label="Background" half><ColorInput value={c.bg} onChange={(v) => sc("bg", v)} /></Field>
        <Field label="Accent" half><ColorInput value={c.accentColor} onChange={(v) => sc("accentColor", v)} /></Field>
      </div>
      <div style={row}>
        <Field label="Pad Top" half><NumberInput value={c.paddingTop} onChange={(v) => sc("paddingTop", v)} min={0} max={200} /></Field>
        <Field label="Pad Bottom" half><NumberInput value={c.paddingBottom} onChange={(v) => sc("paddingBottom", v)} min={0} max={200} /></Field>
      </div>
      <Field label="Max Width">
        <SelectInput value={c.maxWidth} onChange={(v) => sc("maxWidth", v)} options={[["100%", "Full Width"], ["1200px", "1200px"], ["1000px", "1000px"], ["900px", "900px"], ["760px", "760px"]]} />
      </Field>
    </>
  );
}

const sectionLabel = { fontSize: 9, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 1.2, marginTop: 14, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #f0f0f0" };
const addBtn = { width: "100%", padding: "8px 0", background: "#f3f0ff", border: "1.5px dashed #c4b5fd", borderRadius: 8, color: "#6d28d9", fontWeight: 600, fontSize: 12, cursor: "pointer", marginBottom: 14 };
