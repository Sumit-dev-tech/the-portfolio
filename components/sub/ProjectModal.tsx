'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

interface ProjectModalProps {
    project: {
        id: number;
        title: string;
        description: string;
        src: string;
        techStack: string[];
    };
    onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                layoutId={`project-${project.id}`}
                className="relative w-full max-w-4xl bg-[#1a1a2e] border border-[#0c4a6e] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 text-white/70 hover:text-white bg-black/50 rounded-full p-2 transition-colors"
                >
                    <FaTimes size={20} />
                </button>

                {/* Left Side: Image */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                    <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-bold text-white mb-2"
                        >
                            {project.title}
                        </motion.h2>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-2 mb-6"
                        >
                            {project.techStack.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-xs font-medium text-sky-300 bg-sky-500/10 border border-sky-500/20 rounded-full"
                                >
                                    {tech}
                                </span>
                            ))}
                        </motion.div>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-300 mb-6 leading-relaxed"
                        >
                            {project.description}
                            <br /><br />
                            This project showcases advanced web development techniques, including responsive design, state management, and optimized performance.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-4"
                    >
                        <button className="flex-1 py-3 px-4 bg-gradient-to-r from-sky-600 to-green-600 text-white rounded-lg font-medium shadow-lg hover:shadow-green-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2">
                            <FaExternalLinkAlt /> Live Demo
                        </button>
                        <button className="flex-1 py-3 px-4 bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 hover:scale-105 transition-all flex items-center justify-center gap-2">
                            <FaGithub /> Source Code
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;
