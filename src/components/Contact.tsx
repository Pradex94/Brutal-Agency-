import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, buttonInteraction } from '../utils/animations';
import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    Revenue: '',
    Bottleneck: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        createdAt: serverTimestamp()
      });

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        website: '',
        Revenue: '',
        Bottleneck: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('Error adding document: ', err);
      setError('TRANSMISSION FAILED. TRY AGAIN OR EMAIL US DIRECTLY.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-pure-white border-4 border-brutal-black p-8 md:p-16 lg:p-20 brutal-shadow"
        >
          <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-6 leading-none uppercase">
            STOP LOSING MONEY.
          </h2>
          <p className="font-body font-bold text-lg md:text-2xl mb-10 md:mb-12 max-w-2xl uppercase border-l-4 border-neon-green pl-4">
            Fill out the form below. If you qualify, we'll tear down your current strategy and show you exactly how to scale. No bullshit.
          </p>
          
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-neon-green border-4 border-brutal-black p-8 md:p-12 flex flex-col items-center text-center gap-6 brutal-shadow"
              >
                <CheckCircle2 className="w-20 h-20 md:w-24 md:h-24" strokeWidth={3} />
                <h3 className="font-heading font-black text-3xl md:text-5xl uppercase">WE'LL CONTACT YOU SOON 🚀</h3>
                <p className="font-body font-bold text-xl uppercase">YOUR APPLICATION HAS BEEN TRANSMITTED SUCCESSFULLY.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 font-mono font-bold underline uppercase hover:text-pure-white transition-colors"
                >
                  SEND ANOTHER RESPONSE
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 md:space-y-8" 
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="flex flex-col group">
                    <label className="font-mono font-bold text-sm md:text-base mb-2 md:mb-3 uppercase group-focus-within:text-neon-green transition-colors">YOUR NAME</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-4 border-brutal-black p-4 md:p-5 font-body font-bold text-lg md:text-xl focus:outline-none focus:ring-0 focus:bg-acid-yellow transition-all brutal-shadow-sm focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 focus:-translate-x-1 placeholder:text-brutal-black/30" 
                      placeholder="JOHN DOE" 
                    />
                  </div>
                  <div className="flex flex-col group">
                    <label className="font-mono font-bold text-sm md:text-base mb-2 md:mb-3 uppercase group-focus-within:text-neon-green transition-colors">YOUR EMAIL</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-4 border-brutal-black p-4 md:p-5 font-body font-bold text-lg md:text-xl focus:outline-none focus:ring-0 focus:bg-acid-yellow transition-all brutal-shadow-sm focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 focus:-translate-x-1 placeholder:text-brutal-black/30" 
                      placeholder="JOHN@EXAMPLE.COM" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="flex flex-col group">
                    <label className="font-mono font-bold text-sm md:text-base mb-2 md:mb-3 uppercase group-focus-within:text-neon-green transition-colors">WEBSITE URL (OPTIONAL)</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="url" 
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="border-4 border-brutal-black p-4 md:p-5 font-body font-bold text-lg md:text-xl focus:outline-none focus:ring-0 focus:bg-acid-yellow transition-all brutal-shadow-sm focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 focus:-translate-x-1 placeholder:text-brutal-black/30" 
                      placeholder="HTTPS://YOURBRAND.COM" 
                    />
                  </div>
                  <div className="flex flex-col group">
                    <label className="font-mono font-bold text-sm md:text-base mb-2 md:mb-3 uppercase group-focus-within:text-neon-green transition-colors">MONTHLY REVENUE (OPTIONAL)</label>
                    <motion.select 
                      whileFocus={{ scale: 1.01 }}
                      name="Revenue"
                      value={formData.Revenue}
                      onChange={handleChange}
                      className="border-4 border-brutal-black p-4 md:p-5 font-body font-bold text-lg md:text-xl focus:outline-none focus:ring-0 focus:bg-acid-yellow transition-all brutal-shadow-sm focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 focus:-translate-x-1 appearance-none bg-pure-white"
                    >
                      <option value="">SELECT REVENUE RANGE</option>
                      <option value="0-10k">$0 - $10,000</option>
                      <option value="10k-50k">$10,000 - $50,000</option>
                      <option value="50k-250k">$50,000 - $250,000</option>
                      <option value="250k+">$250,000+</option>
                    </motion.select>
                  </div>
                </div>
                
                <div className="flex flex-col group">
                  <label className="font-mono font-bold text-sm md:text-base mb-2 md:mb-3 uppercase group-focus-within:text-neon-green transition-colors">BIGGEST BOTTLENECK? (OPTIONAL)</label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01 }}
                    name="Bottleneck"
                    value={formData.Bottleneck}
                    onChange={handleChange}
                    rows={4} 
                    className="border-4 border-brutal-black p-4 md:p-5 font-body font-bold text-lg md:text-xl focus:outline-none focus:ring-0 focus:bg-acid-yellow transition-all brutal-shadow-sm focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 focus:-translate-x-1 placeholder:text-brutal-black/30 resize-y" 
                    placeholder="TELL US WHAT'S HOLDING YOU BACK..."
                  ></motion.textarea>
                </div>

                {error && (
                  <div className="bg-red-500 text-white p-4 border-4 border-brutal-black font-bold uppercase brutal-shadow-sm">
                    {error}
                  </div>
                )}

                <motion.button 
                  variants={buttonInteraction}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isSubmitting}
                  type="submit" 
                  className="group w-full flex items-center justify-center gap-4 bg-neon-green border-4 border-brutal-black py-5 md:py-6 font-heading font-black text-2xl md:text-3xl brutal-shadow hover:bg-brutal-black hover:text-neon-green transition-all mt-8 uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'SENDING...' : 'APPLY FOR FREE AUDIT'}
                  {!isSubmitting && <Send className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" strokeWidth={3} />}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
