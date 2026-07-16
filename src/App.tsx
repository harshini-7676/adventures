import { useEffect, useState } from 'react';
import { JourneySelect } from './components/JourneySelect';
import { SpaceJourney } from './components/SpaceJourney';
import { OceanJourney } from './components/OceanJourney';
import { EarthJourney } from './components/EarthJourney';

type Journey = 'select' | 'space' | 'ocean' | 'earth';

function App() {
  const [journey, setJourney] = useState<Journey>('select');

  // Reset scroll when switching journeys
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [journey]);

  if (journey === 'space') {
    return <SpaceJourney onExit={() => setJourney('select')} />;
  }

  if (journey === 'ocean') {
    return <OceanJourney onExit={() => setJourney('select')} />;
  }

  if (journey === 'earth') {
    return <EarthJourney onExit={() => setJourney('select')} />;
  }

  return (
    <div className="relative min-h-screen">
      {/* Ambient gradient backdrop for selection page */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-void-950 via-void-900 to-void-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-nebula-cyan/10 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl bg-abyss-bio/10 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl bg-magma-amber/5 animate-pulse-slow" />
      </div>

      <div className="relative z-10">
        <JourneySelect onSelect={(j) => setJourney(j)} />
      </div>

      <footer className="relative z-10 py-8 px-6 text-center border-t border-white/5">
        <p className="font-mono text-xs text-slate-500 tracking-widest uppercase">
          Cosmic Explorer · Three Mysteries of Earth
        </p>
      </footer>
    </div>
  );
}

export default App;
