// HARD TO CHANGE! REFACTOR!

export const getInspectionSitePath = (siteId = ":siteId") =>
  `/inspection-sites/${siteId}`;

export const getNewInspectionPath = (siteId = ":siteId") =>
  `${getInspectionSitePath(siteId)}/new-inspection`;

const routePaths = {
  login: "/login",
  inspectionSite: getInspectionSitePath(),
  inspections: "/inspections",
  newInspection: getNewInspectionPath(),
};

export default routePaths;
