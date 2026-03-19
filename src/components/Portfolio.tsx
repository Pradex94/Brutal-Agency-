import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
  return (
    <section className="bg-brutal-black py-24 md:py-32 px-4 md:px-8 border-y-4 border-brutal-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
          {/* Project 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative border-4 border-pure-white overflow-hidden brutal-shadow bg-pure-white block cursor-pointer"
          >
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                alt="Neon Ghost" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-brutal-black/0 group-hover:bg-brutal-black/40 transition-colors duration-300"></div>
              
              {/* View Project Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="bg-neon-green border-4 border-brutal-black px-6 py-3 font-heading font-black text-2xl uppercase translate-y-8 group-hover:translate-y-0 transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                  VIEW PROJECT <ArrowUpRight className="w-6 h-6" strokeWidth={3} />
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-pure-white border-4 border-brutal-black px-4 md:px-6 py-2 md:py-3 font-heading font-black text-xl md:text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-2 transition-transform duration-300 flex items-center gap-3 z-20">
              PROJECT: NEON GHOST
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="group relative border-4 border-pure-white overflow-hidden brutal-shadow bg-pure-white block cursor-pointer"
          >
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" 
                alt="Logic Bomb" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-brutal-black/0 group-hover:bg-brutal-black/40 transition-colors duration-300"></div>
              
              {/* View Project Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="bg-acid-yellow border-4 border-brutal-black px-6 py-3 font-heading font-black text-2xl uppercase translate-y-8 group-hover:translate-y-0 transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                  VIEW PROJECT <ArrowUpRight className="w-6 h-6" strokeWidth={3} />
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-pure-white border-4 border-brutal-black px-4 md:px-6 py-2 md:py-3 font-heading font-black text-xl md:text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-2 transition-transform duration-300 flex items-center gap-3 z-20">
              PROJECT: LOGIC BOMB
            </div>
          </motion.div>
        </div>

        {/* Big Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-pure-white border-4 border-pure-white p-12 md:p-24 flex flex-col items-center justify-center text-center brutal-shadow relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-acid-yellow/20" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
          <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-9xl tracking-tighter mb-10 md:mb-12 text-brutal-black leading-none uppercase relative z-10">
            VIEW OUR ARCHIVES
          </h2>
          <a href="#" className="group flex items-center gap-4 bg-brutal-black text-pure-white border-4 border-brutal-black px-8 md:px-12 py-5 md:py-6 font-heading font-black text-2xl md:text-3xl hover:bg-neon-green hover:text-brutal-black transition-colors brutal-shadow-sm brutal-shadow-active uppercase relative z-10">
            EXPLORE ALL WORK
            <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={3} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
