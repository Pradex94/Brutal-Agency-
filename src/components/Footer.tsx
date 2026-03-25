import { motion } from 'framer-motion';
import { fadeUp } from '../utils/animations';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brutal-black text-pure-white px-4 md:px-8 pt-20 md:pt-32 pb-12 relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid-bg w-full h-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-8"
          >
            <Link to="/" className="font-heading font-black text-6xl md:text-8xl tracking-tighter uppercase text-neon-green block hover:scale-105 transition-transform origin-left">
              BRUTAL.<br />AGENCY
            </Link>
            <p className="font-body font-bold text-xl md:text-2xl max-w-md uppercase opacity-80">
              WE ARE THE DIGITAL OUTLAWS. WE DON'T FOLLOW TRENDS. WE DESTROY THEM.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6">
              <h3 className="font-mono font-black text-neon-green text-sm uppercase tracking-widest">NAVIGATION</h3>
              <ul className="space-y-4 font-heading font-bold text-xl md:text-2xl uppercase">
                <li><Link to="/work" className="hover:text-neon-green transition-colors">WORK</Link></li>
                <li><Link to="/services" className="hover:text-neon-green transition-colors">SERVICES</Link></li>
                <li><Link to="/about" className="hover:text-neon-green transition-colors">ABOUT</Link></li>
                <li><Link to="/brands" className="hover:text-neon-green transition-colors">BRANDS</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="font-mono font-black text-neon-green text-sm uppercase tracking-widest">SOCIAL</h3>
              <ul className="space-y-4 font-heading font-bold text-xl md:text-2xl uppercase">
                <li><a href="#" className="hover:text-neon-green transition-colors">INSTAGRAM</a></li>
                <li><a href="#" className="hover:text-neon-green transition-colors">TWITTER</a></li>
                <li><a href="#" className="hover:text-neon-green transition-colors">LINKEDIN</a></li>
                <li><a href="#" className="hover:text-neon-green transition-colors">TELEGRAM</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-pure-white/20 pt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-8 font-mono font-bold text-xs md:text-sm uppercase opacity-60">
              <Link to="/privacy-policy" className="hover:text-pure-white transition-colors">PRIVACY POLICY</Link>
              <Link to="/terms-and-conditions" className="hover:text-pure-white transition-colors">TERMS & CONDITIONS</Link>
              <Link to="/faq" className="hover:text-pure-white transition-colors">FAQ</Link>
            </div>
            <div className="font-mono font-bold text-sm md:text-base uppercase space-y-2">
              <div>©2026 BRUTAL AGENCY INDUSTRIES. NO RIGHTS RESERVED.</div>
              <div className="text-xs opacity-60">
                DESIGNED BY <a href="https://www.nighteye-developers.tech" target="_blank" rel="noopener noreferrer" className="text-neon-green hover:underline decoration-2 underline-offset-4">NIGHTEYE DEVELOPERS</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-6">
            <div className="flex gap-8 font-mono font-bold text-xs md:text-sm uppercase opacity-40">
              <span>LAT: 52.5200</span>
              <span>LONG: 13.4050</span>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="bg-neon-green text-brutal-black p-4 border-4 border-brutal-black brutal-shadow-sm hover:bg-acid-yellow transition-colors"
            >
              <ArrowUp className="w-8 h-8" strokeWidth={3} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none translate-y-1/4">
        <motion.h1 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="font-heading font-black text-[25vw] leading-none tracking-tighter text-pure-white whitespace-nowrap"
        >
          BRUTAL.AGENCY
        </motion.h1>
      </div>
    </footer>
  );
}
