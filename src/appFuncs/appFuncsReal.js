import axios from "axios";

const BASE_URL = "http://localhost:80";
const API_URL = "http://localhost:80/api";

const appFuncsReal = {
  async login(email, password) {
    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return { name: "blank", email: "blank", role: data.role };
    } catch (e) {
      if (e.response?.status === 401) {
        throw new Error("Invalid username or password");
      }
      throw new Error("Something went wrong");
    }
  },

  async getInspectionSites() {
    try {
      const { data: fetchedData } = await axios.get(
        `${API_URL}/inspection-sites`
      );
      const data = fetchedData.data.map((inspectionSite) => ({
        ...inspectionSite,
        lat: parseFloat(inspectionSite.lat),
        long: parseFloat(inspectionSite.long),
        icon: `${BASE_URL}${inspectionSite.icon}`,
        inspectionCount: inspectionSite.inspectionCount || 0,
        interventionCount: inspectionSite.interventionCount || 0,
        commendationCount: inspectionSite.commendationCount || 0,
      }));

      return data;
    } catch (e) {
      throw new Error("Something went wrong");
    }
  },

  async getInspectionActStats() {
    const { data } = await axios.get(`${API_URL}/inspections/stats`);
    return data;
  },

  async getInspections(queryString = "") {
    const { data: fetchedData } = await axios.get(
      `${API_URL}/inspections?${queryString}`
    );
    return fetchedData.data.map((inspection) => ({
      ...inspection,
      date: new Date(inspection.date),
    }));
  },
};

export default appFuncsReal;
