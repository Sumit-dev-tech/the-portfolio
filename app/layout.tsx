import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ParallaxBackground from "@/components/ParallaxBackground";
import ParticleBackground from "@/components/ParticleBackground";

// Background effects imported above
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Premium Portfolio | Developer & Designer",
  description: "A collaborative futuristic portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${outfit.className} bg-[#030014] overflow-y-scroll overflow-x-hidden pt-[65px]`}>
        <ParticleBackground />
        <ParallaxBackground />
        <CustomCursor />
        <Navbar />
        <main className="h-full w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
