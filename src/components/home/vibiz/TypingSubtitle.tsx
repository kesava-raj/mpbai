"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const phrases = [
    "AI strategy advisor",
    "workflow automation partner",
    "intelligent search system",
    "autonomous AI agent",
    "data intelligence platform"
];

export function TypingSubtitle() {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const currentPhrase = phrases[phraseIndex];

    const tick = useCallback(() => {
        if (!isDeleting) {
            if (displayText.length < currentPhrase.length) {
                setDisplayText(currentPhrase.slice(0, displayText.length + 1));
            } else {
                setTimeout(() => setIsDeleting(true), 1800);
                return;
            }
        } else {
            if (displayText.length > 0) {
                setDisplayText(currentPhrase.slice(0, displayText.length - 1));
            } else {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
                return;
            }
        }
    }, [displayText, isDeleting, currentPhrase]);

    useEffect(() => {
        const speed = isDeleting ? 40 : 70;
        const timer = setTimeout(tick, speed);
        return () => clearTimeout(timer);
    }, [tick, isDeleting]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center justify-center text-base md:text-lg text-[#3d3d56] mb-10 font-medium"
        >
            <span className="mr-1.5">Your</span>
            <span className="relative border-b border-[#1a1a2e] pb-px">
                <span className="text-[#1a1a2e]">{displayText}</span>
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block w-[1.5px] h-[18px] bg-[#1a1a2e] align-middle ml-px"
                />
            </span>
        </motion.div>
    );
}
