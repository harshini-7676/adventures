import { useEffect, useState } from 'react';
import { Telescope, Satellite, Atom, Sparkles } from 'lucide-react';

export function Hud() {
  const [coords, setCoords] = useState({ x: 0, y: 0, z: 0 });
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        x: Math.sin(Date.now() / 3000) * 100,
        y: Math.cos(Date.now() / 4000) * 50,
        z: (Date.now() / 1000) % 1000,
      });
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-30 hidden md:block pointer-events-none">
      <div className="glass rounded-2xl p-4 font-mono text-xs space-y-2 min-w-[220px]">
        <div className="flex items-center gap-2 text-nebula-cyan mb-2">
          <Satellite className="w-3.5 h-3.5" />
          <span className="tracking-widest uppercase">Telemetry</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>POS.X</span>
          <span className="text-white">{coords.x.toFixed(2)} AU</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>POS.Y</span>
          <span className="text-white">{coords.y.toFixed(2)} AU</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>VEL.Z</span>
          <span className="text-white">{coords.z.toFixed(2)} km/s</span>
        </div>
        <div className="flex justify-between text-slate-400 pt-2 border-t border-white/5">
          <span>UTC</span>
          <span className="text-nebula-cyan">{time}</span>
        </div>
      </div>
    </div>
  );
}

export function SectionLabel({
  index,
  total,
}: {
  index: number;
  total: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-4 mb-8 animate-fade-up">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-nebula-cyan" />
        <span className="font-mono text-xs tracking-[0.3em] text-nebula-cyan/80 uppercase">
          {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-nebula-cyan/40 to-transparent" />
    </div>
  );
}

export function DeepSpaceOutro() {
  return (
    <section
      id="deep-space"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 z-10"
    >
      <div className="text-center max-w-3xl">
        <Atom className="w-16 h-16 text-nebula-cyan mx-auto mb-8 animate-float" />
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
          <span className="text-gradient from-white via-nebula-cyan to-nebula-blue glow-text">
            The Journey Continues
          </span>
        </h2>
        <p className="font-body text-lg text-slate-300/70 leading-relaxed mb-12 max-w-2xl mx-auto">
          You've traveled from our blue home through the gas giants, past the
          ice worlds, and into the glowing nurseries of stars. But the universe
          stretches far beyond — billions of galaxies, each with billions of
          stars, waiting to be discovered.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <OutroStat icon={<Telescope className="w-5 h-5" />} value="93B" label="Light-years across" />
          <OutroStat icon={<Atom className="w-5 h-5" />} value="2T+" label="Galaxies in the universe" />
          <OutroStat icon={<Sparkles className="w-5 h-5" />} value="∞" label="Worlds to explore" />
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-8 py-4 rounded-full glass-strong font-display font-medium text-sm tracking-wider uppercase hover:shadow-glow transition-all duration-500"
        >
          Return to Earth
        </button>
      </div>
    </section>
  );
}

function OutroStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-nebula-cyan mb-3 flex justify-center">{icon}</div>
      <p className="font-display text-3xl font-bold text-white mb-1">{value}</p>
      <p className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">{label}</p>
    </div>
  );
}
