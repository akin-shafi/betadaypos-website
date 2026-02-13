'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { AuthService } from '@/services/auth.service';
import { toast } from 'react-hot-toast';
import { Mail, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.requestPasswordReset(email);
      setSubmitted(true);
      toast.success('Reset code sent to your email');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to request password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="w-full max-w-md bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 animate-fade-in">
           <Link href="/installer/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary mb-8 font-bold text-sm transition-colors">
              <ChevronLeft size={16} />
              Back to Login
           </Link>

           {!submitted ? (
             <>
               <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-6">
                     <ShieldCheck size={32} />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900">Forgot Password?</h1>
                  <p className="text-slate-500 mt-2">Enter your email and we'll send you a recovery code</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="email" 
                        required
                        className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-slate-900" 
                        placeholder="john@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending Code...' : 'Send Reset Code'}
                    {!loading && <ArrowRight size={20} />}
                  </button>
               </form>
             </>
           ) : (
             <div className="text-center">
                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                   <ShieldCheck size={40} />
                </div>
                <h1 className="text-3xl font-black text-slate-900">Check Your Email</h1>
                <p className="text-slate-500 mt-4 leading-relaxed">
                   We've sent a instructions to <span className="font-bold text-slate-800">{email}</span>. Please check your inbox and your spam folder.
                </p>
                <Link 
                  href="/installer/reset-password" 
                  className="mt-8 w-full block py-4 bg-primary text-white rounded-2xl font-black text-lg hover:shadow-2xl transition-all"
                >
                  Enter Reset Code
                </Link>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
