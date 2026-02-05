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
            title: "iConnect – Enterprise Ticket Management System",
            description: "Developed a full-stack ticket management system with real-time updates. Implemented RBAC for Admin, Consultant, and User roles.Built REST APIs for ticket creation, assignment, updates, and closure.Designed efficient database schema with soft - delete (is_delete) logic.Created admin dashboards with pagination, search, and filters.Integrated email notification system for ticket status changes.",
            src: "/projects/iconnect-image.png",
            techStack: ["Next.js", "Node.js", "Tailwind CSS", "Supabase",]
        },
        {
            id: 2,
            title: "SaayaCare – Subscription-Based Healthcare Platform",
            description: "Built a subscription-based healthcare platform with secure payment integration.Designed dynamic subscription forms with client and server-side validation. Integrated Razorpay payment gateway for handling subscriptions.Optimized API response time and form submission performance. Ensured secure storage and handling of sensitive healthcare data.",
            src: "/projects/image-saayacare.png",
            techStack: ["Next.js", "Node.js", "Tailwind CSS", "Supabase", "Razorpay"]
        },
        {
            id: 3,
            title: "SantEkanth – Exam Management System",
            description: "SantEkanth is a web-based Exam Management System developed to streamline and automate the process of conducting online examinations. The platform provides a secure and user-friendly environment where administrators can create, manage, and monitor exams, while students can attempt tests online with real-time evaluation and result generation. The system supports features such as student authentication, exam scheduling, question management, and performance tracking. With its responsive design and efficient backend architecture, SantEkanth reduces manual effort, improves accuracy in assessment, and offers a reliable digital solution for educational institutions to manage examinations effectively.",
            src: "/projects/santeknath-image.png",
            techStack: ["Next.js", "Node.js", "Tailwind CSS", "Supabase"]
        },
    ];

    return (
        <div
            className="flex flex-col items-center justify-center py-20 relative z-20 w-full max-w-7xl 2xl:max-w-[1400px] mx-auto overflow-x-hidden"
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
                        techStack={project.techStack}
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
