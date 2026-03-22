'use client';

import Navbar from '@/components/Navbar';
import { 
  Zap, 
  Store, 
  Cpu, 
  ShieldCheck, 
  Users, 
  AlertTriangle, 
  PieChart, 
  BarChart3, 
  Smartphone, 
  Clock,
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Utensils,
  BookOpen,
  Bell
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    id: 'sales-checkout',
    name: 'Sales & Checkout',
    icon: Zap,
    features: [
      { 
        id: 'zero-delay-checkout',
        title: 'Zero Delay Checkout', 
        desc: 'Lightning fast sales processing. Never keep a customer waiting, even during peak hours.',
        detail: 'Our local-first engine ensures that checkouts are instant. It works fully offline and syncs back to the cloud the moment you are back online. Scan barcodes, print thermal receipts, and handle payments in a single, smooth flow.'
      },
      { 
        id: 'any-payment',
        title: 'Accept Any Payment', 
        desc: 'Accept cards, transfers, and cash with instant settlement into your bank account.',
        detail: 'Integrated with top payment providers. No more manual confirmation of bank transfers—the system tells you the moment the alert lands. We support major Nigerian banks and global cards.'
      },
      { 
        id: 'split-bills',
        title: 'Smart Bill Splitting', 
        desc: 'Allow your customers to split bills or use multiple payment methods for a single order.',
        detail: 'Perfect for restaurants or high-value retail. Easily handle complex payment scenarios without slowing down the queue.'
      }
    ]
  },
  {
    id: 'inventory-management',
    name: 'Inventory & Stock Control',
    icon: PieChart,
    features: [
      { 
        id: 'smart-stock-alerts',
        title: 'Smart Stock Alerts', 
        desc: 'Get notified before you run out of products with automated restock reminders.',
        detail: 'Our algorithm tracks how fast you sell individual items. It notifies you exactly when to restock so you never lose a sale to an empty shelf.'
      },
      { 
        id: 'bulk-commodity-tracking',
        title: 'Bulk & Round Management',
        desc: 'Specialized tracking for fuel, gas, and weighted items.',
        detail: 'Monitor liter-by-liter sales for fuel stations or weigh-scale items for supermarkets. Track shift rounds with ease.'
      },
      { 
        id: 'recipe-costing',
        title: 'Recipe & Ingredient Tracking',
        desc: 'Track every single gram or ingredient used. Know your exact profit on every meal sold.',
        detail: 'Built for restaurants and bakeries. Link your sales to your ingredients inventory. When a plate of Jollof is sold, your chicken and rice bags update automatically.'
      }
    ]
  },
  {
    id: 'security-control',
    name: 'Security & Anti-Theft',
    icon: ShieldCheck,
    features: [
      { 
        id: 'stop-missing-money',
        title: 'Stop Missing Money', 
        desc: 'Real-time monitoring of refunds, price overrides and voided orders.',
        detail: 'Every critical action is logged. Unauthorized discounts or voided sales trigger instant alerts on your phone. You see exactly what your cashiers are doing, even when you are not there.'
      },
      { 
        id: 'staff-monitoring',
        title: 'Staff Monitoring & Audit', 
        desc: 'Assign specific roles and permissions to your team members.',
        detail: 'Give your manager full access but limit your cashier to sales only. Complete audit trails show who logged in, when, and what actions they took.'
      },
      { 
        id: 'remote-override',
        title: 'Remote Transaction Approval',
        desc: 'Approve price overrides or returns from your own mobile device, remotely.',
        detail: 'If a customer needs a discount, your staff can request it through the app, and you approve it instantly from anywhere.'
      }
    ]
  },
  {
    id: 'monitoring-growth',
    name: 'Growth & Remote Monitoring',
    icon: BarChart3,
    features: [
      { 
        id: 'control-from-anywhere',
        title: 'Control from Anywhere', 
        desc: 'Monitor multiple shop locations from a single dashboard on your phone.',
        detail: 'Whether you have 1 shop or 10, BETADAY gives you a unified view. Compare store performance, transfer stock between locations, and see your total revenue in one place.'
      },
      { 
        id: 'whatsapp-alerts',
        title: 'WhatsApp Intelligence', 
        desc: 'Get instant reports and critical alerts delivered directly to your WhatsApp.',
        detail: 'Daily closing reports, inventory alerts, and security warnings are sent to you automatically. No need to log in to see how your day went.'
      },
      { 
        id: 'customer-loyalty',
        title: 'Customer Loyalty & Data',
        desc: 'Capture customer info and reward your frequent buyers with points and discounts.',
        detail: 'Build a list of your most valuable customers. Send them SMS alerts on their birthdays or special discounts for new arrivals.'
      }
    ]
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Feature Hero */}
      <section className="pt-32 pb-20 lg:pt-56 lg:pb-32 relative overflow-hidden bg-secondary text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                 <div className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-6">Deep Capabilities</div>
                 <h1 className="text-5xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-8 uppercase">
                    Every Tool for <br /> <span className="text-primary italic">Total Business</span> Execution.
                 </h1>
                 <p className="text-xl text-slate-400 font-medium max-w-xl mb-12">
                    Professional-grade POS power, simplified for the modern business owner. No generic software here — only specialized tools for your growth.
                 </p>
                 <div className="flex gap-4 justify-center lg:justify-start">
                    <Link href="/get-started" className="px-10 py-6 bg-primary text-secondary rounded-2xl font-black text-lg hover:scale-105 transition-all">Start Free</Link>
                    <Link href="/pricing" className="px-10 py-6 border border-slate-700 bg-white/5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">View Plans</Link>
                 </div>
              </div>
              <div className="flex-1 hidden lg:block">
                 <div className="grid grid-cols-2 gap-6 p-10 bg-white/5 rounded-[4rem] border border-white/10 backdrop-blur-md">
                    {CATEGORIES.map((cat, i) => (
                      <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:bg-primary/20 transition-all cursor-pointer group">
                        <cat.icon size={40} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                        <p className="font-black text-sm uppercase tracking-widest">{cat.name}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {CATEGORIES.map((category, catIdx) => (
           <div key={category.id} id={category.id} className="mb-40 last:mb-0">
             <div className="flex items-center gap-6 mb-16 border-b border-slate-200 pb-10">
               <div className="w-20 h-20 bg-primary text-secondary rounded-3xl flex items-center justify-center shadow-xl shadow-primary/20">
                 <category.icon size={40} />
               </div>
               <div>
                  <h2 className="text-4xl lg:text-5xl font-black text-secondary tracking-tighter uppercase">{category.name}</h2>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Core Optimization Suite</p>
               </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               {category.features.map((feature, featIdx) => (
                 <motion.div 
                   key={feature.id}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: featIdx * 0.1 }}
                   viewport={{ once: true }}
                   id={feature.id}
                   className="flex flex-col p-10 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all group relative"
                 >
                   <div className="absolute top-8 right-8 w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                      <Zap size={20} />
                   </div>
                   <h3 className="text-2xl font-black text-secondary mb-4 pr-10">{feature.title}</h3>
                   <p className="text-slate-400 font-bold text-sm mb-6 leading-relaxed italic">{feature.desc}</p>
                   <div className="h-px w-10 bg-primary/20 mb-8" />
                   <p className="text-slate-600 font-medium leading-relaxed mb-10 flex-grow">
                     {feature.detail}
                   </p>
                   <Link href="/get-started" className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs group-hover:gap-5 transition-all">
                      Get this feature <ChevronRight size={16} />
                   </Link>
                 </motion.div>
               ))}
             </div>
           </div>
         ))}
      </section>

      {/* Global Call to Action */}
      <section className="py-40 bg-white text-center">
         <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-5xl lg:text-7xl font-black text-secondary tracking-tight mb-12 uppercase leading-[0.9]">
               Stop using <br /> generic tools. Use <br /> <span className="text-primary italic">Precision.</span>
            </h2>
            <Link href="/get-started" className="inline-flex items-center gap-6 px-16 py-8 bg-secondary text-white rounded-[2.5rem] font-black text-2xl hover:bg-slate-800 hover:shadow-2xl transition-all group active:scale-95">
               Deploy Your Workspace <ArrowRight className="group-hover:translate-x-4 transition-transform" />
            </Link>
            <p className="mt-12 text-slate-400 font-bold uppercase text-xs tracking-[0.3em]">No setup fee. No hardware lock-in. 14 Days Free.</p>
         </div>
      </section>

      <footer className="py-12 bg-slate-50 text-center border-t border-slate-100">
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em]">&copy; 2026 BETADAY POS. BUILT FOR SCALE.</p>
      </footer>
    </div>
  );
}
