/**
 * utils/serializer.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Converts builder in-memory state ↔ the canonical page JSON schema.
 *
 * SCHEMA (what gets stored in the database):
 * {
 *   id, name, slug,
 *   meta: { savedAt, version },
 *   sections: [
 *     {
 *       id, order,
 *       settings: { bg, paddingTop, paddingBottom, paddingLeft, paddingRight, maxWidth },
 *       elements: [
 *         { id, order, type, props: { ...typeSpecificProps } }
 *         // columns type:
 *         { id, order, type: "columns", props: { gap, split, columns: [ { index, elements: [...] } ] } }
 *       ]
 *     }
 *   ]
 * }
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Builder state → DB schema ────────────────────────────────────────────────

export const buildSavePayload = (page) => ({
  meta: {
    savedAt: new Date().toISOString(),
    version: "1.0.0",
    builderVersion: "page-builder@2.0.0",
  },
  page: {
    id: page.id,
    name: page.name,
    slug: page.slug || page.name.toLowerCase().replace(/\s+/g, "-"),
    sections: page.sections.map((section, si) => serializeSection(section, si)),
  },
});

const serializeSection = (section, order) => ({
  id: section.id,
  order,
  settings: {
    bg:            section.bg,
    paddingTop:    section.paddingTop,
    paddingBottom: section.paddingBottom,
    paddingLeft:   section.paddingLeft,
    paddingRight:  section.paddingRight,
    maxWidth:      section.maxWidth,
  },
  elements: section.elements.map((el, ei) => serializeElement(el, ei)),
});

const serializeElement = (el, order) => {
  if (el.type === "columns") {
    return {
      id:    el.id,
      order,
      type:  "columns",
      props: {
        gap:   el.gap,
        split: el.split,
        columns: el.children.map((col, ci) => ({
          index:    ci,
          elements: col.map((child, i) => serializeElement(child, i)),
        })),
      },
    };
  }
  const { id, type, ...rest } = el;
  return { id, order, type, props: rest };
};

// ─── DB schema → Builder state ────────────────────────────────────────────────
/**
 * Deserialize a saved DB page record back into the flat builder state shape.
 * This is what the builder loads when you open an existing page.
 */
export const deserializePage = (record) => ({
  id:   record.id,
  name: record.name,
  slug: record.slug,
  sections: (record.sections || [])
    .sort((a, b) => a.order - b.order)
    .map(deserializeSection),
});

const deserializeSection = (section) => ({
  id: section.id,
  ...section.settings,
  elements: (section.elements || [])
    .sort((a, b) => a.order - b.order)
    .map(deserializeElement),
});

const deserializeElement = (el) => {
  if (el.type === "columns") {
    return {
      id:   el.id,
      type: "columns",
      gap:   el.props.gap,
      split: el.props.split,
      children: (el.props.columns || [[], []]).map((col) =>
        (col.elements || [])
          .sort((a, b) => a.order - b.order)
          .map(deserializeElement)
      ),
    };
  }
  return { id: el.id, type: el.type, ...el.props };
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const deepClone  = (v)   => JSON.parse(JSON.stringify(v));
export const formatBytes = (str) => {
  const bytes = new TextEncoder().encode(str).length;
  return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;
};
