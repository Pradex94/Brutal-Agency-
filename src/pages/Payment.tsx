import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { fadeUp, pageTransition } from '../utils/animations';
import { Check, Zap, Rocket, Crown, ArrowRight } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();
  const { isPaid, loading } = useAuth();

  useEffect(() => {
    if (!loading && isPaid) {
      navigate('/seo');
    }
  }, [isPaid, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-pure-white flex items-center justify-center">
        <div className="font-heading font-black text-4xl animate-pulse uppercase">LOADING...</div>
      </div>
    );
  }

  const handlePayment = (plan: string) => {
    console.log(`Processing payment for ${plan}...`);
    // Simulate payment success
    localStorage.setItem('isPaid', 'true');
    localStorage.setItem('selectedPlan', plan);
    navigate('/seo');
  };

  const plans = [
    {
      name: "STARTER SEO",
      price: "2,999",
      icon: <Zap className="w-12 h-12" />,
      features: ["BASIC ON-PAGE AUDIT", "KEYWORD TRACKING (10)", "MONTHLY REPORT", "EMAIL SUPPORT"],
      color: "bg-pure-white"
    },
    {
      name: "GROWTH SEO",
      price: "7,999",
      icon: <Rocket className="w-12 h-12" />,
      features: ["FULL ON-PAGE AUDIT", "KEYWORD TRACKING (50)", "COMPETITOR ANALYSIS", "WEEKLY REPORT", "PRIORITY SUPPORT"],
      color: "bg-neon-green",
      popular: true
    },
    {
      name: "ELITE SEO",
      price: "14,999",
      icon: <Crown className="w-12 h-12" />,
      features: ["UNLIMITED AUDITS", "KEYWORD TRACKING (200)", "BACKLINK STRATEGY", "DAILY REPORT", "1-ON-1 CONSULTATION", "24/7 WHATSAPP SUPPORT"],
      color: "bg-acid-yellow"
    }
  ];

  return (
    <motion.div 
      key="payment-page"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-pure-white flex flex-col"
    >
      <Navbar />
      <main className="flex-grow py-24 px-4 md:px-8 bg-brutal-black/5">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="mb-16 text-center">
            <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none uppercase mb-6">
              CHOOSE YOUR <span className="text-neon-green bg-brutal-black px-4">PLAN</span>
            </h1>
            <p className="font-body font-bold text-2xl uppercase max-w-3xl mx-auto border-4 border-brutal-black p-4 bg-pure-white brutal-shadow">
              UNLOCK THE FULL POWER OF OUR SEO ENGINE.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                className={`${plan.color} border-4 border-brutal-black p-10 brutal-shadow flex flex-col relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brutal-black text-neon-green font-heading font-black text-xl px-6 py-2 uppercase tracking-widest brutal-shadow-sm">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-8 flex items-center justify-between">
                  {plan.icon}
                  <h3 className="font-heading font-black text-3xl uppercase tracking-tighter">{plan.name}</h3>
                </div>
                <div className="mb-10">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-6xl tracking-tighter">₹{plan.price}</span>
                    <span className="font-body font-bold text-xl uppercase">/MONTH</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="font-body font-bold text-lg flex items-center gap-3 uppercase">
                      <Check className="w-6 h-6 text-neon-green bg-brutal-black rounded-full p-1" strokeWidth={3} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handlePayment(plan.name)}
                  className="w-full bg-brutal-black text-pure-white border-4 border-brutal-black py-6 font-heading font-black text-2xl uppercase brutal-shadow hover:bg-neon-green hover:text-brutal-black transition-all flex items-center justify-center gap-4"
                >
                  PAY NOW
                  <ArrowRight className="w-8 h-8" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-pure-white border-4 border-brutal-black p-8 brutal-shadow text-center">
            <p className="font-body font-bold text-xl uppercase mb-4">SECURE PAYMENT POWERED BY RAZORPAY & STRIPE</p>
            <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-8" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
