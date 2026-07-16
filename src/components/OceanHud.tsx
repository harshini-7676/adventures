import { useEffect, useState } from 'react';
import { Waves, Thermometer, Gauge, Sun, Atom, Sparkles, Anchor } from 'lucide-react';

export function OceanHud({ depth }: { depth: number }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const pressure = (1 + depth * 0.1).toFixed(1);
  const temp = depth < 200 ? '15°C' : depth < 1000 ? '8°C' : depth < 4000 ? '3°C' : '1°C';
  const light = depth < 200 ? '100%' : depth < 1000 ? '0.1%' : '0%';

  return (
    <div className="fixed bottom-6 left-6 z-30 hidden md:block pointer-events-none">
      <div className="glass rounded-2xl p-4 font-mono text-xs space-y-2 min-w-[220px]">
        <div className="flex items-center gap-2 text-abyss-bio mb-2">
          <Waves className="w-3.5 h-3.5" />
          <span className="tracking-widest uppercase">Dive Telemetry</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span className="flex items-center gap-1.5"><Anchor className="w-3 h-3" />DEPTH</span>
          <span className="text-white">{depth.toFixed(0)} m</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span className="flex items-center gap-1.5"><Gauge className="w-3 h-3" />PRESS</span>
          <span className="text-white">{pressure} atm</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span className="flex items-center gap-1.5"><Thermometer className="w-3 h-3" />TEMP</span>
          <span className="text-white">{temp}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span className="flex items-center gap-1.5"><Sun className="w-3 h-3" />LIGHT</span>
          <span className="text-abyss-bio">{light}</span>
        </div>
        <div className="flex justify-between text-slate-400 pt-2 border-t border-white/5">
          <span>UTC</span>
          <span className="text-abyss-bio">{time}</span>
        </div>
      </div>
    </div>
  );
}

export function OceanSectionLabel({
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
        <Sparkles className="w-4 h-4 text-abyss-bio" />
        <span className="font-mono text-xs tracking-[0.3em] text-abyss-bio/80 uppercase">
          {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-abyss-bio/40 to-transparent" />
    </div>
  );
}

export function OceanOutro({ onReturnToSurface }: { onReturnToSurface: () => void }) {
  return (
    <section
      id="ocean-deepest"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 z-10"
    >
      <div className="text-center max-w-3xl">
        <Atom className="w-16 h-16 text-abyss-bio mx-auto mb-8 animate-float" />
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
          <span className="text-gradient from-white via-abyss-bio to-abyss-cyan glow-text">
            The Deepest Mystery
          </span>
        </h2>
        <p className="font-body text-lg text-slate-300/70 leading-relaxed mb-12 max-w-2xl mx-auto">
          You've descended from the sunlit surface through the twilight and
          midnight zones, past the abyssal plains and into the hadal trenches.
          Yet we've explored more of the Moon than our own deep ocean. Over 80%
          of the seafloor remains unmapped, and countless species await
          discovery in the dark.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <OutroStat icon={<Waves className="w-5 h-5" />} value="80%" label="Ocean unmapped" />
          <OutroStat icon={<Sparkles className="w-5 h-5" />} value="2,300+" label="New species per year" />
          <OutroStat icon={<Atom className="w-5 h-5" />} value="11 km" label="Deepest point" />
        </div>

        <button
          onClick={onReturnToSurface}
          className="px-8 py-4 rounded-full glass-strong font-display font-medium text-sm tracking-wider uppercase hover:shadow-glow-bio transition-all duration-500"
        >
          Return to Surface
        </button>
      </div>
    </section>
  );
}

function OutroStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-abyss-bio mb-3 flex justify-center">{icon}</div>
      <p className="font-display text-3xl font-bold text-white mb-1">{value}</p>
      <p className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">{label}</p>
    </div>
  );
}
