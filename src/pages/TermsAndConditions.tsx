import { motion } from 'motion/react';
import { fadeUp } from '../utils/animations';

export default function TermsAndConditions() {
  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="space-y-12"
      >
        <h1 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter border-b-8 border-brutal-black pb-4">
          Terms & Conditions
        </h1>

        <section className="space-y-4">
          <h2 className="font-heading font-black text-3xl uppercase">1. Website Usage</h2>
          <p className="font-mono font-bold text-lg leading-relaxed">
            By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading font-black text-3xl uppercase">2. Service Disclaimer</h2>
          <p className="font-mono font-bold text-lg leading-relaxed">
            The materials on Brutal Marketing Agency's website are provided "as is". Brutal Marketing Agency makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading font-black text-3xl uppercase">3. Liability Limitation</h2>
          <p className="font-mono font-bold text-lg leading-relaxed">
            In no event shall Brutal Marketing Agency or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Brutal Marketing Agency's Internet site.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading font-black text-3xl uppercase">4. Intellectual Property</h2>
          <p className="font-mono font-bold text-lg leading-relaxed">
            The materials contained in this website are protected by applicable copyright and trademark law. All content, designs, and systems are the property of Brutal Marketing Agency unless otherwise stated.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading font-black text-3xl uppercase">5. Contact Details</h2>
          <p className="font-mono font-bold text-lg leading-relaxed">
            Any questions regarding these terms should be sent to:
          </p>
          <div className="border-4 border-brutal-black p-6 bg-neon-green inline-block">
            <p className="font-heading font-black text-xl uppercase">Email: legal@brutal.agency</p>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
