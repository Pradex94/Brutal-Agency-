/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition } from './utils/animations';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import ServiceDetail from './pages/ServiceDetail';
import { useEffect, useState } from 'react';

export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div 
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/services" element={<Home />} /> {/* Anchor link handling in Home */}
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/about" element={<Home />} /> {/* Anchor link handling in Home */}
              <Route path="/work" element={<Home />} /> {/* Anchor link handling in Home */}
              <Route path="/contact" element={<Home />} /> {/* Anchor link handling in Home */}
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
