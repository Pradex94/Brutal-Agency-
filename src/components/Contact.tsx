import { Mail, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section id="contact" className="bg-acid-yellow py-24 md:py-32 px-4 md:px-8 border-b-4 border-brutal-black relative overflow-hidden">
      <div className="grid-bg absolute inset-0 z-0"></div>
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Floating Mail Icon */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [12, 15, 12] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -right-4 md:-top-16 md:-right-16 w-24 h-24 md:w-32 md:h-32 bg-pure-white border-4 border-brutal-black flex items-center justify-center brutal-shadow z-20"
        >
          <Mail className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2.5} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-pure-white border-4 border-brutal-black p-8 md:p-16 lg:p-20 brutal-shadow"
        >
          <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-10 md:mb-12 leading-none uppercase">
            READY TO GET LOUD?
          </h2>
          
          <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col group">
                <label className="font-mono font-bold text-sm md:text-base mb-2 md:mb-3 uppercase group-focus-within:text-neon-green transition-colors">YOUR NAME</label>
                <input 
                  type="text" 
                  className="border-4 border-brutal-black p-4 md:p-5 font-body font-bold text-lg md:text-xl focus:outline-none focus:ring-0 focus:bg-acid-yellow transition-all brutal-shadow-sm focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 focus:-translate-x-1 placeholder:text-brutal-black/30" 
                  placeholder="JOHN DOE" 
                />
              </div>
              <div className="flex flex-col group">
                <label className="font-mono font-bold text-sm md:text-base mb-2 md:mb-3 uppercase group-focus-within:text-neon-green transition-colors">YOUR EMAIL</label>
                <input 
                  type="email" 
                  className="border-4 border-brutal-black p-4 md:p-5 font-body font-bold text-lg md:text-xl focus:outline-none focus:ring-0 focus:bg-acid-yellow transition-all brutal-shadow-sm focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 focus:-translate-x-1 placeholder:text-brutal-black/30" 
                  placeholder="JOHN@EXAMPLE.COM" 
                />
              </div>
            </div>
            
            <div className="flex flex-col group">
              <label className="font-mono font-bold text-sm md:text-base mb-2 md:mb-3 uppercase group-focus-within:text-neon-green transition-colors">WHAT DO YOU NEED?</label>
              <textarea 
                rows={5} 
                className="border-4 border-brutal-black p-4 md:p-5 font-body font-bold text-lg md:text-xl focus:outline-none focus:ring-0 focus:bg-acid-yellow transition-all brutal-shadow-sm focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 focus:-translate-x-1 placeholder:text-brutal-black/30 resize-y" 
                placeholder="TELL US ABOUT YOUR PROJECT..."
              ></textarea>
            </div>

            <button type="submit" className="group w-full flex items-center justify-center gap-4 bg-neon-green border-4 border-brutal-black py-5 md:py-6 font-heading font-black text-2xl md:text-3xl brutal-shadow hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 active:shadow-none active:translate-y-2 active:translate-x-2 hover:bg-brutal-black hover:text-neon-green transition-all mt-8 uppercase">
              SUBMIT REQUEST
              <Send className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" strokeWidth={3} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
