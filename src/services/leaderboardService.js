import API from './api';

export const leaderboardService = {
  getLeaderboards: async (game = '') => {
    const url = game ? `/leaderboards?game=${encodeURIComponent(game)}` : '/leaderboards';
    const response = await API.get(url);
    return response.data;
  }
};
