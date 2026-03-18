"use client";

import { motion } from "framer-motion";

export function HeroTitle() {
    return (
        <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-[3.5rem] font-medium tracking-[-0.02em] text-[#1a1a2e] mb-6 text-center leading-[1.15]"
        >
            Got an idea?{" "}
            <span className="font-serif-vibiz italic font-normal">Let&apos;s</span> build it.
        </motion.h1>
    );
}
