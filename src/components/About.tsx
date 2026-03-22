import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const points = [
    "AI-powered systems that scale with your business",
    "Automation-first approach to eliminate manual bottlenecks",
    "Results-driven execution focused on ROI, not just vanity metrics"
  ];

  return (
    <section id="about" className="py-32 bg-pure-white dark:bg-dark-bg transition-colors duration-300">
      <div className="container-custom">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-5xl md:text-7xl mb-8 uppercase tracking-tighter dark:text-dark-text">
              We Don’t Build Websites. <br />
              <span className="text-neon-green">We Build Growth Systems.</span>
            </h2>
            <p className="text-xl md:text-2xl font-body font-medium mb-10 text-brutal-black/80 dark:text-dark-text/80 uppercase">
              Most agencies focus on aesthetics. We focus on engineering. Our mission is to transform businesses into high-performance digital engines using cutting-edge AI and automation.
            </p>
            
            <div className="space-y-6">
              {points.map((point, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp}
                  className="flex items-start gap-4 bg-acid-yellow dark:bg-dark-surface border-4 border-brutal-black p-6 brutal-shadow-sm"
                >
                  <CheckCircle2 className="w-8 h-8 text-brutal-black dark:text-neon-green shrink-0" strokeWidth={3} />
                  <span className="text-lg md:text-xl font-bold uppercase dark:text-dark-text">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={fadeUp}
            className="relative"
          >
            <div className="aspect-square bg-neon-green border-8 border-brutal-black brutal-shadow flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-30"></div>
              <div className="relative z-10 text-[200px] font-black text-brutal-black leading-none select-none">
                AI
              </div>
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-acid-yellow border-4 border-brutal-black brutal-shadow-sm flex items-center justify-center -rotate-6">
              <span className="font-heading font-black text-3xl text-center">GROWTH<br/>ENGINE</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
