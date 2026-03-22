'use client';

import { Rocket, Check, ArrowUpRight, ShieldCheck, Store, Zap, LayoutDashboard, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type BillingCycle = 'MONTHLY' | 'ANNUAL';

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
}

export default function PricingPlanSelector({
  plans,
  selectedPlan,
  onSelectPlan,
  billingCycle,
}: PricingPlanSelectorProps) {
  const filtered = plans.filter((plan) => {
    const t = (plan.type || '').toUpperCase();
    return t.includes(billingCycle);
  });
  
  const getIcon = (type: string) => {
    if (type.includes('ESSENTIAL')) return <Store size={24} />;
    if (type.includes('GROWTH')) return <Zap size={24} />;
    if (type.includes('SCALE')) return <ShieldCheck size={24} />;
    return <Rocket size={24} />;
  };

  const getTierColor = (type: string) => {
    if (type.includes('ESSENTIAL')) return 'bg-amber-500';
    if (type.includes('GROWTH')) return 'bg-primary';
    if (type.includes('SCALE')) return 'bg-emerald-500';
    return 'bg-secondary';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {filtered.map((plan) => {
        const isSelected = selectedPlan === plan.type;
        const isGrowth = plan.type.includes('GROWTH');

        return (
          <div 
            key={plan.type} 
            onClick={() => onSelectPlan(plan.type)}
            className={cn(
              "p-10 rounded-[3rem] bg-white border-4 cursor-pointer transition-all relative group flex flex-col",
              isSelected 
                ? "border-primary shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] scale-105" 
                : "border-slate-50 shadow-sm hover:border-slate-200 hover:scale-[1.02]"
            )}
          >
            {isGrowth && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black px-6 py-2 rounded-full shadow-xl tracking-[0.2em] whitespace-nowrap">
                RECOMMENDED
              </div>
            )}

            <div className={cn(
                "w-16 h-16 rounded-3xl flex items-center justify-center text-white mb-8 transition-transform group-hover:scale-110",
                getTierColor(plan.type)
            )}>
                {getIcon(plan.type)}
            </div>

            <h4 className="text-2xl font-black text-secondary mb-2 tracking-tight">{plan.name.split(' ')[0]}</h4>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-secondary tracking-tighter">₦{plan.price.toLocaleString()}</span>
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">/ {billingCycle === 'ANNUAL' ? 'YEAR' : 'MO'}</span>
              </div>
              {billingCycle === 'ANNUAL' && (
                  <p className="text-[10px] font-black text-primary uppercase mt-1">Billed annually • Save 20%</p>
              )}
            </div>

            <p className="text-slate-500 mb-8 text-base font-medium leading-relaxed italic grow">{plan.description}</p>
            
            <div className="space-y-4 pt-6 border-t border-slate-50">
               <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                     <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="text-xs font-bold text-slate-600">{plan.user_limit || 3} System Users</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                     <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="text-xs font-bold text-slate-600">{plan.product_limit || 500} Products Index</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                     <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="text-xs font-bold text-slate-600">Enterprise Cloud Backup</span>
               </div>
            </div>

            <div className={cn(
                "mt-8 w-full py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2",
                isSelected ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-secondary"
            )}>
                {isSelected ? 'PLAN ACTIVATED' : 'SELECT ARCHITECTURE'}
                <ArrowRight size={14} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
