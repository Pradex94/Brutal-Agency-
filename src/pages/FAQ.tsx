import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUp, buttonInteraction } from '../utils/animations';

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer high-impact marketing systems including performance advertising, brutalist web design, conversion rate optimization, and automated sales funnels. We build systems that print money."
  },
  {
    question: "How long does it take to build a website?",
    answer: "A standard brutalist high-performance site takes 2-4 weeks. Complex systems with custom integrations may take 6-8 weeks. We move fast and break things, then fix them better."
  },
  {
    question: "Do you provide backend and automation?",
    answer: "Yes. We specialize in deep automation. From CRM integrations to custom backend workflows, we ensure your business runs like a machine while you sleep."
  },
  {
    question: "How can I contact you?",
    answer: "Use the contact form on our home page or reach out directly via email. We only work with clients who are ready to dominate their market."
  },
  {
    question: "What technologies do you use?",
    answer: "We use cutting-edge tech: React, Next.js, Tailwind CSS, Framer Motion, and high-performance cloud infrastructure. We don't do slow."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeUp}
      className="min-h-screen bg-acid-yellow pt-32 pb-24 px-4 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 font-mono font-bold uppercase mb-12 hover:bg-brutal-black hover:text-neon-green px-4 py-2 border-4 border-brutal-black transition-all brutal-shadow-sm">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter uppercase mb-16 leading-none">
          FAQ<span className="text-neon-green">.</span>
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-4 border-brutal-black bg-pure-white brutal-shadow">
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
              >
                <span className="font-heading font-black text-xl md:text-3xl uppercase tracking-tight group-hover:text-neon-green transition-colors">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <Minus className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" strokeWidth={3} />
                ) : (
                  <Plus className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" strokeWidth={3} />
                )}
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 md:p-8 pt-0 font-body font-bold text-lg md:text-xl uppercase border-t-4 border-brutal-black bg-neon-green/10">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
