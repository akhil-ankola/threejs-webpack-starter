import Field from "../ui/Field";
import SelectInput from "../ui/SelectInput";
import NumberInput from "../ui/NumberInput";
import ColorInput from "../ui/ColorInput";
import { row } from "../../styles/common";

/**
 * SectionSettings — used for custom sections.
 * Reads/writes section.config (not top-level props).
 */
export default function SectionSettings({ section, onChange }) {
  const c = section.config || {};
  const sc = (key, val) => onChange({ ...section, config: { ...c, [key]: val } });

  return (
    <>
      <Field label="Background Color">
        <ColorInput value={c.bg || "#ffffff"} onChange={(v) => sc("bg", v)} />
      </Field>
      <div style={row}>
        <Field label="Pad Top" half>
          <NumberInput value={c.paddingTop ?? 48} onChange={(v) => sc("paddingTop", v)} min={0} max={200} />
        </Field>
        <Field label="Pad Bottom" half>
          <NumberInput value={c.paddingBottom ?? 48} onChange={(v) => sc("paddingBottom", v)} min={0} max={200} />
        </Field>
      </div>
      <div style={row}>
        <Field label="Pad Left" half>
          <NumberInput value={c.paddingLeft ?? 32} onChange={(v) => sc("paddingLeft", v)} min={0} max={200} />
        </Field>
        <Field label="Pad Right" half>
          <NumberInput value={c.paddingRight ?? 32} onChange={(v) => sc("paddingRight", v)} min={0} max={200} />
        </Field>
      </div>
      <Field label="Max Width">
        <SelectInput
          value={c.maxWidth || "900px"}
          onChange={(v) => sc("maxWidth", v)}
          options={[["100%","Full Width"],["1200px","Wide (1200px)"],["900px","Normal (900px)"],["680px","Narrow (680px)"]]}
        />
      </Field>
    </>
  );
}
