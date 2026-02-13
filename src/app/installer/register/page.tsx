'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { AuthService } from '@/services/auth.service';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [otp, setOtp] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      return toast.error("Passwords don't match");
    }

    setLoading(true);
    try {
      await AuthService.registerInstaller({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        role: 'INSTALLER' 
      });
      toast.success('Registration successful! Please verify your email.');
      setStep(2);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.verifyEmail(formData.email, otp);
      toast.success('Email verified! You can now login.');
      router.push('/installer/login');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-20">
        {/* Left Side: Illustration & Info */}
        <div className="hidden lg:block flex-1 space-y-8">
           <h2 className="text-4xl font-black text-slate-900 leading-tight">
             Join the network of <br />
             <span className="text-primary italic">Success Enablers</span>
           </h2>
           <p className="text-xl text-slate-500 max-w-lg">
             Create your partner account today and start your journey towards financial freedom.
           </p>
           
           <div className="space-y-6">
              {[
                'Free marketing kit & training assets',
                'Intuitive dashboard for tracking referrals',
                'Direct deposit for all your commissions'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-slate-700">
                   <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                     <CheckCircle2 size={16} />
                   </div>
                   {item}
                </div>
              ))}
           </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="w-full max-w-lg bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
           {step === 1 ? (
             <form onSubmit={handleRegister} className="space-y-6">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-black text-slate-900">Partner Registration</h1>
                  <p className="text-slate-500 mt-2">Let's get your onboarding started</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-slate-900" 
                        placeholder="John"
                        value={formData.first_name}
                        onChange={e => setFormData({...formData, first_name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-slate-900" 
                        placeholder="Doe"
                        value={formData.last_name}
                        onChange={e => setFormData({...formData, last_name: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email" 
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-slate-900" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="password" 
                      required
                      minLength={8}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-slate-900" 
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="password" 
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-slate-900" 
                      placeholder="••••••••"
                      value={formData.confirm_password}
                      onChange={e => setFormData({...formData, confirm_password: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-primary text-white rounded-xl font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Continue to Verification'}
                </button>

                <p className="text-center text-slate-500 text-sm">
                  Already have an account? <Link href="/installer/login" className="text-primary font-bold hover:underline">Login here</Link>
                </p>
             </form>
           ) : (
             <form onSubmit={handleVerify} className="space-y-8 animate-fade-in text-center">
                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-primary mx-auto">
                   <ShieldCheck size={40} />
                </div>
                
                <div>
                   <h1 className="text-3xl font-black text-slate-900">Verify Your Email</h1>
                   <p className="text-slate-500 mt-2">
                     We've sent a 6-digit OTP code to <br />
                     <span className="font-bold text-slate-800">{formData.email}</span>
                   </p>
                </div>

                <input 
                  type="text" 
                  maxLength={6}
                  required
                  className="w-full text-center text-4xl font-black tracking-[1rem] py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-slate-900"
                  placeholder="000000"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                />

                <div className="space-y-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white rounded-xl font-black text-lg hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Verifying...' : 'Verify & Continue'}
                    <ArrowRight size={20} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => AuthService.resendOTP(formData.email)}
                    className="text-slate-500 font-bold hover:text-primary transition-colors"
                  >
                    Resend Code
                  </button>
                </div>
             </form>
           )}
        </div>
      </div>
    </div>
  );
}
