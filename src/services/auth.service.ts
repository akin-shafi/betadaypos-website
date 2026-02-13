import apiClient from '../lib/api';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_verified: boolean;
}

export const AuthService = {
  login: async (data: any) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },
  
  registerInstaller: async (data: any) => {
    const response = await apiClient.post('/auth/installer/register', data);
    return response.data;
  },

  verifyEmail: async (email: string, code: string) => {
    const response = await apiClient.post('/auth/verify-email', { email, code });
    return response.data;
  },

  resendOTP: async (email: string) => {
    const response = await apiClient.post('/auth/resend-otp', { email });
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  requestPasswordReset: async (email: string) => {
    const response = await apiClient.post('/auth/password-reset/request', { email });
    return response.data;
  },

  updateProfile: async (data: any) => {
    const response = await apiClient.put('/profile', data);
    return response.data;
  },
  
  resetPassword: async (data: any) => {
    const response = await apiClient.post('/auth/password-reset/reset', data);
    return response.data;
  }
};
