import { roles } from "../contexts/UserContext";
import siteLogo1 from "../assets/siteLogo1.png";
import siteLogo2 from "../assets/siteLogo2.png";

const mockDB = {
  async get(key, fail = false) {
    try {
      return fail
        ? new Error()
        : await new Promise((resolve) =>
            setTimeout(() => resolve(this[key]), 2000)
          );
    } catch (e) {
      throw new Error("Server error");
    }
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
      icon: siteLogo1,
      long: -100.324462,
      lat: -16.024695,
      inspectionCount: 3,
      interventionCount: 5,
      commendationCount: 7,
    },
    {
      id: 1,
      name: "Book Mine",
      icon: siteLogo2,
      long: -140.324462,
      lat: -16.024695,
      inspectionCount: 3,
      interventionCount: 5,
      commendationCount: 7,
    },
  ],
  inspections: [
    {
      id: 0,
      siteId: 0,
      siteName: "Hammer works",
      date: new Date("2022-1-7"),
      interventionCount: 3,
      commendationCount: 1,
    },
    {
      id: 1,
      siteId: 1,
      siteName: "Book Mine",
      date: new Date("2022-12-7"),
      interventionCount: 1,
      commendationCount: 10,
    },
    {
      id: 2,
      siteId: 1,
      siteName: "Book Mine",
      date: new Date("2022-06-7"),
      interventionCount: 20,
      commendationCount: 5,
    },
  ],
  inspectionFormSections: [
    {
      title: "Working Standards",
      subSections: [
        "Work at height",
        "Lifting Operations",
        "Certification",
        "Confined Space Work",
        "Electrical Work",
      ],
    },
    {
      title: "Misc",
      subSections: [
        "Work at height - Misc",
        "Lifting Operations - Misc",
        "Certification - Misc",
        "Confined Space Work - Misc",
        "Electrical Work - Misc",
      ],
    },
  ],
};

export default mockDB;
