import Field from "../ui/Field";
import SelectInput from "../ui/SelectInput";
import ColorInput from "../ui/ColorInput";
import NumberInput from "../ui/NumberInput";
import { inp, row } from "../../styles/common";

export default function GalleryEditor({ section, onChange }) {
  const p = section.props;
  const c = section.config;
  const sp = (key, val) => onChange({ ...section, props: { ...p, [key]: val } });
  const sc = (key, val) => onChange({ ...section, config: { ...c, [key]: val } });

  const updateImage = (i, key, val) => {
    const images = p.images.map((img, ii) => (ii === i ? { ...img, [key]: val } : img));
    sp("images", images);
  };

  const addImage = () =>
    sp("images", [
      ...p.images,
      { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", alt: "New image", caption: "" },
    ]);

  const removeImage = (i) => {
    if (p.images.length <= 1) return;
    sp("images", p.images.filter((_, ii) => ii !== i));
  };

  return (
    <>
      <Field label="Section Heading">
        <input style={inp} value={p.heading} onChange={(e) => sp("heading", e.target.value)} />
      </Field>
      <Field label="Subheading">
        <input style={inp} value={p.subheading} onChange={(e) => sp("subheading", e.target.value)} />
      </Field>
      <div style={row}>
        <Field label="Columns" half>
          <SelectInput value={String(p.columns || 3)} onChange={(v) => sp("columns", Number(v))} options={[["2", "2"], ["3", "3"], ["4", "4"]]} />
        </Field>
        <Field label="Show Captions" half>
          <SelectInput value={p.showCaptions ? "yes" : "no"} onChange={(v) => sp("showCaptions", v === "yes")} options={[["yes", "Yes"], ["no", "No"]]} />
        </Field>
      </div>

      <div style={sectionLabel}>Images</div>

      {p.images.map((img, i) => (
        <div key={i} style={{ background: "#f8f8fb", borderRadius: 10, padding: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 1 }}>Image {i + 1}</span>
            <button onClick={() => removeImage(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: 13 }}>✕</button>
          </div>
          <Field label="Image URL">
            <input style={inp} value={img.src} onChange={(e) => updateImage(i, "src", e.target.value)} />
          </Field>
          <div style={row}>
            <Field label="Alt Text" half>
              <input style={inp} value={img.alt} onChange={(e) => updateImage(i, "alt", e.target.value)} />
            </Field>
            <Field label="Caption" half>
              <input style={inp} value={img.caption} onChange={(e) => updateImage(i, "caption", e.target.value)} />
            </Field>
          </div>
        </div>
      ))}

      <button onClick={addImage} style={addBtn}>+ Add Image</button>

      <div style={sectionLabel}>Style</div>
      <div style={row}>
        <Field label="Background" half><ColorInput value={c.bg} onChange={(v) => sc("bg", v)} /></Field>
        <Field label="Gap (px)" half><NumberInput value={c.gap || 12} onChange={(v) => sc("gap", v)} min={0} max={48} /></Field>
      </div>
      <div style={row}>
        <Field label="Pad Top" half><NumberInput value={c.paddingTop} onChange={(v) => sc("paddingTop", v)} min={0} max={200} /></Field>
        <Field label="Pad Bottom" half><NumberInput value={c.paddingBottom} onChange={(v) => sc("paddingBottom", v)} min={0} max={200} /></Field>
      </div>
    </>
  );
}

const sectionLabel = { fontSize: 9, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 1.2, marginTop: 14, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #f0f0f0" };
const addBtn = { width: "100%", padding: "8px 0", background: "#f3f0ff", border: "1.5px dashed #c4b5fd", borderRadius: 8, color: "#6d28d9", fontWeight: 600, fontSize: 12, cursor: "pointer", marginBottom: 14 };
