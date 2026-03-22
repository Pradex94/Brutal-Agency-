'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { CookiePreferences } from './CookieBanner';

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: CookiePreferences;
  onSave: (prefs: CookiePreferences) => void;
  onAcceptAll: () => void;
}

export default function CookieModal({ isOpen, onClose, preferences, onSave, onAcceptAll }: CookieModalProps) {
  const [localPrefs, setLocalPrefs] = useState<CookiePreferences>(preferences);

  useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences, isOpen]);

  const BrutalCheckbox = ({ label, description, checked, onChange, disabled = false }: any) => (
    <label className={`flex items-start gap-4 p-4 border-4 border-brutal-black ${disabled ? 'opacity-60 bg-brutal-black/5' : 'cursor-pointer hover:bg-acid-yellow/20'} transition-colors`}>
      <div className="relative flex items-center justify-center mt-1 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div className={`w-8 h-8 border-4 border-brutal-black flex items-center justify-center transition-colors ${checked ? 'bg-neon-green' : 'bg-pure-white'}`}>
          {checked && <div className="w-4 h-4 bg-brutal-black" />}
        </div>
      </div>
      <div>
        <div className="font-heading font-black text-xl md:text-2xl uppercase">{label}</div>
        <div className="font-mono font-bold text-xs md:text-sm mt-1 uppercase text-brutal-black/80">{description}</div>
      </div>
    </label>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brutal-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-pure-white border-4 border-brutal-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b-4 border-brutal-black bg-acid-yellow">
              <h2 className="font-heading font-black text-3xl uppercase">Cookie Preferences</h2>
              <button
                onClick={onClose}
                className="p-2 border-4 border-brutal-black bg-pure-white hover:bg-brutal-black hover:text-pure-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1"
              >
                <X className="w-6 h-6" strokeWidth={3} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-grow">
              <BrutalCheckbox
                label="Essential Cookies"
                description="Required for the website to function properly. Cannot be disabled."
                checked={true}
                onChange={() => {}}
                disabled={true}
              />
              <BrutalCheckbox
                label="Analytics Cookies"
                description="Help us understand how visitors interact with the website."
                checked={localPrefs.analytics}
                onChange={(val: boolean) => setLocalPrefs(prev => ({ ...prev, analytics: val }))}
              />
              <BrutalCheckbox
                label="Marketing Cookies"
                description="Used to track visitors across websites to display relevant ads."
                checked={localPrefs.marketing}
                onChange={(val: boolean) => setLocalPrefs(prev => ({ ...prev, marketing: val }))}
              />
            </div>

            <div className="p-6 border-t-4 border-brutal-black bg-pure-white flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={() => onSave(localPrefs)}
                className="bg-pure-white border-4 border-brutal-black px-6 py-3 font-heading font-black text-xl uppercase hover:bg-acid-yellow transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 active:shadow-none active:translate-y-1 active:translate-x-1 w-full sm:w-auto"
              >
                Save Preferences
              </button>
              <button
                onClick={onAcceptAll}
                className="bg-neon-green border-4 border-brutal-black px-6 py-3 font-heading font-black text-xl uppercase hover:bg-brutal-black hover:text-neon-green transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 active:shadow-none active:translate-y-1 active:translate-x-1 w-full sm:w-auto"
              >
                Accept All
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
