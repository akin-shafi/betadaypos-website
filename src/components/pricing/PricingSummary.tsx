'use client';

import { LayoutDashboard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type BillingCycle = 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';

interface PricingSummaryProps {
  businessFocus: 'GROWING' | 'BASIC';
  selectedPlanName: string;
  selectedModulesCount: number;
  billingCycle: BillingCycle;
  originalTotal: number;
  billingTotal: number;
}

export default function PricingSummary({
  businessFocus,
  selectedPlanName,
  selectedModulesCount,
  billingCycle,
  originalTotal,
  billingTotal
}: PricingSummaryProps) {
  const savings = originalTotal > 0 ? Math.round(((originalTotal - billingTotal) / originalTotal) * 100) : 0;

  return (
    <div className="fixed bottom-8 left-4 right-4 z-50 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-md text-white p-6 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto border border-white/10 animate-slide-up">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Your Configuration Summary</p>
            <p className="text-lg font-black tracking-tight leading-none">
              {businessFocus === 'BASIC' ? 'Starter / Basic Plan' : selectedPlanName}
              {businessFocus === 'GROWING' && selectedModulesCount > 0 && <span className="text-primary ml-1">+ {selectedModulesCount} Power-Ups</span>}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="text-center md:text-right">
            <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1">{billingCycle} Settlement Due</p>
            <div className="flex flex-col items-center md:items-end">
              {billingCycle !== 'MONTHLY' && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-500 line-through opacity-70 relative -top-1">
                      ₦{originalTotal.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[9px] font-black bg-teal-500/10 text-teal-400 px-1.5 py-0.5 rounded-md uppercase">
                    Save {savings}%
                  </span>
                </div>
              )}
              <p className="text-3xl font-black tracking-tighter leading-tight">₦{billingTotal.toLocaleString()}</p>
            </div>
          </div>
          <Link href="/get-started" className="px-10 py-5 bg-primary text-secondary rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
            Deploy Workspace
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
