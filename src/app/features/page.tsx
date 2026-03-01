'use client';

import Navbar from '@/components/Navbar';
import { 
  Smartphone, 
  Box, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  Users, 
  Database,
  ArrowRight,
  HardDrive
} from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Navbar />
      
      <main className="pt-48 pb-32">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-32">
              <h1 className="text-6xl lg:text-[7rem] font-black text-secondary tracking-tighter italic uppercase mb-8 leading-[0.85]">
                 The <span className="text-primary italic">Ecosystem.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto">
                 Explore the core modules of the BETADAY retail architecture. Designed for speed, engineered for zero-loss growth.
              </p>
           </div>

           {/* POS Terminal Section */}
           <div id="pos" className="mb-40 scroll-mt-48">
              <div className="flex flex-col lg:flex-row gap-20 items-center">
                 <div className="flex-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                       <Smartphone size={32} />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-secondary tracking-tighter italic uppercase mb-6 uppercase">POS Terminal <span className="text-primary italic">Native.</span></h2>
                    <p className="text-lg text-slate-500 font-bold leading-relaxed mb-10">
                       A lightning-fast transaction interface that works on Android, iOS, and Web. Native offline support ensures you never miss a sale, even during network outages.
                    </p>
                    <ul className="space-y-4 mb-10">
                       <li className="flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-wide"><Zap size={18} className="text-primary" /> Instant Receipt Generation</li>
                       <li className="flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-wide"><Users size={18} className="text-primary" /> Multi-Staff Concurrent Access</li>
                       <li className="flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-wide"><ShieldCheck size={18} className="text-primary" /> Secure Biometric Voids</li>
                    </ul>
                 </div>
                 <div className="flex-1 bg-slate-100 rounded-[3rem] p-4 border border-slate-200 shadow-inner">
                    <img src="/pos_desktop_preview.png" alt="POS Interface" className="rounded-[2.5rem] w-full shadow-2xl" />
                 </div>
              </div>
           </div>

           {/* Inventory Section */}
           <div id="inventory" className="mb-40 scroll-mt-48">
              <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
                 <div className="flex-1">
                    <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-8">
                       <Box size={32} />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-secondary tracking-tighter italic uppercase mb-6 uppercase">Inventory <span className="text-primary italic">Control.</span></h2>
                    <p className="text-lg text-slate-500 font-bold leading-relaxed mb-10">
                       High-precision stock tracking with batch management, expiration alerts, and automated shrinkage detection. Perfect for retail, pharmacies, and supermarkets.
                    </p>
                    <ul className="space-y-4 mb-10">
                       <li className="flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-wide"><Database size={18} className="text-primary" /> Real-time Stock Sync</li>
                       <li className="flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-wide"><HardDrive size={18} className="text-primary" /> Low Stock Push Alerts</li>
                       <li className="flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-wide"><ShieldCheck size={18} className="text-primary" /> Audit History Replay</li>
                    </ul>
                 </div>
                 <div className="flex-1 bg-slate-50 rounded-[3rem] p-12 border border-slate-100 italic font-black text-secondary/10 text-9xl">
                    STOCK.
                 </div>
              </div>
           </div>

           {/* Analytics Section */}
           <div id="analytics" className="mb-40 scroll-mt-48">
              <div className="p-12 lg:p-24 bg-secondary rounded-[4rem] text-white">
                 <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="flex-1">
                       <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-8">
                          <BarChart3 size={32} />
                       </div>
                       <h2 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter mb-6 leading-none">Analytics <br /><span className="text-primary italic">Pro Intelligence.</span></h2>
                       <p className="text-white/70 font-bold leading-relaxed mb-10">
                          Data-driven insights to help you identify top-selling products, peak hours, and staff performance metrics from anywhere in the world.
                       </p>
                       <Link href="/get-started" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:gap-6 transition-all">
                          Start Growing <ArrowRight size={18} />
                       </Link>
                    </div>
                    <div className="flex-1 w-full grid grid-cols-2 gap-4">
                       <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col justify-end">
                          <span className="text-4xl font-black tracking-tighter mb-2">+₦4M</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Revenue Goal</span>
                       </div>
                       <div className="aspect-square bg-primary rounded-3xl p-8 flex flex-col justify-end">
                          <span className="text-4xl font-black tracking-tighter mb-2">92%</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Profit Margin</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>

      <footer className="py-12 bg-white border-t border-slate-50 text-center text-slate-400 font-bold text-sm">
        <p>&copy; 2026 BETADAY TECHNOLOGIES. BUILT FOR SCALE.</p>
      </footer>
    </div>
  );
}
