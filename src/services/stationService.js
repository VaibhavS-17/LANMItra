import api from './api';

export const stationService = {
  getStationsByCafe: async (cafeId) => {
    const response = await api.get(`/cafes/${cafeId}/stations`);
    return response.data;
  }
};
