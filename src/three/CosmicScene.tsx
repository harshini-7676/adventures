import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Starfield } from './Starfield';
import { Planet3D } from './Planet3D';
import { Nebula3D } from './Nebula3D';
import { planets, nebulae } from '../data/cosmos';

interface CosmicSceneProps {
  scrollProgress: React.MutableRefObject<number>;
}

function SceneContent({ scrollProgress }: CosmicSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const p = scrollProgress.current;
    // Move camera through space as user scrolls
    const z = 30 - p * 70;
    const x = Math.sin(p * Math.PI * 2) * 8;
    const y = Math.cos(p * Math.PI) * 4 - p * 6;

    state.camera.position.x += (x - state.camera.position.x) * 0.05;
    state.camera.position.y += (y - state.camera.position.y) * 0.05;
    state.camera.position.z += (z - state.camera.position.z) * 0.05;
    state.camera.lookAt(cameraTarget.current);

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[-20, -10, -20]} intensity={1} color="#22d3ee" />
      <pointLight position={[20, -5, 10]} intensity={0.8} color="#fb7185" />

      <Starfield count={5000} radius={100} />

      <group ref={groupRef}>
        {/* Planets placed along a path through space */}
        <Planet3D planet={planets[0]} position={[0, 0, 20]} scale={1.2} />
        <Planet3D planet={planets[1]} position={[6, 2, 5]} scale={0.9} />
        <Planet3D planet={planets[2]} position={[-5, -3, -10]} scale={1.4} />
        <Planet3D planet={planets[3]} position={[4, -2, -25]} scale={1.3} />
        <Planet3D planet={planets[4]} position={[-3, 3, -40]} scale={1.1} />

        {/* Nebulae in the deep distance */}
        <Nebula3D nebula={nebulae[0]} position={[8, -4, -55]} scale={1.2} />
        <Nebula3D nebula={nebulae[1]} position={[-10, 5, -75]} scale={1.5} />
        <Nebula3D nebula={nebulae[2]} position={[6, -6, -95]} scale={1.3} />
      </group>
    </>
  );
}

export function CosmicScene({ scrollProgress }: CosmicSceneProps) {
  return (
    <Canvas
      className="!fixed inset-0"
      camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 300 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <SceneContent scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
