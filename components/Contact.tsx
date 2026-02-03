'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <div id="contact" className='flex flex-col items-center justify-center min-h-screen w-full py-20 relative px-4 md:px-10 lg:px-20'>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-green-500 pb-16"
            >
                Get In Touch
            </motion.h1>

            <div className="z-[20] w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Form */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 rounded-2xl border border-cyan-500/30 bg-[#1a1a2e]/80 backdrop-blur-md relative overflow-hidden shadow-2xl">
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm font-medium uppercase tracking-wider">Full Name</label>
                            <input
                                type="text"
                                required
                                className="p-4 rounded-xl bg-[#030014] border border-gray-800 text-white focus:outline-none focus:border-sky-500 transition-all shadow-inner"
                                placeholder="Sumit Gharat"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm font-medium uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                required
                                className="p-4 rounded-xl bg-[#030014] border border-gray-800 text-white focus:outline-none focus:border-sky-500 transition-all shadow-inner"
                                placeholder="svgharat1908@gmail.com"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm font-medium uppercase tracking-wider">Your Message</label>
                            <textarea
                                rows={5}
                                required
                                className="p-4 rounded-xl bg-[#030014] border border-gray-800 text-white focus:outline-none focus:border-sky-500 transition-all shadow-inner resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="py-4 px-6 rounded-xl bg-gradient-to-r from-sky-600 to-green-600 text-white font-bold shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all uppercase tracking-widest mt-4"
                        >
                            Send Message
                        </motion.button>

                        {status === "success" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-[#0c4a6e]/95 flex items-center justify-center flex-col gap-4 text-white font-bold text-xl backdrop-blur-md"
                            >
                                <span className="text-4xl text-green-400">✅</span>
                                <span>Message Sent Successfully!</span>
                                <p className="text-sm font-normal text-sky-200 text-center px-10">I'll get back to you as soon as possible.</p>
                            </motion.div>
                        )}
                    </form>
                </motion.div>

                {/* Right Column: Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col justify-center gap-10"
                >
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-bold text-white mb-2">Let&apos;s build something amazing together</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            I&apos;m currently available for freelance work and full-time opportunities.
                            If you have a project in mind or just want to say hi, feel free to reach out!
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-sky-500/10">
                                <FaEnvelope size={24} />
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Email Me</p>
                                <a href="mailto:svgharat1908@gmail.com" className="text-white text-lg font-medium hover:text-sky-400 transition-colors">
                                    svgharat1908@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-green-500/10">
                                <FaPhoneAlt size={24} />
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Call Me</p>
                                <a href="tel:+918208667585" className="text-white text-lg font-medium hover:text-green-400 transition-colors">
                                    +91 8208667585
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Follow Me</p>
                        <div className="flex gap-4">
                            {[
                                { icon: <FaGithub size={22} />, link: "https://github.com/Sumit-dev-tech", color: "hover:bg-white hover:text-black" },
                                { icon: <FaLinkedin size={22} />, link: "https://www.linkedin.com/in/sumit-gharat1908/", color: "hover:bg-[#0077b5] hover:text-white" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:scale-110 shadow-lg`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
