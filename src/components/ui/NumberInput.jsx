import { inp } from "../../styles/common";

// Num — styled number input for editor panels
export default function NumberInput({
  value,
  onChange,
  min = 0,
  max = 9999,
  step = 1,
}) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      style={inp}
    />
  );
}
