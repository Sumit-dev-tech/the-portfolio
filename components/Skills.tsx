'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import {
    FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaWordpress, FaPhp, FaHtml5, FaCss3Alt, FaBootstrap
} from 'react-icons/fa';
import {
    SiTypescript, SiNextdotjs, SiTailwindcss, SiJavascript, SiSass, SiFramer,
    SiExpress, SiGraphql, SiSupabase, SiMysql, SiVercel, SiDigitalocean,
    SiCloudflare, SiPostman, SiJira, SiShadcnui, SiMui
} from 'react-icons/si';

const SkillCard = ({ name, icon: Icon, color }: { name: string; icon: IconType; color: string }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -5, scale: 1.05 }}
            className="flex flex-col items-center justify-center bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden text-center h-full min-h-[140px] cursor-default"
        >
            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="p-3 rounded-2xl transition-all duration-300">
                    <Icon
                        className={`text-4xl transition-all duration-500 ease-out ${isHovered ? 'grayscale-0 opacity-100 scale-110' : 'text-gray-400 opacity-30 grayscale'
                            }`}
                        style={{ color: isHovered ? color : undefined }}
                    />
                </div>
                <span className={`text-xs font-bold transition-all duration-300 uppercase tracking-[2px] leading-tight ${isHovered ? 'text-white' : 'text-gray-500'
                    }`}>
                    {name}
                </span>
            </div>

            {/* Subtle glow effect on hover */}
            {isHovered && (
                <div
                    className="absolute inset-0 opacity-10 blur-2xl pointer-events-none transition-opacity duration-500"
                    style={{ backgroundColor: color }}
                />
            )}
        </motion.div>
    );
}

const SkillCategory = ({ title, skills, index }: { title: string; skills: { name: string; icon: IconType; color: string }[]; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full mb-12"
        >
            <h2 className="text-2xl font-bold text-sky-400 mb-8 flex items-center gap-4">
                <span className="h-[1px] w-8 bg-sky-500/50"></span>
                {title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skills.map((skill, i) => (
                    <SkillCard key={i} name={skill.name} icon={skill.icon} color={skill.color} />
                ))}
            </div>
        </motion.div>
    );
}

const Skills = () => {
    const categories = [
        {
            title: "Frontend",
            skills: [
                { name: "React.js", icon: FaReact, color: "#61DAFB" },
                { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
                { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
                { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
                { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
                { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
                { name: "SCSS", icon: SiSass, color: "#CC6699" },
                { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
                { name: "Shadcn UI", icon: SiShadcnui, color: "#FFFFFF" },
                { name: "Material UI", icon: SiMui, color: "#007FFF" },
                { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
                { name: "WordPress", icon: FaWordpress, color: "#21759B" },
            ]
        },
        {
            title: "Backend",
            skills: [
                { name: "Node.js", icon: FaNodeJs, color: "#339933" },
                { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
                { name: "PHP", icon: FaPhp, color: "#777BB4" },
                { name: "REST APIs", icon: FaDatabase, color: "#009688" },
                { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
                { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
                { name: "MySQL", icon: SiMysql, color: "#4479A1" },
            ]
        },
        {
            title: "DevOps & Tools",
            skills: [
                { name: "Git", icon: FaGitAlt, color: "#F05032" },
                { name: "GitHub", icon: FaGitAlt, color: "#FFFFFF" },
                { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
                { name: "DigitalOcean", icon: SiDigitalocean, color: "#0080FF" },
                { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
                { name: "Postman", icon: SiPostman, color: "#FF6C37" },
                { name: "Jira", icon: SiJira, color: "#0052CC" },
            ]
        }
    ];

    return (
        <section
            id="skills"
            className="flex flex-col items-center justify-center py-20 relative z-[20] w-full max-w-7xl mx-auto px-4 md:px-20"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center mb-16 text-center"
            >
                <h1 className="text-[45px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-green-400 pb-2">
                    My Technical Arsenal
                </h1>
                <div className="h-1 w-32 bg-sky-500 rounded-full mb-6"></div>
                <p className="text-gray-400 text-lg max-w-3xl">
                    Crafting premium digital experiences using a specialized selection of world-class technologies.
                </p>
            </motion.div>

            <div className="w-full">
                {categories.map((category, index) => (
                    <SkillCategory key={index} title={category.title} skills={category.skills} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Skills;
