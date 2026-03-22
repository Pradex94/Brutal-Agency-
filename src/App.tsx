/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Clients from './components/Clients';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import CustomCursor from './components/CustomCursor';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition } from './utils/animations';

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="main-content"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen flex flex-col relative"
      >
        <CustomCursor />
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Marquee />
          <Clients />
          <Services />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
        <CookieBanner />
      </motion.div>
    </AnimatePresence>
  );
}
