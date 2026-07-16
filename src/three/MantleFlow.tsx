import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MantleFlowProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  color2?: string;
}

export function MantleFlow({
  position = [0, 0, 0],
  scale = 1,
  color = '#f97316',
  color2 = '#dc2626',
}: MantleFlowProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.08;
    groupRef.current.rotation.z = t * 0.03;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = t * (0.05 + i * 0.01);
    });
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[i * 0.5, 0, 0]}>
          <torusGeometry args={[3 - i * 0.5, 0.15 - i * 0.03, 8, 64]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? color : color2}
            emissive={i % 2 === 0 ? color : color2}
            emissiveIntensity={0.4}
            transparent
            opacity={0.5}
            roughness={0.3}
            metalness={0.5}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
