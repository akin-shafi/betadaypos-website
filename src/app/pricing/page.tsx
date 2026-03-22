'use client';

import { useEffect, useState, useMemo } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import PricingPlanSelector from '@/components/pricing/PricingPlanSelector';
import PricingModuleSelector from '@/components/pricing/PricingModuleSelector';
import PricingComparisonTable from '@/components/pricing/PricingComparisonTable';
import PricingSummary from '@/components/pricing/PricingSummary';
import { cn } from '@/lib/utils';

type BillingCycle = 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';

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
    { type: 'MONTHLY', name: 'Standard Monthly', price: 30000, duration_days: 30, description: 'Optimized for 3 staff and 300 products.' },
    { type: 'QUARTERLY', name: 'Standard Quarterly', price: 81000, duration_days: 90, description: 'Optimized for 7 staff and 1500 products.' },
    { type: 'ANNUAL', name: 'Standard Annual', price: 300000, duration_days: 365, description: 'Optimized for 15 staff and 5000 products.' },
    { type: 'SERVICE_MONTHLY', name: 'Basic Sales POS (Monthly)', price: 15000, duration_days: 30, description: 'Strictly for kiosks/LPG/small shops.' },
    { type: 'SERVICE_QUARTERLY', name: 'Basic Sales POS (Quarterly)', price: 40000, duration_days: 90, description: 'Strictly for kiosks/LPG/small shops.' },
    { type: 'SERVICE_ANNUAL', name: 'Basic Sales POS (Annual)', price: 150000, duration_days: 365, description: 'Strictly for kiosks/LPG/small shops.' }
  ],
  modules: [
    { type: 'KITCHEN_DISPLAY', name: 'Kitchen Display System (KDS)', price: 5000, description: 'Real-time kitchen order monitor for chefs' },
    { type: 'TABLE_MANAGEMENT', name: 'Table Management', price: 5000, description: 'Track floor layouts and table status' },
    { type: 'SAVE_DRAFTS', name: 'Save Drafts', price: 4000, description: 'Save and resume incomplete orders' },
    { type: 'ADVANCED_INVENTORY', name: 'Advanced Inventory Control', price: 18000, description: 'Batch tracking, shrinkage alerts, and stock history' },
    { type: 'RECIPE_MANAGEMENT', name: 'Recipe & Cost Control (BOM)', price: 15000, description: 'Ingredient-level cost tracking per item sold' },
    { type: 'WHATSAPP_ALERTS', name: 'Security & Owner WhatsApp Alerts', price: 8000, description: 'Instant alerts for voids, overrides, refunds, and logins' },
    { type: 'AUTOMATED_COMPLIANCE', name: 'Automated Compliance & Audit Replay', price: 15000, description: 'Tax-ready reports, audit trail, and activity playback' },
    { type: 'DIGITAL_MENU_QR', name: 'QR Digital Menu', price: 8000, description: 'Public QR-based digital menu with live product updates' },
    { type: 'BULK_STOCK_MANAGEMENT', name: 'Bulk Stock & Round Tracking', price: 12000, description: 'Specialized tracking for fuel, gas, and bulk commodities.' }
  ]
};

export default function PricingPage() {
  const [pricing, setPricing] = useState<any>(FALLBACK_PRICING);
  const [activePromotion, setActivePromotion] = useState<any>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('MONTHLY');
  const [businessFocus, setBusinessFocus] = useState<'GROWING' | 'BASIC'>('GROWING');
  const [businessType, setBusinessType] = useState<string>('RESTAURANT');
  const [selectedPlan, setSelectedPlan] = useState<string | null>('MONTHLY');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://betadaypos.onrender.com/api/v1';
        const cleanBaseUrl = baseUrl.endsWith('/api/v1') ? baseUrl : `${baseUrl}/api/v1`;
        
        const [pricingRes, promoRes] = await Promise.allSettled([
           fetch(`${cleanBaseUrl}/pricing`),
           fetch(`${cleanBaseUrl}/active-promotion`)
        ]);

        if (pricingRes.status === 'fulfilled' && pricingRes.value.ok) {
           const data = await pricingRes.value.json();
           if (data && (data.plans || data.modules)) {
             setPricing({
                plans: data.plans || [],
                modules: data.modules || [],
                bundles: data.bundles || []
             });
             if (data.plans && data.plans.length > 0) {
              const defaultPlan = data.plans.find((p: any) => p.type === 'MONTHLY') || data.plans[0];
              setSelectedPlan(defaultPlan.type);
             }
           }
        }

        if (promoRes.status === 'fulfilled' && promoRes.value.ok) {
           const promo = await promoRes.value.json();
           setActivePromotion(promo);
        }
      } catch (err) {
        console.error("Data load error:", err);
      }
    };

    fetchData();
  }, []);

  // Auto-select modules based on business type
  useEffect(() => {
    if (businessFocus === 'BASIC') {
      setSelectedModules([]);
    } else {
      const config = BUSINESS_TYPE_MODULES[businessType] || BUSINESS_TYPE_MODULES.OTHER;
      setSelectedModules(config.recommended);
    }
  }, [businessType, businessFocus]);

  // Auto-select plan when cycle or focus changes
  useEffect(() => {
    if (!pricing.plans || pricing.plans.length === 0) return;

    const targetType = billingCycle === 'ANNUAL' 
      ? (businessFocus === 'BASIC' ? 'SERVICE_ANNUAL' : 'ANNUAL')
      : billingCycle === 'QUARTERLY'
      ? (businessFocus === 'BASIC' ? 'SERVICE_QUARTERLY' : 'QUARTERLY')
      : (businessFocus === 'BASIC' ? 'SERVICE_MONTHLY' : 'MONTHLY');

    setSelectedPlan(targetType);
  }, [billingCycle, businessFocus, pricing.plans]);

  const calculateBillingTotal = () => {
    let total = 0;
    
    // Base Plan
    const plan = pricing.plans.find((p: any) => p.type === selectedPlan);
    if (plan) total += plan.price;
    
    // Modules
    if (businessFocus === 'GROWING') {
      const multiplier = billingCycle === 'ANNUAL' ? 12 : billingCycle === 'QUARTERLY' ? 3 : 1;
      
      let discount = billingCycle === 'ANNUAL' ? 0.85 : billingCycle === 'QUARTERLY' ? 0.9 : 1;
      if (activePromotion) {
         if (billingCycle === 'QUARTERLY') discount = (100 - activePromotion.quarterly_discount) / 100;
         else if (billingCycle === 'ANNUAL') discount = (100 - activePromotion.annual_discount) / 100;
      }
      
      selectedModules.forEach(modType => {
        const mod = pricing.modules.find((m: any) => m.type === modType);
        if (mod) total += (mod.price * multiplier * discount);
      });
    }
    
    return Math.round(total);
  };

  const calculateOriginalTotal = () => {
    let total = 0;
    const multiplier = billingCycle === 'ANNUAL' ? 12 : billingCycle === 'QUARTERLY' ? 3 : 1;

    const monthlyPlanType = businessFocus === 'BASIC' ? 'SERVICE_MONTHLY' : 'MONTHLY';
    const monthlyPlan = pricing.plans.find((p: any) => p.type === monthlyPlanType);
    if (monthlyPlan) total += (monthlyPlan.price * multiplier);
    
    if (businessFocus === 'GROWING') {
      selectedModules.forEach(modType => {
        const mod = pricing.modules.find((m: any) => m.type === modType);
        if (mod) total += (mod.price * multiplier);
      });
    }
    
    return Math.round(total);
  };

  const selectedPlanName = pricing.plans.find((p: any) => p.type === selectedPlan)?.name || 'Select a plan';

  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Navbar />

      <main className="pt-32 pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-black text-secondary tracking-tight mb-6">Transparent <span className="text-primary italic">Pricing.</span></h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">Choose the perfect plan for your business scale and power it up with specialized extensions.</p>
            
            <div className="bg-white p-1.5 rounded-2xl inline-flex shadow-sm border border-slate-100 mb-8">
              {[
                { id: 'MONTHLY' as BillingCycle, label: 'Monthly', tag: null },
                { id: 'QUARTERLY' as BillingCycle, label: 'Quarterly', tag: 'Save 10%' },
                { id: 'ANNUAL' as BillingCycle, label: 'Annual', tag: 'Save 15%' },
              ].map((cycle) => (
                <button
                  key={cycle.id}
                  type="button"
                  onClick={() => setBillingCycle(cycle.id)}
                  className={`px-8 py-4 rounded-xl text-sm font-bold transition-all relative ${
                    billingCycle === cycle.id
                      ? 'bg-secondary text-white shadow-md'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {cycle.label}
                  {cycle.tag && (
                    <span className={`absolute -top-2 -right-2 text-white text-[10px] font-black py-0.5 px-2 rounded-full transition-all ${
                        billingCycle === cycle.id ? "bg-primary opacity-100 scale-100" : "bg-slate-400 opacity-0 scale-75"
                    }`}>{cycle.tag}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="max-w-2xl mx-auto p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-4 shadow-sm text-left mb-12">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 flex-shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-700">Software License Only</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  All prices displayed are for the BETADAY <strong>software license only</strong> and do not include hardware (POS terminals, printers, etc.).
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="flex-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Industry Type</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Store size={18} />
                </div>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none font-bold cursor-pointer shadow-sm"
                >
                  <option value="RESTAURANT">Restaurant / Cafe</option>
                  <option value="BAR">Bar</option>
                  <option value="LOUNGE">Lounge</option>
                  <option value="SUPERMARKET">Supermarket</option>
                  <option value="RETAIL">Retail Store</option>
                  <option value="FUEL_STATION">Fuel Station</option>
                  <option value="LPG_STATION">LPG Station</option>
                  <option value="BAKERY">Bakery</option>
                  <option value="HOTEL">Hotel</option>
                  <option value="PHARMACY">Pharmacy</option>
                  <option value="CLINIC">Clinic</option>
                  <option value="BOUTIQUE">Boutique</option>
                  <option value="OTHER">Other Industry</option>
                </select>
              </div>
            </div>

            <div className="flex-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Business Focus</label>
              <div className="flex p-1 bg-white rounded-2xl border border-slate-100 shadow-sm h-[60px]">
                <button
                  onClick={() => setBusinessFocus('GROWING')}
                  className={cn(
                    "flex-1 rounded-xl text-sm font-bold transition-all",
                    businessFocus === 'GROWING' ? "bg-secondary text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
                  )}
                >
                  Growing Business
                </button>
                <button
                  onClick={() => setBusinessFocus('BASIC')}
                  className={cn(
                    "flex-1 rounded-xl text-sm font-bold transition-all",
                    businessFocus === 'BASIC' ? "bg-secondary text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
                  )}
                >
                  Starter / Basic
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><Rocket size={24} /></div>
                <h2 className="text-3xl font-black text-secondary">Core Subscriptions</h2>
              </div>
              <PricingPlanSelector 
                plans={pricing.plans}
                selectedPlan={selectedPlan}
                onSelectPlan={setSelectedPlan}
                billingCycle={billingCycle}
                businessFocus={businessFocus}
              />
            </section>

            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600"><Zap size={24} /></div>
                <h2 className="text-3xl font-black text-secondary">Premium Power-Ups</h2>
              </div>
              <PricingModuleSelector 
                modules={pricing.modules}
                selectedModules={selectedModules}
                onSelectModule={(type) => {
                  if (selectedModules.includes(type)) {
                    setSelectedModules(selectedModules.filter(m => m !== type));
                  } else {
                    setSelectedModules([...selectedModules, type]);
                  }
                }}
                billingCycle={billingCycle}
                businessFocus={businessFocus}
                businessType={businessType}
                businessTypeModules={BUSINESS_TYPE_MODULES}
              />

              <div className="mt-12 p-10 rounded-[3rem] bg-gradient-to-br from-secondary to-slate-800 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 blur-[80px]" />
                 <h4 className="text-2xl font-black mb-3 italic">14 Days Free Experience</h4>
                 <p className="text-slate-400 text-base mb-8 leading-relaxed">Trial every core feature and power-up for 14 days. Zero commitment. Full performance activation in minutes.</p>
                 <Link href="/get-started" className="inline-flex items-center gap-3 font-black text-primary hover:gap-6 transition-all uppercase text-sm tracking-[0.2em]">
                    Claim Your Trial <ArrowRight size={20} />
                 </Link>
              </div>
            </section>
          </div>

          <div className="mt-32 pt-32 border-t border-slate-100">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <span className="text-xs font-black text-primary uppercase tracking-[0.4em]">Zero-Trust Standard</span>
              <h2 className="text-5xl font-black text-secondary tracking-tighter mt-4 mb-6 uppercase italic">Full Comparison <span className="text-primary italic">Index.</span></h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed italic">
                 A transparent breakdown of how BETADAY scales with your business ambitions - from a single terminal to a multi-city enterprise.
              </p>
            </div>
            <PricingComparisonTable billingCycle={billingCycle} />
          </div>
        </div>
      </main>

      <PricingSummary 
        businessFocus={businessFocus}
        selectedPlanName={selectedPlanName}
        selectedModulesCount={selectedModules.length}
        billingCycle={billingCycle}
        originalTotal={calculateOriginalTotal()}
        billingTotal={calculateBillingTotal()}
      />

      <div className="border-y border-slate-100 bg-[#fcfdfe] py-16">
         <div className="max-w-7xl mx-auto px-8 text-center mb-10">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Zero-Trust Reconciliation Partners</span>
         </div>
         <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center lg:justify-between items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
            {['OPAY', 'MONNIFY', 'MONIEPOINT', 'PALMPAY', 'BANK TRANSFERS'].map(brand => (
              <span key={brand} className="text-3xl font-black italic tracking-tighter text-secondary">{brand}</span>
            ))}
         </div>
      </div>

      <footer className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 font-bold text-sm text-center md:text-left">
           <p>&copy; 2026 BETADAY TECHNOLOGIES. BUILT FOR SCALE.</p>
           <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
