'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();

    // Create a smooth, dampened version of the scroll progress
    // stiffness and damping control the "feel" - this makes it liquid-smooth
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const circumference = 2 * Math.PI * 22;
    // Map the smooth progress (0 to 1) to the actual dash offset
    const dashOffset = useTransform(smoothProgress, [0, 1], [circumference, 0]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[999] cursor-pointer touch-none"
                    style={{ pointerEvents: 'auto' }}
                >
                    <div className="relative flex items-center justify-center w-12 h-12 bg-[#030014] rounded-full border border-sky-500/20 group hover:border-sky-500/60 transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] active:scale-90">
                        {/* Progress Circle SVG */}
                        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 48 48">
                            <circle
                                cx="24"
                                cy="24"
                                r="22"
                                stroke="rgba(255, 255, 255, 0.1)"
                                strokeWidth="2"
                                fill="transparent"
                            />
                            <motion.circle
                                cx="24"
                                cy="24"
                                r="22"
                                stroke="url(#progress-gradient)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                fill="transparent"
                                style={{
                                    strokeDasharray: circumference,
                                    strokeDashoffset: dashOffset
                                }}
                            />
                            <defs>
                                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#0ea5e9" />
                                    <stop offset="100%" stopColor="#22c55e" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <FaArrowUp className="text-sky-500 group-hover:text-green-400 group-hover:-translate-y-1 transition-all duration-300 relative z-10" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
