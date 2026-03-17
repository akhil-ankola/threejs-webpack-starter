import { inp } from "../../styles/common";

// Sel — styled <select> for editor panels
// options: array of [value, label] tuples
export default function SelectInput({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...inp, cursor: "pointer" }}
    >
      {options.map(([v, l]) => (
        <option key={v} value={v}>
          {l}
        </option>
      ))}
    </select>
  );
}
