// HARD TO CHANGE! REFACTOR!

export const getInspectionSitePath = (siteId = ":siteId") =>
  `/inspection-sites/${siteId}`;

const routePaths = {
  login: "/login",
  inspectionSite: getInspectionSitePath(),
  inspectSite: "/inspection-sites/:siteId/new-inspection",
};

export default routePaths;
