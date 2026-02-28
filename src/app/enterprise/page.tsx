'use client';

import Navbar from '@/components/Navbar';
import { Building2, ArrowRight, Zap, ShieldCheck, PieChart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Navbar />
      
      <main className="pt-48 pb-32">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-24">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-2 bg-secondary/5 text-secondary rounded-full text-xs font-black uppercase tracking-[0.2em] border border-secondary/10 mb-8"
              >
                 <Building2 size={16} /> Enterprise Solutions
              </motion.div>
              <h1 className="text-6xl lg:text-8xl font-black text-secondary tracking-tighter italic uppercase mb-8 leading-[0.85]">
                 Unlimited <br /> 
                 <span className="text-primary tracking-[-0.05em]">Business Scale.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
                 Custom deployments for multi-location franchises, industrial retail hubs, and high-volume distribution networks.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
              {[
                { icon: <Zap size={28} />, title: 'Private Cloud', desc: 'Isolated server infrastructure for mission-critical uptime and data sovereignty.' },
                { icon: <ShieldCheck size={28} />, title: 'Custom Compliance', desc: 'Tailored FIRS and VAT reporting modules based on your regional tax laws.' },
                { icon: <PieChart size={28} />, title: 'Franchise Sync', desc: 'Centralized Master Dashboard to monitor thousands of locations in real-time.' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                   <div className="w-16 h-16 bg-slate-50 text-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                      {item.icon}
                   </div>
                   <h3 className="text-xl font-black text-secondary uppercase tracking-tight mb-4 italic">{item.title}</h3>
                   <p className="text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>

           <div className="bg-secondary rounded-[4.5rem] p-12 lg:p-24 relative overflow-hidden text-center text-white">
              <Sparkles className="absolute top-12 left-12 text-primary opacity-20 w-32 h-32" />
              <div className="relative z-10 max-w-2xl mx-auto">
                 <h2 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter mb-8 leading-none">
                    Start Your <br />
                    <span className="text-primary italic">Custom Build.</span>
                 </h2>
                 <p className="text-white/70 font-bold text-lg mb-12">
                   Connect with our Enterprise Architects to design a POS ecosystem specifically for your business scale.
                 </p>
                 <a href="mailto:enterprise@betadaypos.com" className="inline-flex items-center gap-4 px-12 py-6 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:gap-8 transition-all active:scale-95 shadow-2xl shadow-primary/40">
                    Schedule a Consultation <ArrowRight size={20} />
                 </a>
              </div>
           </div>
        </div>
      </main>

      <footer className="py-12 bg-white border-t border-slate-50 text-center text-slate-400 font-bold text-sm">
        <p>&copy; 2026 BETADAY ENTERPRISE. BUILT FOR NIGERIAN SCALE.</p>
      </footer>
    </div>
  );
}
