import { motion } from 'motion/react';

export default function Clients() {
  return (
    <section className="bg-pure-white py-16 md:py-24 px-4 md:px-8 border-b-4 border-brutal-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center border-4 border-brutal-black p-8 brutal-shadow-sm bg-acid-yellow"
          >
            <span className="font-heading font-black text-5xl md:text-6xl mb-2">$100M+</span>
            <span className="font-mono font-bold text-sm md:text-base uppercase">Client Revenue Generated</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center border-4 border-brutal-black p-8 brutal-shadow-sm bg-neon-green"
          >
            <span className="font-heading font-black text-5xl md:text-6xl mb-2">3.5X</span>
            <span className="font-mono font-bold text-sm md:text-base uppercase">Average Client ROI</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center text-center border-4 border-brutal-black p-8 brutal-shadow-sm bg-brutal-black text-pure-white"
          >
            <span className="font-heading font-black text-5xl md:text-6xl mb-2">50+</span>
            <span className="font-mono font-bold text-sm md:text-base uppercase">Brands Scaled to 8-Figures</span>
          </motion.div>
        </div>

        <div className="text-center">
          <p className="font-mono font-bold text-sm md:text-base mb-8 uppercase text-brutal-black/60">Trusted by the ruthless</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80 grayscale">
            {['TECHNOVA', 'PULSE', 'OMNI', 'NEXUS', 'VOID'].map((client, i) => (
              <span key={i} className="font-heading font-black text-3xl md:text-4xl text-brutal-black">{client}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
