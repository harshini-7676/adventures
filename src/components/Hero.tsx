import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-6 z-10">
      <div className="text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 animate-fade-up">
          <Sparkles className="w-3.5 h-3.5 text-nebula-cyan" />
          <span className="font-mono text-xs tracking-widest text-nebula-cyan/90 uppercase">
            Interactive Cosmic Journey
          </span>
        </div>

        <h1 className="font-display text-6xl md:text-8xl font-bold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="text-gradient from-white via-nebula-cyan to-nebula-blue glow-text">
            Cosmic
          </span>
          <br />
          <span className="text-gradient from-nebula-rose via-amber-300 to-nebula-cyan">
            Explorer
          </span>
        </h1>

        <p className="font-body text-lg md:text-xl text-slate-300/80 leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.25s' }}>
          Embark on a cinematic voyage from our home on Earth to the deepest
          reaches of the known universe. Scroll to travel through space.
        </p>

        <button
          onClick={onExplore}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group relative px-8 py-4 rounded-full glass-strong font-display font-medium text-sm tracking-wider uppercase transition-all duration-500 hover:shadow-glow-lg animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          <span className="relative z-10 flex items-center gap-3">
            Begin Journey
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-500 ${hovered ? 'translate-y-1' : ''}`}
            />
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-nebula-cyan/20 to-nebula-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
        <span className="font-mono text-[10px] tracking-[0.3em] text-slate-500 uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-nebula-cyan/50 to-transparent" />
      </div>
    </section>
  );
}
