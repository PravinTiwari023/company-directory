import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Company API methods
export const companyAPI = {
  // Get all companies
  getAll: async () => {
    try {
      const response = await api.get('/companies');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch companies');
    }
  },

  // Get company by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/companies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch company');
    }
  },

  // Create new company
  create: async (companyData) => {
    try {
      const response = await api.post('/companies', companyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create company');
    }
  },

  // Update company
  update: async (id, companyData) => {
    try {
      const response = await api.put(`/companies/${id}`, companyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update company');
    }
  },

  // Delete company
  delete: async (id) => {
    try {
      const response = await api.delete(`/companies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to delete company');
    }
  },
};

export default api;