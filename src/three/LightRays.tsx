import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LightRaysProps {
  intensity?: number;
}

export function LightRays({ intensity = 1 }: LightRaysProps) {
  const groupRef = useRef<THREE.Group>(null);

  const rays = useMemo(() => {
    const items = [];
    for (let i = 0; i < 8; i++) {
      items.push({
        x: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 20 - 5,
        width: 1 + Math.random() * 2,
        height: 30 + Math.random() * 20,
        rotation: (Math.random() - 0.5) * 0.3,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const ray = rays[i];
      child.position.x = ray.x + Math.sin(t * 0.3 + ray.offset) * 1;
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = (0.08 + Math.sin(t + ray.offset) * 0.04) * intensity;
    });
  });

  return (
    <group ref={groupRef}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          position={[ray.x, 15, ray.z]}
          rotation={[0, 0, ray.rotation]}
        >
          <planeGeometry args={[ray.width, ray.height]} />
          <meshBasicMaterial
            color="#67e8f9"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
