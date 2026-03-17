import Field from "../ui/Field";
import SelectInput from "../ui/SelectInput";
import NumberInput from "../ui/NumberInput";
import ColorInput from "../ui/ColorInput";
import { row } from "../../styles/common";

/**
 * SectionSettings
 * Property editor for a section's background, padding, and max-width.
 */
export default function SectionSettings({ section, onChange }) {
  return (
    <>
      <Field label="Background Color">
        <ColorInput
          value={section.bg}
          onChange={(v) => onChange({ ...section, bg: v })}
        />
      </Field>

      <div style={row}>
        <Field label="Pad Top" half>
          <NumberInput
            value={section.paddingTop}
            onChange={(v) => onChange({ ...section, paddingTop: v })}
            min={0}
            max={200}
          />
        </Field>
        <Field label="Pad Bottom" half>
          <NumberInput
            value={section.paddingBottom}
            onChange={(v) => onChange({ ...section, paddingBottom: v })}
            min={0}
            max={200}
          />
        </Field>
      </div>

      <div style={row}>
        <Field label="Pad Left" half>
          <NumberInput
            value={section.paddingLeft}
            onChange={(v) => onChange({ ...section, paddingLeft: v })}
            min={0}
            max={200}
          />
        </Field>
        <Field label="Pad Right" half>
          <NumberInput
            value={section.paddingRight}
            onChange={(v) => onChange({ ...section, paddingRight: v })}
            min={0}
            max={200}
          />
        </Field>
      </div>

      <Field label="Max Width">
        <SelectInput
          value={section.maxWidth}
          onChange={(v) => onChange({ ...section, maxWidth: v })}
          options={[
            ["100%", "Full Width"],
            ["1200px", "Wide (1200px)"],
            ["900px", "Normal (900px)"],
            ["680px", "Narrow (680px)"],
          ]}
        />
      </Field>
    </>
  );
}
