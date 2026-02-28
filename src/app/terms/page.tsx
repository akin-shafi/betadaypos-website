'use client';

import Navbar from '@/components/Navbar';
import { FileText, ArrowLeft, RefreshCw, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-40 pb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-12 font-bold uppercase text-xs tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-8 text-secondary">
          <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
            <FileText size={32} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter italic uppercase text-secondary">Terms of <span className="text-primary italic">Service.</span></h1>
        </div>

        <div className="prose prose-slate max-w-none space-y-12">
          <section className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
             <h2 className="text-2xl font-black text-secondary uppercase tracking-tight mb-6">Terms Overview</h2>
             <p className="text-lg text-slate-500 font-medium leading-relaxed">
               Operating BETADAY POS ecosystems requires a commitment to license integrity and ethical business conduct. We provide a professional tool for commerce, protected by these service terms.
             </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black text-secondary uppercase tracking-wide">1. License Subscription</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              BETADAY is provided on a subscription basis. Each business license is linked to a unique Business ID and can be activated for the number of staff members permitted by your specific plan. Attempts to circumvent license checks will lead to automatic termination.
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black text-secondary uppercase tracking-wide">2. Fair Use Policy</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Our cloud synchronization engine handles real-time sales for high-volume retailers. We reserves the right to rate-limit API calls that unusually exceed standard commercial sales volumes (e.g., massive bulk data imports performed outside of maintenance windows).
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black text-secondary uppercase tracking-wide">3. Business Availability</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
               While our POS works natively offline, cloud features like remote audit replay and dashboard analytics require periodic synchronization. We guarantee 99.9% uptime for cloud services.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
            <div className="p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10">
               <RefreshCw size={24} className="text-primary mb-4" />
               <h4 className="font-black text-secondary uppercase text-xs tracking-wider mb-2">Automated Billing</h4>
               <p className="text-xs text-slate-500 font-bold">Subscriptions renew automatically. You can manage or cancel your plan through the Billing Portal at any time.</p>
            </div>
            <div className="p-8 bg-secondary/5 rounded-[2.5rem] border border-secondary/10">
               <Smartphone size={24} className="text-secondary mb-4" />
               <h4 className="font-black text-secondary uppercase text-xs tracking-wider mb-2">Device Management</h4>
               <p className="text-xs text-slate-500 font-bold">You can switch between mobile, web, and desktop clients freely under a single license.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 bg-white border-t border-slate-100 text-center text-slate-400 font-bold text-sm">
        <p>&copy; 2026 BETADAY TECHNOLOGIES. LEGAL FRAMEWORK.</p>
      </footer>
    </div>
  );
}
