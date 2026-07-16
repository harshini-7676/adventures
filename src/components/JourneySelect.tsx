import { Rocket, Waves, ChevronRight, Sparkles, Globe } from 'lucide-react';

interface JourneySelectProps {
  onSelect: (journey: 'space' | 'ocean') => void;
}

export function JourneySelect({ onSelect }: JourneySelectProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 z-10">
      <div className="text-center max-w-4xl mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 animate-fade-up">
          <Globe className="w-3.5 h-3.5 text-nebula-cyan" />
          <span className="font-mono text-xs tracking-widest text-nebula-cyan/90 uppercase">
            Two Mysteries of Earth
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="text-gradient from-white via-nebula-cyan to-abyss-bio glow-text">
            Choose Your Journey
          </span>
        </h1>

        <p className="font-body text-lg md:text-xl text-slate-300/80 leading-relaxed max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.25s' }}>
          Humanity has always looked up at the stars and down into the depths.
          Both remain largely unexplored. Which frontier will you discover?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
        {/* Space Journey */}
        <button
          onClick={() => onSelect('space')}
          className="group relative overflow-hidden rounded-3xl glass-strong p-8 md:p-10 text-left transition-all duration-700 hover:scale-[1.02] hover:shadow-glow-lg animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          {/* Cosmic gradient backdrop */}
          <div className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-50">
            <div className="absolute inset-0 bg-gradient-to-br from-void-800 via-void-900 to-void-950" />
            <div className="absolute top-0 right-0 w-60 h-60 rounded-full blur-3xl bg-nebula-cyan/20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl bg-nebula-rose/15" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
                <Rocket className="w-8 h-8 text-nebula-cyan group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-slate-500 uppercase">
                01
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Space Exploration
            </h2>
            <p className="font-body text-slate-300/70 leading-relaxed mb-8">
              Travel from Earth through the solar system, past gas giants and
              into the glowing nebulae where stars are born. A cinematic voyage
              across the cosmos.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['Planets', 'Nebulae', 'Deep Space'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full glass font-mono text-[10px] tracking-wider text-nebula-cyan uppercase">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-nebula-cyan group-hover:text-white transition-colors">
              <span className="font-mono text-sm tracking-wider uppercase">Launch Journey</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </div>
          </div>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nebula-cyan to-transparent opacity-50" />
        </button>

        {/* Ocean Journey */}
        <button
          onClick={() => onSelect('ocean')}
          className="group relative overflow-hidden rounded-3xl glass-strong p-8 md:p-10 text-left transition-all duration-700 hover:scale-[1.02] hover:shadow-glow-bio animate-fade-up"
          style={{ animationDelay: '0.55s' }}
        >
          {/* Ocean gradient backdrop */}
          <div className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-50">
            <div className="absolute inset-0 bg-gradient-to-br from-abyss-deep via-abyss-midnight to-void-950" />
            <div className="absolute top-0 right-0 w-60 h-60 rounded-full blur-3xl bg-abyss-bio/20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl bg-abyss-cyan/15" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
                <Waves className="w-8 h-8 text-abyss-bio group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-slate-500 uppercase">
                02
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Deep Ocean Exploration
            </h2>
            <p className="font-body text-slate-300/70 leading-relaxed mb-8">
              Descend from the sunlit surface through twilight and midnight
              zones into the abyssal depths. Encounter bioluminescent creatures
              and alien ecosystems hidden in the dark.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['Depth Zones', 'Marine Life', 'Deep-Sea Vents'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full glass font-mono text-[10px] tracking-wider text-abyss-bio uppercase">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-abyss-bio group-hover:text-white transition-colors">
              <span className="font-mono text-sm tracking-wider uppercase">Begin Descent</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-abyss-bio to-transparent opacity-50" />
        </button>
      </div>

      <div className="mt-16 flex items-center gap-2 text-slate-500 animate-pulse-slow">
        <Sparkles className="w-4 h-4" />
        <span className="font-mono text-xs tracking-widest uppercase">
          Select a frontier to begin
        </span>
      </div>
    </section>
  );
}
