/**
 * FrontendElementRenderer
 * ─────────────────────────────────────────────────────────────
 * Renders the element tree of a custom section on the public site.
 * Uses the same El* components as the editor canvas — no duplication.
 * The key difference: NO drag handles, selection outlines, or "+
 * Add Element" buttons.
 */

import {
  ElHeading,
  ElText,
  ElImage,
  ElButton,
  ElDivider,
  ElSpacer,
  ElVideo,
  ElSlider,
  ElTestimonial,
  ElIconBox,
} from "../elements/index.jsx";

/** Resolve the component for a given element type */
const RENDERERS = {
  heading: ElHeading,
  text: ElText,
  image: ElImage,
  button: ElButton,
  divider: ElDivider,
  spacer: ElSpacer,
  video: ElVideo,
  slider: ElSlider,
  testimonial: ElTestimonial,
  iconbox: ElIconBox,
};

/** Recursively render an array of elements (supports columns nesting) */
function renderElements(elements) {
  return elements.map((el) => {
    if (el.type === "columns") {
      return <ColumnsRenderer key={el.id} el={el} />;
    }
    const Comp = RENDERERS[el.type];
    return Comp ? <Comp key={el.id} el={el} /> : null;
  });
}

function ColumnsRenderer({ el }) {
  const split =
    el.split === "30/70"
      ? ["30%", "70%"]
      : el.split === "70/30"
      ? ["70%", "30%"]
      : ["50%", "50%"];

  return (
    <div style={{ display: "flex", gap: el.gap }}>
      {[0, 1].map((ci) => (
        <div key={ci} style={{ width: split[ci], minWidth: 0 }}>
          {renderElements(el.children[ci] || [])}
        </div>
      ))}
    </div>
  );
}

/**
 * FrontendCustomSection
 * Wraps a custom section's element list in its bg/padding container.
 */
export default function FrontendCustomSection({ section }) {
  const c = section.config || {};
  return (
    <div
      style={{
        background: c.bg || "#fff",
        paddingTop: c.paddingTop,
        paddingBottom: c.paddingBottom,
        paddingLeft: c.paddingLeft,
        paddingRight: c.paddingRight,
      }}
    >
      <div style={{ maxWidth: c.maxWidth, margin: "0 auto" }}>
        {renderElements(section.elements || [])}
      </div>
    </div>
  );
}
