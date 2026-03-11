"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Stars } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

function NeuralBrain() {
  const pointsRef = useRef<any>(null);
  const [positions] = useState(() => {
    const list = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
        const radius = 2.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        list[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        list[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        list[i * 3 + 2] = radius * Math.cos(phi);
    }
    return list;
  });

  useFrame((state, delta) => {
    if (pointsRef.current) {
        pointsRef.current.rotation.y += delta * 0.15;
        pointsRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group>
      <Points positions={positions} ref={pointsRef}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <mesh>
        <sphereGeometry args={[2.55, 32, 32]} />
        <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

export default function Brain3D() {
  return (
    <div className="w-full h-[800px] z-10 transition-all duration-1000 -mt-20">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <React.Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
          <NeuralBrain />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

import React from "react";
