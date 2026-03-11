"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Stars, Float, MeshDistortMaterial, Sphere, Torus, Box, Tetrahedron, Icosahedron, TorusKnot, Octahedron } from "@react-three/drei";
import { useRef, useState, useMemo, Suspense, useEffect } from "react";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";

// Home: Complex Neural Plexus
function NeuralPlexus() {
    const pointsRef = useRef<THREE.Points>(null!);
    const count = 1000;
    const [positions] = useState(() => {
        const list = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            list[i * 3] = (Math.random() - 0.5) * 30;
            list[i * 3 + 1] = (Math.random() - 0.5) * 30;
            list[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return list;
    });

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (pointsRef.current) {
            pointsRef.current.rotation.y = time * 0.05;
        }
    });

    return (
        <group>
            <Points positions={positions} ref={pointsRef}>
                <PointMaterial
                    transparent
                    color="#8b5cf6"
                    size={0.1}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.6}
                />
            </Points>
            {/* Lines between points could be heavy, using a simple glow sphere mesh instead */}
            <mesh scale={[15, 15, 15]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.03} />
            </mesh>
        </group>
    );
}

// About: Data Flow / Particles
function DataFlow() {
    const meshRef = useRef<any>(null!);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });
    return (
        <group>
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <TorusKnot ref={meshRef} args={[8, 2.5, 100, 16]}>
                    <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
                </TorusKnot>
            </Float>
        </group>
    );
}

// Faculty: Knowledge Graph Nodes
function KnowledgeGraph() {
    const meshRef = useRef<any>(null!);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.4;
            meshRef.current.rotation.y += delta * 0.5;
        }
    });
    return (
        <group>
            <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
                <Octahedron ref={meshRef} args={[10, 0]}>
                    <meshBasicMaterial color="#c084fc" wireframe transparent opacity={0.3} />
                </Octahedron>
            </Float>
        </group>
    );
}

// Timeline: Time Vortex
function TimeVortex() {
    const meshRef = useRef<any>(null!);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.3;
            meshRef.current.rotation.y -= delta * 0.4;
        }
    });

    return (
        <group>
            <Float speed={3} rotationIntensity={1} floatIntensity={1}>
                <Sphere ref={meshRef} args={[8, 32, 32]}>
                     <MeshDistortMaterial color="#f472b6" speed={1.5} distort={0.5} wireframe transparent opacity={0.4} />
                </Sphere>
            </Float>
        </group>
    );
}

// Coordinators: Community Cluster
function CommunityCluster() {
    const meshRef = useRef<any>(null!);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x -= delta * 0.2;
            meshRef.current.rotation.y += delta * 0.4;
        }
    });

    return (
        <group>
             <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                 <Icosahedron ref={meshRef} args={[10, 1]}>
                      <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.3} />
                 </Icosahedron>
             </Float>
        </group>
    );
}

function Scene({ scrollProgress }: { scrollProgress: any }) {
    const { camera } = useThree();
    const [activeZone, setActiveZone] = useState("home");

    useFrame(() => {
        const p = scrollProgress.get();
        // Determine zone based on scroll 0-1
        if (p < 0.15) setActiveZone("home");
        else if (p < 0.35) setActiveZone("about");
        else if (p < 0.55) setActiveZone("faculty");
        else if (p < 0.75) setActiveZone("timeline");
        else setActiveZone("coordinators");

        // Camera movement: smooth vertical drift + lookAt
        camera.position.y = -p * 100;
        camera.lookAt(0, -p * 100, -50);
    });

    return (
        <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
            
            <group position={[0, 0, 0]}>
                {activeZone === "home" && <NeuralPlexus />}
            </group>
            
            <group position={[0, -30, 0]}>
                <DataFlow />
            </group>
            
            <group position={[0, -60, 0]}>
                <KnowledgeGraph />
            </group>

            <group position={[0, -90, 0]}>
                <TimeVortex />
            </group>

            <group position={[0, -120, 0]}>
                <CommunityCluster />
            </group>

            <fog attach="fog" args={["#000000", 10, 100]} />
        </Suspense>
    );
}

export default function Background3D() {
    const { scrollYProgress } = useScroll();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="fixed inset-0 z-[-1] bg-[#030014]" />;

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#030014]">
            <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
                <Scene scrollProgress={scrollYProgress} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        </div>
    );
}
