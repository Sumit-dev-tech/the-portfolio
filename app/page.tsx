'use client';

import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="h-full w-full">
      <Preloader />
      <ScrollToTop />
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.7, ease: "easeOut" }}
        className="flex flex-col gap-10 items-center"
      >
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </motion.div>
    </main>
  );
}
