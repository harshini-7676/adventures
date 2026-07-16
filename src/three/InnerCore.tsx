import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InnerCoreProps {
  position?: [number, number, number];
  scale?: number;
}

export function InnerCore({
  position = [0, 0, 0],
  scale = 1,
}: InnerCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.15;
    const pulse = 1 + Math.sin(t * 1.2) * 0.04;
    meshRef.current.scale.setScalar(pulse);

    if (glowRef.current) {
      const glowPulse = 1 + Math.sin(t * 1.2) * 0.08;
      glowRef.current.scale.setScalar(glowPulse);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(t * 1.2) * 0.05;
    }
    if (coronaRef.current) {
      const coronaPulse = 1 + Math.sin(t * 0.8 + 1) * 0.06;
      coronaRef.current.scale.setScalar(coronaPulse);
      (coronaRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.08 + Math.sin(t * 0.8 + 1) * 0.03;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Solid core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#fef3c7"
          emissive="#fbbf24"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef} scale={1.15}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Corona */}
      <mesh ref={coronaRef} scale={1.4}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
