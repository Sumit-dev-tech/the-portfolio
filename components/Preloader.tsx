'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Loader3D from './sub/Loader3D';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';

            // Progress simulation
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 20);

            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 3000);

            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isLoading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 1, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030014] overflow-hidden"
                >
                    {/* 3D Scene Background */}
                    <div className="absolute inset-0 w-full h-full">
                        <Canvas dpr={[1, 2]}>
                            <Suspense fallback={null}>
                                <Loader3D progress={progress} />
                            </Suspense>
                        </Canvas>
                    </div>

                    {/* UI Overlay */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-32 pointer-events-none px-10">

                        {/* Progress Info (Positioned below the 3D center) */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <div className="flex flex-col items-center gap-6">
                                <div className="text-sm tracking-[0.6em] font-light text-sky-300 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)] uppercase text-center">
                                    {progress < 100 ? 'Initializing Systems' : 'Optimization Complete'}
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            className="h-full bg-gradient-to-r from-sky-600 via-sky-300 to-green-400 shadow-[0_0_15px_rgba(14,165,233,1)]"
                                        />
                                    </div>
                                    <span className="text-sm font-mono text-sky-400 w-12 text-right">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Vignette Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,0,20,0.8)_100%)]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
