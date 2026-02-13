'use client';

import Navbar from '@/components/Navbar';
import { 
  Users, 
  Target, 
  BookOpen, 
  Handshake, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Award,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

export default function InstallerSplashPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest border border-primary/30">
                <Award size={14} /> Official Partnership Program
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
                Build a Profitable Business as a <span className="text-primary italic">POS Installer</span>
              </h1>
              <p className="text-xl text-slate-400">
                Join our network of elite marketers and technologists. Help local businesses scale while earning recurring commissions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/installer/register" 
                  className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-2 group"
                >
                  Start Onboarding
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/installer/login" 
                  className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-700 transition-all"
                >
                  Installer Login
                </Link>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4">
               {[
                 { label: 'Onboarding Fee', val: '20%', icon: TrendingUp },
                 { label: 'Renewal Rate', val: '10%', icon: Target },
                 { label: 'Payout Frequency', val: 'Weekly', icon: Handshake },
                 { label: 'Support Level', val: '24/7', icon: BookOpen },
               ].map((stat, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 text-center space-y-2">
                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                     <stat.icon size={24} />
                   </div>
                   <div className="text-3xl font-black text-white">{stat.val}</div>
                   <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
           <h2 className="text-3xl font-bold text-secondary mb-4 uppercase tracking-widest text-sm">Benefits & Offerings</h2>
           <p className="text-4xl font-black text-slate-900">Why Partner with BETADAY?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { title: 'Predictable Income', desc: 'Earn every time your clients renew their subscriptions. Build a truly passive income stream.' },
             { title: 'Training & Tools', desc: 'Get access to marketing materials, training videos, and a dedicated installer dashboard.' },
             { title: 'Growth Opportunities', desc: 'As you scale, unlock higher commission tiers and exclusive milestone bonuses.' },
           ].map((item, i) => (
             <div key={i} className="space-y-4">
               <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                 <CheckCircle2 size={32} />
               </div>
               <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
               <p className="text-slate-500 text-lg leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Duties & Commitments */}
      <section className="py-24 bg-rose-50 border-y border-rose-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               <div className="flex-1">
                  <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-600 mb-8">
                    <AlertTriangle size={40} />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-6">Responsibilities & Standards</h2>
                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    Our installers are the face of BETADAY. To maintain high-quality service, every partner must commit to these standards.
                  </p>
                  
                  <div className="space-y-4">
                     {[
                       'Provide onsite training for business staff',
                       'Assist with hardware setup and troubleshooting',
                       'Conduct monthly follow-up calls with referred clients',
                       'Maintain professional conduct and deep product knowledge'
                     ].map((duty, i) => (
                       <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-rose-100 font-bold text-slate-700">
                          <CheckCircle2 className="text-rose-500" size={20} />
                          {duty}
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Standards Matter?</h3>
                  <div className="space-y-6 text-slate-600 text-lg">
                    <p>Maintaining excellence ensures high **customer retention**. If your clients are happy, they renew indefinitely, securing your recurring commission.</p>
                    <p>Quality service reduces support overhead and builds your reputation as a trusted business consultant in your community.</p>
                  </div>
                  <Link 
                    href="/installer/register" 
                    className="mt-10 block w-full text-center py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors"
                  >
                    I Accept, Start Onboarding
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-slate-100">
         <p className="text-slate-400">&copy; 2026 BETADAY Installer Program</p>
      </footer>
    </div>
  );
}
