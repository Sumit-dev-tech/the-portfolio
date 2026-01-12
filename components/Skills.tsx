'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiThreedotjs } from 'react-icons/si';

const SkillBar = ({ name, percentage, index, icon: Icon }: { name: string; percentage: number; index: number; icon: IconType }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full mb-6"
        >
            <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2">
                    <Icon className="text-xl text-sky-400" />
                    <span className="text-base font-medium text-white">{name}</span>
                </div>
                <span className="text-sm font-medium text-white">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5 dark:bg-gray-700">
                <motion.div
                    className="bg-gradient-to-r from-sky-500 to-green-500 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
            </div>
        </motion.div>
    );
}

const Skills = () => {
    const skills = [
        { name: "React / Next.js", percentage: 95, icon: FaReact },
        { name: "TypeScript", percentage: 90, icon: SiTypescript },
        { name: "Tailwind CSS", percentage: 90, icon: SiTailwindcss },
        { name: "Node.js / Express", percentage: 85, icon: FaNodeJs },
        { name: "Three.js / WebGL", percentage: 70, icon: SiThreedotjs },
        { name: "Database Design (SQL/NoSQL)", percentage: 80, icon: FaDatabase },
    ];

    return (
        <section
            id="skills"
            className="flex flex-col items-center justify-center py-20 relative z-[20]"
        >
            <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-green-500 pb-10">
                Technical Skills
            </h1>

            <div className="w-full max-w-[1000px] px-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {skills.map((skill, index) => (
                    <SkillBar key={index} name={skill.name} percentage={skill.percentage} index={index} icon={skill.icon} />
                ))}
            </div>
        </section>
    );
};

export default Skills;
