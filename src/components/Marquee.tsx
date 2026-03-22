import { useState } from 'react';

export default function Marquee() {
  const text = "WE WIN • WE MAKE NOISE • WE BUILD BRANDS • WE DISRUPT • ";
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden bg-brutal-black py-4 md:py-6 border-y-4 border-brutal-black z-20 cursor-pointer"
    >
      <div className="absolute inset-0 bg-neon-green/10" style={{ backgroundImage: 'radial-gradient(#2ff801 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
      <div className="flex whitespace-nowrap relative z-10">
        <div className={`${isHovered ? 'animate-marquee-fast' : 'animate-marquee'} font-heading font-black text-3xl md:text-4xl tracking-widest shrink-0 text-neon-green transition-all duration-500`}>
          {text.repeat(4)}
        </div>
        <div className={`${isHovered ? 'animate-marquee-fast' : 'animate-marquee'} font-heading font-black text-3xl md:text-4xl tracking-widest shrink-0 text-neon-green transition-all duration-500`} aria-hidden="true">
          {text.repeat(4)}
        </div>
      </div>
    </div>
  );
}
