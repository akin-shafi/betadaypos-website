'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Tag, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const DEADLINE = new Date('2026-03-14T23:59:00+01:00'); // WAT is UTC+1
const START_DATE = new Date('2026-03-01T00:00:00+01:00');

export default function LaunchPromo() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = DEADLINE.getTime() - now.getTime();
      const isExpired = difference <= 0;
      const isStarted = now.getTime() >= START_DATE.getTime();

      // For "Promoting" purpose, we might want to show it even if it hasn't started yet but it's close.
      // But user said "March 1 - March 14".
      // Let's show banner if within the window OR close to it.
      const shouldShow = !isExpired && (isStarted || (START_DATE.getTime() - now.getTime() < 3 * 24 * 60 * 60 * 1000)); // Show 3 days before start

      setShowBanner(shouldShow);

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false,
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        setShowBanner(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!showBanner || hasShownModal) return;

    // Modal Trigger Logic
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50 && !hasShownModal) {
        setShowModal(true);
        setHasShownModal(true);
      }
    };

    const timeTrigger = setTimeout(() => {
      if (!hasShownModal) {
        setShowModal(true);
        setHasShownModal(true);
      }
    }, 20000); // 20 seconds

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeTrigger);
    };
  }, [showBanner, hasShownModal]);

  if (!showBanner || !timeLeft || timeLeft.isExpired) return null;

  return (
    <>
      {/* Top Announcement Badge (Triggered in layout or hero) */}
      {/* Note: I'll export parts to be reused or just keep it simple */}
      
      {/* Sticky Bottom/Cta Modal if needed, but the user asked for a Hero section and a Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl p-8 md:p-12 text-center"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                <Sparkles size={32} />
              </div>

              <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">
                Launch Offer Ending Soon
              </h3>
              
              <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                Get <span className="text-primary font-black">20% off Quarterly</span> or <span className="text-primary font-black">40% off Annual</span> plans before March 14. Secure your business control system today.
              </p>

              <div className="space-y-4">
                <button 
                  onClick={() => {
                    setShowModal(false);
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                >
                  Activate Offer
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full py-4 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export function PromoCountdown({ timeLeft }: { timeLeft: TimeLeft }) {
  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      {units.map((unit, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-white/50 backdrop-blur-sm border border-white rounded-xl flex items-center justify-center font-black text-slate-900 text-lg md:text-xl shadow-sm">
            {unit.value.toString().padStart(2, '0')}
          </div>
          <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
