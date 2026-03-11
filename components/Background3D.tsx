"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Stars, Float, MeshDistortMaterial, Sphere, Icosahedron, TorusKnot, Octahedron } from "@react-three/drei";
import { useRef, useState, useMemo, Suspense, useEffect } from "react";
import * as THREE from "three";
import { useScroll } from "framer-motion";

// Zone 1: Neural Brain (Home)
function NeuralBrainZone() {
    const pointsRef = useRef<THREE.Points>(null!);
    const count = 3000;
    const [positions] = useState(() => {
        const list = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const radius = 10;
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
            pointsRef.current.rotation.y += delta * 0.1;
            pointsRef.current.rotation.x += delta * 0.03;
        }
    });

    return (
        <group>
            <Points positions={positions} ref={pointsRef}>
                <PointMaterial
                    transparent
                    color="#8b5cf6"
                    size={0.15}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
            <mesh>
                <sphereGeometry args={[10.2, 32, 32]} />
                <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.05} />
            </mesh>
        </group>
    );
}

// Zone 2: Torus Knot (About)
function TorusKnotZone() {
    const meshRef = useRef<any>(null!);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <TorusKnot ref={meshRef} args={[12, 3, 100, 16]}>
                <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.2} />
            </TorusKnot>
        </Float>
    );
}

// Zone 3: Octahedron (Faculty)
function OctahedronZone() {
    const meshRef = useRef<any>(null!);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.4;
            meshRef.current.rotation.y += delta * 0.5;
        }
    });
    return (
        <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
            <Octahedron ref={meshRef} args={[12, 0]}>
                <meshBasicMaterial color="#c084fc" wireframe transparent opacity={0.2} />
            </Octahedron>
        </Float>
    );
}

// Zone 4: Distorted Sphere (Timeline)
function SphereZone() {
    const meshRef = useRef<any>(null!);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.3;
            meshRef.current.rotation.y -= delta * 0.4;
        }
    });

    return (
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={meshRef} args={[10, 32, 32]}>
                 <MeshDistortMaterial color="#f472b6" speed={1.5} distort={0.5} wireframe transparent opacity={0.3} />
            </Sphere>
        </Float>
    );
}

// Zone 5: Icosahedron (Coordinators)
function IcosahedronZone() {
    const meshRef = useRef<any>(null!);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x -= delta * 0.2;
            meshRef.current.rotation.y += delta * 0.4;
        }
    });

    return (
         <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
             <Icosahedron ref={meshRef} args={[15, 1]}>
                  <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.2} />
             </Icosahedron>
         </Float>
    );
}

function SceneViewer({ scrollProgress }: { scrollProgress: any }) {
    const { camera } = useThree();
    const [activeZone, setActiveZone] = useState("home");

    useFrame(() => {
        const p = scrollProgress.get();
        if (p < 0.2) setActiveZone("home");
        else if (p < 0.4) setActiveZone("about");
        else if (p < 0.6) setActiveZone("faculty");
        else if (p < 0.8) setActiveZone("timeline");
        else setActiveZone("coordinators");

        // Vertical movement of camera
        camera.position.y = -p * 200;
        camera.lookAt(0, -p * 200, -100);
    });

    return (
        <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
            
            <group position={[0, 0, 0]}>
                {activeZone === "home" && <NeuralBrainZone />}
            </group>
            
            <group position={[0, -50, 0]}>
                {activeZone === "about" && <TorusKnotZone />}
            </group>
            
            <group position={[0, -100, 0]}>
                {activeZone === "faculty" && <OctahedronZone />}
            </group>

            <group position={[0, -150, 0]}>
                {activeZone === "timeline" && <SphereZone />}
            </group>

            <group position={[0, -200, 0]}>
                {activeZone === "coordinators" && <IcosahedronZone />}
            </group>

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <fog attach="fog" args={["#000000", 10, 150]} />
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
            <Canvas camera={{ position: [0, 0, 40], fov: 60 }} dpr={[1, 2]}>
                <SceneViewer scrollProgress={scrollYProgress} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
        </div>
    );
}
