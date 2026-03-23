import { Megaphone, Rocket, Video, Target, Cpu, Globe, Zap, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { fadeUp, staggerContainer, hoverLift } from '../utils/animations';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    title: 'AI LEAD GENERATION',
    slug: 'ai-lead-generation',
    icon: <Target className="w-10 h-10" strokeWidth={2.5} />,
    color: 'bg-neon-green',
    points: ['AUTOMATED PROSPECTING', 'HYPER-PERSONALIZED OUTREACH', 'REAL-TIME LEAD SCORING']
  },
  {
    title: 'BUSINESS AUTOMATION',
    slug: 'automation',
    icon: <Cpu className="w-10 h-10" strokeWidth={2.5} />,
    color: 'bg-acid-yellow',
    points: ['WORKFLOW OPTIMIZATION', 'CUSTOM API INTEGRATIONS', 'ERROR-FREE SYNCING']
  },
  {
    title: 'WEB DEVELOPMENT',
    slug: 'web-development',
    icon: <Globe className="w-10 h-10" strokeWidth={2.5} />,
    color: 'bg-pure-white',
    points: ['CONVERSION-OPTIMIZED', 'LIGHTNING-FAST LOAD TIMES', 'MOBILE-FIRST DESIGN']
  },
  {
    title: 'AI CHATBOTS',
    slug: 'chatbots',
    icon: <Zap className="w-10 h-10" strokeWidth={2.5} />,
    color: 'bg-neon-green',
    points: ['24/7 INTELLIGENT SUPPORT', 'INSTANT ENGAGEMENT', 'MULTI-PLATFORM DEPLOYMENT']
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="services" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden bg-brutal-white dark:bg-dark-bg transition-colors duration-300">
      {/* Background Pattern with Parallax */}
      <motion.div 
        style={{ 
          y: backgroundY,
          backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)', 
          backgroundSize: '30px 30px' 
        }}
        className="absolute inset-0 opacity-5 pointer-events-none text-brutal-black dark:text-dark-text" 
      ></motion.div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8 md:gap-12">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter uppercase dark:text-dark-text"
          >
            SYSTEMS THAT<br />
            <span className="bg-neon-green text-brutal-black px-4 md:px-6 py-1 md:py-2 border-4 border-brutal-black inline-block mt-4 brutal-shadow-sm -rotate-1">SCALE.</span>
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-body font-bold text-lg md:text-xl lg:text-2xl max-w-lg border-l-4 border-brutal-black dark:border-dark-text pl-6 py-2 uppercase bg-pure-white/80 dark:bg-dark-surface/80 backdrop-blur-sm dark:text-dark-text"
          >
            WE DON'T DO "MARKETING". WE BUILD HIGH-PERFORMANCE GROWTH ENGINES THAT PRINT REVENUE.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
        >
          {SERVICES.map((service, index) => (
            <motion.div 
              key={index}
              variants={fadeUp}
              whileHover="hover"
              className="bg-pure-white dark:bg-dark-surface border-4 border-brutal-black p-8 md:p-10 brutal-shadow flex flex-col group transition-all duration-300 relative overflow-hidden"
            >
              <Link to={`/services/${service.slug}`} className="absolute inset-0 z-20" />
              <motion.div variants={hoverLift} className="h-full flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-20 h-20 ${service.color} border-4 border-brutal-black flex items-center justify-center brutal-shadow-sm group-hover:scale-110 transition-transform duration-300 text-brutal-black`}>
                    {service.icon}
                  </div>
                  <div className="bg-brutal-black text-pure-white p-2 border-2 border-brutal-black group-hover:bg-neon-green group-hover:text-brutal-black transition-colors">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
                
                <h3 className="font-heading font-black text-3xl md:text-5xl mb-6 uppercase leading-none dark:text-dark-text">
                  {service.title}
                </h3>
                
                <ul className="font-mono font-bold text-sm md:text-lg space-y-4 mb-8 flex-grow uppercase dark:text-dark-text/80">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-neon-green text-2xl">■</span> {point}
                    </li>
                  ))}
                </ul>

                <div className="font-mono font-black text-lg underline underline-offset-4 group-hover:text-neon-green transition-colors dark:text-dark-text">
                  VIEW SYSTEM DETAILS
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
