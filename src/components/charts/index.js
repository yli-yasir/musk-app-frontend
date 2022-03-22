export { default as useInspectionActDoughnut } from "./useInspectionActDoughnut";
export { default as useInspectionLines } from "./useInspectionLines.js";

export const INSPECTION_COLOR = "rgb(77, 150, 255)";
export const INTERVENTION_COLOR = "rgb(255, 217, 61)";
export const COMMENDATION_COLOR = "rgb(107, 203, 119)";

export const addAlpha = (rgbColor) =>
  rgbColor.slice(0, rgbColor.length - 1) + ",0.5)";
