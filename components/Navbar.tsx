'use client';

import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaBars, FaTimes } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navItems = ['About', 'Skills', 'Services', 'Projects', 'Contact'];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Sections to observe
        const sections = ['home', 'about', 'skills', 'services', 'projects', 'contact'];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-4 md:px-10">
            <div className="w-full h-full flex flex-row items-center justify-between mx-auto px-[10px] max-w-7xl 2xl:max-w-[1400px]">
                <a
                    href="/"
                    className="h-auto w-auto flex flex-row items-center cursor-pointer"
                >
                    <span className="font-bold ml-[10px] block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-green-500 hover:scale-105 transition-transform duration-300 cursor-pointer text-xl">
                        Sumit Gharat
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex w-auto h-full flex-row items-center justify-between">
                    <div className="flex items-center justify-between w-full h-auto border border-cyan-500/30 bg-[#0300145e] px-[30px] py-[10px] rounded-full text-gray-200 backdrop-blur-sm gap-10">

                        {navItems.map((item) => {
                            const id = item.toLowerCase().replace(' ', '-');
                            const isActive = activeSection === id;
                            return (
                                <a
                                    key={item}
                                    href={`#${id}`}
                                    className={`cursor-pointer transition-colors relative group ${isActive ? 'text-sky-400' : 'hover:text-sky-400'}`}
                                >
                                    {item}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-sky-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </a>
                            );
                        })}

                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex md:hidden items-center gap-4">
                    {/* Download CV Button Mobile */}
                    <a
                        href="/resume/Resume-Sumit_Gharat_FSD.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-green-500 text-white font-medium text-xs shadow-lg shadow-sky-500/20"
                    >
                        <span>CV</span>
                        <FaDownload size={10} />
                    </a>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-300 hover:text-white focus:outline-none"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Right Side Interactions (Desktop) */}
                <div className="hidden md:flex flex-row gap-5 items-center">
                    <div className="flex flex-row gap-3">
                        <a href="https://github.com/Sumit-dev-tech" className='text-white hover:text-sky-400 transition-colors text-xl transform hover:scale-110 duration-300'>
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/sumit-gharat1908/" className='text-white hover:text-sky-400 transition-colors text-xl transform hover:scale-110 duration-300'>
                            <FaLinkedin />
                        </a>
                    </div>

                    {/* Download CV Button */}
                    <a
                        href="/resume/Resume-Sumit_Gharat_FSD.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-green-500 text-white font-medium text-sm hover:scale-105 transition-transform shadow-lg shadow-sky-500/20"
                    >
                        <span>CV</span>
                        <FaDownload size={12} />
                    </a>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-[65px] left-0 w-full bg-[#030014] border-b border-cyan-500/30 shadow-xl p-6 md:hidden flex flex-col gap-4 items-center z-40"
                >
                    {navItems.map((item) => {
                        const id = item.toLowerCase().replace(' ', '-');
                        const isActive = activeSection === id;
                        return (
                            <a
                                key={item}
                                href={`#${id}`}
                                className={`text-lg font-medium transition-colors ${isActive ? 'text-sky-400' : 'text-gray-300 hover:text-sky-400'}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </a>
                        );
                    })}
                    <div className="flex flex-row gap-6 mt-4">
                        <a href="#" className='text-white hover:text-sky-400 text-2xl'><FaGithub /></a>
                        <a href="#" className='text-white hover:text-sky-400 text-2xl'><FaLinkedin /></a>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;

