import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Bubbles } from './Bubbles';
import { MarineSnow } from './MarineSnow';
import { LightRays } from './LightRays';
import { FishSchool } from './FishSchool';
import { Jellyfish } from './Jellyfish';

interface OceanSceneProps {
  scrollProgress: React.MutableRefObject<number>;
}

function OceanContent({ scrollProgress }: OceanSceneProps) {
  const fogRef = useRef<THREE.Color>(new THREE.Color('#06b6d4'));

  useFrame((state) => {
    const p = scrollProgress.current;
    // Camera descends deeper as user scrolls
    const targetY = -p * 50;
    const targetZ = 15 - p * 10;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.04;
    state.camera.position.x += (Math.sin(p * 3) * 5 - state.camera.position.x) * 0.03;
    state.camera.lookAt(0, targetY - 5, 0);

    // Fog color transitions from bright cyan to deep black
    const shallow = new THREE.Color('#06b6d4');
    const deep = new THREE.Color('#020617');
    fogRef.current.lerpColors(shallow, deep, p);
    if (state.scene.fog) {
      (state.scene.fog as THREE.Fog).color.copy(fogRef.current);
      (state.scene.fog as THREE.Fog).far = 60 - p * 40;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#06b6d4', 10, 60]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 20, 5]} intensity={1.5} color="#a5f3fc" />
      <pointLight position={[0, 10, 0]} intensity={2} color="#67e8f9" distance={40} />
      <pointLight position={[5, -20, -5]} intensity={1.5} color="#34d399" distance={30} />
      <pointLight position={[-8, -35, -10]} intensity={1} color="#a78bfa" distance={25} />

      {/* Surface layer — light rays, fish, bubbles */}
      <LightRays intensity={Math.max(0, 1 - scrollProgress.current * 3)} />
      <FishSchool count={15} color="#67e8f9" spread={10} speed={0.8} yLevel={5} />
      <FishSchool count={10} color="#fbbf24" spread={7} speed={1.2} yLevel={2} />
      <Bubbles count={40} spread={25} yRange={30} />

      {/* Mid-depth — jellyfish */}
      <Jellyfish position={[4, -8, -3]} scale={1.2} color="#a7f3d0" glowColor="#34d399" />
      <Jellyfish position={[-6, -12, 2]} scale={0.8} color="#a5f3fc" glowColor="#22d3ee" />
      <Jellyfish position={[2, -18, -5]} scale={1.5} color="#ddd6fe" glowColor="#a78bfa" />

      {/* Deep — marine snow, glowing creatures */}
      <MarineSnow count={600} spread={50} />
      <Jellyfish position={[-3, -28, 0]} scale={1.3} color="#a7f3d0" glowColor="#34d399" />
      <Jellyfish position={[5, -35, -3]} scale={0.9} color="#fda4af" glowColor="#fb7185" />

      {/* Deepest — faint glows */}
      <pointLight position={[0, -45, 0]} intensity={1.5} color="#34d399" distance={15} />
      <pointLight position={[-5, -48, 3]} intensity={1} color="#a78bfa" distance={12} />
    </>
  );
}

export function OceanScene({ scrollProgress }: OceanSceneProps) {
  return (
    <Canvas
      className="!fixed inset-0"
      camera={{ position: [0, 5, 15], fov: 65, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <OceanContent scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
