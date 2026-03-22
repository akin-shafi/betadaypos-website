'use client';

import { Rocket, Check, ArrowUpRight, ShieldCheck, Store, Zap, LayoutDashboard, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type BillingCycle = 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';

interface Plan {
  type: string;
  name: string;
  price: number;
  duration_days: number;
  description: string;
  user_limit?: number;
  product_limit?: number;
}

interface PricingPlanSelectorProps {
  plans: Plan[];
  selectedPlan: string | null;
  onSelectPlan: (type: string) => void;
  billingCycle: BillingCycle;
  businessFocus: 'GROWING' | 'BASIC';
}

export default function PricingPlanSelector({
  plans,
  selectedPlan,
  onSelectPlan,
  billingCycle,
  businessFocus
}: PricingPlanSelectorProps) {
  const filtered = plans.filter((plan) => {
    const t = (plan.type || '').toUpperCase();
    const isService = t.includes('SERVICE');
    
    // Filter based on focus
    if (businessFocus === 'BASIC') {
       if (!isService) return false;
    } else {
       if (isService) return false;
    }

    if (billingCycle === 'MONTHLY') return t === 'MONTHLY' || t === 'SERVICE_MONTHLY';
    if (billingCycle === 'QUARTERLY') return t === 'QUARTERLY' || t === 'SERVICE_QUARTERLY';
    if (billingCycle === 'ANNUAL') return t === 'ANNUAL' || t === 'SERVICE_ANNUAL';
    return false;
  });
  
  const plansToShow = filtered.length > 0 ? filtered : plans;
  
  return (
    <div className="space-y-6">
      {plansToShow.map((plan) => {
        const isSelected = selectedPlan === plan.type;
        return (
          <div 
            key={plan.type} 
            onClick={() => onSelectPlan(plan.type)}
            className={cn(
              "pricing-card p-8 rounded-[2.5rem] bg-white border-2 cursor-pointer transition-all group relative",
              isSelected ? "border-primary shadow-xl ring-4 ring-primary/5" : "border-slate-100 shadow-sm hover:border-slate-200"
            )}
          >
            {isSelected && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg z-20">
                <Check size={18} strokeWidth={3} />
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-black text-secondary">{plan.name}</h4>
              <div className="text-right">
                <p className="text-2xl font-black text-primary">₦{plan.price.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">/ {plan.duration_days} DAYS</p>
              </div>
            </div>
            <p className="text-slate-500 mb-6 text-sm italic">{plan.description || `Optimized for ${plan.user_limit} staff and ${plan.product_limit} products.`}</p>
            <div className="flex flex-wrap gap-4">
              <span className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-tighter">OFFLINE ACCESS</span>
              <span className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-tighter">CLOUD SYNC</span>
              <span className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-tighter">CORE REPORTS</span>
              {billingCycle !== 'MONTHLY' && (
                <span className="px-3 py-1 bg-teal-50 rounded-lg text-[10px] font-black text-teal-600 uppercase tracking-tighter animate-pulse">
                  {billingCycle === 'ANNUAL' ? 'SAVE 15%' : 'SAVE 10%'}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
