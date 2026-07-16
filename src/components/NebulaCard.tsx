import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import type { NebulaData } from '../data/cosmos';

interface NebulaCardProps {
  nebula: NebulaData;
  index: number;
}

export function NebulaCard({ nebula, index }: NebulaCardProps) {
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
            hovered ? 'scale-[1.02] shadow-glow-lg' : ''
          }`}
        >
          {/* Nebula gradient backdrop */}
          <div
            className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-50"
            style={{
              background: `radial-gradient(circle at 30% 40%, ${nebula.color}, transparent 60%), radial-gradient(circle at 70% 60%, ${nebula.color2}, transparent 50%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-nebula-violet" />
              <p className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase">
                Nebula {String(index + 1).padStart(2, '0')}
              </p>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              {nebula.name}
            </h3>
            <p className="font-body text-sm text-slate-300 italic mb-4">
              {nebula.tagline}
            </p>
            <p className="font-body text-sm text-slate-300/70 leading-relaxed mb-6">
              {nebula.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400">
                {nebula.distance}
              </span>
              <span className="font-mono text-xs text-nebula-cyan group-hover:text-white transition-colors uppercase tracking-wider">
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
                background: `radial-gradient(circle at 30% 40%, ${nebula.color}, transparent 60%), radial-gradient(circle at 70% 60%, ${nebula.color2}, transparent 50%)`,
              }}
            />

            <h3 className="font-display text-4xl font-bold text-white text-center mb-2">
              {nebula.name}
            </h3>
            <p className="font-body text-sm text-slate-400 italic text-center mb-8">
              {nebula.tagline}
            </p>

            <p className="font-body text-slate-300/80 leading-relaxed mb-8 text-center">
              {nebula.description}
            </p>

            <div className="space-y-3">
              <h4 className="font-display text-lg font-semibold text-nebula-violet mb-4">
                Fascinating Facts
              </h4>
              {nebula.facts.map((fact, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl glass animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: nebula.color, boxShadow: `0 0 10px ${nebula.color}` }}
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
