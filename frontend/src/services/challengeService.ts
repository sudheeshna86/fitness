import { fetchChallenges } from '@/src/services/api/challenges';

export const challengeService = {
  getChallenges: async () => {
    return fetchChallenges();
  },
};
