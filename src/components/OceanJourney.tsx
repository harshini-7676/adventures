import { useEffect, useRef, useState } from 'react';
import { Waves, Sparkles, X } from 'lucide-react';
import { OceanScene } from '../three/OceanScene';
import { Navigation } from './Navigation';
import { ZoneCard } from './ZoneCard';
import { CreatureCard } from './CreatureCard';
import { OceanHud, OceanSectionLabel, OceanOutro } from './OceanHud';
import { oceanZones, marineCreatures, deepSeaEnvironments, oceanJourneySteps } from '../data/ocean';
import type { DeepSeaEnvironment } from '../data/ocean';

interface OceanJourneyProps {
  onExit: () => void;
}

export function OceanJourney({ onExit }: OceanJourneyProps) {
  const scrollProgress = useRef(0);
  const [activeSection, setActiveSection] = useState('ocean-surface');
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? window.scrollY / max : 0;

      // Calculate depth from scroll (0 to ~11000m)
      setDepth(scrollProgress.current * 11000);

      const sections = ['ocean-surface', ...oceanZones.map((z) => z.id), 'creatures', 'ecosystems', 'ocean-deepest'];
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
        <OceanScene scrollProgress={scrollProgress} />
        {/* Vignette overlay deepens with scroll */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            background: 'radial-gradient(ellipse_at_center,transparent_30%,#020617_100%)',
            opacity: 0.5 + scrollProgress.current * 0.5,
          }}
        />
      </div>

      <Navigation
        activeSection={activeSection}
        onNavigate={navigateTo}
        onExit={onExit}
        exitLabel="← Choose Journey"
        accent="bio"
        steps={oceanJourneySteps}
      />
      <OceanHud depth={depth} />

      <div className="relative z-10">
        {/* Surface hero */}
        <section
          id="ocean-surface"
          className="relative min-h-screen flex flex-col items-center justify-center px-6 z-10"
        >
          <div className="text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 animate-fade-up">
              <Waves className="w-3.5 h-3.5 text-abyss-bio" />
              <span className="font-mono text-xs tracking-widest text-abyss-bio/90 uppercase">
                Deep Ocean Descent
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-gradient from-white via-abyss-cyan to-abyss-bio glow-text">
                Beneath
              </span>
              <br />
              <span className="text-gradient from-abyss-bio via-abyss-cyan to-abyss-deep">
                the Surface
              </span>
            </h1>

            <p className="font-body text-lg md:text-xl text-slate-300/80 leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.25s' }}>
              Descend from the sunlit waves into the crushing dark of the
              deepest ocean. Scroll to dive deeper into Earth's last frontier.
            </p>

            <button
              onClick={() => navigateTo('sunlight')}
              className="group relative px-8 py-4 rounded-full glass-strong font-display font-medium text-sm tracking-wider uppercase transition-all duration-500 hover:shadow-glow-bio animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Begin Descent
                <Waves className="w-4 h-4 animate-wave" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-abyss-bio/20 to-abyss-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
            <span className="font-mono text-[10px] tracking-[0.3em] text-slate-500 uppercase">
              Dive
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-abyss-bio/50 to-transparent" />
          </div>
        </section>

        {/* Ocean zones */}
        {oceanZones.map((zone, i) => (
          <section
            key={zone.id}
            id={zone.id}
            className="relative min-h-screen flex items-center px-6 py-24"
          >
            <div className="max-w-7xl mx-auto w-full">
              <OceanSectionLabel
                index={i + 1}
                total={oceanZones.length + 3}
                title={zone.name}
                subtitle={zone.tagline}
              />
              <div className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className="w-full max-w-md">
                  <ZoneCard zone={zone} index={i} />
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Marine creatures */}
        <section id="creatures" className="relative min-h-screen px-6 py-24">
          <div className="max-w-7xl mx-auto w-full">
            <OceanSectionLabel
              index={oceanZones.length + 1}
              total={oceanZones.length + 3}
              title="Marine Life"
              subtitle="Creatures of the deep"
            />
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
                <span className="text-gradient from-abyss-cyan via-abyss-bio to-abyss-glow">
                  Living Lanterns
                </span>
              </h2>
              <p className="font-body text-slate-300/70 leading-relaxed">
                In the eternal dark, life creates its own light. Meet the
                extraordinary creatures that call the deep ocean home — from
                gentle giants to glowing predators.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marineCreatures.map((creature, i) => (
                <CreatureCard key={creature.id} creature={creature} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Deep-sea ecosystems */}
        <section id="ecosystems" className="relative min-h-screen px-6 py-24">
          <div className="max-w-7xl mx-auto w-full">
            <OceanSectionLabel
              index={oceanZones.length + 2}
              total={oceanZones.length + 3}
              title="Ecosystems"
              subtitle="Oases on the seafloor"
            />
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
                <span className="text-gradient from-abyss-bio via-abyss-coral to-amber-300">
                  Alien Worlds Below
                </span>
              </h2>
              <p className="font-body text-slate-300/70 leading-relaxed">
                Entire ecosystems thrive without sunlight, sustained by
                chemical energy and the gifts of the deep. These are the
                oases of the ocean floor.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deepSeaEnvironments.map((env, i) => (
                <EcosystemCard key={env.id} env={env} index={i} />
              ))}
            </div>
          </div>
        </section>

        <OceanOutro onReturnToSurface={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

        <footer className="relative z-10 py-8 px-6 text-center border-t border-white/5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Waves className="w-4 h-4 text-abyss-bio" />
            <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">
              Deep Ocean Explorer · A Journey Into the Abyss
            </p>
          </div>
          <button
            onClick={onExit}
            className="font-mono text-xs text-slate-600 hover:text-abyss-bio transition-colors tracking-wider uppercase"
          >
            ← Back to Journey Selection
          </button>
        </footer>
      </div>
    </div>
  );
}

function EcosystemCard({ env, index }: { env: DeepSeaEnvironment; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(true)}
        className="group relative cursor-pointer animate-fade-up"
        style={{ animationDelay: `${index * 0.12}s` }}
      >
        <div
          className={`relative overflow-hidden rounded-3xl glass-strong p-6 md:p-8 transition-all duration-700 ${
            hovered ? 'scale-[1.02] shadow-glow-bio' : ''
          }`}
        >
          <div
            className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-50"
            style={{
              background: `radial-gradient(circle at 30% 40%, ${env.color}, transparent 60%), radial-gradient(circle at 70% 60%, ${env.color2}, transparent 50%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-abyss-bio" />
              <p className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase">
                Ecosystem {String(index + 1).padStart(2, '0')}
              </p>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              {env.name}
            </h3>
            <p className="font-body text-sm text-slate-300 italic mb-4">
              {env.tagline}
            </p>
            <p className="font-body text-sm text-slate-300/70 leading-relaxed mb-6">
              {env.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400">
                {env.depth}
              </span>
              <span className="font-mono text-xs text-abyss-bio group-hover:text-white transition-colors uppercase tracking-wider">
                Discover →
              </span>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-md animate-fade-up"
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative max-w-2xl w-full rounded-3xl glass-strong p-8 md:p-10 max-h-[85vh] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-6 right-6 p-2 rounded-full glass hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-slate-300" />
            </button>

            <div
              className="h-40 rounded-2xl mb-6"
              style={{
                background: `radial-gradient(circle at 30% 40%, ${env.color}, transparent 60%), radial-gradient(circle at 70% 60%, ${env.color2}, transparent 50%)`,
              }}
            />

            <h3 className="font-display text-4xl font-bold text-white text-center mb-2">
              {env.name}
            </h3>
            <p className="font-body text-sm text-slate-400 italic text-center mb-8">
              {env.tagline}
            </p>

            <p className="font-body text-slate-300/80 leading-relaxed mb-8 text-center">
              {env.description}
            </p>

            <div className="space-y-3">
              <h4 className="font-display text-lg font-semibold text-abyss-bio mb-4">
                Fascinating Facts
              </h4>
              {env.facts.map((fact, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl glass animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: env.color, boxShadow: `0 0 10px ${env.color}` }}
                  />
                  <p className="font-body text-sm text-slate-300 leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
