import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { fadeUp, pageTransition } from '../utils/animations';
import { AlertTriangle, TrendingDown, Target, Zap, ArrowRight } from 'lucide-react';

export default function AuditResults() {
  const navigate = useNavigate();
  const { isPaid, loading } = useAuth();
  const [auditData, setAuditData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('last_audit');
    if (data) {
      setAuditData(JSON.parse(data));
    }
  }, []);

  if (!auditData) {
    return (
      <div className="min-h-screen bg-acid-yellow flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-8">
          <div className="bg-pure-white border-4 border-brutal-black p-12 brutal-shadow text-center max-w-xl">
            <AlertTriangle className="w-20 h-20 mx-auto mb-6 text-red-500" />
            <h2 className="font-heading font-black text-4xl mb-4 uppercase tracking-tighter">NO AUDIT DATA FOUND</h2>
            <p className="font-body font-bold text-xl mb-8 uppercase">YOU NEED TO RUN A FREE AUDIT FIRST TO SEE YOUR RESULTS.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-neon-green border-4 border-brutal-black px-8 py-4 font-heading font-black text-2xl brutal-shadow hover:bg-brutal-black hover:text-neon-green transition-all uppercase"
            >
              RUN AUDIT NOW
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { audit } = auditData;

  return (
    <motion.div 
      key="results-page"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-pure-white flex flex-col"
    >
      <Navbar />
      <main className="flex-grow py-24 px-4 md:px-8 bg-acid-yellow/10">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} className="mb-16 text-center">
            <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none uppercase mb-6">
              YOUR AUDIT <span className="text-neon-green bg-brutal-black px-4">RESULTS</span>
            </h1>
            <p className="font-body font-bold text-2xl uppercase max-w-3xl mx-auto border-4 border-brutal-black p-4 bg-pure-white brutal-shadow">
              WE FOUND CRITICAL ISSUES HOLDING YOUR BUSINESS BACK.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Score Card */}
            <motion.div variants={fadeUp} className="bg-pure-white border-4 border-brutal-black p-8 brutal-shadow flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full border-8 border-brutal-black flex items-center justify-center mb-6 bg-neon-green">
                <span className="font-heading font-black text-5xl">{audit.lead_score}</span>
              </div>
              <h3 className="font-heading font-black text-3xl uppercase mb-2">SEO SCORE</h3>
              <p className="font-body font-bold text-lg uppercase text-brutal-black/60">OUT OF 100</p>
            </motion.div>

            {/* Revenue Card */}
            <motion.div variants={fadeUp} className="bg-brutal-black text-pure-white border-4 border-brutal-black p-8 brutal-shadow flex flex-col items-center text-center">
              <TrendingDown className="w-20 h-20 mb-6 text-red-500" />
              <h3 className="font-heading font-black text-3xl uppercase mb-2">LOST REVENUE</h3>
              <p className="font-heading font-black text-5xl text-neon-green tracking-tighter">₹{audit.lost_revenue.toLocaleString()}</p>
              <p className="font-body font-bold text-lg uppercase mt-2">ESTIMATED MONTHLY LOSS</p>
            </motion.div>

            {/* Weaknesses Card */}
            <motion.div variants={fadeUp} className="bg-pure-white border-4 border-brutal-black p-8 brutal-shadow md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <AlertTriangle className="w-10 h-10 text-red-500" />
                <h3 className="font-heading font-black text-3xl uppercase">WEAKNESSES</h3>
              </div>
              <ul className="space-y-4">
                {audit.weaknesses.split('\n').map((w: string, i: number) => (
                  <li key={i} className="font-body font-bold text-xl flex items-start gap-3 uppercase">
                    <span className="text-red-500 mt-1">✖</span> {w.replace('• ', '')}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Attack Plan */}
          <motion.div variants={fadeUp} className="bg-neon-green border-4 border-brutal-black p-10 md:p-16 brutal-shadow mb-16">
            <div className="flex items-center gap-6 mb-8">
              <Target className="w-16 h-16 text-brutal-black" strokeWidth={3} />
              <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter">THE ATTACK PLAN</h2>
            </div>
            <p className="font-body font-bold text-2xl md:text-3xl leading-tight uppercase mb-10 border-l-8 border-brutal-black pl-8">
              {audit.attack_plan}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-pure-white border-2 border-brutal-black px-4 py-2 font-mono font-bold uppercase">PRIORITY: CRITICAL</div>
              <div className="bg-pure-white border-2 border-brutal-black px-4 py-2 font-mono font-bold uppercase">IMPACT: HIGH</div>
              <div className="bg-pure-white border-2 border-brutal-black px-4 py-2 font-mono font-bold uppercase">DIFFICULTY: MEDIUM</div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            variants={fadeUp}
            className="bg-brutal-black text-pure-white border-4 border-brutal-black p-12 md:p-20 text-center brutal-shadow relative overflow-hidden"
          >
            <div className="grid-bg absolute inset-0 opacity-20"></div>
            <div className="relative z-10">
              <h2 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter mb-8 leading-none">
                🔥 FIX THESE ISSUES & <br /> GROW YOUR TRAFFIC
              </h2>
              <p className="font-body font-bold text-xl md:text-2xl mb-12 uppercase max-w-3xl mx-auto text-neon-green">
                OUR PREMIUM SEO DASHBOARD GIVES YOU THE EXACT BLUEPRINT TO DOMINATE YOUR COMPETITION.
              </p>
              <button 
                onClick={() => navigate(isPaid ? '/seo' : '/payment')}
                className="group bg-neon-green text-brutal-black border-4 border-brutal-black px-12 py-6 font-heading font-black text-3xl md:text-4xl brutal-shadow hover:translate-x-2 hover:-translate-y-2 transition-all uppercase flex items-center gap-4 mx-auto"
              >
                {isPaid ? 'VIEW SEO DASHBOARD' : 'UNLOCK FULL SEO DASHBOARD'}
                <Zap className="w-10 h-10 group-hover:scale-125 transition-transform" fill="currentColor" />
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
