import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LavaBubblesProps {
  count?: number;
  spread?: number;
  yRange?: number;
}

export function LavaBubbles({ count = 30, spread = 20, yRange = 30 }: LavaBubblesProps) {
  const groupRef = useRef<THREE.Group>(null);

  const bubbles = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: (Math.random() - 0.5) * spread,
        y: -yRange / 2 + Math.random() * yRange,
        z: (Math.random() - 0.5) * spread,
        size: 0.2 + Math.random() * 0.5,
        speed: 0.3 + Math.random() * 0.8,
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
      child.position.y += b.speed * 0.015;
      child.position.x += Math.sin(t + b.wobble) * 0.008;
      const pulse = 1 + Math.sin(t * 2 + b.wobble) * 0.1;
      child.scale.setScalar(pulse);
      if (child.position.y > yRange / 2) {
        child.position.y = -yRange / 2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {bubbles.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, b.z]}>
          <sphereGeometry args={[b.size, 12, 12]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#dc2626"
            emissiveIntensity={0.6}
            transparent
            opacity={0.6}
            roughness={0.2}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}
