import { fetchAnalytics } from '@/src/services/api/analytics';

export const analyticsService = {
  getAnalytics: async () => {
    return fetchAnalytics();
  },
};
