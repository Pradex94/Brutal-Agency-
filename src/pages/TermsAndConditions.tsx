import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp } from '../utils/animations';

export default function TermsAndConditions() {
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
          Terms & Conditions<span className="text-neon-green">.</span>
        </h1>

        <div className="space-y-12 bg-pure-white border-4 border-brutal-black p-8 md:p-16 lg:p-20 brutal-shadow">
          <section>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase mb-6 border-b-4 border-neon-green pb-2 inline-block">
              1. Use of Website
            </h2>
            <p className="font-body font-bold text-lg md:text-xl uppercase leading-relaxed">
              By accessing this site, you agree to these terms. Don't use our site for illegal activities. Don't try to hack our high-performance systems. We'll find you.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase mb-6 border-b-4 border-neon-green pb-2 inline-block">
              2. Services Disclaimer
            </h2>
            <p className="font-body font-bold text-lg md:text-xl uppercase leading-relaxed">
              We build systems that print money, but we don't guarantee specific results. Marketing is a battlefield. We provide the weapons, you provide the strategy.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase mb-6 border-b-4 border-neon-green pb-2 inline-block">
              3. Limitation of Liability
            </h2>
            <p className="font-body font-bold text-lg md:text-xl uppercase leading-relaxed">
              Brutal Marketing Agency is not liable for any losses your business might incur. We provide high-performance solutions, but the market is unpredictable.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase mb-6 border-b-4 border-neon-green pb-2 inline-block">
              4. Intellectual Property
            </h2>
            <p className="font-body font-bold text-lg md:text-xl uppercase leading-relaxed">
              All content on this site is property of Brutal Marketing Agency. Don't steal our designs or copy our brutalist style. We'll know.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase mb-6 border-b-4 border-neon-green pb-2 inline-block">
              5. Contact Details
            </h2>
            <p className="font-body font-bold text-lg md:text-xl uppercase leading-relaxed">
              For legal inquiries, reach out via our contact form or email us at legal@brutal.agency. We'll respond if it's necessary.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
