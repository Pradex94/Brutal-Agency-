import PageLayout from '../components/PageLayout';

export default function PrivacyPolicy() {
  return (
    <PageLayout title="Privacy Policy">
      <section className="space-y-4">
        <h2 className="font-heading font-black text-3xl md:text-4xl tracking-tight border-b-4 border-brutal-black pb-2">1. DATA COLLECTION</h2>
        <p className="font-bold">WE COLLECT YOUR DATA BECAUSE WE NEED IT TO MAKE NOISE. THIS INCLUDES YOUR NAME, EMAIL, AND HOW YOU INTERACT WITH OUR BRUTAL INTERFACES.</p>
      </section>
      
      <section className="space-y-4">
        <h2 className="font-heading font-black text-3xl md:text-4xl tracking-tight border-b-4 border-brutal-black pb-2">2. COOKIES</h2>
        <p className="font-bold">WE USE COOKIES TO TRACK YOUR EVERY MOVE ON THIS SITE. IF YOU DON'T LIKE IT, EAT A REAL COOKIE AND LEAVE.</p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading font-black text-3xl md:text-4xl tracking-tight border-b-4 border-brutal-black pb-2">3. SECURITY</h2>
        <p className="font-bold">YOUR DATA IS LOCKED BEHIND BRUTAL ENCRYPTION. WE DON'T SELL YOUR DATA. WE ONLY SELL RESULTS.</p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading font-black text-3xl md:text-4xl tracking-tight border-b-4 border-brutal-black pb-2">4. YOUR RIGHTS</h2>
        <p className="font-bold">YOU HAVE THE RIGHT TO BE FORGOTTEN. EMAIL US AND WE'LL DELETE YOU FROM OUR SYSTEM. NO QUESTIONS ASKED.</p>
      </section>
    </PageLayout>
  );
}
