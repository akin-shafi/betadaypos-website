'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { 
  Monitor, 
  Smartphone, 
  HardDrive, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  ShieldCheck,
  TrendingUp 
} from 'lucide-react';

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Navbar />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section 1: Headline */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-black text-secondary tracking-tighter mb-6 leading-tight">
              Choose How You Want to <br className="hidden md:block" />
              <span className="text-primary italic relative inline-block">
                Run Your Business
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 5 Q50 8 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              We've built a unified ecosystem that adapts to your workflow. Select the platform that best fits your needs today.
            </p>
          </div>

          {/* Section 2: 3 Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            
            {/* 1. Cloud (Web Version) */}
            <div className="relative group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] transition-colors group-hover:bg-primary/10" />
               
               <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                 <Monitor size={32} />
               </div>
               
               <h3 className="text-2xl font-black text-secondary mb-3">Cloud Dashboard</h3>
               <p className="text-slate-500 mb-8 min-h-[3rem]">
                 Access your entire business from anywhere via browser. Complete management control.
               </p>

               <ul className="space-y-3 mb-8 text-sm font-bold text-slate-600">
                 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Comprehensive Reports</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Inventory Management</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Staff Administration</li>
               </ul>

               <Link 
                 href="https://betadaypos.vercel.app/auth/register"
                 className="block w-full py-4 text-center rounded-xl bg-secondary text-white font-black hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
               >
                 Start on Web <ArrowRight size={18} />
               </Link>
            </div>

            {/* 2. Mobile App */}
            <div className="relative group bg-gradient-to-br from-secondary to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden transform md:scale-105 border-4 border-white/10">
               <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
               
               <div className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                 Most Popular
               </div>

               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary mb-6 backdrop-blur-sm group-hover:bg-primary group-hover:text-white transition-colors">
                 <Smartphone size={32} />
               </div>
               
               <h3 className="text-2xl font-black text-white mb-3">Mobile App</h3>
               <p className="text-slate-300 mb-8 min-h-[3rem]">
                 Monitor your business on the go. Real-time alerts and sales tracking in your pocket.
               </p>

               <ul className="space-y-3 mb-8 text-sm font-bold text-slate-300">
                 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Real-time Notifications</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Live Sales Feed</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Remote Control</li>
               </ul>

               <div className="flex flex-col gap-3">
                 <button className="block w-full py-4 text-center rounded-xl bg-white text-secondary font-black hover:bg-slate-100 transition-colors">
                   Download for iOS
                 </button>
                 <button className="block w-full py-4 text-center rounded-xl bg-white/10 text-white font-black border border-white/20 hover:bg-white/20 transition-colors">
                   Download for Android
                 </button>
               </div>
            </div>

            {/* 3. Desktop App */}
            <div className="relative group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-[100px] transition-colors group-hover:bg-teal-500/10" />
               
               <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                 <HardDrive size={32} />
               </div>
               
               <h3 className="text-2xl font-black text-secondary mb-3">Desktop POS</h3>
               <p className="text-slate-500 mb-8 min-h-[3rem]">
                 Stable, installable POS for high-volume in-store operations. Recommended for cashiers.
               </p>

               <ul className="space-y-3 mb-8 text-sm font-bold text-slate-600">
                 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-500" /> Offline Resilience</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-500" /> Hardware Integration</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-500" /> Dedicated Printer Support</li>
               </ul>

               <button className="block w-full py-4 text-center rounded-xl bg-teal-50 text-teal-700 font-black hover:bg-teal-100 transition-colors">
                 Download for Windows
               </button>
            </div>

          </div>

          {/* Section 3: Business Owner Highlight */}
          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
               <h2 className="text-3xl md:text-5xl font-black text-secondary mb-8">
                 Designed for the <span className="text-primary italic">Modern Owner</span>
               </h2>
               <p className="text-xl text-slate-500 mb-12 leading-relaxed">
                 You can't always be at the shop. But with our ecosystem, you never have to guess what's happening. 
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                     <Zap className="text-primary mb-4" size={32} />
                     <h4 className="font-black text-lg text-secondary mb-2">Monitor Anywhere</h4>
                     <p className="text-slate-500 text-sm">Check live sales from your phone while you're at home or on vacation.</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                     <ShieldCheck className="text-primary mb-4" size={32} />
                     <h4 className="font-black text-lg text-secondary mb-2">Real-time Alerts</h4>
                     <p className="text-slate-500 text-sm">Get instantly notified of voids, refunds, or low stock levels.</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                     <TrendingUp className="text-primary mb-4" size={32} />
                     <h4 className="font-black text-lg text-secondary mb-2">Peace of Mind</h4>
                     <p className="text-slate-500 text-sm">Know exactly how your business performed today before you sleep.</p>
                  </div>
               </div>
            </div>
            
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </main>
    </div>
  );
}
