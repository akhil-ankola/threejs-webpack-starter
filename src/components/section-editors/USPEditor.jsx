import Field from "../ui/Field";
import SelectInput from "../ui/SelectInput";
import ColorInput from "../ui/ColorInput";
import NumberInput from "../ui/NumberInput";
import { inp, ta, row } from "../../styles/common";

export default function USPEditor({ section, onChange }) {
  const p = section.props;
  const c = section.config;
  const sp = (key, val) => onChange({ ...section, props: { ...p, [key]: val } });
  const sc = (key, val) => onChange({ ...section, config: { ...c, [key]: val } });

  const updateItem = (i, key, val) => {
    const items = p.items.map((it, ii) => (ii === i ? { ...it, [key]: val } : it));
    sp("items", items);
  };

  const addItem = () =>
    sp("items", [...p.items, { icon: "✦", title: "New Feature", text: "Describe this feature here." }]);

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
        <textarea style={ta} value={p.subheading} onChange={(e) => sp("subheading", e.target.value)} />
      </Field>
      <Field label="Columns">
        <SelectInput value={String(p.columns || 3)} onChange={(v) => sp("columns", Number(v))} options={[["2", "2 Columns"], ["3", "3 Columns"], ["4", "4 Columns"]]} />
      </Field>

      <div style={sectionLabel}>Feature Items</div>

      {p.items.map((item, i) => (
        <div key={i} style={{ background: "#f8f8fb", borderRadius: 10, padding: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 1 }}>Item {i + 1}</span>
            <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: 13 }}>✕</button>
          </div>
          <div style={row}>
            <Field label="Icon" half>
              <input style={inp} value={item.icon} onChange={(e) => updateItem(i, "icon", e.target.value)} />
            </Field>
            <Field label="Title" half>
              <input style={inp} value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} />
            </Field>
          </div>
          <Field label="Description">
            <textarea style={ta} value={item.text} onChange={(e) => updateItem(i, "text", e.target.value)} />
          </Field>
        </div>
      ))}

      <button onClick={addItem} style={addBtn}>+ Add Item</button>

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
