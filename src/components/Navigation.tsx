import { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';
import { journeySteps as defaultSteps } from '../data/cosmos';

interface NavigationProps {
  activeSection: string;
  onNavigate: (ref: string) => void;
  onExit?: () => void;
  exitLabel?: string;
  accent?: 'cyan' | 'bio' | 'amber';
  steps?: { label: string; ref: string }[];
}

export function Navigation({ activeSection, onNavigate, onExit, exitLabel = '← Exit', accent = 'cyan', steps }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'glass-strong py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Rocket className="w-6 h-6 text-nebula-cyan" />
            <div className="absolute inset-0 blur-md text-nebula-cyan opacity-50">
              <Rocket className="w-6 h-6" />
            </div>
          </div>
          <span className="font-display font-bold text-lg tracking-wide text-white">
            COSMIC<span className={accent === 'bio' ? 'text-abyss-bio' : accent === 'amber' ? 'text-magma-amber' : 'text-nebula-cyan'}>.</span>
          </span>
          {onExit && (
            <button
              onClick={onExit}
              className={`ml-4 font-mono text-[10px] tracking-wider uppercase transition-colors ${
                accent === 'bio' ? 'text-slate-500 hover:text-abyss-bio' : accent === 'amber' ? 'text-slate-500 hover:text-magma-amber' : 'text-slate-500 hover:text-nebula-cyan'
              }`}
            >
              {exitLabel}
            </button>
          )}
        </div>

        {/* Journey progress dots — desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {(steps || defaultSteps).map((step) => (
            <button
              key={step.ref}
              onClick={() => onNavigate(step.ref)}
              className="group relative px-3 py-2"
            >
              <span
                className={`font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 ${
                  activeSection === step.ref
                    ? accent === 'bio' ? 'text-abyss-bio' : accent === 'amber' ? 'text-magma-amber' : 'text-nebula-cyan'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {step.label}
              </span>
              {activeSection === step.ref && (
                <div className={`absolute -bottom-0.5 left-3 right-3 h-px shadow-glow ${accent === 'bio' ? 'bg-abyss-bio' : accent === 'amber' ? 'bg-magma-amber' : 'bg-nebula-cyan'}`} />
              )}
            </button>
          ))}
        </div>

        {/* Mobile progress */}
        <div className="lg:hidden flex items-center gap-1.5">
          {(steps || defaultSteps).map((step) => (
            <button
              key={step.ref}
              onClick={() => onNavigate(step.ref)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeSection === step.ref
                  ? `${accent === 'bio' ? 'bg-abyss-bio' : accent === 'amber' ? 'bg-magma-amber' : 'bg-nebula-cyan'} w-4 shadow-glow`
                  : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
