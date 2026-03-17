/**
 * api/client.js  — single import point for all DB/API operations.
 * Swap this file's body to connect a real backend.
 */
export {
  listPages,
  getPageBySlug,
  getPageById,
  createPage,
  updatePage,
  updatePageBySlug,
  deletePage,
  seedIfEmpty,
} from "./db";
