import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface JellyfishProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  glowColor?: string;
}

export function Jellyfish({
  position = [0, 0, 0],
  scale = 1,
  color = '#a7f3d0',
  glowColor = '#34d399',
}: JellyfishProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bellRef = useRef<THREE.Mesh>(null);

  const tentacles = useMemo(() => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      items.push({
        x: Math.cos((i / 12) * Math.PI * 2) * 0.4,
        z: Math.sin((i / 12) * Math.PI * 2) * 0.4,
        length: 1.5 + Math.random() * 1.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Pulsing bell
    if (bellRef.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.08;
      bellRef.current.scale.set(pulse, 1 / pulse + 0.1, pulse);
    }
    // Drift upward and sway
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 1.5;
    groupRef.current.position.x = position[0] + Math.sin(t * 0.3) * 0.8;
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;

    // Tentacle sway
    groupRef.current.children.forEach((child, i) => {
      if (i > 0 && child instanceof THREE.Mesh) {
        child.rotation.x = Math.sin(t * 2 + tentacles[i - 1]?.offset) * 0.3;
      }
    });
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Bell (dome) */}
      <mesh ref={bellRef}>
        <sphereGeometry args={[0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={color}
          emissive={glowColor}
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
          roughness={0.2}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner glow */}
      <mesh scale={0.5}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Tentacles */}
      {tentacles.map((t, i) => (
        <mesh key={i} position={[t.x, -0.5, t.z]}>
          <cylinderGeometry args={[0.02, 0.005, t.length, 4]} />
          <meshStandardMaterial
            color={color}
            emissive={glowColor}
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}
