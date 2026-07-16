import { useEffect, useRef, useState } from 'react';
import { Mountain, Sparkles, X } from 'lucide-react';
import { EarthScene } from '../three/EarthScene';
import { Navigation } from './Navigation';
import { LayerCard } from './LayerCard';
import { GeologyCard } from './GeologyCard';
import { EarthHud, EarthSectionLabel, EarthOutro } from './EarthHud';
import { earthLayers, geologicalFeatures, deepEarthPhenomena, earthJourneySteps } from '../data/earth';
import type { DeepEarthPhenomenon } from '../data/earth';

interface EarthJourneyProps {
  onExit: () => void;
}

export function EarthJourney({ onExit }: EarthJourneyProps) {
  const scrollProgress = useRef(0);
  const [activeSection, setActiveSection] = useState('earth-surface');
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? window.scrollY / max : 0;

      // Calculate depth from scroll (0 to ~6371 km)
      setDepth(scrollProgress.current * 6371);

      const sections = ['earth-surface', ...earthLayers.map((l) => l.id), 'discoveries', 'phenomena', 'earth-heart'];
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
        <EarthScene scrollProgress={scrollProgress} />
        {/* Vignette overlay deepens with scroll */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            background: 'radial-gradient(ellipse_at_center,transparent_30%,#1a0a05_100%)',
            opacity: 0.5 + scrollProgress.current * 0.5,
          }}
        />
      </div>

      <Navigation
        activeSection={activeSection}
        onNavigate={navigateTo}
        onExit={onExit}
        exitLabel="← Choose Journey"
        accent="amber"
        steps={earthJourneySteps}
      />
      <EarthHud depth={depth} />

      <div className="relative z-10">
        {/* Surface hero */}
        <section
          id="earth-surface"
          className="relative min-h-screen flex flex-col items-center justify-center px-6 z-10"
        >
          <div className="text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 animate-fade-up">
              <Mountain className="w-3.5 h-3.5 text-magma-amber" />
              <span className="font-mono text-xs tracking-widest text-magma-amber/90 uppercase">
                Journey Inside Earth
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-gradient from-white via-magma-amber to-magma-ember glow-text">
                Into the
              </span>
              <br />
              <span className="text-gradient from-magma-ember via-magma-orange to-magma-amber">
                Earth
              </span>
            </h1>

            <p className="font-body text-lg md:text-xl text-slate-300/80 leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.25s' }}>
              Descend through caves and crystals, past flowing mantle and
              molten iron, to the glowing heart of our planet. Scroll to dive
              into the world beneath our feet.
            </p>

            <button
              onClick={() => navigateTo('crust')}
              className="group relative px-8 py-4 rounded-full glass-strong font-display font-medium text-sm tracking-wider uppercase transition-all duration-500 hover:shadow-glow-magma animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Begin Descent
                <Mountain className="w-4 h-4 animate-wave" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-magma-amber/20 to-magma-ember/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
            <span className="font-mono text-[10px] tracking-[0.3em] text-slate-500 uppercase">
              Dig
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-magma-amber/50 to-transparent" />
          </div>
        </section>

        {/* Earth layers */}
        {earthLayers.map((layer, i) => (
          <section
            key={layer.id}
            id={layer.id}
            className="relative min-h-screen flex items-center px-6 py-24"
          >
            <div className="max-w-7xl mx-auto w-full">
              <EarthSectionLabel
                index={i + 1}
                total={earthLayers.length + 3}
                title={layer.name}
                subtitle={layer.tagline}
              />
              <div className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className="w-full max-w-md">
                  <LayerCard layer={layer} index={i} />
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Geological discoveries */}
        <section id="discoveries" className="relative min-h-screen px-6 py-24">
          <div className="max-w-7xl mx-auto w-full">
            <EarthSectionLabel
              index={earthLayers.length + 1}
              total={earthLayers.length + 3}
              title="Discoveries"
              subtitle="Wonders beneath the surface"
            />
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
                <span className="text-gradient from-magma-amber via-magma-orange to-magma-ember">
                  Hidden Wonders
                </span>
              </h2>
              <p className="font-body text-slate-300/70 leading-relaxed">
                Beneath our feet lie crystal cathedrals, underground rivers,
                and reservoirs of molten rock. Discover the geological
                treasures carved by time and fire.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {geologicalFeatures.map((feature, i) => (
                <GeologyCard key={feature.id} feature={feature} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Deep Earth phenomena */}
        <section id="phenomena" className="relative min-h-screen px-6 py-24">
          <div className="max-w-7xl mx-auto w-full">
            <EarthSectionLabel
              index={earthLayers.length + 2}
              total={earthLayers.length + 3}
              title="Phenomena"
              subtitle="Forges of the deep"
            />
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
                <span className="text-gradient from-magma-ember via-magma-orange to-magma-amber">
                  Engines of Creation
                </span>
              </h2>
              <p className="font-body text-slate-300/70 leading-relaxed">
                Deep forces shape our planet from within — churning mantle,
                spinning metal, and the boundaries between worlds. These are
                the engines that build continents and shield our skies.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deepEarthPhenomena.map((phenom, i) => (
                <PhenomenonCard key={phenom.id} phenom={phenom} index={i} />
              ))}
            </div>
          </div>
        </section>

        <EarthOutro onReturnToSurface={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

        <footer className="relative z-10 py-8 px-6 text-center border-t border-white/5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Mountain className="w-4 h-4 text-magma-amber" />
            <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">
              Earth Interior Explorer · A Journey to the Planet's Core
            </p>
          </div>
          <button
            onClick={onExit}
            className="font-mono text-xs text-slate-600 hover:text-magma-amber transition-colors tracking-wider uppercase"
          >
            ← Back to Journey Selection
          </button>
        </footer>
      </div>
    </div>
  );
}

function PhenomenonCard({ phenom, index }: { phenom: DeepEarthPhenomenon; index: number }) {
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
            hovered ? 'scale-[1.02] shadow-glow-magma' : ''
          }`}
        >
          <div
            className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-50"
            style={{
              background: `radial-gradient(circle at 30% 40%, ${phenom.color}, transparent 60%), radial-gradient(circle at 70% 60%, ${phenom.color2}, transparent 50%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-magma-amber" />
              <p className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase">
                Phenomenon {String(index + 1).padStart(2, '0')}
              </p>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              {phenom.name}
            </h3>
            <p className="font-body text-sm text-slate-300 italic mb-4">
              {phenom.tagline}
            </p>
            <p className="font-body text-sm text-slate-300/70 leading-relaxed mb-6">
              {phenom.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400">
                {phenom.depth}
              </span>
              <span className="font-mono text-xs text-magma-amber group-hover:text-white transition-colors uppercase tracking-wider">
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
                background: `radial-gradient(circle at 30% 40%, ${phenom.color}, transparent 60%), radial-gradient(circle at 70% 60%, ${phenom.color2}, transparent 50%)`,
              }}
            />

            <h3 className="font-display text-4xl font-bold text-white text-center mb-2">
              {phenom.name}
            </h3>
            <p className="font-body text-sm text-slate-400 italic text-center mb-8">
              {phenom.tagline}
            </p>

            <p className="font-body text-slate-300/80 leading-relaxed mb-8 text-center">
              {phenom.description}
            </p>

            <div className="space-y-3">
              <h4 className="font-display text-lg font-semibold text-magma-amber mb-4">
                Fascinating Facts
              </h4>
              {phenom.facts.map((fact, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl glass animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: phenom.color, boxShadow: `0 0 10px ${phenom.color}` }}
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
