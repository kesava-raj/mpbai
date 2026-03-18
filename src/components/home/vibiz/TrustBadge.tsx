"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const avatars = [
    "https://i.pravatar.cc/150?u=1",
    "https://i.pravatar.cc/150?u=2",
    "https://i.pravatar.cc/150?u=3",
    "https://i.pravatar.cc/150?u=4"
];

const capabilities = [
    "AI Infrastructure",
    "Search Architecture",
    "Interface Engineering",
    "Algorithmic Systems"
];

export function TrustBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-5 mt-10"
        >
            {/* Customer trust pill */}
            <div className="flex items-center gap-2.5 bg-[#eef6fd]/60 border border-[#d4e8fc]/40 rounded-full px-3.5 py-1.5 backdrop-blur-sm">
                <div className="flex -space-x-1.5">
                    {avatars.map((url, i) => (
                        <div key={i} className="relative w-6 h-6 rounded-full border-[1.5px] border-white overflow-hidden">
                            <Image src={url} alt="User" fill className="object-cover" />
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <span>4.9 <span className="text-slate-400">/5 from</span> <span className="text-slate-600 font-bold">10k+</span> <span className="text-slate-400">customers</span></span>
                    <Star size={12} fill="#f5c542" className="text-[#f5c542]" />
                </div>
            </div>

            {/* Capability tags — from V1 footer */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] text-slate-400 font-medium">
                {capabilities.map((cap, i) => (
                    <span key={cap} className="flex items-center gap-3">
                        <span className="hover:text-slate-600 transition-colors cursor-default">{cap}</span>
                        {i < capabilities.length - 1 && (
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                        )}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
