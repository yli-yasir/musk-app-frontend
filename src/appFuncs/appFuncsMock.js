import mockDB from "./mockDB";

const appFuncsMock = {
  async login(email, password) {
    const users = await mockDB.get("users");

    const targetUser = users.find((user) => user.email === email);

    if (targetUser && targetUser.password === password) {
      return {
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
      };
    } else {
      throw new Error("Invalid username or password");
    }
  },
  async getInspectionSites() {
    return await mockDB.get("inspectionSites");
  },

  async getInspectionFormSections() {
    return await mockDB.get("inspectionFormSections");
  },

  async getInspectionSiteById(id) {
    const inspectionSites = await mockDB.get("inspectionSites");
    console.log(inspectionSites);
    const site = inspectionSites.find((site) => site.id === parseInt(id));
    console.log(site);
    return site;
  },

  async getInspectionActStats() {
    console.log("called");
    return await Promise.resolve({
      commendationCount: 1,
      interventionCount: 3,
    });
  },

  async getInspections(filter = {}) {
    const { name, dateOrder, interventionOrder } = filter;
    return await mockDB.get("inspections");
  },
};

export default appFuncsMock;
