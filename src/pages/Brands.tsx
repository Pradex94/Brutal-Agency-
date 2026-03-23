import PageLayout from '../components/PageLayout';
import Clients from '../components/Clients';

export default function BrandsPage() {
  return (
    <PageLayout title="OUR BRANDS">
      <div className="space-y-16">
        <section className="space-y-8">
          <h2 className="font-heading font-black text-4xl md:text-6xl tracking-tight border-b-8 border-brutal-black pb-4 bg-acid-yellow px-6 py-4 inline-block -rotate-1">
            THE RUTHLESS PARTNERS
          </h2>
          <p className="font-bold text-2xl md:text-3xl leading-tight">
            WE ONLY WORK WITH FOUNDERS WHO ARE READY TO BREAK THE MOLD AND DOMINATE THEIR MARKET.
          </p>
        </section>

        <Clients />

        <section className="bg-neon-green border-8 border-brutal-black p-8 md:p-12 brutal-shadow space-y-8">
          <h2 className="font-heading font-black text-4xl md:text-5xl tracking-tight uppercase">
            OUR BRAND PHILOSOPHY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono font-bold text-lg md:text-xl uppercase">
            <div className="flex items-start gap-4">
              <span className="text-4xl">01</span>
              <p>WE DON'T JUST SHOWCASE BRANDS. WE SHOWCASE VICTORIES. EVERY BRAND WE WORK WITH HAS A STORY OF DOMINANCE.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl">02</span>
              <p>WE ARE SELECTIVE. WE DON'T WORK WITH EVERYONE. IF YOU'RE NOT READY TO BE BRUTAL, YOU'RE NOT READY FOR US.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl">03</span>
              <p>WE BUILD CULT-LIKE FOLLOWINGS. WE DON'T JUST GET CUSTOMERS. WE GET DISCIPLES.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl">04</span>
              <p>WE ARE THE ARCHITECTS OF DIGITAL REVOLUTIONS. EVERY BRAND IS A WEAPON IN OUR ARSENAL.</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
