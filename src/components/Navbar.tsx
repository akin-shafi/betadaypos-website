'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
              <ShoppingCart className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black text-secondary tracking-tighter italic">
              BETADAY<span className="text-primary not-italic">POS</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Features</Link>
            <Link href="/#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">How it Works</Link>
            <Link href="/installer" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Affiliate Installer</Link>
            <Link 
              href="/get-started" 
              className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:bg-primary-dark transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-b border-slate-100 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/#features" className="block px-3 py-4 text-base font-medium text-slate-700">Features</Link>
            <Link href="/#how-it-works" className="block px-3 py-4 text-base font-medium text-slate-700">How it Works</Link>
            <Link href="/installer" className="block px-3 py-4 text-base font-medium text-slate-700 text-teal-600">Affiliate Installer</Link>
            <Link 
              href="/get-started" 
              className="block w-full text-center bg-primary text-white px-3 py-4 rounded-xl font-bold"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
