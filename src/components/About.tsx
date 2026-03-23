import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-4 md:px-8 bg-brutal-black text-pure-white border-b-4 border-brutal-black overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 
            variants={fadeUp}
            className="font-heading font-black text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter uppercase"
          >
            WE ARE THE <span className="text-neon-green">OUTLAWS</span> OF THE DIGITAL AGE.
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="font-body font-bold text-xl md:text-2xl lg:text-3xl max-w-xl border-l-4 border-neon-green pl-6 py-2 uppercase"
          >
            WE DON'T FOLLOW TRENDS. WE DESTROY THEM. OUR MISSION IS TO BUILD UNSTOPPABLE BRANDS THAT DOMINATE THE NOISE.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="bg-acid-yellow border-8 border-brutal-black p-8 brutal-shadow relative z-10">
            <p className="font-heading font-black text-2xl md:text-4xl text-brutal-black uppercase leading-tight">
              "THE INTERNET IS A WARZONE. IF YOU'RE NOT ARMED WITH A BRUTAL STRATEGY, YOU'RE ALREADY DEAD."
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-16 h-16 bg-brutal-black rounded-full"></div>
              <div>
                <p className="font-mono font-bold text-lg text-brutal-black">MAX NOISE</p>
                <p className="font-mono text-sm text-brutal-black/60">FOUNDER & CHIEF CHAOS OFFICER</p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-neon-green border-8 border-brutal-black -rotate-6 z-0"></div>
        </motion.div>
      </div>
    </section>
  );
}
