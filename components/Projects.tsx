'use client';

import React, { useState } from 'react';
import ProjectCard from './sub/ProjectCard';
import ProjectModal from './sub/ProjectModal';
import { AnimatePresence } from 'framer-motion';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const projects = [
        {
            id: 1,
            title: "Modern UI/UX Portfolio",
            description: "A dark-themed portfolio website with 3D animations, parallax effects, and smooth scrolling using Next.js and Framer Motion.",
            src: "https://placehold.co/600x400/1e1e2f/ffffff?text=Modern+Portfolio",
            techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"]
        },
        {
            id: 2,
            title: "Interactive E-Commerce",
            description: "A full-featured e-commerce platform with stripe integration, real-time cart updates, and a responsive design.",
            src: "https://placehold.co/600x400/1e1e2f/ffffff?text=E-Commerce+App",
            techStack: ["React", "Redux", "Stripe", "Node.js"]
        },
        {
            id: 3,
            title: "Space Explorer 3D",
            description: "An immersive web application exploring the solar system using Three.js and React Three Fiber.",
            src: "https://placehold.co/600x400/1e1e2f/ffffff?text=Space+Explorer",
            techStack: ["Three.js", "React Three Fiber", "WebGL", "GSAP"]
        },
    ];

    return (
        <div
            className="flex flex-col container items-center justify-center py-20 relative z-[20]"
            id="projects"
        >
            <h1 className="text-[30px] md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-green-500 pb-10">
                My Projects
            </h1>
            <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-10 relative z-20">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        src={project.src}
                        title={project.title}
                        description={project.description}
                        onClick={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Projects;
