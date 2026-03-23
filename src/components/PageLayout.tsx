import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import { motion } from 'framer-motion';
import { pageTransition, fadeUp } from '../utils/animations';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <motion.div 
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col relative grid-bg"
    >
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto w-full">
        <motion.div variants={fadeUp} className="mb-12">
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase mb-6 bg-acid-yellow border-4 border-brutal-black p-4 md:p-8 brutal-shadow inline-block -rotate-1">
            {title}
          </h1>
        </motion.div>
        <motion.div variants={fadeUp} className="bg-pure-white border-4 border-brutal-black p-6 md:p-10 brutal-shadow font-body text-lg md:text-xl uppercase space-y-8">
          {children}
        </motion.div>
      </main>
      <Footer />
      <CookieBanner />
    </motion.div>
  );
}
