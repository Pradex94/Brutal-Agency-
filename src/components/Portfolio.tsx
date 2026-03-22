import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, staggerContainer, buttonInteraction, EXPO_OUT } from '../utils/animations';
import { useRef } from 'react';

export default function Portfolio() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section id="work" ref={containerRef} className="bg-brutal-black dark:bg-dark-bg py-24 md:py-32 px-4 md:px-8 border-y-4 border-brutal-black overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24"
        >
          {/* Project 1 */}
          <motion.div 
            variants={fadeUp}
            className="group relative border-4 border-pure-white dark:border-dark-surface overflow-hidden brutal-shadow bg-pure-white dark:bg-dark-surface block cursor-pointer"
          >
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
              <motion.img 
                style={{ y: imgY1, scale: 1.1 }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.8, ease: EXPO_OUT }}
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                alt="Neon Ghost" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-brutal-black/0 group-hover:bg-brutal-black/40 transition-colors duration-300"></div>
              
              {/* View Project Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="bg-neon-green border-4 border-brutal-black px-6 py-3 font-heading font-black text-2xl uppercase translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                  VIEW PROJECT <ArrowUpRight className="w-6 h-6" strokeWidth={3} />
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-pure-white dark:bg-dark-surface border-4 border-brutal-black px-4 md:px-6 py-2 md:py-3 font-heading font-black text-xl md:text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] group-hover:-translate-y-2 transition-transform duration-500 ease-[0.22,1,0.36,1] flex flex-col gap-1 z-20 dark:text-dark-text">
              <span>PROJECT: NEON GHOST</span>
              <span className="text-sm md:text-base font-mono text-neon-green bg-brutal-black px-2 py-1 inline-block w-max mt-1">RESULT: +340% ROI</span>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div 
            variants={fadeUp}
            className="group relative border-4 border-pure-white dark:border-dark-surface overflow-hidden brutal-shadow bg-pure-white dark:bg-dark-surface block cursor-pointer"
          >
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
              <motion.img 
                style={{ y: imgY2, scale: 1.1 }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.8, ease: EXPO_OUT }}
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" 
                alt="Logic Bomb" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-brutal-black/0 group-hover:bg-brutal-black/40 transition-colors duration-300"></div>
              
              {/* View Project Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="bg-acid-yellow border-4 border-brutal-black px-6 py-3 font-heading font-black text-2xl uppercase translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                  VIEW PROJECT <ArrowUpRight className="w-6 h-6" strokeWidth={3} />
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-pure-white dark:bg-dark-surface border-4 border-brutal-black px-4 md:px-6 py-2 md:py-3 font-heading font-black text-xl md:text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] group-hover:-translate-y-2 transition-transform duration-500 ease-[0.22,1,0.36,1] flex flex-col gap-1 z-20 dark:text-dark-text">
              <span>PROJECT: LOGIC BOMB</span>
              <span className="text-sm md:text-base font-mono text-acid-yellow bg-brutal-black px-2 py-1 inline-block w-max mt-1">RESULT: $2.4M ARR</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Big Block */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-pure-white dark:bg-dark-surface border-4 border-pure-white dark:border-dark-surface p-12 md:p-24 flex flex-col items-center justify-center text-center brutal-shadow relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-acid-yellow/20" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
          <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-9xl tracking-tighter mb-10 md:mb-12 text-brutal-black dark:text-dark-text leading-none uppercase relative z-10">
            VIEW OUR ARCHIVES
          </h2>
          <motion.a 
            variants={buttonInteraction}
            whileHover="hover"
            whileTap="tap"
            href="#" 
            className="group flex items-center gap-4 bg-brutal-black text-pure-white border-4 border-brutal-black px-8 md:px-12 py-5 md:py-6 font-heading font-black text-2xl md:text-3xl hover:bg-neon-green hover:text-brutal-black transition-colors brutal-shadow-sm brutal-shadow-active uppercase relative z-10"
          >
            EXPLORE ALL WORK
            <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={3} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
