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
  Utensils
} from 'lucide-react';
import Link from 'next/link';
import { ReferralService } from '@/services/referral.service';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingPage() {
  const [commSettings, setCommSettings] = useState<any>(null);
  const [pricing, setPricing] = useState<any>({ plans: [], modules: [] });

  useEffect(() => {
    ReferralService.getSettings().then(setCommSettings).catch(() => {});
    
    // Fetch public pricing
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api/v1';
    const cleanBaseUrl = baseUrl.endsWith('/api/v1') ? baseUrl : `${baseUrl}/api/v1`;
    
    // Use the PUBLIC pricing endpoint (/pricing) instead of protected (/subscription/pricing)
    fetch(`${cleanBaseUrl}/pricing`)
      .then(res => res.ok ? res.json() : Promise.reject('Pricing fetch failed'))
      .then(data => {
        if (data && data.plans && data.modules) {
          setPricing(data);
        }
      })
      .catch((err) => console.error("Pricing error:", err));
  }, []);

  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
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
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)"
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfdfe]" ref={heroRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-200/20 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-xl shadow-teal-500/10 border border-teal-50 text-teal-700 text-sm font-black mb-10 uppercase tracking-wider"
          >
            <Rocket size={16} fill="currentColor" strokeWidth={0} className="animate-bounce" />
            The Future of Commerce is Here
          </motion.div>
          
          <h1 ref={headlineRef} className="text-6xl lg:text-8xl font-black text-secondary tracking-tighter mb-10 leading-[0.9]">
            Elevate Your <br />
            <span className="text-primary italic relative">
               Business
               <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                 <motion.path 
                   d="M0 5 Q50 8 100 5" 
                   stroke="currentColor" 
                   strokeWidth="4" 
                   fill="none"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 1, delay: 0.5 }}
                 />
               </svg>
            </span>
          </h1>
          
          <p ref={subheadlineRef} className="max-w-3xl mx-auto text-xl lg:text-2xl text-slate-500 font-medium mb-14 leading-relaxed">
            BETADAY is the hyper-efficient POS ecosystem that turns complex operations into seamless growth. Manage everything from the palm of your hand.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row justify-center items-center gap-6 mb-24">
            <Link 
              href="/get-started" 
              className="px-10 py-6 bg-secondary text-white rounded-3xl font-black text-xl hover:shadow-[0_20px_50px_rgba(15,23,42,0.3)] hover:-translate-y-2 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <span className="relative z-10">Start Your Freedom Trial</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <div className="flex items-center gap-4 text-slate-400 font-bold">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+100}`} alt="user" />
                  ))}
               </div>
               <span className="text-sm">Trusted by 1,200+ merchants</span>
            </div>
          </div>

          {/* Hero Image Container */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-6xl mx-auto px-4"
          >
            <div className="relative group">
               {/* Decorative elements */}
               <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-3xl -rotate-12 blur-2xl group-hover:rotate-0 transition-all duration-700" />
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl group-hover:scale-125 transition-all duration-700" />
               
               <div className="relative rounded-[3rem] p-2 bg-white shadow-[0_50px_100px_-20px_rgba(15,23,42,0.15)] border border-slate-100 overflow-hidden">
                  <img 
                    src="/dashboard_preview.png" 
                    alt="BETADAY Dashboard" 
                    className="w-full rounded-[2.5rem] shadow-sm transform group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  
                  {/* Floating Stats */}
                  <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white hidden lg:block"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                           <TrendingUp />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue Up</p>
                           <p className="text-2xl font-black text-slate-900">+42.8%</p>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
          </motion.div>
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
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-6xl font-black text-secondary tracking-tight mb-6">Simple <span className="text-primary italic">Pricing.</span> Extreme Power.</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Choose a plan that fits your scale, and power up with specialized modules as you grow.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Base Plans */}
            <div>
              <h3 className="text-2xl font-black text-secondary mb-10 flex items-center gap-4">
                 <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><Rocket size={20} /></div>
                 Core Subscription Plans
              </h3>
              <div className="space-y-6">
                 {pricing?.plans?.map((plan: any) => (
                   <div key={plan.type} className="pricing-card p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-black text-secondary">{plan.name}</h4>
                        <div className="text-right">
                          <p className="text-2xl font-black text-primary">₦{plan.price.toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">/ {plan.duration_days} DAYS</p>
                        </div>
                      </div>
                      <p className="text-slate-500 mb-6 text-sm">{plan.description || `Optimized for ${plan.user_limit} staff and ${plan.product_limit} products.`}</p>
                      <div className="flex flex-wrap gap-4">
                        <span className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-tighter">OFFLINE ACCESS</span>
                        <span className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-tighter">CLOUD SYNC</span>
                        <span className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-tighter">CORE REPORTS</span>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            {/* Optional Modules */}
            <div>
              <h3 className="text-2xl font-black text-secondary mb-10 flex items-center gap-4">
                 <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-600"><Zap size={20} /></div>
                 Premium Power-Ups
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pricing?.modules?.map((mod: any) => (
                   <div key={mod.type} className="pricing-card p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:border-teal-200 transition-all group">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-extrabold text-secondary text-sm">{mod.name}</h4>
                        <span className="text-xs font-black text-teal-600">₦{mod.price.toLocaleString()}/mo</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{mod.description}</p>
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-all">
                        <ArrowUpRight size={14} />
                      </div>
                   </div>
                ))}
              </div>
              
              <div className="mt-10 p-8 rounded-[2.5rem] bg-gradient-to-br from-secondary to-slate-800 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl" />
                 <h4 className="text-xl font-black mb-2 italic">14 Days Free Experience</h4>
                 <p className="text-slate-400 text-sm mb-6">Trial every single core feature and power-up for 14 days. Zero commitment. Full performance.</p>
                 <Link href="/get-started" className="inline-flex items-center gap-2 font-black text-primary hover:gap-4 transition-all uppercase text-xs tracking-widest">
                    Claim Your Trial <ArrowRight size={16} />
                 </Link>
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
                 <li><Link href="#" className="hover:text-primary transition-colors">POS Terminal</Link></li>
                 <li><Link href="#" className="hover:text-primary transition-colors">Inventory Suite</Link></li>
                 <li><Link href="#" className="hover:text-primary transition-colors">Analytics Pro</Link></li>
                 <li><Link href="#" className="hover:text-primary transition-colors">Marketplace</Link></li>
              </ul>
           </div>

           <div className="space-y-6">
              <h4 className="font-black text-secondary uppercase text-xs tracking-widest">Inquire</h4>
              <ul className="space-y-4 text-slate-500 font-bold">
                 <li><Link href="#" className="hover:text-primary transition-colors">Enterprise</Link></li>
                 <li><Link href="/installer" className="hover:text-primary transition-colors">Affiliate</Link></li>
                 <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                 <li><Link href="#" className="hover:text-primary transition-colors">API Docs</Link></li>
              </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-24 pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 font-bold text-sm">
           <p>&copy; 2026 BETADAY TECHNOLOGIES. BUILT FOR SCALE.</p>
           <div className="flex gap-8">
              <Link href="#" className="hover:text-secondary">Privacy Policy</Link>
              <Link href="#" className="hover:text-secondary">Terms of Service</Link>
           </div>
        </div>
      </footer>
    </div>
  );
}
