
import apiClient from '../lib/api';

export interface SubscriptionPlan {
  type: string;
  name: string;
  duration_days: number;
  price: number;
  currency: string;
}

export interface ModulePlan {
  type: string;
  name: string;
  price: number;
  description: string;
}

export interface ModuleBundle {
  code: string;
  name: string;
  price: number;
  modules: string[];
  description: string;
}

export const SubscriptionService = {
  getPricing: async (): Promise<{ plans: SubscriptionPlan[], modules: ModulePlan[], bundles: ModuleBundle[] }> => {
    const response = await apiClient.get('/pricing');
    return response.data;
  },

  getActivePromotion: async (): Promise<any> => {
    // This is public as well
    const response = await apiClient.get('/active-promotion');
    return response.data;
  },

  registerCustomer: async (data: any) => {
    const response = await apiClient.post('/onboarding/register', data);
    return response.data;
  }
};
