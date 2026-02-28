'use client';

import Navbar from '@/components/Navbar';
import { 
  BarChart3, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  ArrowRight, 
  Store, 
  Users, 
  CheckCircle2,
  PieChart,
  HardDrive,
  Rocket,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  BookOpen,
  AlertTriangle,
  Bell,
  Utensils,
  Check,
  LayoutDashboard,
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import { ReferralService } from '@/services/referral.service';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Tag, X, Sparkles } from 'lucide-react';

const DEADLINE = new Date('2026-03-14T23:59:00+01:00'); // WAT is UTC+1
const START_DATE = new Date('2026-03-01T00:00:00+01:00');

const IS_PROMO_ENABLED = true;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type BillingCycle = 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';

const BUSINESS_TYPE_MODULES: Record<string, { recommended: string[], visible: string[] }> = {
  RESTAURANT: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'DIGITAL_MENU_QR'],
    visible: ['RECIPE_MANAGEMENT', 'KITCHEN_DISPLAY'],
  },
  BAR: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'DIGITAL_MENU_QR', 'TABLE_MANAGEMENT', 'SAVE_DRAFTS'],
    visible: ['RECIPE_MANAGEMENT'],
  },
  LOUNGE: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'DIGITAL_MENU_QR', 'TABLE_MANAGEMENT', 'SAVE_DRAFTS'],
    visible: ['RECIPE_MANAGEMENT', 'KITCHEN_DISPLAY'],
  },
  SUPERMARKET: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE'],
    visible: ['WHATSAPP_ALERTS'],
  },
  RETAIL: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE'],
    visible: ['WHATSAPP_ALERTS'],
  },
  BOUTIQUE: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE'],
    visible: ['WHATSAPP_ALERTS'],
  },
  PHARMACY: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE'],
    visible: ['WHATSAPP_ALERTS'],
  },
  CLINIC: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE'],
    visible: ['WHATSAPP_ALERTS'],
  },
  BAKERY: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'RECIPE_MANAGEMENT'],
    visible: ['KITCHEN_DISPLAY'],
  },
  HOTEL: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'TABLE_MANAGEMENT', 'SAVE_DRAFTS', 'DIGITAL_MENU_QR'],
    visible: ['KITCHEN_DISPLAY', 'RECIPE_MANAGEMENT'],
  },
  FUEL_STATION: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'BULK_STOCK_MANAGEMENT'],
    visible: ['WHATSAPP_ALERTS'],
  },
  LPG_STATION: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE', 'BULK_STOCK_MANAGEMENT'],
    visible: ['WHATSAPP_ALERTS'],
  },
  OTHER: {
    recommended: ['ADVANCED_INVENTORY', 'AUTOMATED_COMPLIANCE'],
    visible: ['WHATSAPP_ALERTS', 'SAVE_DRAFTS'],
  }
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

export default function LandingPage() {
  const [commSettings, setCommSettings] = useState<any>(null);
  const [pricing, setPricing] = useState<any>(FALLBACK_PRICING);
  const [activePromotion, setActivePromotion] = useState<any>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('MONTHLY');
  const [businessFocus, setBusinessFocus] = useState<'GROWING' | 'BASIC'>('GROWING');
  const [businessType, setBusinessType] = useState<string>('RESTAURANT');
  const [selectedPlan, setSelectedPlan] = useState<string | null>('MONTHLY');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number, isExpired: boolean, isStarted: boolean } | null>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [hasShownPromoModal, setHasShownPromoModal] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      
      // Use dynamic dates from activePromotion if available, otherwise fallback
      const deadline = activePromotion ? new Date(activePromotion.end_date) : DEADLINE;
      const startDate = activePromotion ? new Date(activePromotion.start_date) : START_DATE;

      const difference = deadline.getTime() - now.getTime();
      const isExpired = difference <= 0;
      const isStarted = now.getTime() >= startDate.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false,
          isStarted
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, isStarted: false });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [activePromotion]);

  useEffect(() => {
    if (timeLeft?.isExpired || hasShownPromoModal) return;

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50 && !hasShownPromoModal) {
        setShowPromoModal(true);
        setHasShownPromoModal(true);
      }
    };

    const timeTrigger = setTimeout(() => {
      if (!hasShownPromoModal) {
        setShowPromoModal(true);
        setHasShownPromoModal(true);
      }
    }, 20000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeTrigger);
    };
  }, [timeLeft, hasShownPromoModal]);

  const calculateBillingTotal = () => {
    let total = 0;
    
    // Base Plan
    let planType = selectedPlan;
    if (businessFocus === 'BASIC') {
      planType = billingCycle === 'ANNUAL' ? 'SERVICE_ANNUAL' : billingCycle === 'QUARTERLY' ? 'SERVICE_QUARTERLY' : 'SERVICE_MONTHLY';
    }
    const plan = pricing.plans.find((p: any) => p.type === planType);
    if (plan) total += plan.price;
    
    // Modules
    if (businessFocus === 'GROWING') {
      const multiplier = billingCycle === 'ANNUAL' ? 12 : billingCycle === 'QUARTERLY' ? 3 : 1;
      
      // Dynamic discount from promotion
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

    // Base Plan original (Monthly price * multiplier)
    const monthlyPlanType = businessFocus === 'BASIC' ? 'SERVICE_MONTHLY' : 'MONTHLY';
    const monthlyPlan = pricing.plans.find((p: any) => p.type === monthlyPlanType);
    if (monthlyPlan) total += (monthlyPlan.price * multiplier);
    
    // Modules original (Monthly price * multiplier)
    if (businessFocus === 'GROWING') {
      selectedModules.forEach(modType => {
        const mod = pricing.modules.find((m: any) => m.type === modType);
        if (mod) total += (mod.price * multiplier);
      });
    }
    
    return Math.round(total);
  };

  useEffect(() => {
    ReferralService.getSettings().then(setCommSettings).catch(() => {});
    
    // Fetch public pricing and active promotion
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://betadaypos.onrender.com/api/v1';
        const cleanBaseUrl = baseUrl.endsWith('/api/v1') ? baseUrl : `${baseUrl}/api/v1`;
        
        console.log("Fetching landing data from:", cleanBaseUrl);
        
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
               setSelectedPlan(data.plans[0].type);
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

  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    if (!pricing) return;

    // GSAP Scroll Animations
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline();
      tl.from(headlineRef.current, { y: 100, opacity: 0, duration: 1, ease: "power4.out" })
        .from(subheadlineRef.current, { y: 50, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.8")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");

      // Pricing Stagger
      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: "#pricing",
          start: "top 75%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.2)",
        clearProps: "all" // Ensure styles are cleared after animation
      });

    }, heroRef);

    return () => ctx.revert();
  }, [pricing]); // Re-run when pricing data updates

  return (
    <div className="min-h-screen bg-[#fcfdfe]" ref={heroRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-200/20 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Content Column */}
            <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
              {/* Launch Offer Badge */}
              {IS_PROMO_ENABLED && timeLeft && !timeLeft.isExpired && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-50/80 backdrop-blur-md border border-amber-100 shadow-xl shadow-amber-500/5 mb-8 group cursor-default transition-all hover:border-amber-200"
                >
                  <Rocket size={16} className="text-amber-600 animate-pulse group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] sm:text-xs font-black text-amber-700 uppercase tracking-[0.2em] flex items-center gap-2">
                    {activePromotion ? activePromotion.name : 'Exclusive Launch Offer'}
                    <span className="text-amber-300 mx-1">•</span> 
                    {timeLeft.isExpired ? 'Offer Ended' : `Ending ${activePromotion ? new Date(activePromotion.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Mar 14'}`}
                  </span>
                </motion.div>
              )}

              <h1 ref={headlineRef} className="text-4xl lg:text-[5.5rem] font-black text-secondary tracking-tighter mb-8 leading-[0.85] uppercase">
                Not Just a <span className="text-primary italic">POS.</span><br />
                <span className="text-secondary italic relative block mt-2">
                   Total Business Control.
                   <svg className="absolute -bottom-4 left-0 w-64 md:w-full" height="12" viewBox="0 0 100 8" preserveAspectRatio="none">
                     <motion.path 
                       d="M0 5 Q50 8 100 5" 
                       stroke="#0d9488" 
                       strokeWidth="4" 
                       fill="none"
                       initial={{ pathLength: 0 }}
                       animate={{ pathLength: 1 }}
                       transition={{ duration: 1.5, delay: 1 }}
                     />
                   </svg>
                </span>
              </h1>
              
              <p ref={subheadlineRef} className="max-w-2xl mx-auto lg:mx-0 text-lg lg:text-xl text-slate-500 font-medium mb-12 leading-relaxed">
                Run your business with real-time inventory control, compliance reporting,
                staff monitoring, and bulk stock tracking — engineered for high-growth merchants.
              </p>

              <div className="hero-cta flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6 mb-12">
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-10 py-6 bg-secondary text-white rounded-2xl font-black text-lg hover:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] hover:-translate-y-1.5 transition-all flex items-center justify-center gap-4 group relative overflow-hidden active:scale-95"
                >
                  <span className="relative z-10">Activate Your License</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <Link href="#features" className="w-full sm:w-auto px-10 py-6 border-2 border-slate-100 bg-white text-secondary rounded-2xl font-black text-lg hover:border-primary hover:text-primary transition-all active:scale-95 text-center">
                  Explore Ecosystem
                </Link>
              </div>

              {/* Mini Offer Highlights */}
              {IS_PROMO_ENABLED && timeLeft && !timeLeft.isExpired && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 border-t border-slate-100 pt-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                      <Tag size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Limited Offer</p>
                      <p className="text-sm font-black text-slate-900 leading-tight">
                        Up to {activePromotion ? activePromotion.annual_discount : 40}% OFF Plans
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <Clock size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ending In</p>
                      <p className="text-sm font-black text-slate-900 leading-tight">
                        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Visual Column */}
            <div className="flex-1 relative w-full pt-10 lg:pt-0">
               <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="relative perspective-lg"
               >
                 <div className="relative transform lg:rotate-[-4deg] lg:hover:rotate-0 transition-transform duration-1000">
                    <div className="relative rounded-[2.5rem] p-2 bg-gradient-to-br from-primary/20 to-amber-500/20 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.2)] border border-white/50 overflow-hidden">
                       <img 
                        src="/dashboard_preview.png" 
                        alt="BETADAY Dashboard" 
                        className="w-full rounded-[2.1rem] shadow-sm transform hover:scale-[1.02] transition-transform duration-700"
                        style={{ objectFit: 'cover' }}
                       />
                       
                       {/* Overlay Elements */}
                       <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Floating Indicators */}
                    <motion.div 
                      animate={{ y: [0, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      className="absolute -top-6 -right-6 lg:-top-10 lg:-right-10 bg-white p-5 rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4 animate-fade-in"
                    >
                       <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                          <TrendingUp size={24} />
                       </div>
                       <div className="text-left">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Revenue</p>
                          <p className="text-2xl font-black text-slate-900">+₦1.2M <span className="text-[10px] text-emerald-500 italic ml-1">Today</span></p>
                       </div>
                    </motion.div>

                    <motion.div 
                      animate={{ y: [0, 15, 0] }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                      className="absolute -bottom-6 -left-6 lg:-bottom-10 lg:-left-10 bg-secondary p-5 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-4"
                    >
                       <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center">
                          <ShieldCheck size={24} />
                       </div>
                       <div className="text-left">
                          <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest">Security Status</p>
                          <p className="text-sm font-black text-white italic">Audit Guard Active</p>
                       </div>
                    </motion.div>

                    <motion.div 
                      animate={{ x: [0, 20, 0] }}
                      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
                      className="absolute top-1/2 -left-12 lg:-left-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white hidden xl:flex items-center gap-3"
                    >
                       <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                          <Users size={16} />
                       </div>
                       <div className="text-left">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Customer Loyalty</p>
                          <p className="text-xs font-black text-slate-900">88% Retention Rate</p>
                       </div>
                    </motion.div>
                 </div>
               </motion.div>

               {/* Countdown Timer Under Image */}
               {IS_PROMO_ENABLED && timeLeft && !timeLeft.isExpired && (
                 <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1.5 }}
                   className="mt-16 flex items-center justify-center lg:justify-end gap-5"
                 >
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hidden sm:block">Launch Offer Ends In:</p>
                   <div className="flex items-center gap-3">
                     {[
                       { label: 'Days', value: timeLeft.days },
                       { label: 'Hrs', value: timeLeft.hours },
                       { label: 'Min', value: timeLeft.minutes },
                       { label: 'Sec', value: timeLeft.seconds },
                     ].map((unit, i) => (
                       <div key={i} className="flex flex-col items-center">
                         <div className="w-14 h-16 bg-white shadow-xl shadow-slate-200/50 rounded-2xl flex items-center justify-center border border-slate-100">
                           <span className="text-2xl font-black text-secondary">{unit.value.toString().padStart(2, '0')}</span>
                         </div>
                         <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2">{unit.label}</span>
                       </div>
                     ))}
                   </div>
                 </motion.div>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-slate-100 bg-white py-12">
         <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center lg:justify-between items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
            {['ZENITH', 'STRIPE', 'PAYSTACK', 'MASTERCARD', 'VISA'].map(brand => (
              <span key={brand} className="text-2xl font-black italic tracking-tighter text-secondary">{brand}</span>
            ))}
         </div>
      </div>

      {/* Pricing & Power-Ups Section */}
      <section id="pricing" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-secondary tracking-tight mb-6 text-center">Simple <span className="text-primary italic">Pricing.</span> Extreme Power.</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">Choose a plan that fits your scale, and power up with specialized modules as you grow.</p>
            
            {/* Billing Cycle Toggle */}
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
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all relative ${
                    billingCycle === cycle.id
                      ? 'bg-secondary text-white shadow-md'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {cycle.label}
                  {cycle.tag && (
                    <span className={`absolute -top-2 -right-2 text-white text-[8px] font-black py-0.5 px-2 rounded-full transition-all ${
                        billingCycle === cycle.id ? "bg-primary opacity-100 scale-100" : "bg-slate-400 opacity-0 scale-75"
                    }`}>{cycle.tag}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Access Anywhere Banner */}
            <div className="max-w-xl mx-auto mb-12 flex flex-col items-center gap-4">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full text-xs font-black uppercase tracking-widest border border-primary/10">
                  One license. Use on any device — mobile, desktop, or web.
               </div>
               <p className="text-[10px] text-slate-400 font-bold italic uppercase tracking-wider text-center">Access is based on the number of users, not devices.</p>
            </div>

            {/* Software License Disclaimer */}
            <div className="max-w-2xl mx-auto p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-sm text-left">
              <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 flex-shrink-0 mt-0.5">
                <AlertTriangle size={16} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-700">Software License Only</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  All prices displayed are for the BETADAY <strong>software license only</strong> and do not include the cost of hardware (POS terminals, printers, barcode scanners, etc.). Hardware costs vary by setup — please contact your installer or sales representative for a customized quote.
                </p>
              </div>
            </div>
          </div>

            {/* Business Type Selector */}
            <div className="max-w-md mx-auto mb-8 space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Your Industry</label>
               <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Store size={16} />
                 </div>
                 <select
                   value={businessType}
                   onChange={(e) => setBusinessType(e.target.value)}
                   className="block w-full pl-10 pr-3 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none font-bold cursor-pointer text-sm shadow-sm"
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

            {/* Business Focus Toggle */}
            <div className="flex flex-col md:flex-row gap-4 mb-16 p-1 bg-white rounded-2xl md:max-w-md mx-auto shadow-sm border border-slate-100 relative z-10">
             <button
              type="button"
              onClick={() => {
                setBusinessFocus('GROWING');
                // Reset plan to standard if switching to growing
                setSelectedPlan('MONTHLY');
              }}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all",
                businessFocus === 'GROWING' ? "bg-secondary text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
              )}
             >
              Growing Business
             </button>
             <button
              type="button"
              onClick={() => {
                setBusinessFocus('BASIC');
                // Reset plan to service if switching to basic
                setSelectedPlan('SERVICE_MONTHLY');
              }}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all",
                businessFocus === 'BASIC' ? "bg-secondary text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
              )}
             >
              Starter / Basic
             </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative pb-32">
            {/* Base Plans */}
            <div>
              <h3 className="text-2xl font-black text-secondary mb-10 flex items-center gap-4">
                 <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><Rocket size={20} /></div>
                 Core Subscription Plans
              </h3>
              <div className="space-y-6">
                 {(() => {
                   const filtered = (pricing?.plans || []).filter((plan: any) => {
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
                   
                   const plansToShow = filtered.length > 0 ? filtered : (pricing?.plans || []);
                   
                   return plansToShow.map((plan: any) => {
                    const isSelected = selectedPlan === plan.type;
                    return (
                      <div 
                        key={plan.type} 
                        onClick={() => setSelectedPlan(plan.type)}
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
                   });
                 })()}
              </div>
            </div>

            {/* Optional Modules */}
            <div>
              <h3 className="text-2xl font-black text-secondary mb-10 flex items-center gap-4">
                 <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-600"><Zap size={20} /></div>
                 Premium Power-Ups
              </h3>
              
              {businessFocus === 'BASIC' ? (
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
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(() => {
                   const config = BUSINESS_TYPE_MODULES[businessType] || BUSINESS_TYPE_MODULES.OTHER;
                   const filteredModules = (pricing?.modules || []).filter((mod: any) => 
                      config.recommended.includes(mod.type) || config.visible.includes(mod.type)
                   );

                   if (pricing?.modules?.length > 0 && filteredModules.length === 0) {
                      return (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-white">
                           <p className="text-slate-400 font-bold">Comprehensive standard POS features included.</p>
                           <p className="text-[10px] text-slate-300 uppercase tracking-widest mt-2">No specialized add-ons required for this industry yet.</p>
                        </div>
                      );
                   }

                   return filteredModules.map((mod: any) => {
                      const isRecommended = config.recommended.includes(mod.type);
                      const multiplier = billingCycle === 'ANNUAL' ? 12 : billingCycle === 'QUARTERLY' ? 3 : 1;
                      const discount = billingCycle === 'ANNUAL' ? 0.85 : billingCycle === 'QUARTERLY' ? 0.9 : 1;
                      const displayPrice = Math.round(mod.price * multiplier * discount);
                      const isSelected = selectedModules.includes(mod.type);

                      return (
                        <div 
                          key={mod.type} 
                          onClick={() => {
                            if (isSelected) {
                              setSelectedModules(selectedModules.filter(m => m !== mod.type));
                            } else {
                              setSelectedModules([...selectedModules, mod.type]);
                            }
                          }}
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
                   });
                })()}
              </div>
              )}
              
              <div className="mt-10 p-8 rounded-[2.5rem] bg-gradient-to-br from-secondary to-slate-800 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl" />
                 <h4 className="text-xl font-black mb-2 italic">14 Days Free Experience</h4>
                 <p className="text-slate-400 text-sm mb-6">Trial every single core feature and power-up for 14 days. Zero commitment. Full performance.</p>
                 <Link href="/get-started" className="inline-flex items-center gap-2 font-black text-primary hover:gap-4 transition-all uppercase text-xs tracking-widest">
                    Claim Your Trial <ArrowRight size={16} />
                 </Link>
              </div>
            </div>

            {/* Config Summary Bar - Floating or Fixed at bottom of section */}
            <div className="absolute bottom-0 left-0 w-full p-4 pointer-events-none">
              <div className="max-w-4xl mx-auto bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto border border-white/10 animate-slide-up">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                       <LayoutDashboard size={28} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Your Configuration Summary</p>
                       <p className="text-lg font-black tracking-tight leading-none">
                          {businessFocus === 'BASIC' ? 'Starter / Basic Plan' : (pricing.plans.find((p: any) => p.type === selectedPlan)?.name || 'Select a plan')}
                          {businessFocus === 'GROWING' && selectedModules.length > 0 && <span className="text-primary ml-1">+ {selectedModules.length} Power-Ups</span>}
                       </p>
                    </div>
                 </div>

                   <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-center md:text-right">
                       <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1">{billingCycle} Settlement Due</p>
                       <div className="flex flex-col items-center md:items-end">
                          {billingCycle !== 'MONTHLY' && (() => {
                             const original = calculateOriginalTotal();
                             const current = calculateBillingTotal();
                             const savings = original > 0 ? Math.round(((original - current) / original) * 100) : 0;
                             
                             return (
                               <div className="flex items-center gap-2 mb-1">
                                  <div className="flex flex-col items-end">
                                     <span className="text-[10px] font-bold text-slate-500 line-through opacity-70 relative -top-1">
                                        ₦{original.toLocaleString()}
                                     </span>
                                  </div>
                                  <span className="text-[9px] font-black bg-teal-500/10 text-teal-400 px-1.5 py-0.5 rounded-md uppercase">
                                     Save {savings}%
                                  </span>
                               </div>
                             );
                          })()}
                          <p className="text-3xl font-black tracking-tighter leading-tight">₦{calculateBillingTotal().toLocaleString()}</p>
                       </div>
                    </div>
                    <Link href="/get-started" className="px-8 py-4 bg-primary text-secondary rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                       Deploy Workspace
                    </Link>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4">Core Ecosystem</div>
            <h2 className="text-5xl lg:text-6xl font-black text-secondary tracking-tight mb-6 italic">Built for the <span className="text-primary">Ambitious</span></h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">No clutter. No lag. Just pure operational excellence across every touchpoint of your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {[
               { icon: Cpu, title: 'Edge Performance', desc: 'Lightning fast transaction processing that never keeps your customers waiting.' },
               { icon: BarChart3, title: 'Omni-Intelligence', desc: 'Real-time data synchronization between your physical stores and cloud dashboard.' },
               { icon: ShieldCheck, title: 'Vault Security', desc: 'Multi-layer encryption and biometric-ready authentication for total peace of mind.' },
               { icon: PieChart, title: 'Ghost Inventory', desc: 'Smart stock predictions that help you restock before you even run low.' },
               { icon: Users, title: 'Force Multiplier', desc: 'Powerful staff permissions that empower your team while keeping you in control.' },
               { icon: Zap, title: '1-Click Settlement', desc: 'Get your funds faster with our optimized payment rail integrations.' },
               { icon: AlertTriangle, title: 'Anti-Theft Guard', desc: 'Real-time void tracking and audit logs that instantly flag suspicious cashier activity.' },
               { icon: Bell, title: 'Live Pulse', desc: 'Instant notifications for critical events, shifts, and inventory alerts as they happen.' },
               { icon: Utensils, title: 'Recipe Matrix', desc: 'Advanced Bill of Materials (BOM) to track every gram of ingredient used in your sales.' },
             ].map((feat, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="feature-card p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:border-primary/30 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                    <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-primary shadow-sm mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                      <feat.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-secondary mb-4 tracking-tight">{feat.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-lg">{feat.desc}</p>
                    <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-2 text-primary font-black text-sm group-hover:gap-3 transition-all cursor-pointer">
                       LEARN MORE <ArrowUpRight size={18} />
                    </div>
                  </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section - Split Hybrid */}
      <section id="how-it-works" className="py-32 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 space-y-10 text-center lg:text-left relative z-10">
              <div className="inline-block px-5 py-2 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-black text-xs uppercase tracking-widest">Mobile Autonomy</div>
              <h2 className="text-5xl lg:text-7xl font-black leading-[0.9] tracking-tighter italic">Your Store. <br /> Your Rules. <br /> <span className="text-primary italic">Universal.</span></h2>
              <p className="text-xl text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Experience the zero-latency power of BETADAY POS on any mobile device. Fully offline capable, biometric-locked, and cloud-synced.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                 {['Offline Resilience', 'Biometric Auth', 'Thermal Printing'].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 font-black text-sm uppercase tracking-wider text-slate-300">
                     <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-secondary">
                        <CheckCircle2 size={14} />
                     </div>
                     {item}
                   </div>
                 ))}
              </div>
              <div className="flex gap-4 justify-center lg:justify-start">
                 <Link href="/get-started" className="px-8 py-4 bg-white text-secondary rounded-2xl font-black hover:scale-105 transition-all">App Store</Link>
                 <Link href="/get-started" className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-2xl font-black hover:scale-105 transition-all">Play Store</Link>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center lg:justify-end relative">
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-75 animate-pulse" />
              <img 
                src="/mobile_app.png" 
                alt="Mobile App" 
                className="w-full max-w-md relative z-10 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-4 border-slate-800" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Installer CTA Section - Hyper Impact */}
      <section className="relative py-32 bg-primary">
        <div className="absolute inset-0 bg-slate-900/5 mix-blend-overlay" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">Become a <span className="italic text-secondary">Beta Partner.</span></h2>
          <p className="text-2xl text-white/80 mb-14 max-w-3xl mx-auto font-medium leading-relaxed">
            Help digitalize the next generation of retailers. Secure a {commSettings?.enable_renewal_commission ? 'lifetime' : 'one-time'} commission of <span className="text-secondary font-black">{commSettings?.onboarding_rate || 20}%</span> on every business you onboard.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Link 
              href="/installer" 
              className="px-14 py-6 bg-secondary text-white rounded-[2rem] font-black text-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-2 active:translate-y-0 transition-all shadow-2xl"
            >
              Start Earning Now
            </Link>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-10 text-white/70 font-black uppercase text-xs tracking-[0.2em]">
             <div className="flex items-center gap-3">
               <ShieldCheck size={24} className="text-secondary" />
               Instant Payouts
             </div>
             <div className="flex items-center gap-3">
               <BookOpen size={24} className="text-secondary" />
               Partner Academy
             </div>
             <div className="flex items-center gap-3">
               <Users size={24} className="text-secondary" />
               Dedicated Manager
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Mini Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-slate-50 rounded-[4rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 border border-slate-100 shadow-sm">
              <div className="text-center lg:text-left max-w-xl">
                 <h2 className="text-4xl lg:text-5xl font-black text-secondary tracking-tighter mb-6">Common <span className="text-primary italic">Questions.</span></h2>
                 <p className="text-lg text-slate-500 font-medium mb-8">
                    Get quick answers to the most frequent inquiries about BETADAY POS ecosystems and deployments.
                 </p>
                 <Link href="/faq" className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:gap-6 transition-all">
                    View Full FAQ <ArrowRight size={18} />
                 </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-auto">
                 {[
                   { q: 'Is it fully offline?', a: 'Yes, offline performance is native.' },
                   { q: 'Can I use any device?', a: 'Mobile, Desktop, or Web ready.' },
                   { q: 'How many staff members?', a: 'Scalable up to thousands.' },
                   { q: 'Is my data backed up?', a: 'Instant real-time cloud sync.' }
                 ].map((item, i) => (
                   <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <p className="font-black text-secondary text-sm mb-2">{item.q}</p>
                      <p className="text-xs text-slate-400 font-bold">{item.a}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Final Footer */}
      <footer className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16">
           <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg shadow-primary/20">B</div>
                 <span className="font-black text-3xl text-secondary tracking-tighter italic">BETADAY</span>
              </div>
              <p className="text-slate-500 text-lg max-w-sm leading-relaxed">
                 Engineering the future of retail management through relentless innovation and human-centric design.
              </p>
           </div>
           
           <div className="space-y-6">
              <h4 className="font-black text-secondary uppercase text-xs tracking-widest">Ecosystem</h4>
              <ul className="space-y-4 text-slate-500 font-bold">
                 <li><Link href="/features#pos" className="hover:text-primary transition-colors">POS Terminal</Link></li>
                 <li><Link href="/features#inventory" className="hover:text-primary transition-colors">Inventory Suite</Link></li>
                 <li><Link href="/features#analytics" className="hover:text-primary transition-colors">Analytics Pro</Link></li>
                 <li><Link href="/faq" className="hover:text-primary transition-colors">Help Center / FAQ</Link></li>
              </ul>
           </div>

           <div className="space-y-6">
              <h4 className="font-black text-secondary uppercase text-xs tracking-widest">Inquire</h4>
              <ul className="space-y-4 text-slate-500 font-bold">
                 <li><Link href="/enterprise" className="hover:text-primary transition-colors">Enterprise</Link></li>
                 <li><Link href="/installer" className="hover:text-primary transition-colors">Affiliate</Link></li>
                 <li><Link href="/security" className="hover:text-primary transition-colors">Security</Link></li>
                 <li><Link href="mailto:support@betadaypos.com" className="hover:text-primary transition-colors">Support</Link></li>
              </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-24 pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 font-bold text-sm">
           <p>&copy; 2026 BETADAY TECHNOLOGIES. BUILT FOR SCALE.</p>
           <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-secondary">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-secondary">Terms of Service</Link>
           </div>
        </div>
      </footer>
      {/* Promotion Modal */}
      <AnimatePresence>
        {IS_PROMO_ENABLED && showPromoModal && timeLeft && !timeLeft.isExpired && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPromoModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative bg-white rounded-[3.5rem] w-full max-w-xl overflow-hidden shadow-[0_100px_100px_-50px_rgba(0,0,0,0.5)] p-0 text-center"
            >
              <div className="h-4 bg-amber-500 w-full" />
              <div className="px-10 pb-12 pt-16">
                <button 
                  onClick={() => setShowPromoModal(false)}
                  className="absolute top-8 right-8 p-3 text-slate-400 hover:text-slate-900 transition-all hover:bg-slate-50 rounded-full"
                >
                  <X size={20} />
                </button>

                <div className="w-20 h-20 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-500 mx-auto mb-8 shadow-inner">
                  <Sparkles size={36} />
                </div>

                <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-4 leading-[0.9] uppercase italic">
                  Launch Offer <br />
                  <span className="text-primary">EARLY ACCESS SAVINGS</span>
                </h3>
                
                <p className="text-slate-500 font-bold text-lg mb-10 leading-relaxed tracking-tight max-w-sm mx-auto">
                  Get <span className="text-primary font-black">20% off Quarterly</span> or <span className="text-primary font-black">40% off Annual</span> licenses during our March rollout.
                </p>

                <div className="space-y-4">
                  <button 
                    onClick={() => {
                      setShowPromoModal(false);
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-6 bg-secondary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:shadow-2xl hover:shadow-secondary/20 transition-all flex items-center justify-center gap-4 group active:scale-95"
                  >
                    Activate Pre-Launch Savings
                    <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />
                  </button>
                  <div className="flex justify-center gap-6 opacity-40">
                    <div className="flex flex-col"><span className="text-sm font-black text-slate-900">{timeLeft.days}D</span><span className="text-[7px] font-bold text-slate-400 uppercase">Days</span></div>
                    <div className="flex flex-col"><span className="text-sm font-black text-slate-900">{timeLeft.hours}H</span><span className="text-[7px] font-bold text-slate-400 uppercase">Hours</span></div>
                    <div className="flex flex-col"><span className="text-sm font-black text-slate-900">{timeLeft.minutes}M</span><span className="text-[7px] font-bold text-slate-400 uppercase">Min</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
