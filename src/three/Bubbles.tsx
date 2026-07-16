import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BubblesProps {
  count?: number;
  spread?: number;
  yRange?: number;
}

export function Bubbles({ count = 60, spread = 30, yRange = 40 }: BubblesProps) {
  const groupRef = useRef<THREE.Group>(null);

  const bubbles = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: (Math.random() - 0.5) * spread,
        y: -yRange / 2 + Math.random() * yRange,
        z: (Math.random() - 0.5) * spread,
        size: 0.05 + Math.random() * 0.25,
        speed: 0.5 + Math.random() * 1.5,
        wobble: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, [count, spread, yRange]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const b = bubbles[i];
      child.position.y += b.speed * 0.02;
      child.position.x += Math.sin(t + b.wobble) * 0.01;
      if (child.position.y > yRange / 2) {
        child.position.y = -yRange / 2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {bubbles.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, b.z]}>
          <sphereGeometry args={[b.size, 8, 8]} />
          <meshBasicMaterial
            color="#a5f3fc"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
