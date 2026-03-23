'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { 
  Rocket, 
  Zap, 
  Store, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import PricingComparisonTable from '@/components/pricing/PricingComparisonTable';
import { cn } from '@/lib/utils';

type BillingCycle = 'MONTHLY' | 'ANNUAL';

const BUSINESS_TYPE_MODULES: Record<string, { recommended: string[], visible: string[] }> = {
  RESTAURANT: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'DIGITAL_MENU_QR'], visible: ['RECIPE_MANAGEMENT', 'KITCHEN_DISPLAY'] },
  BAR: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'DIGITAL_MENU_QR', 'TABLE_MANAGEMENT', 'SAVE_DRAFTS'], visible: ['RECIPE_MANAGEMENT'] },
  LOUNGE: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'DIGITAL_MENU_QR', 'TABLE_MANAGEMENT', 'SAVE_DRAFTS'], visible: ['RECIPE_MANAGEMENT', 'KITCHEN_DISPLAY'] },
  SUPERMARKET: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE'], visible: ['WHATSAPP_ALERTS'] },
  RETAIL: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE'], visible: ['WHATSAPP_ALERTS'] },
  BOUTIQUE: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE'], visible: ['WHATSAPP_ALERTS'] },
  PHARMACY: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE'], visible: ['WHATSAPP_ALERTS'] },
  CLINIC: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE'], visible: ['WHATSAPP_ALERTS'] },
  BAKERY: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'RECIPE_MANAGEMENT'], visible: ['KITCHEN_DISPLAY'] },
  HOTEL: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'TABLE_MANAGEMENT', 'SAVE_DRAFTS', 'DIGITAL_MENU_QR'], visible: ['KITCHEN_DISPLAY', 'RECIPE_MANAGEMENT'] },
  FUEL_STATION: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'BULK_STOCK_MANAGEMENT'], visible: ['WHATSAPP_ALERTS'] },
  LPG_STATION: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'BULK_STOCK_MANAGEMENT'], visible: ['WHATSAPP_ALERTS'] },
  OTHER: { recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE'], visible: ['WHATSAPP_ALERTS', 'SAVE_DRAFTS'] }
};

const FALLBACK_PRICING = {
  plans: [
    { type: 'ESSENTIAL_MONTHLY', name: 'Essential Monthly', price: 12500, duration_days: 30, user_limit: 2, product_limit: 300, description: 'Basic control for small teams.' },
    { type: 'ESSENTIAL_ANNUAL', name: 'Essential Annual', price: 100000, duration_days: 365, user_limit: 2, product_limit: 300, description: 'Pay for 8 months.' },
    { type: 'GROWTH_MONTHLY', name: 'Growth Monthly', price: 25000, duration_days: 30, user_limit: 10, product_limit: 2500, description: 'Advanced tools for growing businesses.' },
    { type: 'GROWTH_ANNUAL', name: 'Growth Annual', price: 200000, duration_days: 365, user_limit: 10, product_limit: 2500, description: 'Pay for 8 months.' },
    { type: 'SCALE_MONTHLY', name: 'Scale Monthly', price: 55000, duration_days: 30, user_limit: 50, product_limit: 15000, description: 'High-performance for large enterprises.' },
    { type: 'SCALE_ANNUAL', name: 'Scale Annual', price: 440000, duration_days: 365, user_limit: 50, product_limit: 15000, description: 'Pay for 8 months.' },
  ],
  modules: [
    { type: 'KITCHEN_DISPLAY', name: 'Kitchen Display System (KDS)', price: 4000, description: 'Real-time kitchen order monitor for chefs' },
    { type: 'TABLE_MANAGEMENT', name: 'Table Management', price: 4000, description: 'Track floor layouts and table status' },
    { type: 'SAVE_DRAFTS', name: 'Save Drafts', price: 3000, description: 'Save and resume incomplete orders' },
    { type: 'ADVANCED_INVENTORY', name: 'Advanced Inventory Control', price: 15000, description: 'Batch tracking, shrinkage alerts, and stock history' },
    { type: 'RECIPE_MANAGEMENT', name: 'Recipe & Cost Control (BOM)', price: 12000, description: 'Ingredient-level cost tracking per item sold' },
    { type: 'WHATSAPP_ALERTS', name: 'Security & Owner WhatsApp Alerts', price: 5000, description: 'Instant alerts for voids, overrides, refunds, and logins' },
    { type: 'AUTOMATED_COMPLIANCE', name: 'Automated Compliance & Audit Replay', price: 12000, description: 'Tax-ready reports, audit trail, and activity playback' },
    { type: 'DIGITAL_MENU_QR', name: 'QR Digital Menu', price: 5000, description: 'Public QR-based digital menu with live product updates' },
    { type: 'BULK_STOCK_MANAGEMENT', name: 'Bulk Stock & Round Tracking', price: 10000, description: 'Specialized tracking for fuel, gas, and bulk commodities.' }
  ]
};

export default function PricingPage() {
  const [pricing, setPricing] = useState<any>({ plans: [], modules: [] });
  const [activePromotion, setActivePromotion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // User Selection State
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('MONTHLY');
  
  const comparisonRef = useRef(null);
  const isInIndex = useInView(comparisonRef, { amount: 0.1 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://betadaypos.onrender.com/api/v1';
        
        // Fetch Pricing
        const pricingRes = await fetch(`${baseUrl}/pricing`);
        if (pricingRes.ok) {
          const data = await pricingRes.json();
          setPricing(data);
        }

        // Fetch Promotion
        const promoRes = await fetch(`${baseUrl}/active-promotion`);
        if (promoRes.ok) {
          const data = await promoRes.json();
          setActivePromotion(data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dynamic data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfe] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfe] selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-48">
        <div className="max-w-7xl mx-auto px-8">
          
          <div className="text-center mb-24">
            <span className="text-xs font-black text-primary uppercase tracking-[0.6em] mb-4 block">Engineered for Dominance</span>
            <h1 className="text-5xl lg:text-7xl font-black text-secondary tracking-tight mb-6 uppercase italic">Transparent <span className="text-primary italic">Pricing.</span></h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium">Choose the perfect foundational architecture for your business scale and power it up with specialized performance extensions.</p>
            
            <div className="bg-white p-1.5 rounded-full inline-flex shadow-sm border border-slate-100 mb-8 relative">
              {[
                { id: 'MONTHLY' as BillingCycle, label: 'Monthly' },
                { id: 'ANNUAL' as BillingCycle, label: 'Annually' },
              ].map((cycle) => (
                <button
                  key={cycle.id}
                  type="button"
                  onClick={() => setBillingCycle(cycle.id)}
                  className={`px-12 py-4 rounded-full text-sm font-bold transition-all relative z-10 ${
                    billingCycle === cycle.id
                      ? 'text-white'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {cycle.label}
                  {cycle.id === 'ANNUAL' && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] font-black py-1 px-3 rounded-full shadow-lg">
                        SAVE 33%
                    </span>
                  )}
                </button>
              ))}
              <motion.div 
                layoutId="activeCycle"
                className="absolute inset-y-1.5 bg-secondary rounded-full z-0"
                style={{ 
                    left: billingCycle === 'MONTHLY' ? '6px' : '50%',
                    width: 'calc(50% - 6px)'
                }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            </div>

            <div className="max-w-2xl mx-auto p-4 bg-white border border-slate-200 rounded-3xl flex items-start gap-4 shadow-sm text-left mb-12">
               <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                  <AlertTriangle size={20} />
               </div>
               <div>
                  <h4 className="text-sm font-black text-secondary uppercase tracking-tight">Enterprise Compliance Notice</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                     All stated architectures are VAT inclusive. Regulatory compliance modules are recommended for high-volume merchants to ensure seamless audit playback.
                  </p>
               </div>
            </div>
          </div>

          <div ref={comparisonRef} className="mt-12">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <span className="text-xs font-black text-primary uppercase tracking-[0.4em]">Zero-Trust Standard</span>
              <h2 className="text-6xl font-black text-secondary tracking-tighter mt-4 mb-8 uppercase italic transition-all">Architecture <span className="text-primary italic">Index.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
                 A transparent technical breakdown of how BETADAY scales with your business ambitions - from a single terminal to a multi-city high-frequency enterprise.
              </p>
            </div>
            <PricingComparisonTable 
              billingCycle={billingCycle} 
              plans={pricing.plans.length > 0 ? pricing.plans : FALLBACK_PRICING.plans}
            />
          </div>
        </div>
      </main>


      <div className="border-y border-slate-100 bg-[#fcfdfe] py-24">
         <div className="max-w-7xl mx-auto px-8 text-center mb-16">
            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.6em]">Zero-Trust Reconciliation Partners</span>
         </div>
         <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center lg:justify-between items-center gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {['OPAY', 'MONNIFY', 'MONIEPOINT', 'PALMPAY', 'BANK TRANSFERS'].map(brand => (
              <span key={brand} className="text-4xl font-black italic tracking-tighter text-secondary">{brand}</span>
            ))}
         </div>
      </div>

      <footer className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12 text-slate-400 font-bold text-sm text-center md:text-left">
           <p className="tracking-widest uppercase">&copy; 2026 BETADAY TECHNOLOGIES. BUILT FOR SCALE OVER CONVENIENCE.</p>
           <div className="flex gap-12">
              <Link href="/privacy" className="hover:text-secondary transition-colors uppercase tracking-widest">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-secondary transition-colors uppercase tracking-widest">Terms of Service</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
