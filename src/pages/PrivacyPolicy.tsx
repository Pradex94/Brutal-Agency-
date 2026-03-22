import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp } from '../utils/animations';

export default function PrivacyPolicy() {
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeUp}
      className="min-h-screen bg-acid-yellow pt-32 pb-24 px-4 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 font-mono font-bold uppercase mb-12 hover:bg-brutal-black hover:text-neon-green px-4 py-2 border-4 border-brutal-black transition-all brutal-shadow-sm">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter uppercase mb-16 leading-none">
          Privacy Policy<span className="text-neon-green">.</span>
        </h1>

        <div className="space-y-12 bg-pure-white border-4 border-brutal-black p-8 md:p-16 lg:p-20 brutal-shadow">
          <section>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase mb-6 border-b-4 border-neon-green pb-2 inline-block">
              1. Introduction
            </h2>
            <p className="font-body font-bold text-lg md:text-xl uppercase leading-relaxed">
              At Brutal Marketing Agency, we take your privacy seriously. This policy explains how we collect, use, and protect your data. We don't sell your info. We use it to build systems that print money for you.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase mb-6 border-b-4 border-neon-green pb-2 inline-block">
              2. Information We Collect
            </h2>
            <p className="font-body font-bold text-lg md:text-xl uppercase leading-relaxed">
              We collect information you provide directly via our contact form, including your name, email, website URL, and business details. We also collect technical data like IP addresses and browser info for analytics.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase mb-6 border-b-4 border-neon-green pb-2 inline-block">
              3. How We Use Information
            </h2>
            <p className="font-body font-bold text-lg md:text-xl uppercase leading-relaxed">
              We use your info to respond to inquiries, provide services, and improve our marketing strategies. We analyze data to ensure our systems are performing at peak efficiency.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase mb-6 border-b-4 border-neon-green pb-2 inline-block">
              4. Cookies Usage
            </h2>
            <p className="font-body font-bold text-lg md:text-xl uppercase leading-relaxed">
              We use cookies to track site performance and user behavior. You can disable them in your browser, but some features of our high-performance site might not work as intended.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase mb-6 border-b-4 border-neon-green pb-2 inline-block">
              5. Data Protection
            </h2>
            <p className="font-body font-bold text-lg md:text-xl uppercase leading-relaxed">
              We implement industry-standard security measures to protect your data. However, no system is 100% secure. We do our best to keep your business secrets safe.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase mb-6 border-b-4 border-neon-green pb-2 inline-block">
              6. Contact Information
            </h2>
            <p className="font-body font-bold text-lg md:text-xl uppercase leading-relaxed">
              Questions? Reach out via our contact form or email us at privacy@brutal.agency. We'll get back to you if it's important.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
