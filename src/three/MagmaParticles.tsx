import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MagmaParticlesProps {
  count?: number;
  spread?: number;
  yRange?: number;
  color?: string;
}

export function MagmaParticles({
  count = 200,
  spread = 30,
  yRange = 40,
  color = '#f97316',
}: MagmaParticlesProps) {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = -yRange / 2 + Math.random() * yRange;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      spd[i] = 0.5 + Math.random() * 2;
      off[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, speeds: spd, offsets: off };
  }, [count, spread, yRange]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * delta * 1.5;
      pos[i * 3] += Math.sin(t + offsets[i]) * delta * 0.3;
      if (pos[i * 3 + 1] > yRange / 2) {
        pos[i * 3 + 1] = -yRange / 2;
        pos[i * 3] = (Math.random() - 0.5) * spread;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
