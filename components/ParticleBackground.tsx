'use client';

import { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, ISourceOptions } from "@tsparticles/engine";

const ParticleBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
        // console.log("Particles loaded", container);
    }, []);

    const options: ISourceOptions = useMemo(
        () => ({
            fullScreen: {
                enable: true,
                zIndex: 1,
            },
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: ["grab", "trail"],
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    grab: {
                        distance: 200,
                        links: {
                            opacity: 1,
                            color: "#a855f7",
                        },
                    },
                    trail: {
                        delay: 0.005,
                        pauseOnStop: true,
                        quantity: 1,
                        particles: {
                            color: {
                                value: ["#a855f7", "#06b6d4", "#8b5cf6"],
                            },
                            move: {
                                speed: 2,
                                outModes: {
                                    default: "destroy",
                                },
                            },
                            size: {
                                value: { min: 1, max: 3 },
                                animation: {
                                    enable: true,
                                    speed: 5,
                                    startValue: "max",
                                    destroy: "min",
                                },
                            },
                            opacity: {
                                value: 1,
                                animation: {
                                    enable: true,
                                    speed: 0.5,
                                    startValue: "max",
                                    destroy: "min",
                                },
                            },
                            links: {
                                enable: true,
                                distance: 100,
                                color: "#a855f7",
                                opacity: 0.5,
                            },
                        },
                    },
                },
            },
            particles: {
                color: {
                    value: ["#0ea5e9", "#22d3d8", "#eab308", "#22c55e"], // Sky, Cyan, Yellow, Green
                },
                links: {
                    color: "#22c55e", // Green links
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: true,
                    speed: 0.8,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 1000,
                    },
                    value: 60,
                },
                opacity: {
                    value: { min: 0.1, max: 0.5 },
                    animation: {
                        enable: true,
                        speed: 0.5,
                        startValue: "random",
                    },
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 2 },
                },
            },
            detectRetina: true,
        }),
        []
    );

    if (!init) {
        return null;
    }

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
            className="absolute inset-0 z-[1]"
        />
    );
};

export default ParticleBackground;
