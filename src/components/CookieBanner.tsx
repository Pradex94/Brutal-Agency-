'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings } from 'lucide-react';
import CookieModal from './CookieModal';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner({ isExternalModalOpen, onExternalModalClose }: { isExternalModalOpen?: boolean, onExternalModalClose?: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (isExternalModalOpen) {
      setIsModalOpen(true);
    }
  }, [isExternalModalOpen]);

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
        applyScripts(parsed);
      } catch (e) {
        setIsVisible(true);
      }
    } else {
      // Small delay to allow initial animations to play out before showing banner
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const applyScripts = (prefs: CookiePreferences) => {
    if (prefs.analytics) {
      console.log('✅ Analytics scripts loaded');
    } else {
      console.log('❌ Analytics scripts blocked');
    }
    
    if (prefs.marketing) {
      console.log('✅ Marketing scripts loaded');
    } else {
      console.log('❌ Marketing scripts blocked');
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
    localStorage.setItem('cookie_consent', JSON.stringify(prefs));
    setPreferences(prefs);
    applyScripts(prefs);
    setIsVisible(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Settings Button */}
      {!isVisible && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-neon-green border-4 border-brutal-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all flex items-center gap-2 font-heading font-black text-sm uppercase"
        >
          <Settings className="w-5 h-5" strokeWidth={3} />
          <span className="hidden sm:inline">Cookie Settings</span>
        </button>
      )}

      {/* Main Banner */}
      <AnimatePresence>
        {isVisible && !isModalOpen && (
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
          >
            <div className="max-w-[1400px] mx-auto bg-pure-white border-4 border-brutal-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] pointer-events-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="font-heading font-black text-2xl md:text-3xl uppercase mb-2">Cookie Consent</h3>
                <p className="font-mono font-bold text-sm md:text-base uppercase text-brutal-black/80">
                  We use cookies to improve your experience and analyze traffic.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-pure-white border-4 border-brutal-black px-6 py-3 font-heading font-black text-xl uppercase hover:bg-neon-green transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 active:shadow-none active:translate-y-1 active:translate-x-1 whitespace-nowrap"
                >
                  Customize
                </button>
                <button
                  onClick={handleRejectAll}
                  className="bg-brutal-black text-pure-white border-4 border-brutal-black px-6 py-3 font-heading font-black text-xl uppercase hover:text-neon-green transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 active:shadow-none active:translate-y-1 active:translate-x-1 whitespace-nowrap"
                >
                  Reject
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="bg-neon-green border-4 border-brutal-black px-6 py-3 font-heading font-black text-xl uppercase hover:bg-brutal-black hover:text-neon-green transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 active:shadow-none active:translate-y-1 active:translate-x-1 whitespace-nowrap"
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
          if (!localStorage.getItem('cookie_consent')) {
            setIsVisible(true);
          }
          setIsModalOpen(false);
          onExternalModalClose?.();
        }}
        preferences={preferences}
        onSave={savePreferences}
        onAcceptAll={handleAcceptAll}
      />
    </>
  );
}
