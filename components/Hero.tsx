'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { slideInFromLeft, slideInFromRight } from '@/utils/motion';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

const Hero = ({ scrollOpacity = 1 }: { scrollOpacity?: number }) => {
    const [index, setIndex] = useState(0);
    const services = [
        "Full-Stack Web Developer",
        "MERN Stack Developer",
        "Next.js & React Specialist",
        "WordPress & Headless CMS Expert",
        "Scalable Web App Builder"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % services.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [services.length]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    const imgX = useTransform(mouseXSpring, (val) => val * 0.03);
    const imgY = useTransform(mouseYSpring, (val) => val * 0.03);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <motion.div
            style={{ opacity: scrollOpacity, scale: 0.8 + (scrollOpacity * 0.2) }}
            className="relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden py-20"
            id="home"
            onMouseMove={handleMouseMove}
        >
            <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 gap-10 lg:gap-20 w-full max-w-7xl 2xl:max-w-[1400px] mx-auto z-[20]">
                <div className="h-full w-full flex flex-col gap-5 justify-center items-start text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="Welcome-box py-[6px] px-4 border border-[#7042f88b] opacity-[0.9] rounded-full w-fit flex items-center gap-0.5 bg-[#0f0c29]"
                    >
                        <span className="text-sky-400 mr-[8px] h-4 w-4 flex items-center justify-center">
                            ✨
                        </span>
                        <h1 className="Welcome-text text-[14px] md:text-[18px] text-gray-300">
                            I&apos;m Sumit Gharat
                        </h1>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={slideInFromLeft(0.5)}
                        className="flex flex-col gap-4 mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-[800px] w-full"
                    >
                        <div className="flex flex-col gap-2">
                            <span className="text-2xl md:text-4xl text-gray-400 font-medium">I am working as</span>
                            <div className="h-[120px] sm:h-[150px] md:h-[120px] overflow-hidden relative w-full">
                                <AnimatePresence initial={false}>
                                    <motion.span
                                        key={services[index]}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute inset-y-0 left-0 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-green-400 w-full leading-tight"
                                    >
                                        {services[index]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={slideInFromLeft(0.8)}
                        className="text-base md:text-lg text-left text-gray-400 my-2 md:my-5 max-w-[600px] leading-relaxed"
                    >
                        Building the future of web with modern technologies.
                        Scroll down to explore my universe of code.
                    </motion.p>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={slideInFromLeft(1)}
                        className="flex flex-row gap-4 justify-start w-full mt-4"
                    >
                        <a
                            href="#projects"
                            className="py-3 px-4 md:px-6 text-sm md:text-base button-primary text-center text-white cursor-pointer rounded-lg bg-gradient-to-r from-sky-500 to-green-500 hover:scale-105 transition duration-300 flex items-center gap-2 font-medium"
                        >
                            See My Work <FaArrowRight />
                        </a>
                        <a
                            href="#contact"
                            className="py-3 px-4 md:px-6 text-sm md:text-base text-center text-white cursor-pointer rounded-lg border border-sky-500/50 hover:bg-sky-500/10 transition duration-300 font-medium"
                        >
                            Contact Me
                        </a>
                    </motion.div>
                </div>

                {/* Profile Image Section with Parallax */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={slideInFromRight(0.8)}
                    className="w-full h-full flex justify-center items-center relative mt-16 md:mt-0"
                >
                    <motion.div
                        style={{ x: imgX, y: imgY }}
                        className="relative z-10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-green-500 rounded-full blur-[40px] md:blur-[60px] opacity-40 scale-110"></div>
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] rounded-full p-[8px] md:p-[10px] bg-gradient-to-r from-yellow-400 to-blue-500 shadow-2xl"
                        >
                            <div className="w-full h-full rounded-full overflow-hidden bg-black">
                                <Image
                                    src="/my-image.png"
                                    alt="Profile Image"
                                    width={400}
                                    height={400}
                                    className="object-cover w-full h-full"
                                    priority
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://placehold.co/400x400/1e1e2f/ffffff?text=Your+Photo";
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Hero;
