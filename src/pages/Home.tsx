import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Brands from '../components/Brands';
import Services from '../components/Services';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Brands />
      <Services />
      <Portfolio />
      <Contact />
    </>
  );
}
