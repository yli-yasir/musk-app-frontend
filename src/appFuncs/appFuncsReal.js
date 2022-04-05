import axios from "axios";
import mockDB from "./mockDB";
const BASE_URL = "http://localhost:80";
const API_URL = "http://localhost:80/api";

const getAuthHeaders = () => ({
  Authorization: "Bearer " + localStorage.getItem("tkn"),
});

axios.defaults.headers = getAuthHeaders();

const appFuncsReal = {
  async login(email, password) {
    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("tkn", data.token);
      return { name: "blank", email: "blank", role: data.role };
    } catch (e) {
      if (e.response?.status === 401) {
        throw new Error("Invalid username or password");
      }
      throw new Error("Something went wrong");
    }
  },

  async register(email, password) {
    try {
      await axios.post(`${API_URL}/register`, { email, password });
    } catch (e) {
      throw new Error("Something went wrong!");
    }
  },

  async getInspectionSites() {
    try {
      const { data: fetchedData } = await axios.get(
        `${API_URL}/inspection-sites`
      );
      const data = fetchedData.data.map(this._mapInspectionSite);

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
      download: `${BASE_URL}${inspection.reportFile}`,
      date: new Date(inspection.date),
    }));
  },

  async getInspectionSiteById(id) {
    const { data: fetchedInspectionSite } = await axios.get(
      `${API_URL}/inspection-sites/${id}`
    );
    const result = this._mapInspectionSite(fetchedInspectionSite.data);

    return result;
  },

  async getInspectionFormSections() {
    const { data: fetchedSections } = await axios.get(
      `${API_URL}/inspection-sections`
    );
    return fetchedSections.map((section) => ({
      title: section.title,
      subSections: section.subsections.map(({ title }) => title),
    }));
  },

  async submitInspection(data) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    await axios.post(`${API_URL}/inspections`, formData);
  },
  // Not part of interface
  _mapInspectionSite(inspectionSite) {
    return {
      ...inspectionSite,
      lat: parseFloat(inspectionSite.lat),
      long: parseFloat(inspectionSite.long),
      icon: `${BASE_URL}${inspectionSite.icon}`,
      inspectionCount: inspectionSite.inspectionCount || 0,
      interventionCount: inspectionSite.interventionCount || 0,
      commendationCount: inspectionSite.commendationCount || 0,
    };
  },
};

export default appFuncsReal;
