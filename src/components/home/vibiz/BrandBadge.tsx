"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function BrandBadge() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-6 right-6 z-20"
        >
            <div className="bg-white/70 backdrop-blur-sm border border-slate-100 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                <span className="text-[9px] uppercase tracking-[0.15em] text-slate-400 font-semibold">Made with</span>
                <div className="relative w-10 h-4">
                    <Image
                        src="/new-logo.jpg"
                        alt="MPBx AI Labs"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </motion.div>
    );
}
