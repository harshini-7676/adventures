import { useState } from 'react';
import { ChevronDown, X, Layers } from 'lucide-react';
import type { OceanZone } from '../data/ocean';

interface ZoneCardProps {
  zone: OceanZone;
  index: number;
}

export function ZoneCard({ zone, index }: ZoneCardProps) {
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
            hovered ? 'scale-[1.02] shadow-glow-teal' : ''
          }`}
        >
          {/* Gradient orb */}
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-40 transition-opacity duration-700 group-hover:opacity-70"
            style={{ background: zone.accent }}
          />

          {/* Depth indicator bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: zone.accent }} />

          <div className="relative z-10 pl-2">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-2">
                  Zone {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                  {zone.name}
                </h3>
                <p className="font-body text-sm text-slate-400 italic">
                  {zone.tagline}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Layers className="w-5 h-5 text-slate-500" />
                <span className="font-mono text-[10px] text-slate-500">{zone.depth.split(' – ')[0]}m</span>
              </div>
            </div>

            <p className="font-body text-sm text-slate-300/70 leading-relaxed mb-6">
              {zone.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Stat label="Depth" value={zone.depth} />
              <Stat label="Pressure" value={zone.pressure} />
              <Stat label="Temperature" value={zone.temperature} />
              <Stat label="Light" value={zone.lightLevel} />
            </div>

            <div className="flex items-center gap-2 text-abyss-bio group-hover:text-white transition-colors">
              <ChevronDown className="w-4 h-4 animate-bounce" />
              <span className="font-mono text-xs tracking-wider uppercase">
                Descend deeper
              </span>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-50"
            style={{
              background: `linear-gradient(90deg, transparent, ${zone.accent}, transparent)`,
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
              className="h-24 rounded-2xl mb-6 flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${zone.color}, ${zone.accent})`,
                boxShadow: `0 0 60px -10px ${zone.accent}`,
              }}
            >
              <Layers className="w-10 h-10 text-white/80" />
            </div>

            <h3 className="font-display text-4xl font-bold text-white text-center mb-2">
              {zone.name}
            </h3>
            <p className="font-body text-sm text-slate-400 italic text-center mb-8">
              {zone.tagline}
            </p>

            <p className="font-body text-slate-300/80 leading-relaxed mb-8 text-center">
              {zone.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <Stat label="Depth Range" value={zone.depth} large />
              <Stat label="Pressure" value={zone.pressure} large />
              <Stat label="Temperature" value={zone.temperature} large />
              <Stat label="Light Level" value={zone.lightLevel} large />
            </div>

            <div className="space-y-3">
              <h4 className="font-display text-lg font-semibold text-abyss-bio mb-4">
                Did You Know?
              </h4>
              {zone.facts.map((fact, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl glass animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: zone.accent, boxShadow: `0 0 10px ${zone.accent}` }}
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
