import api from './api';

export const stationService = {
  getStationsByCafe: async (cafeId) => {
    const response = await api.get(`/cafes/${cafeId}/stations`);
    return response.data;
  },
  addStation: async (cafeId, stationData) => {
    const response = await api.post(`/cafes/${cafeId}/stations`, stationData);
    return response.data;
  },
  deactivateStation: async (cafeId, stationId) => {
    await api.delete(`/cafes/${cafeId}/stations/${stationId}`);
  }
};
