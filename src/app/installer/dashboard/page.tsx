'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ReferralService } from '@/services/referral.service';
import { AuthService } from '@/services/auth.service';
import { SubscriptionService, type ModuleBundle, type SubscriptionPlan, type ModulePlan } from '@/services/subscription.service';
import { 
  DollarSign, 
  Users, 
  Ticket, 
  TrendingUp, 
  Copy, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  LogOut,
  Plus,
  BookOpen,
  X,
  Play,
  Settings,
  ShieldCheck,
  Building,
  CreditCard,
  Share2,
  AlertCircle,
  History,
  Wallet,
  Zap
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { formatCurrency, cn } from '@/lib/utils';

export default function InstallerDashboard() {
  const { user, logout } = useAuth();
  const [codes, setCodes] = useState<any[]>([]);
  const [commissions, setCommissions] = useState<any[]>([]);
  const [trainingResources, setTrainingResources] = useState<any[]>([]);
  const [payoutRequests, setPayoutRequests] = useState<any[]>([]);
  const [commSettings, setCommSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [isRequestingPayout, setIsRequestingPayout] = useState(false);
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
  const [onboardStep, setOnboardStep] = useState(1);
  const [pricingData, setPricingData] = useState<{plans: SubscriptionPlan[], modules: ModulePlan[], bundles: ModuleBundle[]} | null>(null);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: (user as any)?.phone || '',
    bank_name: (user as any)?.bank_name || '',
    account_number: (user as any)?.account_number || '',
    account_name: (user as any)?.account_name || ''
  });

  // Onboarding Form State
  const [onboardForm, setOnboardForm] = useState({
    business_name: '',
    business_type: 'RETAIL',
    address: '',
    city: 'Lagos',
    currency: 'NGN',
    first_name: '',
    last_name: '',
    email: '',
    password: 'password123', // Default
    base_plan_type: 'TRIAL',
    selected_modules: [] as string[]
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [codesData, commData, trainingData, payoutData, settingsData] = await Promise.all([
        ReferralService.getMyCodes(),
        ReferralService.getMyCommissions(),
        ReferralService.getTrainingResources(),
        ReferralService.getPayoutRequests(),
        ReferralService.getSettings(),
        SubscriptionService.getPricing()
      ]);
      setCodes(codesData);
      setCommissions(commData);
      setTrainingResources(trainingData);
      setPayoutRequests(payoutData);
      setCommSettings(settingsData);
      setPricingData(pricingData);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    if (user) {
      setProfileForm({
        first_name: user.first_name,
        last_name: user.last_name,
        phone: (user as any).phone || '',
        bank_name: (user as any).bank_name || '',
        account_number: (user as any).account_number || '',
        account_name: (user as any).account_name || ''
      });
    }
  }, [user]);

  const copyToClipboard = (text: string, msg: string = 'Copied!') => {
    navigator.clipboard.writeText(text);
    toast.success(msg);
  };

  const shareReferralLink = () => {
    if (codes.length === 0) return toast.error('Generate a code first');
    const link = `https://www.betadaypos.com/auth/register?ref=${codes[0].code}`;
    copyToClipboard(link, 'Referral link copied to clipboard!');
  };

  const handleCreateCode = async () => {
     try {
        await ReferralService.generateCode();
        toast.success('Your unique referral token has been generated!');
        loadData();
     } catch (err: any) {
        toast.error(err.response?.data?.error || 'Failed to generate code');
     }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await AuthService.updateProfile(profileForm);
      toast.success('Profile and Bank details updated!');
      // Simple way to refresh user context
      window.location.reload();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleRequestPayout = async () => {
     setIsRequestingPayout(true);
     try {
        await ReferralService.requestPayout();
        toast.success('Payout request submitted successfully!');
        setIsPayoutModalOpen(false);
        loadData();
     } catch (err: any) {
        toast.error(err.response?.data?.error || 'Failed to request payout');
     } finally {
        setIsRequestingPayout(false);
     }
  }
  
  const handleDirectOnboard = async () => {
    if (!onboardForm.business_name || !onboardForm.email || !onboardForm.first_name) {
      return toast.error('Please fill in essential details');
    }
    
    setLoading(true);
    try {
      await SubscriptionService.registerCustomer({
        business: {
          name: onboardForm.business_name,
          type: onboardForm.business_type,
          address: onboardForm.address || 'Address pending',
          city: onboardForm.city,
          currency: onboardForm.currency
        },
        user: {
          first_name: onboardForm.first_name,
          last_name: onboardForm.last_name,
          email: onboardForm.email,
          password: onboardForm.password
        },
        base_plan_type: onboardForm.base_plan_type,
        modules: onboardForm.selected_modules,
        use_sample_data: true,
        referral_token: codes[0]?.code
      });
      toast.success('Customer onboarded successfully!');
      setIsOnboardModalOpen(false);
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Onboarding failed');
    } finally {
      setLoading(false);
    }
  }

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const commissionList = Array.isArray((commissions as any)?.commissions) 
    ? (commissions as any).commissions 
    : (Array.isArray(commissions) ? commissions : []);

  const pendingBalance = commissionList.filter((c: any) => c.status === 'PENDING').reduce((acc: number, c: any) => acc + c.amount, 0);

  const stats = [
    { label: 'Total Earnings', val: formatCurrency(commissionList.reduce((acc: number, c: any) => acc + c.amount, 0)), icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Payout', val: formatCurrency(pendingBalance), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Referred Business', val: [...new Set(commissionList.map((c: any) => c.business_id))].length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Sales', val: commissionList.length, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 text-slate-500">Loading your profile...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Dashboard Nav */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-primary/20">B</div>
             <div>
                <span className="font-black text-secondary tracking-tighter italic">BETADAY</span>
                <span className="text-xs block text-slate-400 font-bold uppercase tracking-widest mt-[-2px]">Partner Portal</span>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setIsSettingsModalOpen(true)}
                className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all group"
             >
                <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
             </button>
             <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
             <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                   <p className="text-sm font-bold text-slate-900">{user?.first_name} {user?.last_name}</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Level 1 Partner</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden shadow-sm">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} alt="avatar" />
                </div>
             </div>
             <button onClick={logout} className="p-3 text-slate-400 hover:text-rose-600 transition-colors">
                <LogOut size={20} />
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Welcome & Quick Action */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-gradient-to-r from-secondary to-slate-900 p-8 lg:p-12 rounded-[3.5rem] relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
           <div className="relative z-10">
              <h1 className="text-4xl lg:text-5xl font-black mb-4">Hello, {user?.first_name} <span className="text-primary italic">!</span></h1>
              <p className="text-slate-300 text-lg max-w-md">Your partner dashboard is ready. Share your link and start earning commissions today.</p>
           </div>
           
           <div className="relative z-10 w-full lg:w-auto">
              {codes.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl p-3 pl-8 rounded-3xl border border-white/10 shadow-2xl">
                    <div className="flex-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block mb-1">Your Partner Token</span>
                      <p className="text-2xl font-black text-white tracking-widest font-mono">{codes[0].code}</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(codes[0].code, 'Referral code copied!')}
                      className="p-5 bg-primary text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30"
                    >
                      <Copy size={20} />
                    </button>
                  </div>
                  <button 
                    onClick={shareReferralLink}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-secondary-light border border-white/20 rounded-3xl font-black hover:bg-white hover:text-secondary transition-all"
                  >
                    <Share2 size={20} />
                    Copy Sharing Link
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleCreateCode}
                  className="px-10 py-5 bg-primary text-white rounded-3xl font-black text-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3 shadow-xl shadow-primary/20"
                >
                  <Plus size={24} />
                  Activate Token
                </button>
              )}
              <button 
                onClick={() => setIsOnboardModalOpen(true)}
                className="mt-4 w-full flex items-center justify-center gap-3 py-5 bg-white text-secondary rounded-[2rem] font-black hover:bg-slate-50 transition-all shadow-lg"
              >
                <Building size={24} className="text-primary" />
                Direct Onboard Customer
              </button>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {stats.map((stat, i) => (
             <div key={i} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex items-center gap-6 group">
                <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                   <stat.icon size={28} />
                </div>
                <div>
                   <p className="text-[11px] font-black text-slate-400 mb-1 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-3xl font-black text-slate-900">{stat.val}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Recent Earnings */}
           <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center px-2">
                 <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <DollarSign className="text-emerald-500 w-8 h-8 p-1.5 bg-emerald-50 rounded-lg" />
                    Transaction History
                 </h2>
                 <div className="flex gap-2">
                    <button 
                        onClick={() => setIsPayoutModalOpen(true)}
                        className="px-6 py-2 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                        Request Payout
                    </button>
                 </div>
              </div>

              <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="bg-slate-50/50 border-b border-slate-100">
                          <tr>
                             <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Transaction ID</th>
                             <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Type</th>
                             <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Commission</th>
                             <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Settlement</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {commissionList.length > 0 ? commissionList.map((comm: any) => (
                            <tr key={comm.id} className="hover:bg-slate-50/50 transition-colors group">
                               <td className="px-8 py-6">
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                                        {comm.id}
                                     </div>
                                     <div>
                                        <p className="font-bold text-slate-900">Referral #{comm.id}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{new Date(comm.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-8 py-6">
                                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border ${
                                    comm.type === 'ONBOARDING' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                  }`}>
                                    {comm.type}
                                  </span>
                               </td>
                               <td className="px-8 py-6 font-black text-slate-900 text-lg">
                                  {formatCurrency(comm.amount)}
                               </td>
                               <td className="px-8 py-6 text-right">
                                  <span className={`inline-flex items-center gap-1.5 font-black text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg ${
                                    comm.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-500'
                                  }`}>
                                    {comm.status === 'PAID' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                    {comm.status}
                                  </span>
                               </td>
                            </tr>
                          )) : (
                            <tr>
                               <td colSpan={4} className="px-8 py-20 text-center">
                                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                     <TrendingUp size={32} className="text-slate-200" />
                                  </div>
                                  <p className="text-slate-400 font-bold">No commissions recorded yet.</p>
                                  <p className="text-slate-300 text-xs mt-1">Start sharing your referral token to see earnings here.</p>
                               </td>
                            </tr>
                          )}
                       </tbody>
                    </table>
                 </div>
              </div>

              {/* Payout History Section */}
              {payoutRequests.length > 0 && (
                <div className="space-y-6 pt-6 animate-fade-in">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 px-2">
                        <History className="text-blue-500 w-8 h-8 p-1.5 bg-blue-50 rounded-lg" />
                        Payout History
                    </h2>
                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
                        <div className="p-8 space-y-4">
                            {payoutRequests.map((req) => (
                                <div key={req.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                                            <Wallet size={24} />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900">{formatCurrency(req.amount)}</p>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Requested on {new Date(req.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${
                                        req.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 
                                        req.status === 'REJECTED' ? 'bg-rose-50 text-rose-600' : 
                                        'bg-blue-50 text-blue-600'
                                    }`}>
                                        {req.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
              )}
           </div>

           {/* Partner Sidebar */}
           <div className="space-y-10">
              <div className="space-y-4">
                 <h2 className="text-xl font-black text-secondary flex items-center gap-2">
                    <BookOpen size={20} className="text-primary" />
                    Knowledge Hub
                 </h2>
                 
                 <div className="space-y-4">
                     <div className="p-6 bg-slate-900 rounded-[2rem] border border-white/10 shadow-2xl">
                       <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <Zap size={14} className="fill-primary" />
                          Platform Premium Add-ons
                       </h3>
                       <div className="space-y-2">
                          {pricingData?.modules.slice(0, 3).map(m => (
                             <div key={m.type} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <span className="text-xs font-bold text-slate-300">{m.name.split('(')[0]}</span>
                                <span className="text-[10px] font-black text-primary">₦{m.price.toLocaleString()}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <button 
                      onClick={() => setIsTrainingModalOpen(true)}
                      className="w-full block p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all group text-left relative overflow-hidden"
                    >
                       <div className="flex items-center gap-5 relative z-10">
                          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                             <BookOpen size={28} />
                          </div>
                          <div className="flex-1">
                             <h3 className="font-black text-slate-900 group-hover:text-primary transition-colors">Training Playbook</h3>
                             <p className="text-xs text-slate-500">{trainingResources.length} masterclasses available</p>
                          </div>
                          <ChevronRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                       </div>
                    </button>

                    <a href="#" className="block p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden">
                       <div className="flex items-center gap-5 relative z-10">
                          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                             <Ticket size={28} />
                          </div>
                          <div className="flex-1">
                             <h3 className="font-black text-slate-900 group-hover:text-primary transition-colors">Digital Sales Kit</h3>
                             <p className="text-xs text-slate-500">Flyers, banners & email scripts</p>
                          </div>
                          <ChevronRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                       </div>
                    </a>

                    <a href="#" className="block p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden">
                       <div className="flex items-center gap-5 relative z-10">
                          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                             <ExternalLink size={28} />
                          </div>
                          <div className="flex-1">
                             <h3 className="font-black text-slate-900 group-hover:text-primary transition-colors">Priority Support</h3>
                             <p className="text-xs text-slate-500">Instant expert technical help</p>
                          </div>
                          <ChevronRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                       </div>
                    </a>
                 </div>
              </div>
              
              <div className="p-10 bg-secondary rounded-[3.5rem] text-white relative overflow-hidden group shadow-2xl shadow-secondary/20">
                 <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] -mr-16 -mb-16" />
                 <h3 className="text-2xl font-black mb-3 italic">Account Ready?</h3>
                 <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                   {commSettings?.enable_renewal_commission 
                    ? "Ensure your bank details are complete to receive your lifetime recurring commissions every month."
                    : "Ensure your bank details are complete to receive your onboarding commission payouts."}
                 </p>
                 <button 
                  onClick={() => setIsSettingsModalOpen(true)}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-white hover:text-secondary hover:scale-105 active:scale-95 transition-all"
                 >
                    Complete Bank Setup
                 </button>
              </div>
           </div>
        </div>
      </main>

      {/* Training Resources Modal */}
      {isTrainingModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in relative">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <div>
                    <h2 className="text-3xl font-black text-slate-900">Training Playbook</h2>
                    <p className="text-slate-500 mt-1">Master our ecosystem and maximize your earnings</p>
                 </div>
                 <button onClick={() => { setIsTrainingModalOpen(false); setSelectedVideo(null); }} className="p-4 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-rose-600 transition-all">
                    <X size={24} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                 {selectedVideo ? (
                   <div className="p-10 space-y-8 animate-fade-in">
                      <button 
                        onClick={() => setSelectedVideo(null)}
                        className="text-sm font-black text-primary flex items-center gap-2 hover:bg-primary/5 px-4 py-2 rounded-xl transition-all"
                      >
                         <ChevronRight className="rotate-180" size={18} />
                         BACK TO ALL RESOURCES
                      </button>
                      
                      <div className="aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                         {selectedVideo.type === 'VIDEO' ? (
                           <iframe 
                             width="100%" 
                             height="100%" 
                             src={`https://www.youtube.com/embed/${getYoutubeId(selectedVideo.url)}?autoplay=1`}
                             title={selectedVideo.title}
                             frameBorder="0" 
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                             allowFullScreen
                           ></iframe>
                         ) : (
                           <div className="h-full flex flex-col items-center justify-center text-white p-10 text-center bg-gradient-to-br from-slate-900 to-black">
                              <Ticket size={80} className="mb-6 text-primary" />
                              <h3 className="text-3xl font-black mb-4">{selectedVideo.title}</h3>
                              <p className="mb-10 text-slate-400 max-w-lg text-lg line-clamp-3">{selectedVideo.description}</p>
                              <a 
                                href={selectedVideo.url} 
                                target="_blank" 
                                className="px-10 py-5 bg-primary rounded-2xl font-black text-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                              >
                                 Download Document <ExternalLink size={24} />
                              </a>
                           </div>
                         )}
                      </div>
                      
                      <div className="px-4">
                         <h3 className="text-3xl font-black text-slate-900">{selectedVideo.title}</h3>
                         <div className="w-20 h-1 bg-primary rounded-full my-4"></div>
                         <p className="text-slate-600 mt-2 leading-relaxed text-lg">{selectedVideo.description}</p>
                      </div>
                   </div>
                 ) : (
                   <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                      {trainingResources.length > 0 ? trainingResources.map((res) => (
                        <button 
                          key={res.id} 
                          onClick={() => setSelectedVideo(res)}
                          className="bg-white rounded-[2.5rem] border border-slate-100 p-2 text-left hover:border-primary hover:shadow-2xl transition-all group flex flex-col h-full"
                        >
                           <div className="w-full aspect-video bg-slate-100 rounded-[2rem] flex items-center justify-center relative overflow-hidden mb-6">
                              {res.type === 'VIDEO' ? (
                                <>
                                  <div className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center text-primary group-hover:scale-125 transition-transform duration-500 relative z-10">
                                     <Play size={32} fill="currentColor" />
                                  </div>
                                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-primary/5 transition-colors" />
                                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-lg">Video</div>
                                </>
                              ) : (
                                <>
                                  <Ticket size={48} className="text-slate-300 group-hover:text-primary group-hover:scale-110 transition-all" />
                                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary/20 backdrop-blur-md text-primary text-[9px] font-black uppercase tracking-[0.2em] rounded-lg">PDF Guide</div>
                                </>
                              )}
                           </div>
                           <div className="px-6 pb-6 pt-2 flex flex-col flex-1">
                              <h3 className="font-black text-xl text-slate-900 mb-3 line-clamp-1 group-hover:text-primary transition-colors">{res.title}</h3>
                              <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed flex-1">{res.description}</p>
                              <div className="mt-6 flex items-center text-[10px] font-black uppercase tracking-widest text-primary gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                 {res.type === 'VIDEO' ? 'Watch Episode' : 'Read Full Guide'}
                                 <ChevronRight size={14} />
                              </div>
                           </div>
                        </button>
                      )) : (
                        <div className="col-span-full py-28 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                           <BookOpen size={64} className="mx-auto text-slate-200 mb-6" />
                           <p className="text-slate-500 font-black text-xl">Curriculum Incoming</p>
                           <p className="text-slate-400 mt-2">Our training team is uploading new masterclasses for you.</p>
                        </div>
                      )}
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* Settings Modal (Bank Details) */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-end p-0 md:p-6 transition-all duration-500">
           <div 
            className="bg-white h-full md:h-auto md:max-h-[85vh] w-full max-w-xl md:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-slide-left md:animate-zoom-in"
           >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                       <Settings />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-slate-900 leading-tight">Partner Settings</h2>
                       <p className="text-sm text-slate-500">Manage your profile & payouts</p>
                    </div>
                 </div>
                 <button onClick={() => setIsSettingsModalOpen(false)} className="p-3 text-slate-400 hover:text-rose-600 transition-all">
                    <X size={24} />
                 </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="flex-1 overflow-y-auto p-10 space-y-8">
                 <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                       <ShieldCheck className="text-teal-500" size={18} />
                       <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em]">Basic Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                          <input 
                             type="text" 
                             required
                             className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all font-bold" 
                             value={profileForm.first_name}
                             onChange={e => setProfileForm({...profileForm, first_name: e.target.value})}
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                          <input 
                             type="text" 
                             required
                             className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all font-bold" 
                             value={profileForm.last_name}
                             onChange={e => setProfileForm({...profileForm, last_name: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Working Phone Number</label>
                       <input 
                          type="tel" 
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all font-bold" 
                          placeholder="+234..."
                          value={profileForm.phone}
                          onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="w-full h-px bg-slate-100"></div>

                 <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                       <CreditCard className="text-blue-500" size={18} />
                       <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em]">Settlement Account</h3>
                    </div>
                    
                    <div className="space-y-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bank Name</label>
                       <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                             type="text" 
                             className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all font-bold" 
                             placeholder="e.g. Zenith Bank"
                             value={profileForm.bank_name}
                             onChange={e => setProfileForm({...profileForm, bank_name: e.target.value})}
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Number</label>
                          <input 
                             type="text" 
                             maxLength={10}
                             className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all font-bold tracking-widest" 
                             placeholder="0000000000"
                             value={profileForm.account_number}
                             onChange={e => setProfileForm({...profileForm, account_number: e.target.value})}
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Name</label>
                          <input 
                             type="text" 
                             className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all font-bold" 
                             placeholder="John Doe"
                             value={profileForm.account_name}
                             onChange={e => setProfileForm({...profileForm, account_name: e.target.value})}
                          />
                       </div>
                    </div>
                 </div>

                 <div className="pt-4 flex flex-col md:flex-row gap-4">
                    <button 
                       type="button"
                       onClick={() => setIsSettingsModalOpen(false)}
                       className="order-2 md:order-1 flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
                    >
                       Cancel
                    </button>
                    <button 
                       type="submit"
                       disabled={isSavingProfile}
                       className="order-1 md:order-2 flex-[2] py-5 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs disabled:opacity-50"
                    >
                       {isSavingProfile ? 'Saving Changes...' : 'Save Profile Details'}
                       <ChevronRight size={18} />
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Payout Modal */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[3.5rem] w-full max-w-lg shadow-2xl animate-zoom-in relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
                
                <div className="p-10 space-y-8">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <DollarSign size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 leading-tight">Request Payout</h2>
                        <p className="text-slate-500 mt-2">Withdraw your accumulated commissions to your registered bank account.</p>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Available for Withdrawal</span>
                        <div className="text-4xl font-black text-slate-900">{formatCurrency(pendingBalance)}</div>
                    </div>

                    <div className="space-y-4">
                         <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                             <Building className="text-blue-500" size={20} />
                             <div className="flex-1">
                                 <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Payout Destination</p>
                                 <p className="font-bold text-slate-700">{(user as any)?.bank_name || 'Not Configured'} • {(user as any)?.account_number || '****'}</p>
                             </div>
                         </div>
                    </div>

                    {pendingBalance < 5000 ? (
                        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl text-amber-700 text-sm">
                            <AlertCircle className="shrink-0 mt-0.5" size={18} />
                            <p className="font-medium">Minimum payout amount is ₦5,000. You need {formatCurrency(5000 - pendingBalance)} more to withdraw.</p>
                        </div>
                    ) : (
                        <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl text-emerald-700 text-sm">
                            <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                            <p className="font-medium">Your balance is ready for settlement. Funds will reach your account within 48 business hours.</p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <button 
                           onClick={() => setIsPayoutModalOpen(false)}
                           className="py-5 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
                        >
                           Later
                        </button>
                        <button 
                           onClick={handleRequestPayout}
                           disabled={isRequestingPayout || pendingBalance < 5000}
                           className="py-5 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs disabled:opacity-50"
                        >
                           {isRequestingPayout ? 'Processing...' : 'Confirm Payout'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Direct Onboarding Modal */}
      {isOnboardModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl animate-zoom-in relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                  <Plus size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">Direct Onboarding</h2>
                  <p className="text-sm text-slate-500">Register a customer for {codes[0]?.code}</p>
                </div>
              </div>
              <button onClick={() => setIsOnboardModalOpen(false)} className="p-3 text-slate-400 hover:text-rose-600 transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-8">
               <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl mb-4">
                 <button 
                  onClick={() => setOnboardForm({...onboardForm, base_plan_type: 'TRIAL'})}
                  className={cn("flex-1 py-3 rounded-xl text-xs font-black transition-all", onboardForm.base_plan_type === 'TRIAL' ? "bg-white text-secondary shadow-sm" : "text-slate-500")}
                 >
                  Retail Mode
                 </button>
                 <button 
                  onClick={() => setOnboardForm({...onboardForm, base_plan_type: 'SERVICE_MONTHLY', selected_modules: []})}
                  className={cn("flex-1 py-3 rounded-xl text-xs font-black transition-all", onboardForm.base_plan_type === 'SERVICE_MONTHLY' ? "bg-white text-secondary shadow-sm" : "text-slate-500")}
                 >
                  Record Only (Service)
                 </button>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Name</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold"
                      value={onboardForm.business_name}
                      onChange={e => setOnboardForm({...onboardForm, business_name: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Owner Email</label>
                    <input 
                      type="email" 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold"
                      value={onboardForm.email}
                      onChange={e => setOnboardForm({...onboardForm, email: e.target.value})}
                    />
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Owner First Name</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold"
                      value={onboardForm.first_name}
                      onChange={e => setOnboardForm({...onboardForm, first_name: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Owner Last Name</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary font-bold"
                      value={onboardForm.last_name}
                      onChange={e => setOnboardForm({...onboardForm, last_name: e.target.value})}
                    />
                 </div>
               </div>



               <button 
                onClick={handleDirectOnboard}
                disabled={loading}
                className="w-full py-5 bg-primary text-white rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-lg"
               >
                {loading ? 'Processing...' : 'Complete Registration'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
