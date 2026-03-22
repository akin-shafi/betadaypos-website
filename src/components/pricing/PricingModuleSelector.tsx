'use client';

import { Store, ShieldCheck, Check, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type BillingCycle = 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';

interface Module {
  type: string;
  name: string;
  price: number;
  description: string;
}

interface PricingModuleSelectorProps {
  modules: Module[];
  selectedModules: string[];
  onSelectModule: (type: string) => void;
  billingCycle: BillingCycle;
  businessFocus: 'GROWING' | 'BASIC';
  businessType: string;
  businessTypeModules: Record<string, { recommended: string[], visible: string[] }>;
}

export default function PricingModuleSelector({
  modules,
  selectedModules,
  onSelectModule,
  billingCycle,
  businessFocus,
  businessType,
  businessTypeModules
}: PricingModuleSelectorProps) {
  if (businessFocus === 'BASIC') {
    return (
      <div className="flex-1 w-full p-12 text-center space-y-6 bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100 animate-fade-in my-4">
        <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto text-teal-600 shadow-xl shadow-teal-500/5 rotate-3">
          <Store size={40} />
        </div>
        <div className="space-y-3 max-w-sm mx-auto">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Basic Sales Mode</h3>
          <p className="text-slate-500 leading-relaxed font-medium text-sm">
            Perfect for small shops & kiosks. Track sales, print receipts, and manage a small catalog.
          </p>
        </div>
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-teal-100/50 text-teal-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-teal-200">
          <ShieldCheck size={14} />
          Essential Features Only
        </div>
        <p className="text-[10px] text-slate-400 font-bold italic uppercase">Module selection is disabled for basic plans.</p>
      </div>
    );
  }

  const config = businessTypeModules[businessType] || businessTypeModules.OTHER;
  const filteredModules = modules.filter((mod) => 
    config.recommended.includes(mod.type) || config.visible.includes(mod.type)
  );

  if (modules.length > 0 && filteredModules.length === 0) {
    return (
      <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-white">
        <p className="text-slate-400 font-bold">Comprehensive standard POS features included.</p>
        <p className="text-[10px] text-slate-300 uppercase tracking-widest mt-2">No specialized add-ons required for this industry yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {filteredModules.map((mod) => {
        const isRecommended = config.recommended.includes(mod.type);
        const multiplier = billingCycle === 'ANNUAL' ? 12 : billingCycle === 'QUARTERLY' ? 3 : 1;
        const discount = billingCycle === 'ANNUAL' ? 0.85 : billingCycle === 'QUARTERLY' ? 0.9 : 1;
        const displayPrice = Math.round(mod.price * multiplier * discount);
        const isSelected = selectedModules.includes(mod.type);

        return (
          <div 
            key={mod.type} 
            onClick={() => onSelectModule(mod.type)}
            className={cn(
              "pricing-card p-6 rounded-[2rem] bg-white border-2 cursor-pointer transition-all group relative",
              isSelected ? "border-teal-500 shadow-md bg-teal-50/10" : "border-slate-100 shadow-sm hover:border-teal-200"
            )}
          >
            {isSelected && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-md z-20">
                <Check size={14} strokeWidth={3} />
              </div>
            )}
            {isRecommended && !isSelected && (
              <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-teal-50 text-[8px] font-black text-teal-600 rounded-full border border-teal-100 shadow-sm z-20">
                RECOMMENDED
              </div>
            )}
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-extrabold text-secondary text-sm">{mod.name}</h4>
              <div className="text-right">
                <span className="text-xs font-black text-teal-600">
                  ₦{displayPrice.toLocaleString()}
                </span>
                <p className="text-[8px] font-bold text-slate-400 uppercase">
                  {billingCycle === 'MONTHLY' ? '/mo' : billingCycle === 'QUARTERLY' ? '/qtr' : '/yr'}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{mod.description}</p>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
              isSelected ? "bg-teal-500 text-white" : "bg-teal-50 text-teal-600"
            )}>
              <ArrowUpRight size={14} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
