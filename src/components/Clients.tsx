import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '../utils/animations';

export default function Clients() {
  return (
    <section className="bg-pure-white py-16 md:py-24 px-4 md:px-8 border-b-4 border-brutal-black">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16"
        >
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -5, rotate: -1 }}
            className="flex flex-col items-center text-center border-4 border-brutal-black p-8 brutal-shadow-sm bg-acid-yellow cursor-default"
          >
            <span className="font-heading font-black text-5xl md:text-6xl mb-2">$100M+</span>
            <span className="font-mono font-bold text-sm md:text-base uppercase">Client Revenue Generated</span>
          </motion.div>
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -5, rotate: 1 }}
            className="flex flex-col items-center text-center border-4 border-brutal-black p-8 brutal-shadow-sm bg-neon-green cursor-default"
          >
            <span className="font-heading font-black text-5xl md:text-6xl mb-2">3.5X</span>
            <span className="font-mono font-bold text-sm md:text-base uppercase">Average Client ROI</span>
          </motion.div>
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -5, rotate: -1 }}
            className="flex flex-col items-center text-center border-4 border-brutal-black p-8 brutal-shadow-sm bg-brutal-black text-pure-white cursor-default"
          >
            <span className="font-heading font-black text-5xl md:text-6xl mb-2">50+</span>
            <span className="font-mono font-bold text-sm md:text-base uppercase">Brands Scaled to 8-Figures</span>
          </motion.div>
        </motion.div>

        <div className="text-center">
          <p className="font-mono font-bold text-sm md:text-base mb-8 uppercase text-brutal-black/60">Trusted by the ruthless</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80 grayscale">
            {['TECHNOVA', 'PULSE', 'OMNI', 'NEXUS', 'VOID'].map((client, i) => (
              <motion.span 
                key={i} 
                whileHover={{ scale: 1.1, grayscale: 0, opacity: 1 }}
                className="font-heading font-black text-3xl md:text-4xl text-brutal-black cursor-default transition-all duration-300"
              >
                {client}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
