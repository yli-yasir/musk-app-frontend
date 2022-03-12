import mockDB from "./mockDB";

const appFuncsMock = {
  async login(email, password) {
    let users;
    try {
      users = await mockDB.get("users");
      // throw new Error("xyz has failed while connecting server!");
    } catch (e) {
      throw new Error("Server error");
    }
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
    let sites;
    try {
      sites = await mockDB.get("inspectionSites");
    } catch (e) {
      throw new Error("Server error");
    }
    return sites;
  },
};

export default appFuncsMock;
