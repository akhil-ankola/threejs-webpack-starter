import HeroEditor from "./HeroEditor";
import ZigZagEditor from "./ZigZagEditor";
import USPEditor from "./USPEditor";
import FAQEditor from "./FAQEditor";
import GalleryEditor from "./GalleryEditor";
import TestimonialsEditor from "./TestimonialsEditor";

/**
 * Maps sectionType keys → editor components.
 * "custom" sections use SectionSettings (legacy config editor) + element editors.
 */
export const SECTION_EDITORS = {
  hero: HeroEditor,
  zigzag: ZigZagEditor,
  usp: USPEditor,
  faq: FAQEditor,
  gallery: GalleryEditor,
  testimonials: TestimonialsEditor,
};
