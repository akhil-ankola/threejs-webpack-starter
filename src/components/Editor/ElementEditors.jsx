import { Field, FieldRow, TextInput, Textarea, NumberInput, ColorInput, Select } from "../shared/FormFields";

const u = (el, onChange) => (key, val) => onChange({ ...el, [key]: val });

export function HeadingEditor({ el, onChange }) {
  const set = u(el, onChange);
  return (<>
    <Field label="Text"><Textarea value={el.text} onChange={(v) => set("text", v)} /></Field>
    <FieldRow><Field label="Tag" half><Select value={el.tag} onChange={(v) => set("tag", v)} options={[["h1","H1"],["h2","H2"],["h3","H3"],["h4","H4"],["p","p"]]} /></Field><Field label="Align" half><Select value={el.align} onChange={(v) => set("align", v)} options={[["left","Left"],["center","Center"],["right","Right"]]} /></Field></FieldRow>
    <FieldRow><Field label="Size px" half><NumberInput value={el.fontSize} onChange={(v) => set("fontSize", v)} min={10} max={120} /></Field><Field label="Weight" half><Select value={el.fontWeight} onChange={(v) => set("fontWeight", Number(v))} options={[["400","Regular"],["600","Semi"],["700","Bold"],["800","Extra"]]} /></Field></FieldRow>
    <Field label="Color"><ColorInput value={el.color} onChange={(v) => set("color", v)} /></Field>
  </>);
}

export function TextEditor({ el, onChange }) {
  const set = u(el, onChange);
  return (<>
    <Field label="Content"><Textarea value={el.text} onChange={(v) => set("text", v)} minHeight={100} /></Field>
    <FieldRow><Field label="Size px" half><NumberInput value={el.fontSize} onChange={(v) => set("fontSize", v)} min={10} max={60} /></Field><Field label="Align" half><Select value={el.align} onChange={(v) => set("align", v)} options={[["left","Left"],["center","Center"],["right","Right"]]} /></Field></FieldRow>
    <FieldRow><Field label="Line Height" half><NumberInput value={el.lineHeight} onChange={(v) => set("lineHeight", v)} min={1} max={3} step={0.05} /></Field><Field label="Color" half><ColorInput value={el.color} onChange={(v) => set("color", v)} /></Field></FieldRow>
  </>);
}

export function ImageEditor({ el, onChange }) {
  const set = u(el, onChange);
  return (<>
    <Field label="Image URL"><TextInput value={el.src} onChange={(v) => set("src", v)} /></Field>
    <Field label="Alt Text"><TextInput value={el.alt} onChange={(v) => set("alt", v)} /></Field>
    <FieldRow><Field label="Width %" half><NumberInput value={el.width} onChange={(v) => set("width", v)} min={10} max={100} /></Field><Field label="Radius px" half><NumberInput value={el.borderRadius} onChange={(v) => set("borderRadius", v)} min={0} max={100} /></Field></FieldRow>
    <Field label="Align"><Select value={el.align} onChange={(v) => set("align", v)} options={[["left","Left"],["center","Center"],["right","Right"]]} /></Field>
  </>);
}

export function ButtonEditor({ el, onChange }) {
  const set = u(el, onChange);
  return (<>
    <Field label="Button Text"><TextInput value={el.text} onChange={(v) => set("text", v)} /></Field>
    <Field label="Link URL"><TextInput value={el.url} onChange={(v) => set("url", v)} /></Field>
    <Field label="Align"><Select value={el.align} onChange={(v) => set("align", v)} options={[["left","Left"],["center","Center"],["right","Right"]]} /></Field>
    <FieldRow><Field label="BG Color" half><ColorInput value={el.bgColor} onChange={(v) => set("bgColor", v)} /></Field><Field label="Text Color" half><ColorInput value={el.textColor} onChange={(v) => set("textColor", v)} /></Field></FieldRow>
    <FieldRow><Field label="Font Size" half><NumberInput value={el.fontSize} onChange={(v) => set("fontSize", v)} min={10} max={36} /></Field><Field label="Radius" half><NumberInput value={el.borderRadius} onChange={(v) => set("borderRadius", v)} min={0} max={60} /></Field></FieldRow>
    <FieldRow><Field label="Pad X" half><NumberInput value={el.paddingX} onChange={(v) => set("paddingX", v)} min={4} max={80} /></Field><Field label="Pad Y" half><NumberInput value={el.paddingY} onChange={(v) => set("paddingY", v)} min={4} max={40} /></Field></FieldRow>
  </>);
}

export function DividerEditor({ el, onChange }) {
  const set = u(el, onChange);
  return (<>
    <FieldRow><Field label="Thickness" half><NumberInput value={el.thickness} onChange={(v) => set("thickness", v)} min={1} max={20} /></Field><Field label="Width %" half><NumberInput value={el.width} onChange={(v) => set("width", v)} min={10} max={100} /></Field></FieldRow>
    <FieldRow><Field label="Style" half><Select value={el.style} onChange={(v) => set("style", v)} options={[["solid","Solid"],["dashed","Dashed"],["dotted","Dotted"]]} /></Field><Field label="Color" half><ColorInput value={el.color} onChange={(v) => set("color", v)} /></Field></FieldRow>
    <Field label="Margin Y px"><NumberInput value={el.marginY} onChange={(v) => set("marginY", v)} min={0} max={80} /></Field>
  </>);
}

export function SpacerEditor({ el, onChange }) {
  return <Field label="Height px"><NumberInput value={el.height} onChange={(v) => onChange({ ...el, height: v })} min={8} max={400} /></Field>;
}

export function VideoEditor({ el, onChange }) {
  const set = u(el, onChange);
  return (<>
    <Field label="Embed URL"><TextInput value={el.url} onChange={(v) => set("url", v)} /></Field>
    <Field label="Aspect Ratio"><Select value={el.aspectRatio} onChange={(v) => set("aspectRatio", v)} options={[["16/9","16:9"],["4/3","4:3"],["1/1","1:1"]]} /></Field>
  </>);
}

export function SliderEditor({ el, onChange }) {
  const set = u(el, onChange);
  const updSlide = (i, key, val) => { const s = [...el.slides]; s[i] = { ...s[i], [key]: val }; onChange({ ...el, slides: s }); };
  return (<>
    <Field label="Show Captions"><Select value={el.showCaptions ? "yes" : "no"} onChange={(v) => set("showCaptions", v === "yes")} options={[["yes","Yes"],["no","No"]]} /></Field>
    <Field label="Border Radius"><NumberInput value={el.borderRadius} onChange={(v) => set("borderRadius", v)} min={0} max={40} /></Field>
    {el.slides.map((s, i) => (
      <div key={i} style={{ background: "#f8f8fb", borderRadius: 8, padding: 10, marginBottom: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#aaa", textTransform: "uppercase", marginBottom: 8 }}>Slide {i + 1}</div>
        <Field label="Image URL"><TextInput value={s.src} onChange={(v) => updSlide(i, "src", v)} /></Field>
        <Field label="Caption"><TextInput value={s.caption} onChange={(v) => updSlide(i, "caption", v)} /></Field>
      </div>
    ))}
  </>);
}

export function TestimonialEditor({ el, onChange }) {
  const set = u(el, onChange);
  return (<>
    <Field label="Quote"><Textarea value={el.quote} onChange={(v) => set("quote", v)} /></Field>
    <FieldRow><Field label="Name" half><TextInput value={el.name} onChange={(v) => set("name", v)} /></Field><Field label="Initials" half><TextInput value={el.avatarInitials} onChange={(v) => set("avatarInitials", v)} /></Field></FieldRow>
    <Field label="Role"><TextInput value={el.role} onChange={(v) => set("role", v)} /></Field>
    <Field label="Accent Color"><ColorInput value={el.accentColor} onChange={(v) => set("accentColor", v)} /></Field>
  </>);
}

export function IconBoxEditor({ el, onChange }) {
  const set = u(el, onChange);
  return (<>
    <Field label="Icon (emoji)"><TextInput value={el.icon} onChange={(v) => set("icon", v)} /></Field>
    <Field label="Title"><TextInput value={el.title} onChange={(v) => set("title", v)} /></Field>
    <Field label="Description"><Textarea value={el.text} onChange={(v) => set("text", v)} /></Field>
    <FieldRow><Field label="Align" half><Select value={el.align} onChange={(v) => set("align", v)} options={[["left","Left"],["center","Center"],["right","Right"]]} /></Field><Field label="Accent" half><ColorInput value={el.accentColor} onChange={(v) => set("accentColor", v)} /></Field></FieldRow>
  </>);
}

export function ColumnsEditor({ el, onChange }) {
  const set = u(el, onChange);
  return (<>
    <Field label="Column Split"><Select value={el.split} onChange={(v) => set("split", v)} options={[["50/50","50 / 50"],["30/70","30 / 70"],["70/30","70 / 30"]]} /></Field>
    <Field label="Gap px"><NumberInput value={el.gap} onChange={(v) => set("gap", v)} min={0} max={80} /></Field>
    <div style={{ fontSize: 11, color: "#aaa", background: "#f8f8fb", borderRadius: 7, padding: "8px 10px" }}>Click "+ Add" inside each column on the canvas to add elements.</div>
  </>);
}

export function SectionEditor({ section, onChange }) {
  const set = (key, val) => onChange({ ...section, [key]: val });
  return (<>
    <Field label="Background"><ColorInput value={section.bg} onChange={(v) => set("bg", v)} /></Field>
    <FieldRow><Field label="Pad Top" half><NumberInput value={section.paddingTop} onChange={(v) => set("paddingTop", v)} min={0} max={200} /></Field><Field label="Pad Bottom" half><NumberInput value={section.paddingBottom} onChange={(v) => set("paddingBottom", v)} min={0} max={200} /></Field></FieldRow>
    <FieldRow><Field label="Pad Left" half><NumberInput value={section.paddingLeft} onChange={(v) => set("paddingLeft", v)} min={0} max={200} /></Field><Field label="Pad Right" half><NumberInput value={section.paddingRight} onChange={(v) => set("paddingRight", v)} min={0} max={200} /></Field></FieldRow>
    <Field label="Max Width"><Select value={section.maxWidth} onChange={(v) => set("maxWidth", v)} options={[["100%","Full Width"],["1200px","Wide 1200px"],["900px","Normal 900px"],["680px","Narrow 680px"]]} /></Field>
  </>);
}

export const ELEMENT_EDITORS = { heading: HeadingEditor, text: TextEditor, image: ImageEditor, button: ButtonEditor, divider: DividerEditor, spacer: SpacerEditor, video: VideoEditor, slider: SliderEditor, testimonial: TestimonialEditor, iconbox: IconBoxEditor, columns: ColumnsEditor };
