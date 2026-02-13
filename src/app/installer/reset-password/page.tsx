'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { AuthService } from '@/services/auth.service';
import { toast } from 'react-hot-toast';
import { ShieldCheck, Lock, Key, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    password: '',
    confirm_password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      return toast.error("Passwords don't match");
    }

    setLoading(true);
    try {
      await AuthService.resetPassword({
        email: formData.email,
        code: formData.code,
        new_password: formData.password
      });
      toast.success('Password reset successfully! You can now login.');
      router.push('/installer/login');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to reset password. Please check your code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="w-full max-w-lg bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 animate-fade-in">
           <div className="text-center mb-10">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                 <ShieldCheck size={32} />
              </div>
              <h1 className="text-3xl font-black text-slate-900">Reset Password</h1>
              <p className="text-slate-500 mt-2">Enter the code from your email and your new password</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-slate-900" 
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">6-Digit Reset Code</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    required
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-slate-900 font-bold tracking-widest" 
                    placeholder="000000"
                    value={formData.code}
                    onChange={e => setFormData({...formData, code: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    required
                    minLength={8}
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-slate-900" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    required
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-slate-900" 
                    placeholder="••••••••"
                    value={formData.confirm_password}
                    onChange={e => setFormData({...formData, confirm_password: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Resetting...' : 'Update Password'}
                {!loading && <ArrowRight size={20} />}
              </button>
           </form>
        </div>
      </div>
    </div>
  );
}
