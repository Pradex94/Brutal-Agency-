import PageLayout from '../components/PageLayout';

export default function FAQ() {
  const faqs = [
    {
      q: "WHY IS EVERYTHING SO LOUD?",
      a: "BECAUSE SUBTLETY IS FOR THE WEAK. WE WANT YOUR BRAND TO BE IMPOSSIBLE TO IGNORE."
    },
    {
      q: "DO YOU WORK WITH ANYONE?",
      a: "NO. WE ONLY WORK WITH FOUNDERS WHO ARE READY TO BREAK THE MOLD AND DOMINATE THEIR MARKET."
    },
    {
      q: "HOW MUCH DOES IT COST?",
      a: "IF YOU HAVE TO ASK, YOU'RE PROBABLY NOT READY FOR THE NOISE. WE CHARGE FOR RESULTS, NOT HOURS."
    },
    {
      q: "WHAT IS BRUTALISM?",
      a: "IT'S THE RAW, UNFILTERED EXPRESSION OF TRUTH. NO FLUFF. NO FILLER. JUST POWER."
    }
  ];

  return (
    <PageLayout title="FAQ">
      <div className="space-y-12">
        {faqs.map((faq, i) => (
          <section key={i} className="space-y-4">
            <h2 className="font-heading font-black text-3xl md:text-4xl tracking-tight border-b-4 border-brutal-black pb-2 bg-neon-green px-4 py-2 inline-block -rotate-1">
              Q: {faq.q}
            </h2>
            <p className="font-bold pl-4 border-l-4 border-brutal-black">
              A: {faq.a}
            </p>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
