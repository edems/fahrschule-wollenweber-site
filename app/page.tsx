import Hero from '@/components/hero/Hero';
import KlassenHub from '@/components/sections/KlassenHub';
import Lernpfade from '@/components/sections/Lernpfade';
import Spezialleistungen from '@/components/sections/Spezialleistungen';
import Team from '@/components/sections/Team';
import Standorte from '@/components/sections/Standorte';
import Regionen from '@/components/sections/Regionen';
import Bewertungen from '@/components/sections/Bewertungen';
import Preise from '@/components/sections/Preise';
import Kontakt from '@/components/sections/Kontakt';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <KlassenHub />
      <Lernpfade />
      <Spezialleistungen />
      <Team />
      <Standorte />
      <Bewertungen />
      <Regionen />
      <Preise />
      <Kontakt />
      <Footer />
    </main>
  );
}
