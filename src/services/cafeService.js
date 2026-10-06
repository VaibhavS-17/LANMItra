import api from './api';

export const cafeService = {
  getAllCafes: async (cityOrName = '') => {
    const response = await api.get('/cafes', { params: { cityOrName } });
    return response.data;
  },
  getCafeById: async (id) => {
    const response = await api.get(`/cafes/${id}`);
    return response.data;
  },
  getMyCafes: async () => {
    const response = await api.get('/cafes/my');
    return response.data;
  }
};
