import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '../utils/animations';

export default function Brands() {
  const brands = [
    { name: 'TECH.CORP', color: 'bg-acid-yellow' },
    { name: 'FUTURE.LABS', color: 'bg-neon-green' },
    { name: 'GLOBAL.SYSTEMS', color: 'bg-pure-white' },
    { name: 'QUANTUM.AI', color: 'bg-acid-yellow' },
    { name: 'NEXUS.DIGITAL', color: 'bg-neon-green' },
    { name: 'ZENITH.TECH', color: 'bg-pure-white' },
  ];

  return (
    <section className="py-24 bg-brutal-black dark:bg-dark-surface border-y-8 border-neon-green transition-colors duration-300">
      <div className="container-custom">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeUp}
            className="text-4xl md:text-6xl text-pure-white dark:text-neon-green uppercase tracking-tighter"
          >
            Trusted by Growing Brands
          </motion.h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {brands.map((brand, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
              className={`${brand.color} dark:bg-dark-surface border-4 border-brutal-black p-8 brutal-shadow-sm flex items-center justify-center aspect-video cursor-pointer transition-transform`}
            >
              <span className="font-heading font-black text-xl md:text-2xl text-brutal-black dark:text-dark-text text-center leading-none">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
