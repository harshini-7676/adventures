import { useState } from 'react';
import { Orbit, X, Flame } from 'lucide-react';
import type { GeologicalFeature } from '../data/earth';

interface GeologyCardProps {
  feature: GeologicalFeature;
  index: number;
}

export function GeologyCard({ feature, index }: GeologyCardProps) {
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
              ? feature.glowing
                ? 'scale-[1.02] shadow-glow-magma'
                : 'scale-[1.02] shadow-glow-amber'
              : ''
          }`}
        >
          {/* Gradient orb */}
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-40 transition-opacity duration-700 group-hover:opacity-70"
            style={{ background: feature.glowColor || feature.color }}
          />

          {feature.glowing && (
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-magma-amber/20 border border-magma-amber/30">
              <Flame className="w-3 h-3 text-magma-amber animate-flicker" />
              <span className="font-mono text-[9px] tracking-wider text-magma-amber uppercase">
                Glowing
              </span>
            </div>
          )}

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-full shadow-lg flex-shrink-0 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${feature.color}, ${feature.emissive})`,
                  boxShadow: `0 0 30px -5px ${feature.glowColor || feature.color}`,
                }}
              />
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-1">
                  Discovery {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
                  {feature.name}
                </h3>
                <p className="font-body text-sm text-slate-400 italic">
                  {feature.tagline}
                </p>
              </div>
            </div>

            <p className="font-body text-sm text-slate-300/70 leading-relaxed mb-6">
              {feature.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Stat label="Depth" value={feature.depth} />
              <Stat label="Composition" value={feature.composition} />
              <Stat label="Formation" value={feature.formation} />
              <Stat label="Glow" value={feature.glowing ? 'Yes' : 'No'} />
            </div>

            <div className="flex items-center gap-2 text-magma-amber group-hover:text-white transition-colors">
              <Orbit className="w-4 h-4 animate-spin-slow" style={{ animationDuration: '8s' }} />
              <span className="font-mono text-xs tracking-wider uppercase">
                Click to discover
              </span>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-50"
            style={{
              background: `linear-gradient(90deg, transparent, ${feature.glowColor || feature.color}, transparent)`,
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
                background: `radial-gradient(circle at 30% 30%, ${feature.color}, ${feature.emissive})`,
                boxShadow: `0 0 60px -10px ${feature.glowColor || feature.color}`,
              }}
            />

            {feature.glowing && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <Flame className="w-4 h-4 text-magma-amber animate-flicker" />
                <span className="font-mono text-xs tracking-wider text-magma-amber uppercase">
                  Glowing Formation
                </span>
              </div>
            )}

            <h3 className="font-display text-4xl font-bold text-white text-center mb-2">
              {feature.name}
            </h3>
            <p className="font-body text-sm text-slate-400 italic text-center mb-8">
              {feature.tagline}
            </p>

            <p className="font-body text-slate-300/80 leading-relaxed mb-8 text-center">
              {feature.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <Stat label="Depth" value={feature.depth} large />
              <Stat label="Composition" value={feature.composition} large />
              <Stat label="Formation Process" value={feature.formation} large />
              <Stat label="Glowing" value={feature.glowing ? 'Yes' : 'No'} large />
            </div>

            <div className="space-y-3">
              <h4 className="font-display text-lg font-semibold text-magma-amber mb-4">
                Did You Know?
              </h4>
              {feature.facts.map((fact, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl glass animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: feature.glowColor || feature.color,
                      boxShadow: `0 0 10px ${feature.glowColor || feature.color}`,
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
