import apiClient from '../lib/api';

export const ReferralService = {
  getMyCodes: async () => {
    const response = await apiClient.get('/referrals/codes');
    return response.data;
  },

  generateCode: async (code?: string) => {
    const response = await apiClient.post('/referrals/codes', { code });
    return response.data;
  },

  getMyCommissions: async () => {
    const response = await apiClient.get('/referrals/commissions');
    return response.data;
  },

  getTrainingResources: async () => {
    const response = await apiClient.get('/referrals/training-resources');
    return response.data;
  },

  requestPayout: async () => {
    const response = await apiClient.post('/referrals/payouts');
    return response.data;
  },

  getPayoutRequests: async () => {
    const response = await apiClient.get('/referrals/payouts');
    return response.data;
  },

  getSettings: async () => {
    const response = await apiClient.get('/referrals/settings');
    return response.data;
  }
};
