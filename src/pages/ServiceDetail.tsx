import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, buttonInteraction } from '../utils/animations';
import { ArrowLeft, CheckCircle2, Zap, Target, Cpu, Globe } from 'lucide-react';

const SERVICE_DATA: Record<string, any> = {
  'ai-lead-generation': {
    title: 'AI LEAD GENERATION',
    icon: <Target className="w-16 h-16" />,
    description: 'Stop cold calling. Our AI systems identify, qualify, and engage your ideal prospects with surgical precision.',
    benefits: [
      'Automated prospect research and qualification',
      'Hyper-personalized outreach at scale',
      'Real-time lead scoring and prioritization',
      'Seamless CRM integration'
    ],
    color: 'bg-neon-green'
  },
  'automation': {
    title: 'BUSINESS AUTOMATION',
    icon: <Cpu className="w-16 h-16" />,
    description: 'Eliminate manual bottlenecks. We build custom automation workflows that handle the grunt work while you focus on strategy.',
    benefits: [
      'End-to-end workflow optimization',
      'Custom API integrations',
      'Automated reporting and analytics',
      'Error-free data synchronization'
    ],
    color: 'bg-acid-yellow'
  },
  'web-development': {
    title: 'WEB DEVELOPMENT',
    icon: <Globe className="w-16 h-16" />,
    description: 'High-performance digital weapons. We build brutalist, lightning-fast websites designed to convert visitors into revenue.',
    benefits: [
      'Conversion-optimized architecture',
      'Lightning-fast load times',
      'Mobile-first responsive design',
      'SEO-ready structure'
    ],
    color: 'bg-pure-white'
  },
  'chatbots': {
    title: 'AI CHATBOTS',
    icon: <Zap className="w-16 h-16" />,
    description: '24/7 intelligent engagement. Our custom AI chatbots handle support, sales, and scheduling without human intervention.',
    benefits: [
      'Natural language processing (NLP)',
      'Instant customer support response',
      'Automated appointment scheduling',
      'Multi-platform deployment'
    ],
    color: 'bg-neon-green'
  }
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = slug ? SERVICE_DATA[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black mb-8">SERVICE NOT FOUND</h1>
        <Link to="/" className="bg-neon-green border-4 border-brutal-black px-8 py-4 font-bold brutal-shadow-sm">
          GO BACK HOME
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brutal-white dark:bg-dark-bg pt-32 pb-24 transition-colors duration-300">
      <div className="container-custom">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <Link to="/#services" className="inline-flex items-center gap-2 font-mono font-bold text-lg hover:text-neon-green transition-colors uppercase">
              <ArrowLeft className="w-5 h-5" /> Back to Services
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div variants={fadeUp}>
              <div className={`${service.color} border-8 border-brutal-black p-8 brutal-shadow inline-block mb-8`}>
                {service.icon}
              </div>
              <h1 className="text-6xl md:text-8xl mb-8 uppercase tracking-tighter leading-none">
                {service.title}
              </h1>
              <p className="text-2xl md:text-3xl font-body font-medium mb-12 text-brutal-black/80 dark:text-dark-text/80 uppercase leading-tight">
                {service.description}
              </p>
              
              <motion.a 
                variants={buttonInteraction}
                whileHover="hover"
                whileTap="tap"
                href="/#contact"
                className="inline-flex items-center justify-center bg-neon-green border-4 border-brutal-black px-12 py-6 font-heading font-black text-2xl brutal-shadow brutal-shadow-active hover:bg-acid-yellow transition-all text-brutal-black"
              >
                START YOUR PROJECT
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-pure-white dark:bg-dark-surface border-8 border-brutal-black p-8 md:p-12 brutal-shadow">
              <h2 className="text-3xl md:text-4xl mb-8 uppercase tracking-tighter border-b-4 border-brutal-black pb-4 inline-block">
                Key Benefits
              </h2>
              <div className="space-y-6">
                {service.benefits.map((benefit: string, i: number) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 text-neon-green shrink-0" strokeWidth={3} />
                    <span className="text-xl md:text-2xl font-bold uppercase leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-acid-yellow dark:bg-brutal-black border-4 border-brutal-black font-mono font-bold text-lg uppercase">
                <p className="dark:text-neon-green">Ready to automate your growth? Let's build your system today.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
