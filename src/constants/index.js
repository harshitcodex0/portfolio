// =============================================================================
//  src/constants/index.js — Re-export barrel
//  ------------------------------------------
//  This file is the single import point for all components.
//  All authoritative data lives in portfolioData.js.
//  Do NOT add data directly here; edit portfolioData.js instead.
// =============================================================================

export {
  // New structured constants
  PROJECTS,
  SKILLS,
  PROFILES,

  // Legacy named exports (consumed by existing components — do not rename)
  navLinks,
  words,
  counterItems,
  logoIconsList,
  abilities,
  techStackImgs,
  techStackIcons,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  skillsData,
} from "./portfolioData.js";
