import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, EXPO_OUT } from '../utils/animations';
import { Link } from 'react-router-dom';
import { X, Check } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function Footer() {
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    const saved = localStorage.getItem('cookie-preferences');
    return saved ? JSON.parse(saved) : { essential: true, analytics: false, marketing: false };
  });

  const savePreferences = () => {
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    setShowCookieModal(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Essential is always on
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Services', path: '/#services' },
    { name: 'Work', path: '/#work' },
    { name: 'Contact', path: '/#contact' },
  ];

  const socialLinks = [
    { name: 'INSTAGRAM', url: 'https://instagram.com' },
    { name: 'TWITTER', url: 'https://twitter.com' },
    { name: 'LINKEDIN', url: 'https://linkedin.com' },
    { name: 'TELEGRAM', url: 'https://telegram.org' },
  ];

  return (
    <footer className="bg-brutal-black dark:bg-dark-surface text-pure-white border-t-8 border-neon-green pt-20 pb-12 px-4 md:px-8 relative overflow-hidden transition-colors duration-300">
      <div className="container-custom relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20"
        >
          {/* Brand Section */}
          <div className="space-y-8">
            <Link to="/" className="inline-block font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-none hover:text-neon-green transition-colors">
              BRUTAL<br />MARKETING<br />AGENCY<span className="text-neon-green">.</span>
            </Link>
            <p className="font-heading font-bold text-2xl md:text-3xl uppercase border-l-8 border-neon-green pl-6 max-w-md">
              We build systems that print money.
            </p>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="font-mono font-black text-neon-green text-sm uppercase tracking-widest">Navigation</h3>
              <ul className="space-y-4 font-heading font-bold text-xl md:text-2xl uppercase">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.path.startsWith('/#') ? (
                      <a 
                        href={link.path}
                        className="hover:text-neon-green transition-colors inline-block"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        to={link.path}
                        className="hover:text-neon-green transition-colors inline-block"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => setShowCookieModal(true)}
                    className="hover:text-neon-green transition-colors inline-block uppercase text-left"
                  >
                    Cookie Settings
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-mono font-black text-neon-green text-sm uppercase tracking-widest">Connect</h3>
              <ul className="space-y-4 font-heading font-bold text-xl md:text-2xl uppercase">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <motion.a 
                      whileHover={{ x: 10 }}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-neon-green transition-all inline-block"
                    >
                      {social.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t-4 border-pure-white/20 pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 font-mono font-bold text-sm md:text-base uppercase">
          <div className="text-pure-white/60">
            © 2026 Brutal Marketing Agency. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></span>
              SYSTEMS ONLINE
            </div>
            <div className="flex gap-6">
              <span>LAT: 52.5200</span>
              <span>LONG: 13.4050</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      <AnimatePresence>
        {showCookieModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCookieModal(false)}
              className="absolute inset-0 bg-brutal-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: EXPO_OUT }}
              className="relative w-full max-w-2xl bg-pure-white dark:bg-dark-surface border-8 border-brutal-black p-8 md:p-12 brutal-shadow"
            >
              <button 
                onClick={() => setShowCookieModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-acid-yellow dark:hover:bg-neon-green transition-colors border-2 border-brutal-black"
              >
                <X className="w-6 h-6 text-brutal-black dark:text-brutal-black" />
              </button>

              <h3 className="text-4xl font-black uppercase mb-8 tracking-tighter text-brutal-black dark:text-dark-text">
                COOKIE SETTINGS
              </h3>

              <div className="space-y-8 mb-12">
                {/* Essential */}
                <div className="flex items-center justify-between gap-8 pb-6 border-b-2 border-brutal-black/10">
                  <div>
                    <h4 className="text-xl font-black uppercase text-brutal-black dark:text-dark-text">ESSENTIAL COOKIES</h4>
                    <p className="text-sm font-bold opacity-60 text-brutal-black dark:text-dark-text">REQUIRED FOR THE WEBSITE TO FUNCTION PROPERLY.</p>
                  </div>
                  <div className="w-16 h-8 bg-neon-green border-2 border-brutal-black flex items-center justify-center">
                    <Check className="w-6 h-6 text-brutal-black" strokeWidth={4} />
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between gap-8 pb-6 border-b-2 border-brutal-black/10">
                  <div>
                    <h4 className="text-xl font-black uppercase text-brutal-black dark:text-dark-text">ANALYTICS COOKIES</h4>
                    <p className="text-sm font-bold opacity-60 text-brutal-black dark:text-dark-text">HELP US UNDERSTAND HOW VISITORS INTERACT WITH THE SITE.</p>
                  </div>
                  <button 
                    onClick={() => togglePreference('analytics')}
                    className={`w-16 h-8 border-2 border-brutal-black transition-colors flex items-center px-1 ${preferences.analytics ? 'bg-neon-green' : 'bg-pure-white'}`}
                  >
                    <motion.div 
                      animate={{ x: preferences.analytics ? 32 : 0 }}
                      className="w-6 h-6 bg-brutal-black"
                    />
                  </button>
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between gap-8 pb-6 border-b-2 border-brutal-black/10">
                  <div>
                    <h4 className="text-xl font-black uppercase text-brutal-black dark:text-dark-text">MARKETING COOKIES</h4>
                    <p className="text-sm font-bold opacity-60 text-brutal-black dark:text-dark-text">USED TO TRACK VISITORS ACROSS WEBSITES TO DISPLAY RELEVANT ADS.</p>
                  </div>
                  <button 
                    onClick={() => togglePreference('marketing')}
                    className={`w-16 h-8 border-2 border-brutal-black transition-colors flex items-center px-1 ${preferences.marketing ? 'bg-neon-green' : 'bg-pure-white'}`}
                  >
                    <motion.div 
                      animate={{ x: preferences.marketing ? 32 : 0 }}
                      className="w-6 h-6 bg-brutal-black"
                    />
                  </button>
                </div>
              </div>

              <button 
                onClick={savePreferences}
                className="w-full bg-neon-green border-4 border-brutal-black py-6 font-heading font-black text-2xl brutal-shadow-sm hover:bg-acid-yellow transition-all text-brutal-black"
              >
                SAVE PREFERENCES
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Decorative Background Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-5 select-none translate-y-1/2">
        <h1 className="font-heading font-black text-[25vw] leading-none tracking-tighter uppercase whitespace-nowrap">
          BRUTAL BRUTAL BRUTAL
        </h1>
      </div>
    </footer>
  );
}
