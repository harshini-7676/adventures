import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CrystalsProps {
  count?: number;
  spread?: number;
  yLevel?: number;
  color?: string;
  glowColor?: string;
}

export function Crystals({
  count = 15,
  spread = 12,
  yLevel = 0,
  color = '#a5f3fc',
  glowColor = '#67e8f9',
}: CrystalsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const crystals = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: (Math.random() - 0.5) * spread,
        y: yLevel + (Math.random() - 0.5) * 4,
        z: (Math.random() - 0.5) * spread - 3,
        height: 0.8 + Math.random() * 2.5,
        radius: 0.15 + Math.random() * 0.25,
        rotation: Math.random() * Math.PI,
        tilt: (Math.random() - 0.5) * 0.4,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, [count, spread, yLevel]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const c = crystals[i];
      child.rotation.y = c.rotation + t * 0.1;
      const pulse = 1 + Math.sin(t * 1.5 + c.offset) * 0.05;
      child.scale.set(pulse, 1, pulse);
    });
  });

  return (
    <group ref={groupRef}>
      {crystals.map((c, i) => (
        <mesh key={i} position={[c.x, c.y, c.z]} rotation={[c.tilt, c.rotation, 0]}>
          <coneGeometry args={[c.radius, c.height, 6]} />
          <meshStandardMaterial
            color={color}
            emissive={glowColor}
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
