'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ThreeDLaptop from './sub/ThreeDLaptop';

const About = () => {
    return (
        <section id="about" className="flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:px-20 py-20 relative z-20 overflow-hidden max-w-7xl 2xl:max-w-[1400px] mx-auto">
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
                    I&apos;m Sumit Gharat, a passionate Full-Stack Web Developer with over 3+ years of professional experience in building scalable, high-performance web applications. I specialize in creating modern, responsive, and user-focused solutions using React.js, Next.js, Node.js, Express.js, and WordPress.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                    I have hands-on experience working with headless WordPress, REST & GraphQL APIs, and building end-to-end solutions—from UI/UX design to backend logic and deployment. I enjoy transforming complex requirements into clean, efficient, and maintainable code.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                    I&apos;m continuously learning new technologies and best practices to deliver optimized, secure, and future-ready applications. My goal is to build digital products that not only look great but also solve real-world problems.
                </p>
            </motion.div>
        </section>
    );
};

export default About;
