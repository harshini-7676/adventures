import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FishSchoolProps {
  count?: number;
  color?: string;
  spread?: number;
  speed?: number;
  yLevel?: number;
}

export function FishSchool({
  count = 12,
  color = '#67e8f9',
  spread = 8,
  speed = 1,
  yLevel = 0,
}: FishSchoolProps) {
  const groupRef = useRef<THREE.Group>(null);

  const fish = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        offset: (i / count) * Math.PI * 2,
        radius: spread * (0.5 + Math.random() * 0.5),
        yOff: (Math.random() - 0.5) * 3,
        size: 0.15 + Math.random() * 0.15,
        speedMod: 0.8 + Math.random() * 0.4,
      });
    }
    return items;
  }, [count, spread]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speed;
    groupRef.current.children.forEach((child, i) => {
      const f = fish[i];
      const angle = t * f.speedMod + f.offset;
      child.position.x = Math.cos(angle) * f.radius;
      child.position.z = Math.sin(angle) * f.radius;
      child.position.y = yLevel + f.yOff + Math.sin(t * 2 + f.offset) * 0.5;
      child.rotation.y = -angle + Math.PI / 2;
      child.rotation.z = Math.sin(t * 3 + f.offset) * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {fish.map((f, i) => (
        <group key={i} scale={f.size}>
          {/* Body */}
          <mesh>
            <coneGeometry args={[0.3, 1, 6]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.15}
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
          {/* Tail */}
          <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.15, 0.4, 4]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.1}
              roughness={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
