import { Megaphone, Rocket, Video } from 'lucide-react';
import { motion } from 'motion/react';

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8 md:gap-12">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter uppercase"
          >
            WHAT WE DO<br />
            <span className="bg-acid-yellow text-brutal-black px-4 md:px-6 py-1 md:py-2 border-4 border-brutal-black inline-block mt-4 brutal-shadow-sm rotate-2">BEST.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-body font-bold text-lg md:text-xl lg:text-2xl max-w-lg border-l-4 border-brutal-black pl-6 py-2 uppercase bg-pure-white/80 backdrop-blur-sm"
          >
            GENERIC STRATEGIES ARE FOR GENERIC COMPANIES. WE CREATE HIGH-VOLTAGE BRAND WEAPONS.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="bg-pure-white border-4 border-brutal-black p-8 md:p-10 brutal-shadow flex flex-col h-full group hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-neon-green/30"></div>
            <div className="w-20 h-20 bg-pure-white border-4 border-brutal-black flex items-center justify-center mb-8 brutal-shadow-sm group-hover:bg-neon-green transition-colors duration-300 relative z-10">
              <Megaphone className="w-10 h-10" strokeWidth={2.5} />
            </div>
            <h3 className="font-heading font-black text-3xl md:text-4xl mb-6 uppercase relative z-10">BRAND IDENTITY</h3>
            <ul className="font-mono font-bold text-sm md:text-base space-y-4 mb-8 flex-grow uppercase relative z-10">
              <li className="flex items-center gap-3"><span className="text-neon-green text-2xl">■</span> DOMINATE YOUR NICHE</li>
              <li className="flex items-center gap-3"><span className="text-neon-green text-2xl">■</span> CONVERT AT SCALE</li>
              <li className="flex items-center gap-3"><span className="text-neon-green text-2xl">■</span> COMMAND PREMIUM PRICES</li>
            </ul>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="bg-pure-white border-4 border-brutal-black p-8 md:p-10 brutal-shadow flex flex-col h-full group hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-acid-yellow/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-acid-yellow/30"></div>
            <div className="w-20 h-20 bg-pure-white border-4 border-brutal-black flex items-center justify-center mb-8 brutal-shadow-sm group-hover:bg-acid-yellow transition-colors duration-300 relative z-10">
              <Rocket className="w-10 h-10" strokeWidth={2.5} />
            </div>
            <h3 className="font-heading font-black text-3xl md:text-4xl mb-6 uppercase relative z-10">GROWTH HACKING</h3>
            <ul className="font-mono font-bold text-sm md:text-base space-y-4 mb-8 flex-grow uppercase relative z-10">
              <li className="flex items-center gap-3"><span className="text-acid-yellow text-2xl">■</span> SCALE TO 8 FIGURES</li>
              <li className="flex items-center gap-3"><span className="text-acid-yellow text-2xl">■</span> LOWER CAC BY 40%</li>
              <li className="flex items-center gap-3"><span className="text-acid-yellow text-2xl">■</span> DATA-DRIVEN DOMINANCE</li>
            </ul>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants} className="bg-pure-white border-4 border-brutal-black p-8 md:p-10 brutal-shadow flex flex-col h-full group hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brutal-black/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-brutal-black/10"></div>
            <div className="w-20 h-20 bg-pure-white border-4 border-brutal-black flex items-center justify-center mb-8 brutal-shadow-sm group-hover:bg-brutal-black group-hover:text-pure-white transition-colors duration-300 relative z-10">
              <Video className="w-10 h-10" strokeWidth={2.5} />
            </div>
            <h3 className="font-heading font-black text-3xl md:text-4xl mb-6 uppercase relative z-10">CONTENT CREATION</h3>
            <ul className="font-mono font-bold text-sm md:text-base space-y-4 mb-8 flex-grow uppercase relative z-10">
              <li className="flex items-center gap-3"><span className="text-brutal-black text-2xl">■</span> VIRAL ENGAGEMENT</li>
              <li className="flex items-center gap-3"><span className="text-brutal-black text-2xl">■</span> CULT-LIKE FOLLOWING</li>
              <li className="flex items-center gap-3"><span className="text-brutal-black text-2xl">■</span> UNIGNORABLE PRESENCE</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
