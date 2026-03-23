import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, EXPO_OUT } from '../utils/animations';
import { ArrowUpRight, Filter } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: "NEON GHOST",
    category: "BRANDING",
    result: "+340% ROI",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    color: "bg-neon-green"
  },
  {
    id: 2,
    title: "LOGIC BOMB",
    category: "DEVELOPMENT",
    result: "$2.4M ARR",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    color: "bg-acid-yellow"
  },
  {
    id: 3,
    title: "CYBER PUNK",
    category: "MARKETING",
    result: "1.2M REACH",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    color: "bg-neon-green"
  },
  {
    id: 4,
    title: "VOID RUNNER",
    category: "BRANDING",
    result: "CULT STATUS",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2564&auto=format&fit=crop",
    color: "bg-acid-yellow"
  },
  {
    id: 5,
    title: "DATA BREACH",
    category: "DEVELOPMENT",
    result: "ZERO DOWNTIME",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2670&auto=format&fit=crop",
    color: "bg-neon-green"
  },
  {
    id: 6,
    title: "SONIC BOOM",
    category: "MARKETING",
    result: "VIRAL.01",
    image: "https://images.unsplash.com/photo-1514525253361-bee8718a74a2?q=80&w=2564&auto=format&fit=crop",
    color: "bg-acid-yellow"
  }
];

const categories = ["ALL", "BRANDING", "DEVELOPMENT", "MARKETING"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredProjects = activeFilter === "ALL" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <PageLayout title="WORK">
      <div className="space-y-16">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b-4 border-brutal-black pb-8">
          <div className="flex items-center gap-4">
            <Filter className="w-8 h-8" />
            <span className="font-heading font-black text-2xl uppercase">FILTER BY:</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 border-4 border-brutal-black font-heading font-bold text-lg transition-all brutal-shadow-sm ${activeFilter === cat ? 'bg-neon-green -translate-y-1 -translate-x-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-pure-white hover:bg-acid-yellow'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {filteredProjects.map((project) => (
            <motion.div 
              layout
              key={project.id}
              variants={fadeUp}
              className="group relative border-4 border-brutal-black overflow-hidden brutal-shadow bg-pure-white block cursor-pointer"
            >
              <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8, ease: EXPO_OUT }}
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brutal-black/0 group-hover:bg-brutal-black/40 transition-colors duration-300"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className={`${project.color} border-4 border-brutal-black px-6 py-3 font-heading font-black text-2xl uppercase translate-y-8 group-hover:translate-y-0 transition-transform duration-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2`}>
                    VIEW CASE STUDY <ArrowUpRight className="w-6 h-6" strokeWidth={3} />
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 border-t-4 border-brutal-black bg-pure-white space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-heading font-black text-3xl md:text-4xl uppercase">{project.title}</h3>
                  <span className="font-mono font-bold text-sm bg-brutal-black text-pure-white px-3 py-1 uppercase">{project.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-heading font-black text-xl md:text-2xl ${project.color === 'bg-neon-green' ? 'text-neon-green' : 'text-acid-yellow'} bg-brutal-black px-4 py-2 brutal-shadow-sm`}>
                    {project.result}
                  </span>
                  <p className="font-mono font-bold text-sm uppercase opacity-60">VERIFIED RESULT</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <section className="bg-brutal-black text-pure-white border-8 border-brutal-black p-8 md:p-20 brutal-shadow text-center space-y-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid-bg w-full h-full"></div>
          </div>
          <h2 className="font-heading font-black text-4xl md:text-7xl tracking-tighter uppercase relative z-10">
            READY TO BE OUR NEXT <span className="text-neon-green">SUCCESS STORY?</span>
          </h2>
          <motion.button 
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-neon-green text-brutal-black border-4 border-brutal-black px-12 py-6 font-heading font-black text-3xl uppercase brutal-shadow hover:bg-acid-yellow transition-all relative z-10"
          >
            LET'S BUILD SOMETHING BRUTAL
          </motion.button>
        </section>
      </div>
    </PageLayout>
  );
}
