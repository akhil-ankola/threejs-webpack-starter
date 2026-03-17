import Field from "../ui/Field";
import SelectInput from "../ui/SelectInput";
import ColorInput from "../ui/ColorInput";
import NumberInput from "../ui/NumberInput";
import { inp, ta, row } from "../../styles/common";

export default function HeroEditor({ section, onChange }) {
  const p = section.props;
  const c = section.config;
  const sp = (key, val) => onChange({ ...section, props: { ...p, [key]: val } });
  const sc = (key, val) => onChange({ ...section, config: { ...c, [key]: val } });

  return (
    <>
      {/* ── Content ── */}
      <div style={sectionLabel}>Content</div>

      <Field label="Headline">
        <textarea style={ta} value={p.heading} onChange={(e) => sp("heading", e.target.value)} />
      </Field>
      <Field label="Subtext">
        <textarea style={{ ...ta, minHeight: 80 }} value={p.subtext} onChange={(e) => sp("subtext", e.target.value)} />
      </Field>

      <div style={row}>
        <Field label="CTA Text" half>
          <input style={inp} value={p.ctaText} onChange={(e) => sp("ctaText", e.target.value)} />
        </Field>
        <Field label="CTA URL" half>
          <input style={inp} value={p.ctaUrl} onChange={(e) => sp("ctaUrl", e.target.value)} />
        </Field>
      </div>

      <div style={row}>
        <Field label="2nd CTA Text" half>
          <input style={inp} value={p.ctaSecondaryText || ""} onChange={(e) => sp("ctaSecondaryText", e.target.value)} />
        </Field>
        <Field label="2nd CTA URL" half>
          <input style={inp} value={p.ctaSecondaryUrl || ""} onChange={(e) => sp("ctaSecondaryUrl", e.target.value)} />
        </Field>
      </div>

      {/* ── Layout ── */}
      <div style={sectionLabel}>Layout</div>

      <div style={row}>
        <Field label="Text Align" half>
          <SelectInput value={p.layout} onChange={(v) => sp("layout", v)} options={[["left", "Left"], ["center", "Center"]]} />
        </Field>
        <Field label="Image Position" half>
          <SelectInput value={p.imagePosition} onChange={(v) => sp("imagePosition", v)} options={[["right", "Right Split"], ["background", "Background"], ["none", "No Image"]]} />
        </Field>
      </div>

      {p.imagePosition !== "none" && (
        <Field label="Image URL">
          <input style={inp} value={p.image} onChange={(e) => sp("image", e.target.value)} />
        </Field>
      )}

      {/* ── Style ── */}
      <div style={sectionLabel}>Style</div>

      <div style={row}>
        <Field label="Background" half><ColorInput value={c.bg} onChange={(v) => sc("bg", v)} /></Field>
        <Field label="Accent" half><ColorInput value={c.accentColor} onChange={(v) => sc("accentColor", v)} /></Field>
      </div>
      <div style={row}>
        <Field label="Heading Color" half><ColorInput value={c.headingColor} onChange={(v) => sc("headingColor", v)} /></Field>
        <Field label="Text Color" half><ColorInput value={c.textColor} onChange={(v) => sc("textColor", v)} /></Field>
      </div>

      {/* ── Spacing ── */}
      <div style={sectionLabel}>Spacing</div>
      <div style={row}>
        <Field label="Pad Top" half><NumberInput value={c.paddingTop} onChange={(v) => sc("paddingTop", v)} min={0} max={240} /></Field>
        <Field label="Pad Bottom" half><NumberInput value={c.paddingBottom} onChange={(v) => sc("paddingBottom", v)} min={0} max={240} /></Field>
      </div>
      <Field label="Max Width">
        <SelectInput value={c.maxWidth} onChange={(v) => sc("maxWidth", v)} options={[["100%", "Full Width"], ["1200px", "Wide (1200px)"], ["1100px", "1100px"], ["900px", "Normal (900px)"], ["760px", "Narrow (760px)"]]} />
      </Field>
    </>
  );
}

const sectionLabel = {
  fontSize: 9,
  fontWeight: 700,
  color: "#aaa",
  textTransform: "uppercase",
  letterSpacing: 1.2,
  marginTop: 14,
  marginBottom: 10,
  paddingBottom: 6,
  borderBottom: "1px solid #f0f0f0",
};
