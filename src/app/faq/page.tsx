'use client';

import Navbar from '@/components/Navbar';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  MessageCircle, 
  Search,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is BETADAY POS?",
        a: "BETADAY is an advanced, hyper-efficient Point of Sale ecosystem designed for modern retailers. It combines offline-first reliability with cloud-sync intelligence, allowing you to manage sales, inventory, and staff from any device."
      },
      {
        q: "Is it a one-time purchase or a subscription?",
        a: "BETADAY operates on a flexible subscription model. You can choose Monthly, Quarterly, or Annual billing cycles. We also offers a 14-day free trial so you can experience all premium features with zero commitment."
      },
      {
        q: "Do I need an internet connection to use BETADAY?",
        a: "No! BETADAY is built with 'Edge Performance' technology while using the desktop version. It works fully offline, allowing you to process transactions during internet outages. Once you're back online, everything syncs automatically to the cloud."
      }
    ]
  },
  {
    category: "Pricing & Billing",
    questions: [
      {
        q: "What does 'One license. Use on any device' mean?",
        a: "It means your subscription is not tied to a specific piece of hardware. You can log in and use your workspace on a mobile phone, a tablet, a desktop computer, or the web. Your data is unified across all of them."
      },
      {
        q: "Are hardware costs included in the pricing?",
        a: "No. The pricing displayed on our website is for the software license only. Hardware costs (like thermal printers, barcode scanners, and POS terminals) vary depending on your specific needs. Please contact one of our certified installers for a hardware quote."
      },
      {
        q: "Can I upgrade or downgrade my plan at any time?",
        a: "Yes! You can add or remove 'Power-Up' modules at any time from your dashboard. Plan changes are pro-rated to ensure you only pay for what you use."
      }
    ]
  },
  {
    category: "Security & Data",
    questions: [
      {
        q: "How secure is my business data?",
        a: "We use 'Vault Security'—multi-layer encryption for all data at rest and in transit. Our cloud infrastructure is built on PCI-compliant servers, ensuring your financial records and customer data are always protected."
      },
      {
        q: "Can I restrict what my staff can see?",
        a: "Absolutely. Our 'Force Multiplier' staff management system allows you to create custom roles with specific permissions. You can control who can void transactions, view reports, or edit inventory."
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (q: string) => {
    if (openItems.includes(q)) {
      setOpenItems(openItems.filter(i => i !== q));
    } else {
      setOpenItems([...openItems, q]);
    }
  };

  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
           f.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Navbar />

      <main className="pt-32 pb-20 overflow-hidden">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
          
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-xl shadow-teal-500/10 border border-teal-50 text-teal-700 text-sm font-black mb-8 uppercase tracking-wider">
            <HelpCircle size={16} /> Support Center
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-secondary tracking-tighter mb-8 leading-tight">
             How can we <span className="text-primary italic">help?</span>
          </h1>
          
          <div className="max-w-2xl mx-auto relative group">
             <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Search size={24} />
             </div>
             <input 
               type="text" 
               placeholder="Search for answers..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-16 pr-8 py-6 bg-white border border-slate-100 rounded-[2rem] shadow-xl text-lg font-bold placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
             />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           {filteredFaqs.length > 0 ? (
             <div className="space-y-16">
               {filteredFaqs.map((category, idx) => (
                 <div key={idx} className="space-y-6">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">{category.category}</h2>
                    <div className="space-y-4">
                       {category.questions.map((faq, fIdx) => {
                         const isOpen = openItems.includes(faq.q);
                         return (
                           <div 
                             key={fIdx} 
                             className={cn(
                               "rounded-[2rem] border-2 transition-all overflow-hidden",
                               isOpen ? "border-primary bg-white shadow-xl" : "border-slate-100 bg-white/50 hover:border-slate-200"
                             )}
                           >
                              <button 
                                onClick={() => toggleItem(faq.q)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left"
                              >
                                 <span className={cn("text-lg font-black tracking-tight", isOpen ? "text-secondary" : "text-slate-700")}>
                                   {faq.q}
                                 </span>
                                 <div className={cn(
                                   "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                   isOpen ? "bg-primary text-white" : "bg-slate-50 text-slate-400"
                                 )}>
                                   {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                 </div>
                              </button>
                              
                              <div className={cn(
                                "transition-all duration-300 ease-in-out",
                                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                              )}>
                                 <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed text-lg border-t border-slate-50 pt-6">
                                    {faq.a}
                                 </div>
                              </div>
                           </div>
                         );
                       })}
                    </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <HelpCircle size={64} className="mx-auto text-slate-300 mb-6" />
                <h3 className="text-2xl font-black text-slate-900 mb-2">No results found</h3>
                <p className="text-slate-500">Try searching for different keywords or categories.</p>
             </div>
           )}
        </div>

        {/* Support CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
           <div className="p-10 lg:p-20 rounded-[4rem] bg-secondary text-white relative overflow-hidden text-center lg:text-left">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[100px]" />
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                 <div className="space-y-6 max-w-2xl">
                    <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight italic">
                       Still have <span className="text-primary">questions?</span>
                    </h2>
                    <p className="text-xl text-slate-400 font-medium">
                       Our team of experts is ready to help you digitize your retail business. Get in touch for a personalized consultation.
                    </p>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row gap-6">
                    <Link href="#" className="px-10 py-6 bg-primary text-secondary rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-primary/20">
                       <MessageCircle size={24} /> Live Chat
                    </Link>
                    <Link href="/installer" className="px-10 py-6 bg-slate-800 text-white border border-slate-700 rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-700 transition-all">
                       Find Installer <ArrowRight size={24} />
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Footer (Simplified) */}
      <footer className="py-20 border-t border-slate-100 bg-white">
         <div className="max-w-7xl mx-auto px-8 text-center space-y-8">
            <div className="flex items-center justify-center gap-3">
               <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black italic">B</div>
               <span className="font-black text-2xl text-secondary tracking-tighter italic uppercase">BETADAY</span>
            </div>
            <p className="text-slate-400 font-bold">&copy; 2026 BETADAY TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
         </div>
      </footer>
    </div>
  );
}
