'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ThreeDLaptop from './sub/ThreeDLaptop';

const About = () => {
    return (
        <section id="about" className="flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:px-10 py-20 relative z-[20] overflow-hidden container">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 flex justify-center h-[500px]"
            >
                {/* 3D Model Replacement: Laptop */}
                <ThreeDLaptop />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 flex flex-col gap-5 text-white items-center md:items-start text-center md:text-left"
            >
                <h1 className="text-[40px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-green-500">
                    About Me
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed">
                    I am a passionate Full Stack Developer with a keen eye for detail and a drive for creating immersive web experiences.
                    With a background in both design and engineering, I bridge the gap between aesthetics and functionality.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                    My journey started with simple HTML pages and has evolved into building complex, scalable applications using modern technologies like Next.js, React, and Cloud infrastructure.
                    I believe in continuous learning and pushing the boundaries of what's possible on the web.
                </p>
            </motion.div>
        </section>
    );
};

export default About;
