'use client';

import Navbar from '@/components/Navbar';
import { 
  Utensils, 
  Store, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Tag, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  Clock,
  BarChart3,
  Users,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

const INDUSTRY_DATA: Record<string, any> = {
  restaurant: {
    name: 'Restaurants & Bars',
    hero: 'Speed up your service. Grow your revenue.',
    desc: 'The all-in-one POS for modern restaurants. Manage tables, track recipes, and keep your kitchen running smoothly.',
    icon: Utensils,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    features: [
      { title: 'Table Management', desc: 'Real-time floor plans. See which tables are open, occupied, or waiting for bills.' },
      { title: 'Kitchen Display (KDS)', desc: 'Send orders instantly to the kitchen. No more lost paper tickets.' },
      { title: 'Recipe Costing', desc: 'Track your ingredient costs per dish. Know exactly what you earn on every plate.' },
      { title: 'Split Bills', desc: 'Let customers pay how they want. Fast and easy bill splitting at the table.' }
    ],
    testimonial: "Since switching to BETADAY, our average table turnover time has improved by 15 minutes. It's a game changer for our bar.",
    author: "Owner, Lagos Night Lounge"
  },
  supermarket: {
    name: 'Supermarkets',
    hero: 'Faster Checkout. Smarter Inventory.',
    desc: 'Handle high volumes with ease. From barcode scanning to bulk stock alerts, we’ve got your supermarket covered.',
    icon: Store,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    features: [
      { title: 'High-Speed Scanning', desc: 'Zero-lag barcode scanning even with thousands of products in your catalog.' },
      { title: 'Bulk Stock Alerts', desc: 'Get notified before you run out. Automated restock suggestions based on sales speed.' },
      { title: 'Multi-Terminal Sync', desc: 'Sync dozens of cashiers in real-time. Shared inventory across all checkout points.' },
      { title: 'Customer Loyalty', desc: 'Keep them coming back with points, discounts, and personalized offers.' }
    ],
    testimonial: "Managing 5,000+ SKUs was a nightmare until we got BETADAY. The stock alerts have saved us millions in lost sales.",
    author: "Manager, City Central Supermarket"
  },
  electronics: {
    name: 'Electronics & Gadgets',
    hero: 'Track every Serial Number. Secure your stock.',
    desc: 'Perfect for gadget shops. Track individual serial numbers, manage warranties, and stop stock theft.',
    icon: Cpu,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    features: [
      { title: 'Serial Number Tracking', desc: 'Know exactly which phone or laptop was sold to which customer. Essential for warranties.' },
      { title: 'Warranty Management', desc: 'Automated warranty tracking. Search receipts by IMEI or Serial number instantly.' },
      { title: 'Anti-Theft Guards', desc: 'Track every high-value item from the moment it enters your store until it leaves.' },
      { title: 'Installment Payments', desc: 'Let your customers pay in bits while you track the remaining balance effortlessly.' }
    ],
    testimonial: "The IMEI tracking is the best feature for us. We can trace every single phone we sell back to the supplier or customer.",
    author: "CEO, TechBoutique Gadgets"
  },
  pharmacy: {
    name: 'Pharmacies',
    hero: 'Manage Expiry Dates. Ensure Patient Safety.',
    desc: 'Stay compliant and organized. Track batch numbers, expiry dates, and manage prescriptions with ease.',
    icon: ShieldCheck,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    features: [
      { title: 'Expiry Alerts', desc: 'Get notified months before drugs expire. Reduce waste and ensure patient safety.' },
      { title: 'Batch Tracking', desc: 'Full traceability. Track products by batch and manufacturer for easy recalls.' },
      { title: 'Prescription Records', desc: 'Keep a digital history of patient prescriptions and drug history.' },
      { title: 'Wholesale & Retail', desc: 'Manage both wholesale and retail pricing in a single system.' }
    ],
    testimonial: "The expiry date alerts have saved us from losing stock value. It's the most reliable system we've used in 10 years.",
    author: "Pharmacist, Grace Health Pharmacy"
  },
  'fuel-station': {
    name: 'Fuel & LPG Stations',
    hero: 'Track every Drop. Stop the Leaks.',
    desc: 'Specialized management for fuel and gas stations. Monitor rounds, track tank levels, and prevent theft.',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    features: [
      { title: 'Round Management', desc: 'Start and end shift rounds. Automated calculation of Liters vs Cash expected.' },
      { title: 'Tank Level Tracking', desc: 'Monitor your underground or LPG tank levels. Track dips vs sales volume.' },
      { title: 'Pump Monitoring', desc: 'Know which pump is performing best. Track attendant productivity per shift.' },
      { title: 'Corporate Accounts', desc: 'Manage post-paid fuel cards and company accounts with monthly billing.' }
    ],
    testimonial: "Preventing leaks and attendant theft was our biggest challenge. BETADAY's round-tracking makes everything clear.",
    author: "Manager, Global Fuel Group"
  },
  fashion: {
    name: 'Boutiques & Fashion',
    hero: 'Manage Variants. Thrill your Customers.',
    desc: 'One product, many colors and sizes. Manage fashion variants effortlessly and track your best-selling styles.',
    icon: Tag,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    features: [
      { title: 'Color & Size Variants', desc: 'Group products together. Manage 50 shirts with different sizes in one view.' },
      { title: 'Customer Profiles', desc: 'Know your big spenders. Capture phone numbers and birthdays for targeted marketing.' },
      { title: 'Best-Seller Reports', desc: 'See which styles are moving and which are sitting. Optimize your next purchase.' },
      { title: 'Gift Cards', desc: 'Boost sales with digital gift cards that customers can buy and redeem in-store.' }
    ],
    testimonial: "Our customers love getting points for their purchases. The system is so beautiful and easy for our staff to use.",
    author: "Owner, Chic Fashion Hub"
  }
};

export default function IndustryPage() {
  const params = useParams();
  const slug = params.industry as string;
  const industry = INDUSTRY_DATA[slug] || INDUSTRY_DATA.restaurant;

  const Icon = industry.icon;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-1/3 h-full ${industry.bg} blur-[120px] rounded-full translate-x-1/2`} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full ${industry.bg} border border-slate-200 mb-8`}>
                <Icon size={20} className={industry.color} />
                <span className={`text-xs font-black uppercase tracking-[0.2em] ${industry.color}`}>{industry.name}</span>
              </div>
              <h1 className="text-5xl lg:text-[5.5rem] font-black text-secondary tracking-tighter leading-[0.9] mb-8">
                {industry.hero.split('. ').map((part: string, i: number) => (
                  <span key={i} className="block last:text-primary italic last:not-italic">{part}</span>
                ))}
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-2xl mb-12">
                {industry.desc}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <Link href="/get-started" className="px-10 py-6 bg-secondary text-white rounded-2xl font-black text-lg hover:shadow-2xl transition-all w-full sm:w-auto text-center">
                  Start Your 14-Day Free Trial
                </Link>
                <Link href="/pricing" className="px-10 py-6 border-2 border-slate-200 text-secondary rounded-2xl font-black text-lg hover:border-primary transition-all w-full sm:w-auto text-center">
                  View Plans
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
               <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white">
                  <img src={`/industry_${slug}.png`} alt={industry.name} className="w-full bg-slate-200 min-h-[400px] object-cover" />
               </div>
               
               {/* Floating Stat */}
               <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-50 flex items-center gap-5">
                  <div className={`w-14 h-14 ${industry.bg} rounded-2xl flex items-center justify-center ${industry.color}`}>
                    <BarChart3 size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact for {industry.name}</p>
                    <p className="text-3xl font-black text-secondary">+28% <span className="text-sm font-bold text-slate-400">Profit Increase</span></p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-5xl font-black text-secondary tracking-tighter mb-6">Features that <span className="text-primary italic">work for you.</span></h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">We custom-built these tools after listening to thousands of owners like you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {industry.features.map((feat: any, i: number) => (
              <div key={i} className="flex gap-8 p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-primary/20 transition-all group">
                <div className={`w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center ${industry.bg} ${industry.color} group-hover:scale-110 transition-transform`}>
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-secondary mb-3">{feat.title}</h3>
                  <p className="text-lg text-slate-500 leading-relaxed font-medium">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 bg-secondary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-10 text-primary">
            <Users size={40} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-black italic mb-10 leading-snug tracking-tight">
            &ldquo;{industry.testimonial}&rdquo;
          </h2>
          <div>
            <p className="text-primary font-black uppercase tracking-widest mb-2">{industry.author}</p>
            <p className="text-slate-500 text-sm font-bold">BETADAY POWER USER</p>
          </div>
        </div>
      </section>

      {/* FAQ Mini */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[80px]" />
            <div className="flex-1 text-center lg:text-left relative z-10">
               <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                 Ready to <br /> digitalize your <br /> <span className="text-primary italic">Business?</span>
               </h2>
               <p className="text-xl text-slate-400 mb-12 max-w-md mx-auto lg:mx-0 font-medium">
                 Join 2,500+ businesses who trust BETADAY to power their operations every single day.
               </p>
               <Link href="/get-started" className="inline-flex items-center gap-4 px-12 py-6 bg-primary text-secondary rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-primary/20 group">
                 Launch Now <ChevronRight className="group-hover:translate-x-2 transition-transform" />
               </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
               {[
                 { icon: Clock, label: '10 Min Onboarding' },
                 { icon: ShieldCheck, label: 'Secure Cloud Sync' },
                 { icon: Zap, label: 'Instant Settlement' },
                 { icon: Smartphone, label: 'Mobile App Ready' }
               ].map((item, i) => (
                 <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-primary">
                       <item.icon size={24} />
                    </div>
                    <span className="font-black text-sm uppercase tracking-widest text-white/90">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white border-t border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4">
           <p className="text-slate-400 font-bold text-sm uppercase lg:tracking-[0.5em] tracking-[0.2em]">&copy; 2026 BETADAY TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
