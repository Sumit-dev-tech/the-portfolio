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

            <group position={[-1.50, -0.4, -0.75]}>
                {(() => {
                    const rows = [
                        // Function row
                        [
                            { char: "Esc", span: 1.1 }, { char: "F1", span: 1 }, { char: "F2", span: 1 }, { char: "F3", span: 1 },
                            { char: "F4", span: 1 }, { char: "F5", span: 1 }, { char: "F6", span: 1 }, { char: "F7", span: 1 },
                            { char: "F8", span: 1 }, { char: "F9", span: 1 }, { char: "F10", span: 1 }, { char: "F11", span: 1 },
                            { char: "F12", span: 1 }, { char: "Del", span: 1.1 }
                        ],
                        // Number row
                        [
                            { char: "1", span: 1 }, { char: "2", span: 1 }, { char: "3", span: 1 }, { char: "4", span: 1 },
                            { char: "5", span: 1 }, { char: "6", span: 1 }, { char: "7", span: 1 }, { char: "8", span: 1 },
                            { char: "9", span: 1 }, { char: "0", span: 1 }, { char: "-", span: 1 }, { char: "=", span: 1 },
                            { char: "Bksp", span: 2.2 }
                        ],
                        // QWERTY row
                        [
                            { char: "Tab", span: 1.5 }, { char: "Q", span: 1 }, { char: "W", span: 1 }, { char: "E", span: 1 },
                            { char: "R", span: 1 }, { char: "T", span: 1 }, { char: "Y", span: 1 }, { char: "U", span: 1 },
                            { char: "I", span: 1 }, { char: "O", span: 1 }, { char: "P", span: 1 }, { char: "[", span: 1 },
                            { char: "]", span: 1 }, { char: "\\", span: 1.5 }
                        ],
                        // ASDF row
                        [
                            { char: "Caps", span: 1.8 }, { char: "A", span: 1 }, { char: "S", span: 1 }, { char: "D", span: 1 },
                            { char: "F", span: 1 }, { char: "G", span: 1 }, { char: "H", span: 1 }, { char: "J", span: 1 },
                            { char: "K", span: 1 }, { char: "L", span: 1 }, { char: ";", span: 1 }, { char: "'", span: 1 },
                            { char: "Enter", span: 2.2 }
                        ],
                        // SHIFT row
                        [
                            { char: "Shift", span: 2.3 }, { char: "Z", span: 1 }, { char: "X", span: 1 }, { char: "C", span: 1 },
                            { char: "V", span: 1 }, { char: "B", span: 1 }, { char: "N", span: 1 }, { char: "M", span: 1 },
                            { char: ",", span: 1 }, { char: ".", span: 1 }, { char: "/", span: 1 }, { char: "Shift", span: 2.7 }
                        ],
                        // Bottom row
                        [
                            { char: "Ctrl", span: 1.2 }, { char: "Fn", span: 1.2 }, { char: "Win", span: 1.2 }, { char: "Alt", span: 1.2 },
                            { char: "Space", span: 5.6 }, { char: "Alt", span: 1.2 }, { char: "Ctrl", span: 1.1 }, { char: "◄", span: 0.8 },
                            { char: "ArrowStack", span: 0.7 }, { char: "►", span: 0.8 }
                        ]
                    ];

                    const keyPitch = 0.205;
                    const keyHeight = 0.15;

                    return rows.map((rowKeysData, rowIndex) => {
                        let currentX = 0;
                        return rowKeysData.map((keyData, colIndex) => {
                            const { char, span } = keyData;
                            const keyWidth = span * keyPitch - 0.055;
                            const xPos = currentX + (keyWidth / 2);
                            currentX += span * keyPitch;

                            if (char === "ArrowStack") {
                                return (
                                    <group key={`${rowIndex}-${colIndex}`} position={[xPos, 0, rowIndex * 0.22]}>
                                        {/* Up Button */}
                                        <group position={[0, 0, -0.04]}>
                                            <mesh material={keyBaseMaterial}>
                                                <boxGeometry args={[keyWidth, 0.06, keyHeight / 2 - 0.01]} />
                                            </mesh>
                                            <mesh position={[0, -0.01, 0]} material={rgbBorderMaterial}>
                                                <boxGeometry args={[keyWidth + 0.015, 0.04, keyHeight / 2 + 0.005]} />
                                            </mesh>
                                            <Text position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.04}>
                                                <primitive object={rgbTextMaterial} attach="material" />
                                                ▲
                                            </Text>
                                        </group>
                                        {/* Down Button */}
                                        <group position={[0, 0, 0.04]}>
                                            <mesh material={keyBaseMaterial}>
                                                <boxGeometry args={[keyWidth, 0.06, keyHeight / 2 - 0.01]} />
                                            </mesh>
                                            <mesh position={[0, -0.01, 0]} material={rgbBorderMaterial}>
                                                <boxGeometry args={[keyWidth + 0.015, 0.04, keyHeight / 2 + 0.005]} />
                                            </mesh>
                                            <Text position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.04}>
                                                <primitive object={rgbTextMaterial} attach="material" />
                                                ▼
                                            </Text>
                                        </group>
                                    </group>
                                );
                            }

                            return (
                                <group key={`${rowIndex}-${colIndex}`} position={[xPos, 0, rowIndex * 0.22]}>
                                    <mesh material={keyBaseMaterial}>
                                        <boxGeometry args={[keyWidth, 0.06, keyHeight]} />
                                    </mesh>
                                    <mesh position={[0, -0.01, 0]} material={rgbBorderMaterial}>
                                        <boxGeometry args={[keyWidth + 0.015, 0.04, keyHeight + 0.015]} />
                                    </mesh>
                                    {char !== "" && (
                                        <Text
                                            position={[0, 0.04, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            fontSize={char.length > 2 ? 0.035 : 0.06}
                                        >
                                            <primitive object={rgbTextMaterial} attach="material" />
                                            {char === "Space" ? "" : char}
                                        </Text>
                                    )}
                                </group>
                            );
                        });
                    });
                })()}
            </group>

            <mesh position={[0, -0.42, 0.7]}>
                <boxGeometry args={[0.8, 0.01, 0.5]} />
                <meshStandardMaterial color="#2d2d2d" roughness={0.2} metalness={0.1} />
            </mesh>

            <group position={[0, -0.43, -1.05]} rotation={[Math.PI / 12, 0, 0]}>
                {/* Lid Exterior (with HP Logo) */}
                <mesh position={[0, 1.05, -0.04]}>
                    <boxGeometry args={[3.2, 2.1, 0.01]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
                </mesh>

                {/* HP Logo (Modern 4-line style) */}
                <group position={[0, 1.05, -0.046]} rotation={[0, Math.PI, 0]}>
                    {/* Line 1 (h) */}
                    <mesh position={[-0.15, 0, 0]} rotation={[0, 0, -0.4]}>
                        <boxGeometry args={[0.04, 0.6, 0.01]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} metalness={1} roughness={0.2} />
                    </mesh>
                    {/* Line 2 (h) */}
                    <mesh position={[-0.05, -0.15, 0]} rotation={[0, 0, -0.4]}>
                        <boxGeometry args={[0.04, 0.3, 0.01]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} metalness={1} roughness={0.2} />
                    </mesh>
                    {/* Line 3 (p) */}
                    <mesh position={[0.05, 0.15, 0]} rotation={[0, 0, -0.4]}>
                        <boxGeometry args={[0.04, 0.3, 0.01]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} metalness={1} roughness={0.2} />
                    </mesh>
                    {/* Line 4 (p) */}
                    <mesh position={[0.15, 0, 0]} rotation={[0, 0, -0.4]}>
                        <boxGeometry args={[0.04, 0.6, 0.01]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} metalness={1} roughness={0.2} />
                    </mesh>
                </group>

                {/* Lid Interior */}
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
