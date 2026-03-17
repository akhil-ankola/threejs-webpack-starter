import HeroSection from "./HeroSection";
import ZigZagSection from "./ZigZagSection";
import USPSection from "./USPSection";
import FAQSection from "./FAQSection";
import GallerySection from "./GallerySection";
import TestimonialsSection from "./TestimonialsSection";

/**
 * Maps sectionType keys → renderer components.
 * Add new entries here when creating new predefined section types.
 */
export const SECTION_RENDERERS = {
  hero: HeroSection,
  zigzag: ZigZagSection,
  usp: USPSection,
  faq: FAQSection,
  gallery: GallerySection,
  testimonials: TestimonialsSection,
};
