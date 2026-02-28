'use client';

import Navbar from '@/components/Navbar';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-40 pb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-12 font-bold uppercase text-xs tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Shield size={32} />
          </div>
          <h1 className="text-5xl font-black text-secondary tracking-tighter italic uppercase">Privacy <span className="text-primary italic">Policy.</span></h1>
        </div>

        <div className="prose prose-slate max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-black text-secondary uppercase tracking-tight mb-4">Core Principles</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              At BETADAY, we engineer security into the foundation of our POS ecosystem. Your business data is your most valuable asset, and we treat it with ultimate confidentiality and cryptographic protection.
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black text-secondary uppercase tracking-wide">1. Information Collection</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              We collect data necessary to provide a high-performance retail experience:
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Business Identification & Tax Numbers for compliance.</li>
                <li>Staff credentials for audit trail mapping.</li>
                <li>Transaction metadata for real-time analytics and inventory sync.</li>
              </ul>
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black text-secondary uppercase tracking-wide">2. Data Sovereignty</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Your sales data is synchronized in real-time between your local devices and our encrypted cloud. You retain full ownership and can export or purge your data history at any time through the Admin Portal.
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black text-secondary uppercase tracking-wide">3. Third-Party Integrations</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              We partner with secure payment gateways like Paystack and Stripe. Payment details (credit cards) are tokenized and processed via PCI-DSS compliant infrastructure.
            </p>
          </section>

          <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
            <h3 className="text-lg font-black text-secondary uppercase tracking-widest mb-2">Questions?</h3>
            <p className="text-slate-500 font-bold mb-6">Our security team is ready to assist with any technical inquiries.</p>
            <a href="mailto:security@betadaypos.com" className="text-primary font-black underline hover:text-secondary transition-colors">security@betadaypos.com</a>
          </section>
        </div>
      </main>

      <footer className="py-12 bg-slate-50 border-t border-slate-100 text-center text-slate-400 font-bold text-sm">
        <p>&copy; 2026 BETADAY TECHNOLOGIES. PRIVACY BY DESIGN.</p>
      </footer>
    </div>
  );
}
