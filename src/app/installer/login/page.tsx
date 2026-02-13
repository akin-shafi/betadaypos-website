'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { LucideShieldCheck, Mail as LucideMail, Lock as LucideLock, ArrowRight as LucideArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="w-full max-w-md bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 animate-fade-in">
           <div className="text-center mb-10">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                 <LucideShieldCheck size={32} />
              </div>
              <h1 className="text-3xl font-black text-slate-900">Welcome Back</h1>
              <p className="text-slate-500 mt-2">Access your partner dashboard</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <LucideMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    required
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-slate-900" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <Link href="/installer/forgot-password" className="text-xs font-bold text-primary hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <LucideLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    required
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-slate-900" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating...' : 'Sign In Now'}
                {!loading && <LucideArrowRight size={20} />}
              </button>

              <p className="text-center text-slate-500 text-sm">
                New to the program? <Link href="/installer/register" className="text-primary font-bold hover:underline">Sign up as Partner</Link>
              </p>
           </form>
        </div>
      </div>
    </div>
  );
}
