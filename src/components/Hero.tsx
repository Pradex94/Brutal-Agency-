import { Star, Triangle, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, staggerContainer, textReveal, buttonInteraction } from '../utils/animations';
import { useRef } from 'react';

export default function Hero() {
  const words = "WE DON'T JUST MAKE NOISE • WE MULTIPLY REVENUE".split(' ');
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
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-20 grid-bg overflow-hidden border-b-4 border-brutal-black"
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
      <div className="z-10 flex flex-col items-center max-w-6xl w-full mt-8 md:mt-0">
        
        {/* Top Label */}
        <motion.div 
          variants={fadeUp}
          className="bg-acid-yellow border-4 border-brutal-black px-6 py-2 font-mono font-bold text-sm md:text-base mb-8 md:mb-12 brutal-shadow-sm -rotate-2 inline-block"
        >
          EST. 2024 / DIGITAL OUTLAWS
        </motion.div>
        
        {/* Main Heading */}
        <h1 className="font-heading font-black text-[4rem] leading-[0.85] sm:text-7xl md:text-8xl lg:text-[120px] tracking-tighter mb-6 md:mb-8 w-full uppercase flex flex-wrap justify-center gap-x-4">
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={textReveal}
              className={word === '•' ? 'text-neon-green dot-stroke' : ''}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={fadeUp}
          className="font-body font-bold text-lg md:text-2xl max-w-3xl mx-auto mb-10 md:mb-14 uppercase bg-pure-white/80 backdrop-blur-sm border-l-4 border-brutal-black pl-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left"
        >
          Stop wasting ad spend on pretty designs that don't convert. We build brutal, high-voltage brand weapons that dominate markets and print cash.
        </motion.p>

        {/* CTA & Metrics */}
        <motion.div 
          variants={fadeUp}
          className="flex flex-col items-center justify-center gap-6 mt-4 w-full"
        >
          <motion.a 
            variants={buttonInteraction}
            whileHover="hover"
            whileTap="tap"
            href="#contact" 
            className="group flex items-center gap-4 bg-neon-green border-4 border-brutal-black px-10 md:px-14 py-5 md:py-6 font-heading font-black text-2xl md:text-4xl brutal-shadow brutal-shadow-active hover:bg-brutal-black hover:text-neon-green transition-all w-full md:w-auto justify-center"
          >
            CLAIM FREE GROWTH AUDIT
            <ArrowRight className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-2 transition-transform" strokeWidth={4} />
          </motion.a>
          <div className="font-mono font-bold text-sm md:text-base uppercase flex items-center gap-2 bg-acid-yellow border-2 border-brutal-black px-4 py-1">
            <Star className="w-4 h-4 fill-brutal-black" />
            Trusted by 50+ hyper-growth startups
            <Star className="w-4 h-4 fill-brutal-black" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
