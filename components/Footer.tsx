'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full bg-transparent text-gray-200 shadow-lg p-10 z-[50] relative">
            <div className="w-full flex flex-col items-center justify-center m-auto max-w-7xl 2xl:max-w-[1400px]">
                <div className="w-full h-full flex flex-row items-center justify-center flex-wrap gap-10">
                    <div className="min-w-[200px] h-auto flex flex-col items-center justify-start z-[20]">
                        <h3 className="font-bold text-[16px] mb-2">Community</h3>
                        <a
                            href="https://github.com/Sumit-dev-tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-row items-center my-[10px] cursor-pointer hover:text-sky-400 transition-colors"
                        >
                            <FaGithub />
                            <span className="text-[15px] ml-[6px]">Github</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sumit-gharat1908/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-row items-center my-[10px] cursor-pointer hover:text-sky-400 transition-colors"
                        >
                            <FaLinkedin />
                            <span className="text-[15px] ml-[6px]">LinkedIn</span>
                        </a>
                    </div>
                </div>

                <div className="text-[15px] text-center">
                    &copy; 2025 Sumit Gharat. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
