import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Clients from '../components/Clients';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';

export default function Home() {
  return (
    <motion.div 
      key="home-page"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col relative"
    >
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Marquee />
        <Clients />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </motion.div>
  );
}
