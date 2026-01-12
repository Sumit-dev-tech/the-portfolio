'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 2500);
            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        y: [-20, -100],
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030014]"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Outer rotating ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-32 h-32 rounded-full border-t-2 border-b-2 border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.5)]"
                        />

                        {/* Inner rotating ring (reverse) */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute top-4 left-4 w-24 h-24 rounded-full border-r-2 border-l-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                        />

                        {/* Centered Logo/Text */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                        >
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-green-400">
                                SG
                            </span>
                            <motion.div
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="mt-8 text-xs tracking-[0.3em] font-light text-gray-400 uppercase"
                            >
                                Initializing
                            </motion.div>
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="absolute -bottom-20 w-48 h-[2px] bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.2, ease: "easeInOut" }}
                                className="h-full bg-gradient-to-r from-sky-500 to-green-500"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
