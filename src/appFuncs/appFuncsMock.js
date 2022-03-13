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
};

export default appFuncsMock;
