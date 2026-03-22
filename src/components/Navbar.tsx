'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/70 backdrop-blur-xl border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 lg:h-24 items-center">
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-all group">
            <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black italic shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
              B
            </div>
            <span className="text-2xl font-black text-secondary tracking-tighter italic">
              BETADAY<span className="text-primary not-italic">POS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {['Features', 'Pricing', 'FAQ', 'Affiliate'].map((item) => {
              const href = item === 'Features' ? '/#features' : item === 'Affiliate' ? '/installer' : `/${item.toLowerCase()}`;
              return (
                <Link 
                  key={item}
                  href={href} 
                  className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors cursor-pointer"
                >
                  {item}
                </Link>
              );
            })}
            
            <Link 
              href="/get-started" 
              className="px-8 py-4 bg-secondary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:bg-slate-800 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-secondary/10"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-secondary p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 lg:top-24 left-0 w-full bg-white border-b border-slate-100 shadow-2xl p-6 space-y-4"
          >
            {[
              { label: 'Features', href: '/#features' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Affiliate Installer', href: '/installer' }
            ].map((item) => (
              <Link 
                key={item.label}
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="block py-4 text-sm font-black uppercase tracking-widest text-slate-600 border-b border-slate-50 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link 
              href="/get-started" 
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-primary text-secondary px-6 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
