'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 100 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    // Transform mouse position to background movement (parallax effect)
    const bgX = useTransform(mouseXSpring, (val) => val * -0.02);
    const bgY = useTransform(mouseYSpring, (val) => val * -0.02);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                mouseX.set(x);
                mouseY.set(y);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={containerRef}
            className="fixed inset-0 z-[0] overflow-hidden pointer-events-none"
        // style={{ x: bgX, y: bgY }}
        >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#022c22] via-[#0f172a] to-[#022c22]" />

            {/* Glowing Orbs that follow mouse slightly */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[100px]"
                style={{
                    x: useTransform(mouseXSpring, (val) => val * 0.1),
                    y: useTransform(mouseYSpring, (val) => val * 0.1),
                    left: '20%',
                    top: '30%',
                }}
            />
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/20 blur-[80px]"
                style={{
                    x: useTransform(mouseXSpring, (val) => val * 0.05),
                    y: useTransform(mouseYSpring, (val) => val * 0.05),
                    right: '20%',
                    bottom: '30%',
                }}
            />
        </motion.div>
    );
};

export default ParallaxBackground;
