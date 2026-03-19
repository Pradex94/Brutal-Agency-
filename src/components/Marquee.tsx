export default function Marquee() {
  const text = "WE WIN • WE MAKE NOISE • WE BUILD BRANDS • WE DISRUPT • ";
  
  return (
    <div className="relative w-full overflow-hidden bg-brutal-black py-4 md:py-6 border-y-4 border-brutal-black z-20">
      <div className="absolute inset-0 bg-neon-green/10" style={{ backgroundImage: 'radial-gradient(#2ff801 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
      <div className="flex whitespace-nowrap relative z-10">
        <div className="animate-marquee font-heading font-black text-3xl md:text-4xl tracking-widest shrink-0 text-neon-green">
          {text.repeat(4)}
        </div>
        <div className="animate-marquee font-heading font-black text-3xl md:text-4xl tracking-widest shrink-0 text-neon-green" aria-hidden="true">
          {text.repeat(4)}
        </div>
      </div>
    </div>
  );
}
