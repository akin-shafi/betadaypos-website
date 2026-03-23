'use client';

import React from 'react';
import { 
  Check, 
  Minus, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  LayoutDashboard, 
  Package,
  Headphones,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PricingComparisonTableProps {
  billingCycle: 'MONTHLY' | 'ANNUAL';
  plans: any[];
}

const PricingComparisonTable = ({ billingCycle, plans }: PricingComparisonTableProps) => {
  const getCycleLabel = () => {
    if (billingCycle === 'ANNUAL') return 'per year';
    return 'per month';
  };

  const getPriceByPrefix = (prefix: string) => {
    const cycleSuffix = billingCycle === 'ANNUAL' ? '_ANNUAL' : '_MONTHLY';
    const planId = `${prefix}${cycleSuffix}`;
    const plan = plans.find(p => p.type === planId);
    if (!plan) return '---';
    return plan.price.toLocaleString();
  };

  const getLimitByPrefix = (prefix: string, field: 'user_limit' | 'product_limit') => {
    const planId = `${prefix}_MONTHLY`;
    const plan = plans.find(p => p.type === planId);
    if (!plan) return '---';
    return plan[field].toLocaleString();
  };

  const tiers = [
    { 
        name: 'Essential Architecture', 
        price: getPriceByPrefix('ESSENTIAL'), 
        desc: 'Core control for small teams.',
        color: 'bg-slate-50' 
    },
    { 
        name: 'Growth Architecture', 
        price: getPriceByPrefix('GROWTH'), 
        desc: 'Advanced tools for growing businesses.',
        popular: true,
        color: 'bg-primary/5' 
    },
    { 
        name: 'Scale Architecture', 
        price: getPriceByPrefix('SCALE'), 
        desc: 'High-performance for large enterprises.',
        recommended: true,
        color: 'bg-secondary/5' 
    },
    { 
        name: 'Enterprise Architecture', 
        price: 'Architected', 
        desc: 'Scalable multi-location engine.',
        color: 'bg-slate-900' 
    },
  ];

  const categories = [
    {
      name: 'Security & Hardware',
      icon: ShieldCheck,
      features: [
        { name: 'Terminal ID Locking', helper: 'Only your registered POS can access your sales', plans: [false, true, true, true] },
        { name: 'Anti-Theft Guard', helper: 'Detection of personal terminals diversion', plans: [false, true, true, true] },
        { name: 'Remote Terminal Lock', helper: 'Lock your POS remotely if stolen or staff misbehaves', plans: [false, false, true, true] },
        { name: 'Hardware Audit Logs', helper: 'Log every device that logs into your workspace', plans: [true, true, true, true] },
      ]
    },
    {
      name: 'Bank Reconciliation',
      icon: Zap,
      features: [
        { name: 'Automated Bank Sync', helper: 'Sync alerts from OPay, Moniepoint, etc.', plans: [false, true, true, true] },
        { name: 'Direct Settlement Audit', helper: 'Verify actual bank settlements vs POS totals', plans: [false, true, true, true] },
        { name: 'Profit Fee Deduction', helper: 'Auto-calculate 0.5% bank fees per sale', plans: [false, true, true, true] },
        { name: 'Instant Verification', helper: 'Sales complete only when the alert hits', plans: [false, 'Manual', true, true] },
      ]
    },
    {
      name: 'Inventory & Operations',
      icon: Package,
      features: [
        { name: 'Standard Inventory', helper: 'Stock tracking and low-stock alerts', plans: [true, true, true, true] },
        { name: 'Batch & Expiry Tracking', helper: 'Track manufacturing batches and shelf life', plans: [false, 'Module', true, true] },
        { name: 'Recipe Management (BOM)', helper: 'Link ingredients to finished products', plans: [false, 'Module', true, true] },
        { name: 'Kitchen Display (KDS)', helper: 'Digital order management for chefs', plans: [false, 'Module', true, true] },
        { name: 'QR Digital Menu', helper: 'Allow customers to view items via QR code', plans: [false, 'Module', true, true] },
      ]
    },
    {
      name: 'Ownership & Control',
      icon: LayoutDashboard,
      features: [
        { 
            name: 'Staff Member Limit', 
            helper: 'Accounts for your employees', 
            plans: [
                getLimitByPrefix('ESSENTIAL', 'user_limit'), 
                getLimitByPrefix('GROWTH', 'user_limit'), 
                getLimitByPrefix('SCALE', 'user_limit'), 
                'Unlimited'
            ] 
        },
        { 
            name: 'Product Capacity', 
            helper: 'Max quantity of items in stock', 
            plans: [
                getLimitByPrefix('ESSENTIAL', 'product_limit'), 
                getLimitByPrefix('GROWTH', 'product_limit'), 
                getLimitByPrefix('SCALE', 'product_limit'), 
                'Unlimited'
            ] 
        },
        { name: 'WhatsApp Alerts', helper: 'Get alerts on your phone for every sale/void', plans: [true, true, true, true] },
        { name: 'Activity Replay', helper: 'Step-by-step playback of any cashier action', plans: [false, 'Module', true, true] },
      ]
    },
    {
        name: 'Support & Scale',
        icon: Headphones,
        features: [
          { name: 'Industry Setup', helper: 'Initial configuration for your industry', plans: ['Remote', 'Remote', 'Expert Guided', 'Priority On-site'] },
          { name: 'Support Response', helper: 'How fast our team gets back to you', plans: ['Standard', 'Priority', 'Fastest', '24/7 Dedicated'] },
          { name: 'Custom Reports', helper: 'Additional data visualizations requested by you', plans: [false, false, false, true] },
          { name: 'Multi-Store Sync', helper: 'Centralized control of all your branches', plans: [false, false, true, true] },
        ]
      }
  ];

  return (
    <div className="w-full">
      <div className="overflow-x-auto pb-12">
        <div className="min-w-[1000px]">
          {/* Header Row */}
          <div className="grid grid-cols-5 sticky top-0 z-30 bg-[#fcfdfe]/95 backdrop-blur-md border-b border-slate-100 py-8 mb-8">
            <div className="col-span-1 pr-8">
              <h3 className="text-xl font-black text-secondary leading-tight mt-4 uppercase italic">Feature <br /> <span className="text-primary tracking-tighter">Comparison</span></h3>
            </div>
            {tiers.map((tier, i) => (
              <div key={i} className={cn(
                  "col-span-1 px-4 text-center group",
              )}>
                <h4 className={cn(
                    "text-sm font-black uppercase tracking-widest mb-2 transition-colors",
                    tier.popular ? "text-primary" : "text-secondary"
                )}>{tier.name}</h4>
                <div className="flex flex-col items-center">
                    <p className="text-2xl font-black text-secondary">
                        {tier.price !== 'Custom' && tier.price !== 'Enterprise' ? '₦' : ''}{tier.price}
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-6 opacity-60">{tier.price === 'Custom' ? 'Let\'s talk' : getCycleLabel()}</p>
                </div>
                <Link href="/get-started" className={cn(
                    "w-full py-3 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2",
                    tier.popular ? "bg-primary text-secondary shadow-lg shadow-primary/20" : 
                    tier.name === 'Enterprise' ? "bg-secondary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                )}>
                  {tier.name === 'Enterprise' ? 'Contact Sales' : 'Select Plan'}
                  <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>

          {/* Categories */}
          {categories.map((cat, i) => (
            <div key={i} className="mb-12">
              <div className="flex items-center gap-4 py-8 px-8 bg-slate-50 border-y border-slate-100">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary border border-slate-100">
                    <cat.icon size={20} />
                </div>
                <span className="text-sm font-black text-secondary tracking-[0.3em] uppercase">{cat.name}</span>
              </div>
              
              <div className="divide-y divide-slate-50">
                {cat.features.map((feat, j) => (
                  <motion.div 
                    key={j} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: j * 0.05 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-5 py-6 px-10 hover:bg-slate-50/50 transition-all rounded-2xl group"
                  >
                    <div className="col-span-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-700">{feat.name}</p>
                        <AlertCircle size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 cursor-help transition-opacity" />
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1 hidden group-hover:block transition-all">{feat.helper}</p>
                    </div>
                    {feat.plans.map((p, k) => (
                      <div key={k} className={cn(
                          "col-span-1 flex items-center justify-center border-l border-slate-50/10",
                          k === 1 ? "bg-primary/[0.02]" : ""
                      )}>
                        {typeof p === 'boolean' ? (
                          p ? (
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center shadow-sm", 
                                k === 1 ? "bg-primary text-secondary" : 
                                k === 2 ? "bg-secondary text-white" : "bg-slate-100 text-slate-500"
                            )}>
                              <Check size={14} strokeWidth={3} />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border border-slate-100 flex items-center justify-center text-slate-100">
                               <Minus size={14} />
                            </div>
                          )
                        ) : (
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-tight px-3 py-1.5 rounded-lg",
                            p === 'Module' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                            k === 1 ? "text-primary bg-primary/5" : "text-slate-500 bg-slate-50"
                          )}>
                            {p}
                          </span>
                        )}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingComparisonTable;
