import { roles } from "../contexts/UserContext";

const mockDB = {
  async get(key) {
    return await new Promise((resolve) =>
      setTimeout(() => resolve(this[key]), 2000)
    );
  },
  users: [
    {
      email: "admin@musk.com",
      password: "1234",
      name: "the admin",
      role: roles.admin,
    },
  ],
  inspectionSites: [
    { name: "The amazing site", long: -100.324462, lat: -16.024695 },
    { name: "The nice site", long: -140.324462, lat: -16.024695 },
  ],
};

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
  async getInspectionSites() {},
};

export default appFuncsMock;
