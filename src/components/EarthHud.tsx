import { useEffect, useState } from 'react';
import { Mountain, Thermometer, Gauge, Layers, Atom, Sparkles, Anchor } from 'lucide-react';

export function EarthHud({ depth }: { depth: number }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const pressure = (1 + depth * 565).toFixed(0);
  const temp = depth < 70 ? '200°C' : depth < 700 ? '1,000°C' : depth < 2890 ? '3,000°C' : depth < 5150 ? '5,000°C' : '5,700°C';
  const layer = depth < 70 ? 'Crust' : depth < 700 ? 'Upper Mantle' : depth < 2890 ? 'Lower Mantle' : depth < 5150 ? 'Outer Core' : 'Inner Core';

  return (
    <div className="fixed bottom-6 left-6 z-30 hidden md:block pointer-events-none">
      <div className="glass rounded-2xl p-4 font-mono text-xs space-y-2 min-w-[220px]">
        <div className="flex items-center gap-2 text-magma-amber mb-2">
          <Mountain className="w-3.5 h-3.5" />
          <span className="tracking-widest uppercase">Descent Telemetry</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span className="flex items-center gap-1.5"><Anchor className="w-3 h-3" />DEPTH</span>
          <span className="text-white">{depth.toFixed(0)} km</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span className="flex items-center gap-1.5"><Gauge className="w-3 h-3" />PRESS</span>
          <span className="text-white">{Number(pressure).toLocaleString()} atm</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span className="flex items-center gap-1.5"><Thermometer className="w-3 h-3" />TEMP</span>
          <span className="text-white">{temp}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span className="flex items-center gap-1.5"><Layers className="w-3 h-3" />LAYER</span>
          <span className="text-magma-amber">{layer}</span>
        </div>
        <div className="flex justify-between text-slate-400 pt-2 border-t border-white/5">
          <span>UTC</span>
          <span className="text-magma-amber">{time}</span>
        </div>
      </div>
    </div>
  );
}

export function EarthSectionLabel({
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
        <Sparkles className="w-4 h-4 text-magma-amber" />
        <span className="font-mono text-xs tracking-[0.3em] text-magma-amber/80 uppercase">
          {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-magma-amber/40 to-transparent" />
    </div>
  );
}

export function EarthOutro({ onReturnToSurface }: { onReturnToSurface: () => void }) {
  return (
    <section
      id="earth-heart"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 z-10"
    >
      <div className="text-center max-w-3xl">
        <Atom className="w-16 h-16 text-magma-amber mx-auto mb-8 animate-float" />
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
          <span className="text-gradient from-white via-magma-amber to-magma-ember glow-text">
            The Heart of Our World
          </span>
        </h2>
        <p className="font-body text-lg text-slate-300/70 leading-relaxed mb-12 max-w-2xl mx-auto">
          You've journeyed from the surface through caves and crystals, past
          flowing mantle and molten iron, to the solid heart of our planet.
          Yet we have never drilled deeper than 12 km — the vast interior
          remains a mystery, mapped only by the whispers of seismic waves.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <OutroStat icon={<Thermometer className="w-5 h-5" />} value="6,000°C" label="Core temperature" />
          <OutroStat icon={<Gauge className="w-5 h-5" />} value="3.6M atm" label="Core pressure" />
          <OutroStat icon={<Atom className="w-5 h-5" />} value="12 km" label="Deepest hole ever drilled" />
        </div>

        <button
          onClick={onReturnToSurface}
          className="px-8 py-4 rounded-full glass-strong font-display font-medium text-sm tracking-wider uppercase hover:shadow-glow-magma transition-all duration-500"
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
      <div className="text-magma-amber mb-3 flex justify-center">{icon}</div>
      <p className="font-display text-3xl font-bold text-white mb-1">{value}</p>
      <p className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">{label}</p>
    </div>
  );
}
