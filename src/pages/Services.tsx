import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';
import { Megaphone, Rocket, Video, Target, Zap, Shield } from 'lucide-react';

const serviceDetails = [
  {
    icon: <Megaphone className="w-12 h-12" />,
    title: "BRAND IDENTITY",
    desc: "WE DON'T JUST DESIGN LOGOS. WE BUILD IDENTITIES THAT COMMAND RESPECT AND DOMINATE THE MARKET. YOUR BRAND IS A WEAPON. WE MAKE IT LETHAL.",
    features: ["VISUAL DOMINANCE", "CULT-LIKE LOYALTY", "MARKET POSITIONING"],
    color: "bg-neon-green"
  },
  {
    icon: <Rocket className="w-12 h-12" />,
    title: "GROWTH HACKING",
    desc: "GENERIC MARKETING IS A WASTE OF MONEY. WE FIND THE GAPS IN YOUR COMPETITORS' DEFENSES AND EXPLOIT THEM WITH RUTHLESS EFFICIENCY.",
    features: ["8-FIGURE SCALING", "40% LOWER CAC", "DATA-DRIVEN CHAOS"],
    color: "bg-acid-yellow"
  },
  {
    icon: <Video className="w-12 h-12" />,
    title: "CONTENT CREATION",
    desc: "IF YOUR CONTENT ISN'T UNIGNORABLE, IT DOESN'T EXIST. WE CREATE HIGH-VOLTAGE MEDIA THAT STOPS THE SCROLL AND STARTS THE REVOLUTION.",
    features: ["VIRAL ENGAGEMENT", "UNSTOPPABLE PRESENCE", "MEDIA DOMINATION"],
    color: "bg-pure-white"
  }
];

export default function ServicesPage() {
  return (
    <PageLayout title="SERVICES">
      <div className="space-y-24">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeUp} className="space-y-8">
            <h2 className="font-heading font-black text-5xl md:text-7xl tracking-tighter uppercase leading-none">
              WE BUILD <span className="bg-neon-green px-4 border-4 border-brutal-black rotate-2 inline-block">WEAPONS</span> NOT WEBSITES.
            </h2>
            <p className="font-body font-bold text-xl md:text-2xl uppercase border-l-8 border-brutal-black pl-6">
              EVERY SERVICE WE OFFER IS DESIGNED TO DO ONE THING: MAKE YOU UNSTOPPABLE. IF YOU'RE LOOKING FOR "PRETTY", YOU'RE IN THE WRONG PLACE.
            </p>
          </motion.div>
          <motion.div 
            variants={fadeUp}
            className="relative"
          >
            <img 
              src="https://picsum.photos/seed/brutal-service/800/600" 
              alt="Brutal Service" 
              className="border-8 border-brutal-black brutal-shadow -rotate-2 w-full grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-acid-yellow border-4 border-brutal-black p-4 font-mono font-black text-2xl rotate-3 brutal-shadow-sm">
              EST. 2026
            </div>
          </motion.div>
        </motion.section>

        {/* Detailed Services Grid */}
        <section className="grid grid-cols-1 gap-12">
          {serviceDetails.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`border-8 border-brutal-black p-8 md:p-16 brutal-shadow flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse bg-brutal-black text-pure-white' : 'bg-pure-white'}`}
            >
              <div className={`w-32 h-32 flex-shrink-0 border-4 border-brutal-black flex items-center justify-center brutal-shadow-sm ${service.color} ${index % 2 === 1 ? 'text-brutal-black' : ''}`}>
                {service.icon}
              </div>
              <div className="space-y-6 flex-grow">
                <h3 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter">
                  {service.title}
                </h3>
                <p className="font-body font-bold text-xl md:text-2xl uppercase opacity-80">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-4">
                  {service.features.map(f => (
                    <span key={f} className={`px-4 py-2 border-2 border-brutal-black font-mono font-black text-sm md:text-base ${index % 2 === 1 ? 'bg-pure-white text-brutal-black' : 'bg-neon-green'}`}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Process Section */}
        <section className="bg-acid-yellow border-8 border-brutal-black p-8 md:p-20 brutal-shadow space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-heading font-black text-5xl md:text-8xl tracking-tighter uppercase">THE PROCESS</h2>
            <p className="font-mono font-black text-xl md:text-2xl uppercase opacity-60">HOW WE DESTROY THE COMPETITION</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              { step: "01", title: "AUDIT", desc: "WE FIND THE WEAKNESSES IN YOUR CURRENT STRATEGY.", icon: <Target className="w-8 h-8" /> },
              { step: "02", title: "DESTROY", desc: "WE TEAR DOWN EVERYTHING THAT ISN'T WORKING.", icon: <Zap className="w-8 h-8" /> },
              { step: "03", title: "REBUILD", desc: "WE ARM YOU WITH HIGH-VOLTAGE BRAND WEAPONS.", icon: <Shield className="w-8 h-8" /> },
              { step: "04", title: "DOMINATE", desc: "WE EXECUTE WITH RUTHLESS EFFICIENCY.", icon: <Rocket className="w-8 h-8" /> }
            ].map((item) => (
              <div key={item.step} className="bg-pure-white border-4 border-brutal-black p-6 md:p-8 brutal-shadow-sm hover:-translate-y-2 transition-transform relative group">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-heading font-black text-4xl md:text-5xl opacity-10 group-hover:opacity-20 transition-opacity">{item.step}</span>
                  <div className="p-3 bg-neon-green border-2 border-brutal-black brutal-shadow-xs">
                    {item.icon}
                  </div>
                </div>
                <h4 className="font-heading font-black text-2xl mb-4 uppercase tracking-tighter">{item.title}</h4>
                <p className="font-mono font-bold text-sm uppercase leading-tight tracking-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12">
          <motion.button 
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-neon-green border-8 border-brutal-black px-12 py-8 font-heading font-black text-3xl md:text-5xl uppercase brutal-shadow hover:bg-brutal-black hover:text-neon-green transition-all"
          >
            START THE REVOLUTION
          </motion.button>
        </section>
      </div>
    </PageLayout>
  );
}
