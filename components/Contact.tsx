'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <div id="contact" className='flex flex-col items-center justify-center min-h-[50vh] w-full py-20 relative'>
            <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-green-500 pb-10">
                Contact Me
            </h1>

            <div className="z-[20] w-full max-w-[600px] px-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 rounded-xl border border-cyan-500/30 bg-[#1a1a2e]/80 backdrop-blur-md relative overflow-hidden shadow-2xl">
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-semibold">Name</label>
                        <input
                            type="text"
                            required
                            className="p-3 rounded-lg bg-[#111] border border-gray-800 text-white focus:outline-none focus:border-sky-500 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)] focus:shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-semibold">Email</label>
                        <input
                            type="email"
                            required
                            className="p-3 rounded-lg bg-[#111] border border-gray-800 text-white focus:outline-none focus:border-sky-500 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)] focus:shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-semibold">Message</label>
                        <textarea
                            rows={5}
                            required
                            className="p-3 rounded-lg bg-[#111] border border-gray-800 text-white focus:outline-none focus:border-sky-500 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)] focus:shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                            placeholder="Your Message..."
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="py-3 px-6 rounded-lg bg-gradient-to-r from-sky-500 to-green-500 text-white font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-shadow"
                    >
                        Send Message
                    </motion.button>

                    {status === "success" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute inset-0 bg-[#0c4a6e]/90 flex items-center justify-center flex-col gap-4 text-white font-bold text-xl backdrop-blur-sm"
                        >
                            <span>Message Sent Successfully! ✅</span>
                        </motion.div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Contact;
