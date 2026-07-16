import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { NebulaData } from '../data/cosmos';

interface Nebula3DProps {
  nebula: NebulaData;
  position?: [number, number, number];
  scale?: number;
}

export function Nebula3D({
  nebula,
  position = [0, 0, 0],
  scale = 1,
}: Nebula3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  const clouds = useMemo(() => {
    const items: { pos: [number, number, number]; size: number; color: string }[] = [];
    for (let i = 0; i < 40; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      items.push({
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        size: 1.5 + Math.random() * 3,
        color: Math.random() > 0.5 ? nebula.color : nebula.color2,
      });
    }
    return items;
  }, [nebula]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {clouds.map((c, i) => (
        <mesh key={i} position={c.pos}>
          <sphereGeometry args={[c.size, 16, 16]} />
          <meshBasicMaterial
            color={c.color}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
