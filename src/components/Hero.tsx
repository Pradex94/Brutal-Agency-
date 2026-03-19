import { Star, Triangle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-20 grid-bg overflow-hidden border-b-4 border-brutal-black">
      
      {/* Decorative Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-16 left-4 md:top-32 md:left-24 w-16 h-16 bg-neon-green border-4 border-brutal-black flex items-center justify-center brutal-shadow-sm z-0"
      >
        <Star className="w-8 h-8" strokeWidth={3} />
      </motion.div>
      
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-16 right-4 md:bottom-32 md:right-24 brutal-shadow-sm bg-acid-yellow border-4 border-brutal-black w-20 h-20 flex items-center justify-center z-0"
      >
        <Triangle className="w-10 h-10" strokeWidth={3} />
      </motion.div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center max-w-6xl w-full mt-8 md:mt-0">
        
        {/* Top Label */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          className="bg-acid-yellow border-4 border-brutal-black px-6 py-2 font-mono font-bold text-sm md:text-base mb-8 md:mb-12 brutal-shadow-sm -rotate-2 inline-block"
        >
          EST. 2024 / DIGITAL OUTLAWS
        </motion.div>
        
        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-black text-[4rem] leading-[0.85] sm:text-7xl md:text-8xl lg:text-[140px] tracking-tighter mb-12 md:mb-16 w-full uppercase"
        >
          WE MAKE NOISE<br />
          <span className="text-neon-green dot-stroke text-[5rem] sm:text-8xl md:text-9xl lg:text-[150px] align-middle leading-none inline-block -mt-2 md:-mt-4 mx-2 md:mx-4">•</span> YOU MAKE PROFIT
        </motion.h1>

        {/* CTA & Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-4 w-full"
        >
          <a href="#contact" className="group flex items-center gap-4 bg-neon-green border-4 border-brutal-black px-10 md:px-14 py-5 md:py-6 font-heading font-black text-2xl md:text-4xl brutal-shadow brutal-shadow-active hover:bg-brutal-black hover:text-neon-green transition-all w-full md:w-auto justify-center">
            GET STARTED
            <ArrowRight className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-2 transition-transform" strokeWidth={4} />
          </a>
          
          <div className="font-mono text-sm md:text-base text-left border-l-4 border-brutal-black pl-6 py-2 font-bold leading-relaxed bg-pure-white/90 backdrop-blur-sm w-full md:w-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            // IMPACT METRICS:<br />
            +450% ROI TYPICAL<br />
            ZERO SOFT SOLUTIONS<br />
            PURE ADRENALINE
          </div>
        </motion.div>
      </div>
    </section>
  );
}
