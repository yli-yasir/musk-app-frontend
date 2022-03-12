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
    {
      id: 0,
      name: "Hammer Works",
      long: -100.324462,
      lat: -16.024695,
      inspectionCount: 3,
      interventionCount: 5,
      commendationCount: 7,
    },
    {
      id: 1,
      name: "Book Mine",
      long: -140.324462,
      lat: -16.024695,
      inspectionCount: 3,
      interventionCount: 5,
      commendationCount: 7,
    },
  ],
};

export default mockDB;
