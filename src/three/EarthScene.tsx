import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Crystals } from './Crystals';
import { MagmaParticles } from './MagmaParticles';
import { LavaBubbles } from './LavaBubbles';
import { RockDebris } from './RockDebris';
import { MantleFlow } from './MantleFlow';
import { InnerCore } from './InnerCore';

interface EarthSceneProps {
  scrollProgress: React.MutableRefObject<number>;
}

function EarthContent({ scrollProgress }: EarthSceneProps) {
  const fogRef = useRef<THREE.Color>(new THREE.Color('#78350f'));

  useFrame((state) => {
    const p = scrollProgress.current;
    // Camera descends from surface to core
    const targetY = -p * 55;
    const targetZ = 15 - p * 8;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.04;
    state.camera.position.x += (Math.sin(p * 2.5) * 4 - state.camera.position.x) * 0.03;
    state.camera.lookAt(0, targetY - 5, 0);

    // Fog transitions from warm brown to deep ember red
    const surface = new THREE.Color('#78350f');
    const deep = new THREE.Color('#450a0a');
    fogRef.current.lerpColors(surface, deep, p);
    if (state.scene.fog) {
      (state.scene.fog as THREE.Fog).color.copy(fogRef.current);
      (state.scene.fog as THREE.Fog).far = 55 - p * 30;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#78350f', 10, 55]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 20, 5]} intensity={0.6} color="#fbbf24" />
      <pointLight position={[0, 10, 0]} intensity={1.5} color="#fbbf24" distance={35} />
      <pointLight position={[5, -15, -5]} intensity={2} color="#f97316" distance={30} />
      <pointLight position={[-8, -30, -8]} intensity={2.5} color="#dc2626" distance={28} />
      <pointLight position={[3, -45, 3]} intensity={3} color="#fbbf24" distance={25} />

      {/* Surface / crust — crystals, rock debris */}
      <Crystals count={12} spread={10} yLevel={5} color="#a5f3fc" glowColor="#67e8f9" />
      <Crystals count={8} spread={8} yLevel={0} color="#c4b5fd" glowColor="#a78bfa" />
      <RockDebris count={300} spread={40} yRange={40} />

      {/* Upper mantle — magma particles, lava bubbles */}
      <MagmaParticles count={150} spread={20} yRange={25} color="#f97316" />
      <LavaBubbles count={20} spread={15} yRange={20} />

      {/* Lower mantle — mantle flow, denser particles */}
      <MantleFlow position={[0, -18, -3]} scale={1.2} color="#f97316" color2="#dc2626" />
      <MantleFlow position={[-4, -22, 2]} scale={0.8} color="#dc2626" color2="#9a3412" />
      <MagmaParticles count={200} spread={25} yRange={30} color="#dc2626" />

      {/* Outer core — swirling liquid metal */}
      <MantleFlow position={[0, -35, 0]} scale={1.5} color="#fbbf24" color2="#f97316" />
      <LavaBubbles count={25} spread={18} yRange={20} />
      <pointLight position={[0, -38, 0]} intensity={2} color="#fbbf24" distance={20} />

      {/* Inner core — the glowing heart */}
      <InnerCore position={[0, -50, 0]} scale={1} />
      <pointLight position={[0, -50, 0]} intensity={4} color="#fef3c7" distance={20} />
    </>
  );
}

export function EarthScene({ scrollProgress }: EarthSceneProps) {
  return (
    <Canvas
      className="!fixed inset-0"
      camera={{ position: [0, 5, 15], fov: 65, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <EarthContent scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
