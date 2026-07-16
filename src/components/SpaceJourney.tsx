import { useEffect, useRef, useState } from 'react';
import { Rocket } from 'lucide-react';
import { CosmicScene } from '../three/CosmicScene';
import { Navigation } from './Navigation';
import { Hero } from './Hero';
import { PlanetCard } from './PlanetCard';
import { NebulaCard } from './NebulaCard';
import { Hud, SectionLabel, DeepSpaceOutro } from './Hud';
import { planets, nebulae } from '../data/cosmos';

interface SpaceJourneyProps {
  onExit: () => void;
}

export function SpaceJourney({ onExit }: SpaceJourneyProps) {
  const scrollProgress = useRef(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? window.scrollY / max : 0;

      const sections = ['hero', ...planets.map((p) => p.id), 'nebulae', 'deep-space'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigateTo = (ref: string) => {
    const el = document.getElementById(ref);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 z-0">
        <CosmicScene scrollProgress={scrollProgress} />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#02030a_100%)]" />
      </div>

      <Navigation activeSection={activeSection} onNavigate={navigateTo} onExit={onExit} exitLabel="← Choose Journey" />
      <Hud />

      <div className="relative z-10">
        <Hero onExplore={() => navigateTo('earth')} />

        {planets.map((planet, i) => (
          <section
            key={planet.id}
            id={planet.id}
            className="relative min-h-screen flex items-center px-6 py-24"
          >
            <div className="max-w-7xl mx-auto w-full">
              <SectionLabel
                index={i + 1}
                total={planets.length + 2}
                title={planet.name}
                subtitle={planet.tagline}
              />
              <div className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className="w-full max-w-md">
                  <PlanetCard planet={planet} index={i} />
                </div>
              </div>
            </div>
          </section>
        ))}

        <section id="nebulae" className="relative min-h-screen px-6 py-24">
          <div className="max-w-7xl mx-auto w-full">
            <SectionLabel
              index={planets.length + 1}
              total={planets.length + 2}
              title="Nebulae"
              subtitle="Stellar nurseries of the cosmos"
            />
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
                <span className="text-gradient from-nebula-rose via-nebula-violet to-nebula-cyan">
                  Beyond the Planets
                </span>
              </h2>
              <p className="font-body text-slate-300/70 leading-relaxed">
                Vast clouds of gas and dust where stars are born, live, and die.
                These cosmic sculptures span light-years and glow with the
                light of creation itself.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nebulae.map((nebula, i) => (
                <NebulaCard key={nebula.id} nebula={nebula} index={i} />
              ))}
            </div>
          </div>
        </section>

        <DeepSpaceOutro />

        <footer className="relative z-10 py-8 px-6 text-center border-t border-white/5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Rocket className="w-4 h-4 text-nebula-cyan" />
            <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">
              Cosmic Explorer · A Journey Through the Universe
            </p>
          </div>
          <button
            onClick={onExit}
            className="font-mono text-xs text-slate-600 hover:text-nebula-cyan transition-colors tracking-wider uppercase"
          >
            ← Back to Journey Selection
          </button>
        </footer>
      </div>
    </div>
  );
}
