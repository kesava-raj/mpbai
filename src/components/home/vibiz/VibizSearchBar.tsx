"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

export function VibizSearchBar() {
    const [focused, setFocused] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md mx-auto"
        >
            {/* Subtle outer glow */}
            <div className={`absolute -inset-1 rounded-full transition-all duration-500 ${focused ? 'bg-[#d4e8fc]/60' : 'bg-[#d4e8fc]/30'}`} />

            <div className={`relative flex items-center bg-white px-1.5 py-1.5 rounded-full border transition-all duration-300 ${focused ? 'border-[#a8d4f5]' : 'border-[#d4e8fc]'}`}>
                <input
                    type="text"
                    placeholder="Describe your project idea..."
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="flex-1 bg-transparent px-4 py-2.5 text-sm text-[#1a1a2e] focus:outline-none placeholder:text-slate-400 font-medium"
                />
                <button
                    className="bg-[#93cff9] hover:bg-[#7ec3f0] text-white p-2 rounded-full transition-colors duration-200 shrink-0"
                    aria-label="Submit"
                >
                    <ArrowUp size={16} strokeWidth={2.5} />
                </button>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400 font-medium tracking-wide">
                All conversations are confidential • Ready in 2 minutes
            </p>
        </motion.div>
    );
}
