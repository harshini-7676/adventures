import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PlanetData } from '../data/cosmos';

interface Planet3DProps {
  planet: PlanetData;
  position?: [number, number, number];
  scale?: number;
  autoRotate?: boolean;
}

export function Planet3D({
  planet,
  position = [0, 0, 0],
  scale = 1,
  autoRotate = true,
}: Planet3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[planet.size, 64, 64]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.emissive}
          emissiveIntensity={0.25}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Atmospheric glow */}
      <mesh scale={1.12}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {planet.hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[planet.size * 1.4, planet.size * 2.2, 64]} />
          <meshBasicMaterial
            color={planet.ringColor || planet.color}
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
}
