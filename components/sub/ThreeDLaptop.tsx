'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { PresentationControls, Float, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

const LaptopModel = ({ scrollProgress = 0 }: { scrollProgress?: number }) => {
    const group = useRef<THREE.Group>(null);

    const keyBaseMaterial = React.useMemo(() => new THREE.MeshStandardMaterial({
        color: "#0a0a0a",
        roughness: 0.5,
        metalness: 0.2
    }), []);

    const rgbBorderMaterial = React.useMemo(() => new THREE.MeshStandardMaterial({
        color: "#0ea5e9",
        emissive: new THREE.Color("#0ea5e9"),
        emissiveIntensity: 2,
        wireframe: true
    }), []);

    const rgbTextMaterial = React.useMemo(() => new THREE.MeshStandardMaterial({
        color: "#0ea5e9",
        emissive: new THREE.Color("#0ea5e9"),
        emissiveIntensity: 1,
    }), []);

    const texture = useLoader(THREE.TextureLoader, '/code-highlighting.png');

    useFrame((state) => {
        if (!group.current) return;
        const t = state.clock.getElapsedTime();

        // Only float if the user isn't actively scrolling much (idle)
        if (scrollProgress < 0.05) {
            group.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
            group.current.rotation.x = Math.cos(t / 4) / 8;
            group.current.rotation.y = Math.sin(t / 4) / 8;
            group.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
        }

        const color1 = new THREE.Color("#0ea5e9");
        const color2 = new THREE.Color("#22c55e");
        const lerpVal = (Math.sin(t * 2) + 1) / 2;

        rgbBorderMaterial.color.lerpColors(color1, color2, lerpVal);
        rgbBorderMaterial.emissive.lerpColors(color1, color2, lerpVal);
        rgbBorderMaterial.emissiveIntensity = 1.5 + Math.sin(t * 3) * 0.5;

        rgbTextMaterial.color.lerpColors(color1, color2, lerpVal);
        rgbTextMaterial.emissive.lerpColors(color1, color2, lerpVal);
    });

    return (
        <group ref={group} dispose={null}>
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[3.2, 0.15, 2.2]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.7} />
            </mesh>

            <mesh position={[0, -0.43, 0]}>
                <boxGeometry args={[2.9, 0.05, 1.3]} />
                <meshStandardMaterial color="#050505" roughness={0.1} />
            </mesh>

            <group position={[-1.5, -0.4, -0.55]}>
                {(() => {
                    const rows = [
                        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "=", "Bksp"],
                        ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
                        ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
                        ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift", "▲"],
                        ["Ctrl", "Opt", "Cmd", "Space", "Cmd", "◄", "▼", "►"]
                    ];

                    return rows.map((rowChars, row) => {
                        const rowKeys = [];
                        let colOffset = 0;

                        for (let col = 0; col < rowChars.length; col++) {
                            const char = rowChars[col];

                            let keyWidth = 0.15;
                            let keySpan = 1;

                            // Handle special widths based on standard keyboard ratios
                            if (char === "Bksp") { keySpan = 2; keyWidth = 0.15 + (0.205 * 1); }
                            else if (char === "Tab") { keySpan = 1.5; keyWidth = 0.15 + (0.205 * 0.5); }
                            else if (char === "Caps") { keySpan = 1.8; keyWidth = 0.15 + (0.205 * 0.8); }
                            else if (char === "Enter") { keySpan = 2.2; keyWidth = 0.15 + (0.205 * 1.2); }
                            else if (char === "Shift") {
                                keySpan = col === 0 ? 2.3 : 1.7;
                                keyWidth = 0.15 + (0.205 * (keySpan - 1));
                            }
                            else if (char === "Space") {
                                keySpan = 6.2;
                                keyWidth = 0.15 + (0.205 * 5.2);
                            }
                            else if (["Ctrl", "Opt", "Cmd"].includes(char)) {
                                keySpan = 1.2;
                                keyWidth = 0.15 + (0.205 * 0.2);
                            }

                            const xPos = colOffset + (keyWidth / 2) - (0.15 / 2);

                            rowKeys.push(
                                <group key={`${row}-${col}`} position={[xPos, 0, row * 0.22]}>
                                    <mesh material={keyBaseMaterial}>
                                        <boxGeometry args={[keyWidth, 0.06, 0.15]} />
                                    </mesh>
                                    <mesh position={[0, -0.01, 0]} material={rgbBorderMaterial}>
                                        <boxGeometry args={[keyWidth + 0.015, 0.04, 0.165]} />
                                    </mesh>
                                    {char !== "" && (
                                        <Text
                                            position={[0, 0.04, 0.01]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            fontSize={char.length > 2 ? 0.035 : 0.06}
                                        >
                                            <primitive object={rgbTextMaterial} attach="material" />
                                            {char === "Space" ? "" : char}
                                        </Text>
                                    )}
                                </group>
                            );

                            colOffset += keySpan * 0.205;
                        }
                        return rowKeys;
                    });
                })()}
            </group>

            <mesh position={[0, -0.42, 0.7]}>
                <boxGeometry args={[0.8, 0.01, 0.5]} />
                <meshStandardMaterial color="#2d2d2d" roughness={0.2} metalness={0.1} />
            </mesh>

            <group position={[0, -0.43, -1.05]} rotation={[Math.PI / 12, 0, 0]}>
                <mesh position={[0, 1.05, 0]}>
                    <boxGeometry args={[3.2, 2.1, 0.08]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
                </mesh>

                <mesh position={[0, 1.05, 0.05]}>
                    <planeGeometry args={[3, 1.9]} />
                    <meshBasicMaterial color="#000" />
                </mesh>

                <mesh position={[0, 1.05, 0.06]}>
                    <planeGeometry args={[2.9, 1.8]} />
                    <meshBasicMaterial map={texture} transparent opacity={0.9} />
                </mesh>
            </group>
        </group>
    );
};

const ThreeDLaptop = ({
    scrollProgress = 0,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}: {
    scrollProgress?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
}) => {
    return (
        <div className="w-full h-full relative">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6.5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={1} />

                <group position={position} rotation={rotation} scale={scale}>
                    <PresentationControls
                        global={false}
                        cursor={true}
                        snap={true}
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 6, Math.PI / 6]}
                        azimuth={[-Math.PI / 6, Math.PI / 6]}
                    >
                        <Float speed={scrollProgress > 0.05 ? 0 : 2} rotationIntensity={0.5} floatIntensity={1}>
                            <React.Suspense fallback={null}>
                                <LaptopModel scrollProgress={scrollProgress} />
                            </React.Suspense>
                        </Float>
                    </PresentationControls>
                </group>

                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            </Canvas>
        </div>
    );
};

export default ThreeDLaptop;
