import { useState } from 'react';
import { Orbit, X, Lightbulb } from 'lucide-react';
import type { MarineCreature } from '../data/ocean';

interface CreatureCardProps {
  creature: MarineCreature;
  index: number;
}

export function CreatureCard({ creature, index }: CreatureCardProps) {
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
            hovered
              ? creature.bioluminescent
                ? 'scale-[1.02] shadow-glow-bio'
                : 'scale-[1.02] shadow-glow-teal'
              : ''
          }`}
        >
          {/* Gradient orb */}
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-40 transition-opacity duration-700 group-hover:opacity-70"
            style={{ background: creature.glowColor || creature.color }}
          />

          {creature.bioluminescent && (
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-abyss-bio/20 border border-abyss-bio/30">
              <Lightbulb className="w-3 h-3 text-abyss-bio animate-glow-pulse" />
              <span className="font-mono text-[9px] tracking-wider text-abyss-bio uppercase">
                Bioluminescent
              </span>
            </div>
          )}

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-full shadow-lg flex-shrink-0 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${creature.color}, ${creature.emissive})`,
                  boxShadow: `0 0 30px -5px ${creature.glowColor || creature.color}`,
                }}
              />
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-1">
                  Creature {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
                  {creature.name}
                </h3>
                <p className="font-body text-sm text-slate-400 italic">
                  {creature.tagline}
                </p>
              </div>
            </div>

            <p className="font-body text-sm text-slate-300/70 leading-relaxed mb-6">
              {creature.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Stat label="Depth" value={creature.depth} />
              <Stat label="Size" value={creature.size} />
              <Stat label="Habitat" value={creature.habitat} />
              <Stat label="Diet" value={creature.diet} />
            </div>

            <div className="flex items-center gap-2 text-abyss-bio group-hover:text-white transition-colors">
              <Orbit className="w-4 h-4 animate-spin-slow" style={{ animationDuration: '8s' }} />
              <span className="font-mono text-xs tracking-wider uppercase">
                Click to discover
              </span>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-50"
            style={{
              background: `linear-gradient(90deg, transparent, ${creature.glowColor || creature.color}, transparent)`,
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
              className="w-24 h-24 rounded-full mx-auto mb-6"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${creature.color}, ${creature.emissive})`,
                boxShadow: `0 0 60px -10px ${creature.glowColor || creature.color}`,
              }}
            />

            {creature.bioluminescent && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4 text-abyss-bio animate-glow-pulse" />
                <span className="font-mono text-xs tracking-wider text-abyss-bio uppercase">
                  Bioluminescent Species
                </span>
              </div>
            )}

            <h3 className="font-display text-4xl font-bold text-white text-center mb-2">
              {creature.name}
            </h3>
            <p className="font-body text-sm text-slate-400 italic text-center mb-8">
              {creature.tagline}
            </p>

            <p className="font-body text-slate-300/80 leading-relaxed mb-8 text-center">
              {creature.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <Stat label="Depth Range" value={creature.depth} large />
              <Stat label="Size" value={creature.size} large />
              <Stat label="Habitat Zone" value={creature.habitat} large />
              <Stat label="Diet" value={creature.diet} large />
            </div>

            <div className="space-y-3">
              <h4 className="font-display text-lg font-semibold text-abyss-bio mb-4">
                Did You Know?
              </h4>
              {creature.facts.map((fact, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl glass animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: creature.glowColor || creature.color,
                      boxShadow: `0 0 10px ${creature.glowColor || creature.color}`,
                    }}
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
