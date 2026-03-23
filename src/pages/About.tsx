import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';

export default function AboutPage() {
  return (
    <PageLayout title="ABOUT">
      <div className="space-y-24">
        {/* Manifesto Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-12"
        >
          <motion.h2 
            variants={fadeUp}
            className="font-heading font-black text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter uppercase"
          >
            WE ARE THE <span className="text-neon-green">OUTLAWS</span> OF THE DIGITAL AGE.
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={fadeUp} className="space-y-6">
              <p className="font-body font-bold text-2xl md:text-3xl uppercase leading-tight">
                THE INTERNET IS A WARZONE. MOST AGENCIES ARE SELLING YOU PAPER SHIELDS. WE BUILD TANKS.
              </p>
              <p className="font-mono font-bold text-lg uppercase opacity-70">
                BRUTAL.AGENCY WAS BORN FROM THE CHAOS OF THE ATTENTION ECONOMY. WE REALIZED THAT IN A WORLD OF INFINITE SCROLL, BEING "NICE" IS A DEATH SENTENCE. YOU HAVE TO BE UNIGNORABLE. YOU HAVE TO BE BRUTAL.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="relative">
              <img 
                src="https://picsum.photos/seed/brutal-manifesto/800/600" 
                alt="Brutal Manifesto" 
                className="border-8 border-brutal-black brutal-shadow rotate-2 w-full grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-0 left-0 bg-brutal-black text-pure-white p-4 font-mono font-black text-xl -translate-x-4 -translate-y-4 brutal-shadow-sm">
                MANIFESTO.01
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Philosophy Section */}
        <section className="bg-brutal-black text-pure-white border-8 border-brutal-black p-8 md:p-20 brutal-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 font-heading font-black text-[20vw] opacity-10 leading-none -mr-20 -mt-10 select-none">
            CHAOS
          </div>
          
          <div className="relative z-10 space-y-16">
            <h2 className="font-heading font-black text-5xl md:text-7xl tracking-tighter uppercase">OUR PHILOSOPHY</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "DESTROY", desc: "WE TEAR DOWN THE STATUS QUO. IF IT'S SAFE, IT'S USELESS." },
                { title: "REBUILD", desc: "WE CONSTRUCT IDENTITIES THAT CANNOT BE BROKEN." },
                { title: "DOMINATE", desc: "WE DON'T COMPETE. WE OWN THE ENTIRE SPACE." }
              ].map((item) => (
                <div key={item.title} className="space-y-4 border-l-4 border-neon-green pl-6">
                  <h3 className="font-heading font-black text-3xl md:text-4xl text-neon-green">{item.title}</h3>
                  <p className="font-mono font-bold text-lg uppercase opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Founder Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-acid-yellow border-8 border-brutal-black p-8 brutal-shadow relative z-10">
              <p className="font-heading font-black text-2xl md:text-4xl text-brutal-black uppercase leading-tight">
                "IF YOU'RE NOT ARMED WITH A BRUTAL STRATEGY, YOU'RE ALREADY DEAD."
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-20 h-20 bg-brutal-black border-4 border-brutal-black brutal-shadow-sm overflow-hidden">
                  <img src="https://picsum.photos/seed/founder/200/200" alt="Founder" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="font-mono font-black text-xl text-brutal-black">MAX NOISE</p>
                  <p className="font-mono text-sm text-brutal-black/60 font-bold">FOUNDER & CHIEF CHAOS OFFICER</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-neon-green border-8 border-brutal-black -rotate-6 z-0"></div>
          </motion.div>

          <div className="space-y-8">
            <h2 className="font-heading font-black text-5xl md:text-6xl tracking-tighter uppercase">THE MINDSET</h2>
            <p className="font-body font-bold text-xl md:text-2xl uppercase opacity-80">
              WE ARE A COLLECTIVE OF DESIGNERS, STRATEGISTS, AND REBELS. WE DON'T WORK IN CUBICLES. WE WORK IN THE TRENCHES.
            </p>
            <div className="space-y-4 font-mono font-bold text-lg uppercase">
              <div className="flex items-center gap-4">
                <span className="w-4 h-4 bg-neon-green border-2 border-brutal-black"></span>
                <span>NO CORPORATE BULLSHIT</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-4 h-4 bg-acid-yellow border-2 border-brutal-black"></span>
                <span>NO SAFE CHOICES</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-4 h-4 bg-brutal-black border-2 border-brutal-black"></span>
                <span>ONLY RESULTS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { label: "BRANDS DESTROYED", value: "500+" },
            { label: "REVENUE GENERATED", value: "$250M" },
            { label: "RULES BROKEN", value: "∞" },
            { label: "COFFEE CONSUMED", value: "999K" }
          ].map((stat) => (
            <div key={stat.label} className="bg-pure-white border-4 border-brutal-black p-8 brutal-shadow-sm text-center flex flex-col justify-center min-h-[160px]">
              <div className="font-heading font-black text-4xl md:text-5xl mb-2 tracking-tighter break-words">{stat.value}</div>
              <div className="font-mono font-bold text-xs md:text-sm opacity-60 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </section>
      </div>
    </PageLayout>
  );
}
