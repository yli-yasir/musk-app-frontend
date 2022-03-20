// HARD TO CHANGE! REFACTOR!

export const getInspectionSitePath = (siteId = ":siteId") =>
  `/inspection-sites/${siteId}`;

const routePaths = {
  login: "/login",
  inspectionSites: "/inspection-sites",
  inspectionSite: getInspectionSitePath(),
  inspectSite: "/inspection-sites/:siteId/new-inspection",
};

export default routePaths;
