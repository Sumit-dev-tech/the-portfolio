'use client';

import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FaCode, FaDatabase, FaReact, FaWordpress, FaRocket, FaLink, FaMobileAlt, FaTools } from 'react-icons/fa';

const ServiceCard = ({ title, description, icon: Icon, delay }: { title: string; description: string; icon: any; delay: number }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useMotionTemplate`${mouseYSpring}deg`;
    const rotateY = useMotionTemplate`${mouseXSpring}deg`;
    const background = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.15), transparent 80%)`;

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

        x.set(xPct * 20);
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
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
                background: background as any
            }}
            className="p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm hover:border-green-400 transition-colors duration-300 group cursor-pointer bg-[#1a1a2e]"
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="w-12 h-12 mb-4 rounded-lg bg-linear-to-br from-sky-500 to-green-500 flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
            >
                <Icon />
            </div>
            <h3
                style={{ transform: "translateZ(40px)" }}
                className="text-xl font-semibold text-white mb-2"
            >
                {title}
            </h3>
            <p
                style={{ transform: "translateZ(30px)" }}
                className="text-gray-400 text-sm leading-relaxed"
            >
                {description}
            </p>
        </motion.div>
    );
};

const Services = () => {
    const services = [
        {
            title: "Custom Frontend Web Development",
            description:
                "Designing and developing modern, responsive, and high-performance user interfaces using React.js, Next.js, and modern CSS frameworks such as Tailwind.",
            icon: FaCode,
        },
        {
            title: "WordPress & Headless CMS Solutions",
            description:
                "Building custom WordPress themes and plugins, as well as implementing Headless CMS architectures for scalable and flexible content management.",
            icon: FaWordpress,
        },
        {
            title: "Backend API Development with Node.js",
            description:
                "Developing secure, scalable, and well-structured RESTful and GraphQL APIs using Node.js and Express.js to support seamless data communication.",
            icon: FaDatabase,
        },
        {
            title: "Third-Party API Integration",
            description:
                "Integrating external services such as payment gateways, social platforms, and CRM systems to enhance functionality and streamline business processes.",
            icon: FaLink,
        },
        {
            title: "Responsive & Performance-Optimized UI",
            description:
                "Creating fully responsive interfaces optimized for speed, accessibility, and search engine performance across all devices and platforms.",
            icon: FaMobileAlt,
        },
        {
            title: "Website Maintenance & Technical Support",
            description:
                "Providing ongoing maintenance, security updates, and technical support to ensure reliability, performance, and long-term stability of your website.",
            icon: FaTools,
        },
    ];


    return (
        <section id="services" className="py-20 relative z-20 overflow-x-hidden">
            <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-sky-500 to-green-500 mb-4">
                        My Services
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Delivering high-quality digital solutions tailored to your specific needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
