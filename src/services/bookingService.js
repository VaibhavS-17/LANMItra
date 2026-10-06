import api from './api';

export const bookingService = {
  getAvailability: async (stationId, date) => {
    const res = await api.get(`/stations/${stationId}/availability`, { params: { date } });
    return res.data;
  },
  createBooking: async (bookingData) => {
    // bookingData: { stationId, date, startTime, endTime }
    const res = await api.post('/bookings', bookingData);
    return res.data;
  },
  getMyBookings: async () => {
    const res = await api.get('/bookings/my');
    return res.data;
  },
  cancelBooking: async (id) => {
    await api.put(`/bookings/${id}/cancel`);
  },
  getStationDetails: async (id) => {
    const res = await api.get(`/stations/${id}`);
    return res.data;
  }
};
