import API from './api';

export const tournamentService = {
  getTournaments: async () => {
    const response = await API.get('/tournaments');
    return response.data;
  },

  getTournamentDetails: async (id) => {
    const response = await API.get(`/tournaments/${id}`);
    return response.data;
  },

  registerForTournament: async (id, teamName) => {
    const response = await API.post(`/tournaments/${id}/register`, { teamName });
    return response.data;
  },
  
  createTournament: async (data) => {
    const response = await API.post('/tournaments', data);
    return response.data;
  }
};
