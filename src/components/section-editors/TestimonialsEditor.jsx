import Field from "../ui/Field";
import SelectInput from "../ui/SelectInput";
import ColorInput from "../ui/ColorInput";
import NumberInput from "../ui/NumberInput";
import { inp, ta, row } from "../../styles/common";

export default function TestimonialsEditor({ section, onChange }) {
  const p = section.props;
  const c = section.config;
  const sp = (key, val) => onChange({ ...section, props: { ...p, [key]: val } });
  const sc = (key, val) => onChange({ ...section, config: { ...c, [key]: val } });

  const updateItem = (i, key, val) => {
    const items = p.items.map((it, ii) => (ii === i ? { ...it, [key]: val } : it));
    sp("items", items);
  };

  const addItem = () =>
    sp("items", [
      ...p.items,
      { quote: "A great testimonial from a happy customer.", name: "New Client", role: "Role, Company", avatarInitials: "NC" },
    ]);

  const removeItem = (i) => {
    if (p.items.length <= 1) return;
    sp("items", p.items.filter((_, ii) => ii !== i));
  };

  return (
    <>
      <Field label="Section Heading">
        <input style={inp} value={p.heading} onChange={(e) => sp("heading", e.target.value)} />
      </Field>
      <Field label="Subheading">
        <input style={inp} value={p.subheading} onChange={(e) => sp("subheading", e.target.value)} />
      </Field>
      <Field label="Layout">
        <SelectInput value={p.layout} onChange={(v) => sp("layout", v)} options={[["grid", "Grid"], ["list", "List (centered)"]]} />
      </Field>

      <div style={sectionLabel}>Testimonials</div>

      {p.items.map((item, i) => (
        <div key={i} style={{ background: "#f8f8fb", borderRadius: 10, padding: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 1 }}>#{i + 1}</span>
            <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: 13 }}>✕</button>
          </div>
          <Field label="Quote">
            <textarea style={ta} value={item.quote} onChange={(e) => updateItem(i, "quote", e.target.value)} />
          </Field>
          <div style={row}>
            <Field label="Name" half>
              <input style={inp} value={item.name} onChange={(e) => updateItem(i, "name", e.target.value)} />
            </Field>
            <Field label="Initials" half>
              <input style={inp} value={item.avatarInitials} onChange={(e) => updateItem(i, "avatarInitials", e.target.value)} />
            </Field>
          </div>
          <Field label="Role / Company">
            <input style={inp} value={item.role} onChange={(e) => updateItem(i, "role", e.target.value)} />
          </Field>
        </div>
      ))}

      <button onClick={addItem} style={addBtn}>+ Add Testimonial</button>

      <div style={sectionLabel}>Style</div>
      <div style={row}>
        <Field label="Background" half><ColorInput value={c.bg} onChange={(v) => sc("bg", v)} /></Field>
        <Field label="Accent" half><ColorInput value={c.accentColor} onChange={(v) => sc("accentColor", v)} /></Field>
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
