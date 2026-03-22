import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import CookieModal from './CookieModal';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check for consent once on mount
    const stored = localStorage.getItem('cookieConsent');
    if (stored === 'accepted') {
      const prefs = localStorage.getItem('cookie-preferences');
      if (prefs) {
        try {
          const parsed = JSON.parse(prefs);
          setPreferences(parsed);
          applyScripts(parsed);
        } catch (e) {
          // Fallback
        }
      }
      setIsVisible(false);
    } else {
      // Show banner if no consent found
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const applyScripts = (prefs: CookiePreferences) => {
    if (prefs.analytics) {
      console.log('✅ Analytics scripts loaded');
    }
    if (prefs.marketing) {
      console.log('✅ Marketing scripts loaded');
    }
  };

  const handleAcceptAll = () => {
    const newPrefs = { essential: true, analytics: true, marketing: true };
    savePreferences(newPrefs);
  };

  const handleRejectAll = () => {
    const newPrefs = { essential: true, analytics: false, marketing: false };
    savePreferences(newPrefs);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
    setPreferences(prefs);
    applyScripts(prefs);
    setIsVisible(false); // Hide immediately
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Settings Button */}
      {!isVisible && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-acid-yellow border-4 border-brutal-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all flex items-center gap-2 font-heading font-black text-sm uppercase"
        >
          <Settings className="w-5 h-5" strokeWidth={3} />
          <span className="hidden sm:inline">Cookie Settings</span>
        </button>
      )}

      {/* Main Banner */}
      <AnimatePresence>
        {isVisible && !isModalOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6"
          >
            <div className="max-w-[1400px] mx-auto bg-pure-white dark:bg-dark-surface border-4 border-brutal-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="font-heading font-black text-2xl md:text-3xl uppercase mb-2 dark:text-dark-text">Cookie Consent</h3>
                <p className="font-mono font-bold text-sm md:text-base uppercase text-brutal-black/80 dark:text-dark-text/80">
                  We use cookies to improve your experience and analyze traffic.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-pure-white dark:bg-dark-bg border-4 border-brutal-black px-6 py-3 font-heading font-black text-xl uppercase hover:bg-acid-yellow dark:hover:bg-neon-green dark:hover:text-brutal-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-1 hover:-translate-y-1 active:shadow-none active:translate-y-1 active:translate-x-1 whitespace-nowrap dark:text-dark-text"
                >
                  Customize
                </button>
                <button
                  onClick={handleRejectAll}
                  className="bg-brutal-black text-pure-white border-4 border-brutal-black px-6 py-3 font-heading font-black text-xl uppercase hover:text-neon-green transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-1 hover:-translate-y-1 active:shadow-none active:translate-y-1 active:translate-x-1 whitespace-nowrap"
                >
                  Reject
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="bg-neon-green border-4 border-brutal-black px-6 py-3 font-heading font-black text-xl uppercase hover:bg-brutal-black hover:text-neon-green transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-1 hover:-translate-y-1 active:shadow-none active:translate-y-1 active:translate-x-1 whitespace-nowrap text-brutal-black"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <CookieModal
        isOpen={isModalOpen}
        onClose={() => {
          if (!localStorage.getItem('cookieConsent')) {
            setIsVisible(true);
          }
          setIsModalOpen(false);
        }}
        preferences={preferences}
        onSave={savePreferences}
        onAcceptAll={handleAcceptAll}
      />
    </>
  );
}
