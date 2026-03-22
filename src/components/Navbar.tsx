import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { buttonInteraction, EXPO_OUT } from '../utils/animations';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-pure-white border-b-4 border-brutal-black px-4 md:px-8 py-4 flex justify-between items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, rotate: -2 }}
        transition={{ duration: 0.4, ease: EXPO_OUT }}
        className="font-heading font-black text-2xl md:text-3xl tracking-tighter z-50 relative cursor-pointer"
      >
        BRUTAL.AGENCY
      </motion.div>
      
      {/* Desktop Menu */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EXPO_OUT }}
        className="hidden md:flex items-center gap-8 lg:gap-12 font-heading font-bold text-lg"
      >
        {['WORK', 'SERVICES', 'ABOUT', 'LABS'].map((item) => (
          <motion.a 
            key={item}
            href="#" 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3, ease: EXPO_OUT }}
            className="relative group px-2 py-1"
          >
            <span className="relative z-10">{item}</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-brutal-black group-hover:w-full group-hover:h-full group-hover:bg-neon-green transition-all -z-0"></span>
          </motion.a>
        ))}
      </motion.div>

      <motion.a 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        variants={buttonInteraction}
        whileHover="hover"
        whileTap="tap"
        href="#contact" 
        className="hidden md:inline-flex items-center justify-center bg-pure-white border-4 border-brutal-black px-8 py-2.5 font-heading font-bold text-xl brutal-shadow brutal-shadow-active hover:bg-neon-green transition-all"
      >
        HIRE US
      </motion.a>
      
      {/* Mobile Toggle */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden font-heading font-bold text-xl border-4 border-brutal-black p-2 bg-neon-green brutal-shadow-sm z-50 relative"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EXPO_OUT }}
            className="absolute top-full left-0 w-full bg-pure-white border-b-4 border-brutal-black flex flex-col font-heading font-bold text-2xl md:hidden overflow-hidden"
          >
            {['WORK', 'SERVICES', 'ABOUT', 'LABS'].map((item) => (
              <a key={item} href="#" className="p-6 border-b-4 border-brutal-black hover:bg-neon-green hover:pl-8 transition-all">{item}</a>
            ))}
            <div className="p-6 bg-acid-yellow">
              <a href="#contact" className="block w-full text-center bg-pure-white border-4 border-brutal-black py-4 brutal-shadow-sm hover:bg-neon-green transition-colors">
                HIRE US
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
