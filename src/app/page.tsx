'use client';

import Navbar from '@/components/Navbar';
import { 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Store, 
  Users, 
  CheckCircle2,
  PieChart,
  Rocket,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  BookOpen,
  AlertTriangle,
  Bell,
  Utensils,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { ReferralService } from '@/services/referral.service';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Tag, X, Sparkles } from 'lucide-react';

const DEADLINE = new Date('2026-03-14T23:59:00+01:00'); // WAT is UTC+1
const START_DATE = new Date('2026-03-01T00:00:00+01:00');

const IS_PROMO_ENABLED = true;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingPage() {
  const [commSettings, setCommSettings] = useState<any>(null);
  const [activePromotion, setActivePromotion] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number, isExpired: boolean, isStarted: boolean } | null>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [hasShownPromoModal, setHasShownPromoModal] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
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

  useEffect(() => {
    ReferralService.getSettings().then(setCommSettings).catch(() => {});
    
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://betadaypos.onrender.com/api/v1';
        const cleanBaseUrl = baseUrl.endsWith('/api/v1') ? baseUrl : `${baseUrl}/api/v1`;
        const promoRes = await fetch(`${cleanBaseUrl}/active-promotion`);
        if (promoRes.ok) {
           const promo = await promoRes.json();
           setActivePromotion(promo);
        }
      } catch (err) {
        console.error("Data load error:", err);
      }
    };
    fetchData();
  }, []);

  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(headlineRef.current, { y: 100, opacity: 0, duration: 1, ease: "power4.out" })
        .from(subheadlineRef.current, { y: 50, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.8")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfdfe]" ref={heroRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-200/20 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
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
                <Link 
                  href="/pricing"
                  className="w-full sm:w-auto px-10 py-6 bg-secondary text-white rounded-2xl font-black text-lg hover:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] hover:-translate-y-1.5 transition-all flex items-center justify-center gap-4 group relative overflow-hidden active:scale-95"
                >
                  <span className="relative z-10">Choose Your Plan</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link href="#features" className="w-full sm:w-auto px-10 py-6 border-2 border-slate-100 bg-white text-secondary rounded-2xl font-black text-lg hover:border-primary hover:text-primary transition-all active:scale-95 text-center">
                  Explore Ecosystem
                </Link>
              </div>

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
                       <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none" />
                    </div>

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
                 </div>
               </motion.div>
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

      {/* Pricing Preview Section */}
      <section id="pricing" className="hidden py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-secondary tracking-tight mb-6">Simple <span className="text-primary italic">Pricing.</span> Extreme Power.</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">Choose a base plan that fits your scale. Scalable for single shops to multi-location enterprises.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                name: 'Essential', 
                price: '30,000', 
                period: '30 Days', 
                desc: 'Perfect for single stores and growing businesses.',
                features: ['3 Staff Members', '300 Products', 'Core Reports', 'Cloud Sync']
              },
              { 
                name: 'Professional', 
                price: '81,000', 
                period: '90 Days', 
                popular: true,
                desc: 'Advanced control for high-volume retailers.',
                features: ['7 Staff Members', '1,500 Products', 'Audit Logs', 'Inventory Alerts']
              },
              { 
                name: 'Enterprise', 
                price: '300,000', 
                period: '365 Days', 
                desc: 'Full-scale solution for large enterprises.',
                features: ['15+ Staff Members', '5,000+ Products', 'Custom Reports', 'Multi-Store Sync']
              }
            ].map((plan, i) => (
              <div key={i} className={cn(
                "p-10 rounded-[3rem] bg-white border-2 flex flex-col items-center text-center transition-all hover:-translate-y-2",
                plan.popular ? "border-primary shadow-2xl relative scale-105 z-10" : "border-slate-100 shadow-sm"
              )}>
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black py-2 px-6 rounded-full uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-black text-secondary mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-primary">₦{plan.price}</span>
                  <span className="text-slate-400 font-bold ml-1 uppercase text-xs tracking-widest">/ {plan.period}</span>
                </div>
                <p className="text-slate-500 mb-8 text-sm italic">{plan.desc}</p>
                <div className="w-full space-y-4 mb-10">
                  {plan.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                      <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
                <Link 
                  href="/pricing" 
                  className={cn(
                    "w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all",
                    plan.popular ? "bg-primary text-secondary shadow-xl shadow-primary/20" : "bg-secondary text-white hover:bg-slate-800"
                  )}
                >
                  View Plan Details
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-500 font-bold mb-6">Need a custom configuration or specialized modules?</p>
            <Link href="/pricing" className="inline-flex items-center gap-3 px-10 py-5 bg-white border-2 border-slate-100 text-secondary rounded-2xl font-black hover:border-primary hover:text-primary transition-all group">
              Explore All Plans & Modules 
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
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
               { icon: Cpu, title: 'Zero Delay Checkout', desc: 'Lightning fast sales processing. Never keep a customer waiting, even during peak hours.' },
               { icon: BarChart3, title: 'Control from Anywhere', desc: 'Monitor your shop, track sales, and manage stock from your phone, wherever you are.' },
               { icon: ShieldCheck, title: 'Safe & Secure Data', desc: 'Your business records are encrypted and backed up instantly. No more lost receipts.' },
               { icon: PieChart, title: 'Smart Stock Alerts', desc: 'Get notified before you run out of products. Automatic restock reminders keep your shelves full.' },
               { icon: Users, title: 'Staff Monitoring', desc: 'Assign roles to your team. Track who sold what and when, with full audit logs.' },
               { icon: Zap, title: 'Instant Payments', desc: 'Accept cards and transfers. Get your funds settled into your bank account without delays.' },
               { icon: AlertTriangle, title: 'Stop Missing Money', desc: 'Real-time monitoring of refunds and price changes. Block unauthorized access to your cash.' },
               { icon: Bell, title: 'Real-time Updates', desc: 'Get instant WhatsApp alerts for every critical action in your business.' },
               { icon: Utensils, title: 'Profit Control', desc: 'Track every single naira spent and earned. Know exactly which products are making you profit.' },
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
                    <Link href={`/features#${feat.title.toLowerCase().replace(/\s+/g, '-')}`} className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-2 text-primary font-black text-sm group-hover:gap-3 transition-all cursor-pointer">
                       SEE HOW IT WORKS <ArrowUpRight size={18} />
                    </Link>
                  </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4">Tailored for You</div>
              <h2 className="text-5xl lg:text-7xl font-black tracking-tight leading-[0.9]">Built for every <br /> <span className="text-primary italic">Industry.</span></h2>
            </div>
            <p className="text-xl text-slate-400 max-w-sm">From restaurants to retail, BETADAY is optimized for your specific business workflow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: 'Restaurants & Bars', 
                slug: 'restaurant',
                desc: 'Table management, KDS, and recipe cost tracking.',
                icon: Utensils,
                color: 'bg-orange-500'
              },
              { 
                name: 'Supermarkets', 
                slug: 'supermarket',
                desc: 'Bulk inventory, barcode scaling, and fast checkout.',
                icon: Store,
                color: 'bg-emerald-500'
              },
              { 
                name: 'Electronics & Gadgets', 
                slug: 'electronics',
                desc: 'Serial number tracking and warranty management.',
                icon: Cpu,
                color: 'bg-blue-500'
              },
              { 
                name: 'Pharmacies', 
                slug: 'pharmacy',
                desc: 'Expiry date alerts and prescription management.',
                icon: ShieldCheck,
                color: 'bg-red-500'
              },
              { 
                name: 'Fuel & LPG Stations', 
                slug: 'fuel-station',
                desc: 'Round tracking and bulk commodity management.',
                icon: Zap,
                color: 'bg-amber-500'
              },
              { 
                name: 'Boutiques & Fashion', 
                slug: 'fashion',
                desc: 'Size/Color variants and customer loyalty tracking.',
                icon: Tag,
                color: 'bg-pink-500'
              }
            ].map((industry, i) => (
              <Link 
                key={i} 
                href={`/industries/${industry.slug}`}
                className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all block relative"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform", industry.color)}>
                  <industry.icon size={28} />
                </div>
                <h3 className="text-2xl font-black mb-3">{industry.name}</h3>
                <p className="text-slate-400 font-medium mb-8">{industry.desc}</p>
                <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  Read More <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
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

      {/* Installer CTA Section */}
      <section className="relative py-32 bg-primary">
        <div className="absolute inset-0 bg-slate-900/5 mix-blend-overlay" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">Become a <span className="italic text-secondary">Beta Partner.</span></h2>
          <p className="text-2xl text-white/80 mb-14 max-w-3xl mx-auto font-medium leading-relaxed">
            Help digitalize the next generation of retailers. Secure a {commSettings?.enable_renewal_commission ? 'lifetime' : 'one-time'} commission on every business you onboard.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Link 
              href="/installer" 
              className="px-14 py-6 bg-secondary text-white rounded-[2rem] font-black text-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-2 active:translate-y-0 transition-all shadow-2xl"
            >
              Start Earning Now
            </Link>
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
                  <Link 
                    href="/pricing"
                    onClick={() => setShowPromoModal(false)}
                    className="w-full py-6 bg-secondary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:shadow-2xl hover:shadow-secondary/20 transition-all flex items-center justify-center gap-4 group active:scale-95"
                  >
                    Activate Pre-Launch Savings
                    <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />
                  </Link>
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
