import Field from "../ui/Field";
import SelectInput from "../ui/SelectInput";
import NumberInput from "../ui/NumberInput";
import ColorInput from "../ui/ColorInput";
import { inp, ta, row } from "../../styles/common";

// ─────────────────────────────────────────────────────────────
// EDITORS
// Each editor receives:
//   el  — the current element object
//   oc  — onChange callback; call with the full updated element
// ─────────────────────────────────────────────────────────────

export function EdHeading({ el, oc }) {
  return (
    <>
      <Field label="Text">
        <textarea style={ta} value={el.text} onChange={(e) => oc({ ...el, text: e.target.value })} />
      </Field>
      <div style={row}>
        <Field label="Tag" half>
          <SelectInput value={el.tag} onChange={(v) => oc({ ...el, tag: v })} options={[["h1","H1"],["h2","H2"],["h3","H3"],["h4","H4"],["p","p"]]} />
        </Field>
        <Field label="Align" half>
          <SelectInput value={el.align} onChange={(v) => oc({ ...el, align: v })} options={[["left","Left"],["center","Center"],["right","Right"]]} />
        </Field>
      </div>
      <div style={row}>
        <Field label="Size (px)" half>
          <NumberInput value={el.fontSize} onChange={(v) => oc({ ...el, fontSize: v })} min={10} max={120} />
        </Field>
        <Field label="Weight" half>
          <SelectInput value={el.fontWeight} onChange={(v) => oc({ ...el, fontWeight: Number(v) })} options={[["400","Regular"],["600","Semi"],["700","Bold"],["800","Extra"]]} />
        </Field>
      </div>
      <Field label="Color">
        <ColorInput value={el.color} onChange={(v) => oc({ ...el, color: v })} />
      </Field>
    </>
  );
}

export function EdText({ el, oc }) {
  return (
    <>
      <Field label="Content">
        <textarea style={{ ...ta, minHeight: 100 }} value={el.text} onChange={(e) => oc({ ...el, text: e.target.value })} />
      </Field>
      <div style={row}>
        <Field label="Size (px)" half>
          <NumberInput value={el.fontSize} onChange={(v) => oc({ ...el, fontSize: v })} min={10} max={60} />
        </Field>
        <Field label="Align" half>
          <SelectInput value={el.align} onChange={(v) => oc({ ...el, align: v })} options={[["left","Left"],["center","Center"],["right","Right"]]} />
        </Field>
      </div>
      <div style={row}>
        <Field label="Line Height" half>
          <NumberInput value={el.lineHeight} onChange={(v) => oc({ ...el, lineHeight: v })} min={1} max={3} step={0.05} />
        </Field>
        <Field label="Color" half>
          <ColorInput value={el.color} onChange={(v) => oc({ ...el, color: v })} />
        </Field>
      </div>
    </>
  );
}

export function EdImage({ el, oc }) {
  return (
    <>
      <Field label="Image URL">
        <input style={inp} value={el.src} onChange={(e) => oc({ ...el, src: e.target.value })} />
      </Field>
      <Field label="Alt Text">
        <input style={inp} value={el.alt} onChange={(e) => oc({ ...el, alt: e.target.value })} />
      </Field>
      <div style={row}>
        <Field label="Width %" half>
          <NumberInput value={el.width} onChange={(v) => oc({ ...el, width: v })} min={10} max={100} />
        </Field>
        <Field label="Radius (px)" half>
          <NumberInput value={el.borderRadius} onChange={(v) => oc({ ...el, borderRadius: v })} min={0} max={100} />
        </Field>
      </div>
      <Field label="Align">
        <SelectInput value={el.align} onChange={(v) => oc({ ...el, align: v })} options={[["left","Left"],["center","Center"],["right","Right"]]} />
      </Field>
    </>
  );
}

export function EdButton({ el, oc }) {
  return (
    <>
      <Field label="Button Text">
        <input style={inp} value={el.text} onChange={(e) => oc({ ...el, text: e.target.value })} />
      </Field>
      <Field label="Link URL">
        <input style={inp} value={el.url} onChange={(e) => oc({ ...el, url: e.target.value })} />
      </Field>
      <Field label="Align">
        <SelectInput value={el.align} onChange={(v) => oc({ ...el, align: v })} options={[["left","Left"],["center","Center"],["right","Right"]]} />
      </Field>
      <div style={row}>
        <Field label="BG Color" half>
          <ColorInput value={el.bgColor} onChange={(v) => oc({ ...el, bgColor: v })} />
        </Field>
        <Field label="Text Color" half>
          <ColorInput value={el.textColor} onChange={(v) => oc({ ...el, textColor: v })} />
        </Field>
      </div>
      <div style={row}>
        <Field label="Font Size" half>
          <NumberInput value={el.fontSize} onChange={(v) => oc({ ...el, fontSize: v })} min={10} max={36} />
        </Field>
        <Field label="Radius" half>
          <NumberInput value={el.borderRadius} onChange={(v) => oc({ ...el, borderRadius: v })} min={0} max={60} />
        </Field>
      </div>
      <div style={row}>
        <Field label="Pad X" half>
          <NumberInput value={el.paddingX} onChange={(v) => oc({ ...el, paddingX: v })} min={4} max={80} />
        </Field>
        <Field label="Pad Y" half>
          <NumberInput value={el.paddingY} onChange={(v) => oc({ ...el, paddingY: v })} min={4} max={40} />
        </Field>
      </div>
    </>
  );
}

export function EdDivider({ el, oc }) {
  return (
    <>
      <div style={row}>
        <Field label="Thickness" half>
          <NumberInput value={el.thickness} onChange={(v) => oc({ ...el, thickness: v })} min={1} max={20} />
        </Field>
        <Field label="Width %" half>
          <NumberInput value={el.width} onChange={(v) => oc({ ...el, width: v })} min={10} max={100} />
        </Field>
      </div>
      <div style={row}>
        <Field label="Style" half>
          <SelectInput value={el.style} onChange={(v) => oc({ ...el, style: v })} options={[["solid","Solid"],["dashed","Dashed"],["dotted","Dotted"]]} />
        </Field>
        <Field label="Color" half>
          <ColorInput value={el.color} onChange={(v) => oc({ ...el, color: v })} />
        </Field>
      </div>
      <Field label="Vertical Margin (px)">
        <NumberInput value={el.marginY} onChange={(v) => oc({ ...el, marginY: v })} min={0} max={80} />
      </Field>
    </>
  );
}

export function EdSpacer({ el, oc }) {
  return (
    <Field label="Height (px)">
      <NumberInput value={el.height} onChange={(v) => oc({ ...el, height: v })} min={8} max={400} />
    </Field>
  );
}

export function EdVideo({ el, oc }) {
  return (
    <>
      <Field label="Embed URL">
        <input style={inp} value={el.url} onChange={(e) => oc({ ...el, url: e.target.value })} />
      </Field>
      <Field label="Aspect Ratio">
        <SelectInput value={el.aspectRatio} onChange={(v) => oc({ ...el, aspectRatio: v })} options={[["16/9","16:9"],["4/3","4:3"],["1/1","1:1"]]} />
      </Field>
    </>
  );
}

export function EdSlider({ el, oc }) {
  const updSlide = (i, k, v) => {
    const s = [...el.slides];
    s[i] = { ...s[i], [k]: v };
    oc({ ...el, slides: s });
  };
  return (
    <>
      <Field label="Show Captions">
        <SelectInput value={el.showCaptions ? "yes" : "no"} onChange={(v) => oc({ ...el, showCaptions: v === "yes" })} options={[["yes","Yes"],["no","No"]]} />
      </Field>
      <Field label="Border Radius">
        <NumberInput value={el.borderRadius} onChange={(v) => oc({ ...el, borderRadius: v })} min={0} max={40} />
      </Field>
      {el.slides.map((s, i) => (
        <div key={i} style={{ background: "#f8f8fb", borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#aaa", textTransform: "uppercase", marginBottom: 8 }}>
            Slide {i + 1}
          </div>
          <Field label="Image URL">
            <input style={inp} value={s.src} onChange={(e) => updSlide(i, "src", e.target.value)} />
          </Field>
          <Field label="Caption">
            <input style={inp} value={s.caption} onChange={(e) => updSlide(i, "caption", e.target.value)} />
          </Field>
        </div>
      ))}
    </>
  );
}

export function EdTestimonial({ el, oc }) {
  return (
    <>
      <Field label="Quote">
        <textarea style={ta} value={el.quote} onChange={(e) => oc({ ...el, quote: e.target.value })} />
      </Field>
      <div style={row}>
        <Field label="Name" half>
          <input style={inp} value={el.name} onChange={(e) => oc({ ...el, name: e.target.value })} />
        </Field>
        <Field label="Initials" half>
          <input style={inp} value={el.avatarInitials} onChange={(e) => oc({ ...el, avatarInitials: e.target.value })} />
        </Field>
      </div>
      <Field label="Role / Company">
        <input style={inp} value={el.role} onChange={(e) => oc({ ...el, role: e.target.value })} />
      </Field>
      <Field label="Accent Color">
        <ColorInput value={el.accentColor} onChange={(v) => oc({ ...el, accentColor: v })} />
      </Field>
    </>
  );
}

export function EdIconBox({ el, oc }) {
  return (
    <>
      <Field label="Icon (emoji)">
        <input style={inp} value={el.icon} onChange={(e) => oc({ ...el, icon: e.target.value })} />
      </Field>
      <Field label="Title">
        <input style={inp} value={el.title} onChange={(e) => oc({ ...el, title: e.target.value })} />
      </Field>
      <Field label="Description">
        <textarea style={ta} value={el.text} onChange={(e) => oc({ ...el, text: e.target.value })} />
      </Field>
      <div style={row}>
        <Field label="Align" half>
          <SelectInput value={el.align} onChange={(v) => oc({ ...el, align: v })} options={[["left","Left"],["center","Center"],["right","Right"]]} />
        </Field>
        <Field label="Accent" half>
          <ColorInput value={el.accentColor} onChange={(v) => oc({ ...el, accentColor: v })} />
        </Field>
      </div>
    </>
  );
}

export function EdColumns({ el, oc }) {
  return (
    <>
      <Field label="Column Split">
        <SelectInput value={el.split} onChange={(v) => oc({ ...el, split: v })} options={[["50/50","50 / 50"],["30/70","30 / 70"],["70/30","70 / 30"]]} />
      </Field>
      <Field label="Gap (px)">
        <NumberInput value={el.gap} onChange={(v) => oc({ ...el, gap: v })} min={0} max={80} />
      </Field>
      <div style={{ fontSize: 11, color: "#aaa", background: "#f8f8fb", borderRadius: 7, padding: "8px 10px" }}>
        Add elements inside each column directly on the canvas by clicking the column's "+" button.
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// EDITOR REGISTRY
// Maps element type strings to their editor components.
// ─────────────────────────────────────────────────────────────
export const EDITORS = {
  heading: EdHeading,
  text: EdText,
  image: EdImage,
  button: EdButton,
  divider: EdDivider,
  spacer: EdSpacer,
  video: EdVideo,
  slider: EdSlider,
  testimonial: EdTestimonial,
  iconbox: EdIconBox,
  columns: EdColumns,
};
