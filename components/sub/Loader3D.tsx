'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
    Float,
    MeshDistortMaterial,
    Sphere,
    Torus,
    Stars,
    PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';

const TechCore = ({ progress }: { progress: number }) => {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.2;
        }
        if (coreRef.current) {
            coreRef.current.rotation.x = t * 0.5;
            coreRef.current.rotation.y = t * 0.3;
        }
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z = t * 0.8;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = t * -0.6;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Central Wireframe Core */}
            <mesh ref={coreRef}>
                <icosahedronGeometry args={[1.5, 2]} />
                <meshStandardMaterial
                    color="#0ea5e9"
                    emissive="#0ea5e9"
                    emissiveIntensity={2}
                    wireframe
                    transparent
                    opacity={0.3 + (progress / 200)}
                />
            </mesh>

            {/* Inner Solid Core (Glows as progress increases) */}
            <mesh>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshStandardMaterial
                    color="#0ea5e9"
                    emissive="#0ea5e9"
                    emissiveIntensity={progress / 10}
                    transparent
                    opacity={0.1 + (progress / 100)}
                />
            </mesh>

            {/* Orbital Ring 1 */}
            <mesh ref={ring1Ref as any} rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[2.5, 0.02, 16, 100]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={5} transparent opacity={0.6} />
            </mesh>

            {/* Orbital Ring 2 */}
            <mesh ref={ring2Ref as any} rotation={[Math.PI / -4, Math.PI / 4, 0]}>
                <torusGeometry args={[3, 0.015, 16, 100]} />
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={5} transparent opacity={0.4} />
            </mesh>

            {/* Floating Data Points */}
            {[...Array(12)].map((_, i) => (
                <Float key={i} speed={2} rotationIntensity={5} floatIntensity={1}>
                    <mesh position={[
                        Math.cos(i) * 3.5,
                        Math.sin(i * 1.5) * 3.5,
                        Math.sin(i) * 3.5
                    ]}>
                        <boxGeometry args={[0.08, 0.08, 0.08]} />
                        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={3} />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const Loader3D = ({ progress }: { progress: number }) => {
    return (
        <React.Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2.5} color="#0ea5e9" />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#22c55e" />

            <TechCore progress={progress} />

            <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1.5} />
        </React.Suspense>
    );
};

export default Loader3D;
