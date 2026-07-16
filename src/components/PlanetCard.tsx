import { useState } from 'react';
import { Orbit, X } from 'lucide-react';
import type { PlanetData } from '../data/cosmos';

interface PlanetCardProps {
  planet: PlanetData;
  index: number;
}

export function PlanetCard({ planet, index }: PlanetCardProps) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(true)}
        className="group relative cursor-pointer animate-fade-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div
          className={`relative overflow-hidden rounded-3xl glass-strong p-6 md:p-8 transition-all duration-700 ${
            hovered ? 'scale-[1.02] shadow-glow' : ''
          }`}
        >
          {/* Gradient orb */}
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-40 transition-opacity duration-700 group-hover:opacity-70"
            style={{ background: planet.color }}
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-2">
                  Planet {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                  {planet.name}
                </h3>
                <p className="font-body text-sm text-slate-400 italic">
                  {planet.tagline}
                </p>
              </div>
              <div
                className="w-14 h-14 rounded-full shadow-lg transition-transform duration-700 group-hover:scale-110 group-hover:rotate-45"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.emissive})`,
                  boxShadow: `0 0 30px -5px ${planet.color}`,
                }}
              />
            </div>

            <p className="font-body text-sm text-slate-300/70 leading-relaxed mb-6">
              {planet.description}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Stat label="Distance" value={planet.distance} />
              <Stat label="Diameter" value={planet.diameter} />
              <Stat label="Moons" value={planet.moons} />
              <Stat label="Day Length" value={planet.dayLength} />
            </div>

            <div className="flex items-center gap-2 text-nebula-cyan group-hover:text-white transition-colors">
              <Orbit className="w-4 h-4 animate-spin-slow" style={{ animationDuration: '8s' }} />
              <span className="font-mono text-xs tracking-wider uppercase">
                Click to explore
              </span>
            </div>
          </div>

          {/* Bottom gradient line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-50"
            style={{
              background: `linear-gradient(90deg, transparent, ${planet.color}, transparent)`,
            }}
          />
        </div>
      </div>

      {/* Expanded modal */}
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
              className="w-24 h-24 rounded-full mx-auto mb-6 shadow-glow"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.emissive})`,
                boxShadow: `0 0 60px -10px ${planet.color}`,
              }}
            />

            <h3 className="font-display text-4xl font-bold text-white text-center mb-2">
              {planet.name}
            </h3>
            <p className="font-body text-sm text-slate-400 italic text-center mb-8">
              {planet.tagline}
            </p>

            <p className="font-body text-slate-300/80 leading-relaxed mb-8 text-center">
              {planet.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <Stat label="Distance from Sun" value={planet.distance} large />
              <Stat label="Diameter" value={planet.diameter} large />
              <Stat label="Moons" value={planet.moons} large />
              <Stat label="Day Length" value={planet.dayLength} large />
            </div>

            <div className="space-y-3">
              <h4 className="font-display text-lg font-semibold text-nebula-cyan mb-4">
                Did You Know?
              </h4>
              {planet.facts.map((fact, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl glass animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: planet.color, boxShadow: `0 0 10px ${planet.color}` }}
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

function Stat({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div className="rounded-xl glass p-3">
      <p className="font-mono text-[9px] tracking-widest text-slate-500 uppercase mb-1">
        {label}
      </p>
      <p className={`font-display ${large ? 'text-lg' : 'text-sm'} font-medium text-white`}>
        {value}
      </p>
    </div>
  );
}
