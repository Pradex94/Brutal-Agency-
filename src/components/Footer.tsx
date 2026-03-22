import { motion } from 'framer-motion';
import { fadeUp } from '../utils/animations';

export default function Footer() {
  return (
    <footer className="bg-acid-yellow px-4 md:px-8 pt-12 md:pt-16 pb-8 border-b-8 border-brutal-black overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 md:gap-10 mb-12 md:mb-16"
      >
        <div className="font-heading font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter uppercase">
          BRUTAL.AGENCY
        </div>
        
        <div className="flex flex-wrap gap-4 md:gap-6 font-heading font-bold text-xl md:text-2xl uppercase">
          {['INSTAGRAM', 'TWITTER', 'LINKEDIN', 'TELEGRAM'].map((social) => (
            <motion.a 
              key={social}
              whileHover={{ scale: 1.1, rotate: -2 }}
              href="#" 
              className="hover:bg-brutal-black hover:text-neon-green px-3 py-1 border-4 border-transparent hover:border-brutal-black transition-colors"
            >
              {social}
            </motion.a>
          ))}
        </div>
      </motion.div>

      <div className="max-w-[1400px] mx-auto border-t-4 border-brutal-black pt-8 md:pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono font-bold text-sm md:text-base uppercase mb-16">
        <div>
          ©2024 NOISE MAKERS INDUSTRIES. NO RIGHTS RESERVED.
        </div>
        <div className="flex flex-wrap gap-6 md:gap-10">
          <span>LAT: 52.5200</span>
          <span>LONG: 13.4050</span>
        </div>
      </div>

      {/* Massive Text */}
      <div className="w-full overflow-hidden flex justify-center items-center mt-8">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.1 }}
          transition={{ duration: 0.8 }}
          className="font-heading font-black text-[15vw] leading-none tracking-tighter text-brutal-black select-none whitespace-nowrap"
        >
          BRUTAL.AGENCY
        </motion.h1>
      </div>
    </footer>
  );
}
