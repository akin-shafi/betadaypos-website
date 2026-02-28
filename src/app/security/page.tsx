'use client';

import Navbar from '@/components/Navbar';
import { Lock, ShieldCheck, HardDrive, RefreshCw, ArrowLeft, Shield, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-40 pb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-16 font-bold uppercase text-xs tracking-widest">
          <ArrowLeft size={16} /> Back to Ecosystem
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 lg:items-center mb-32">
           <div className="flex-1">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 animate-pulse">
                <Shield size={32} />
              </div>
              <h1 className="text-6xl lg:text-7xl font-black text-secondary tracking-tighter italic uppercase mb-8 leading-[0.9]">
                 Engineered for <br /> 
                 <span className="text-primary italic">Zero Trust.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-xl leading-relaxed">
                 Protecting your business from voids, inventory shrinkage, and data loss through multi-layered cryptographic security.
              </p>
           </div>
           
           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Lock size={20} />, label: 'End-to-End Encryption' },
                { icon: <ShieldCheck size={20} />, label: 'PCI-DSS Compliance' },
                { icon: <HardDrive size={20} />, label: 'Real-time Backups' },
                { icon: <RefreshCw size={20} />, label: 'Offline Sync Native' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 group hover:bg-white hover:shadow-xl transition-all">
                   <div className="w-10 h-10 bg-white shadow-sm text-secondary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      {item.icon}
                   </div>
                   <span className="font-black text-xs text-secondary uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="p-12 bg-secondary rounded-[3.5rem] text-white">
              <h3 className="text-2xl font-black italic uppercase tracking-tight mb-6">Audit <span className="text-primary italic">Guard.</span></h3>
              <p className="text-white/70 font-bold leading-relaxed mb-8">
                Every sensitive action — from price overrides to sale voids — is logged with staff mapping and instant WhatsApp synchronization to the owner's device.
              </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-sm font-black text-primary"><CheckCircle2 size={16} /> Immutable Audit Trail</div>
                 <div className="flex items-center gap-3 text-sm font-black text-primary"><CheckCircle2 size={16} /> Activity History Replay</div>
                 <div className="flex items-center gap-3 text-sm font-black text-primary"><CheckCircle2 size={16} /> Biometric Authorized Access</div>
              </div>
           </div>
           
           <div className="p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black italic uppercase tracking-tight text-secondary mb-6">Cloud <span className="text-primary italic">Native.</span></h3>
              <p className="text-slate-500 font-bold leading-relaxed mb-8">
                Our infrastructure is hosted on isolated secure clusters with 24/7 monitoring. We deploy the same enterprise-grade security protocols used by modern fintech hubs.
              </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-sm font-black text-secondary"><CheckCircle2 size={16} /> Automatic SSL Layering</div>
                 <div className="flex items-center gap-3 text-sm font-black text-secondary"><CheckCircle2 size={16} /> DDOS Mitigation Native</div>
                 <div className="flex items-center gap-3 text-sm font-black text-secondary"><CheckCircle2 size={16} /> SOC-2 Compliance Path</div>
              </div>
           </div>
        </div>
      </main>

      <footer className="py-12 bg-slate-50 border-t border-slate-100 text-center text-slate-400 font-bold text-sm">
        <p>&copy; 2026 BETADAY TECHNOLOGIES. BUILT FOR SCALE.</p>
      </footer>
    </div>
  );
}
