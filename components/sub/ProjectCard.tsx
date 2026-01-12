'use client';

import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

interface ProjectCardProps {
    id: number;
    src: string;
    title: string;
    description: string;
    onClick: () => void;
}

const ProjectCard = ({ id, src, title, description, onClick }: ProjectCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useMotionTemplate`${mouseYSpring}deg`;
    const rotateY = useMotionTemplate`${mouseXSpring}deg`;
    const background = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.15), transparent 80%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mX = e.clientX - rect.left;
        const mY = e.clientY - rect.top;

        mouseX.set(mX);
        mouseY.set(mY);

        const xPct = mX / width - 0.5;
        const yPct = mY / height - 0.5;

        x.set(xPct * 20); // Tilt intensity
        y.set(yPct * -20);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            layoutId={`project-${id}`}
            onClick={onClick}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0.8, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1, boxShadow: "0 0 25px rgba(14, 165, 233, 0.3)" }}
            viewport={{ once: false, amount: 0.5 }}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            }}
            className="relative h-full w-full bg-transparent group cursor-pointer z-10"
        >
            <motion.div
                className="w-full h-full rounded-lg overflow-hidden border border-cyan-500 shadow-lg bg-[#1a1a2e]"
                style={{
                    transformStyle: "preserve-3d",
                    background: background as any
                }}
            >
                <div
                    style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
                    className="w-full h-full"
                >
                    <Image
                        src={src}
                        alt={title}
                        width={1000}
                        height={1000}
                        className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="relative p-4 z-20">
                        <h1 className="text-2xl font-semibold text-white">{title}</h1>
                        <p className="mt-2 text-gray-300 group-hover:text-white transition-colors duration-300">
                            {description}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectCard;
