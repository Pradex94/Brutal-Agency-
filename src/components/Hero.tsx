import { Star, Triangle, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { fadeUp, staggerContainer, textReveal, buttonInteraction } from '../utils/animations';
import { useRef } from 'react';

export default function Hero() {
  const words = "WE BUILD SYSTEMS THAT PRINT CLIENTS.".split(' ');
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <motion.section 
      ref={containerRef}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 grid-bg overflow-hidden border-b-8 border-brutal-black bg-brutal-white dark:bg-dark-bg transition-colors duration-300"
    >
      
      {/* Decorative Elements with Parallax */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-16 left-4 md:top-32 md:left-24 w-16 h-16 bg-neon-green border-4 border-brutal-black flex items-center justify-center brutal-shadow-sm z-0"
      >
        <Star className="w-8 h-8" strokeWidth={3} />
      </motion.div>
      
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute bottom-16 right-4 md:bottom-32 md:right-24 brutal-shadow-sm bg-acid-yellow border-4 border-brutal-black w-20 h-20 flex items-center justify-center z-0"
      >
        <Triangle className="w-10 h-10" strokeWidth={3} />
      </motion.div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center max-w-6xl w-full">
        
        {/* Top Label */}
        <motion.div 
          variants={fadeUp}
          className="bg-acid-yellow border-4 border-brutal-black px-6 py-2 font-mono font-bold text-sm md:text-base mb-10 brutal-shadow-sm -rotate-2 inline-block text-brutal-black"
        >
          EST. 2024 / PERFORMANCE FIRST
        </motion.div>
        
        {/* Main Heading */}
        <h1 className="font-heading font-black text-[3.5rem] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[110px] tracking-tighter mb-8 w-full uppercase flex flex-col items-center gap-2">
          <motion.span 
            variants={textReveal}
            className="text-brutal-black dark:text-pure-white"
          >
            WE BUILD SYSTEMS
          </motion.span>
          <motion.span 
            variants={textReveal}
            className="text-neon-green drop-shadow-[0_0_15px_rgba(47,248,1,0.3)] dark:drop-shadow-[0_0_25px_rgba(47,248,1,0.5)]"
          >
            THAT PRINT CLIENTS.
          </motion.span>
        </h1>

        <motion.p
          variants={fadeUp}
          className="font-body font-bold text-xl md:text-3xl max-w-4xl mx-auto mb-12 md:mb-16 uppercase bg-pure-white dark:bg-dark-surface border-4 border-brutal-black p-6 md:p-8 brutal-shadow text-center leading-tight text-gray-700 dark:text-gray-300"
        >
          AI-powered marketing systems that generate leads, automate follow-ups, and grow your business.
        </motion.p>

        {/* CTA Section */}
        <motion.div 
          variants={fadeUp}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full"
        >
          <motion.a 
            variants={buttonInteraction}
            whileHover="hover"
            whileTap="tap"
            href="#contact" 
            className="group flex items-center gap-4 bg-neon-green border-4 border-brutal-black px-10 md:px-12 py-5 md:py-6 font-heading font-black text-2xl md:text-3xl brutal-shadow brutal-shadow-active hover:bg-brutal-black hover:text-neon-green transition-all w-full md:w-auto justify-center"
          >
            GET CLIENTS NOW
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" strokeWidth={4} />
          </motion.a>

          <motion.a 
            variants={buttonInteraction}
            whileHover="hover"
            whileTap="tap"
            href="#portfolio" 
            className="flex items-center justify-center bg-pure-white dark:bg-dark-surface border-4 border-brutal-black px-10 md:px-12 py-5 md:py-6 font-heading font-black text-2xl md:text-3xl brutal-shadow brutal-shadow-active hover:bg-acid-yellow transition-all w-full md:w-auto text-brutal-black dark:text-dark-text"
          >
            VIEW OUR WORK
          </motion.a>
        </motion.div>

        {/* Trust Element */}
        <motion.div 
          variants={fadeUp}
          className="mt-12 md:mt-16 flex flex-col items-center gap-4"
        >
          <div className="font-mono font-bold text-base md:text-lg uppercase flex items-center gap-3 bg-brutal-black text-neon-green px-6 py-2 border-2 border-neon-green brutal-shadow-sm">
            <span className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></span>
            Built for agencies & founders
          </div>
          <p className="font-mono font-bold text-xs md:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest">
            Trusted by 50+ hyper-growth startups globally
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
