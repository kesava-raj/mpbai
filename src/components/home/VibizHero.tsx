"use client";

import { HeroTitle } from "./vibiz/HeroTitle";
import { TypingSubtitle } from "./vibiz/TypingSubtitle";
import { VibizSearchBar } from "./vibiz/VibizSearchBar";
import { TrustBadge } from "./vibiz/TrustBadge";
import { BrandBadge } from "./vibiz/BrandBadge";
import { VibizHeader } from "./vibiz/VibizHeader";

export function VibizHero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden grainy bg-[#fcfcfd]">
            <VibizHeader />

            {/* Soft radial glow — centered, subtle */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] -z-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(180,215,250,0.35)_0%,transparent_70%)]" />
            </div>

            {/* Content */}
            <div className="w-full max-w-2xl mx-auto relative z-10 flex flex-col items-center">
                <HeroTitle />
                <TypingSubtitle />
                <VibizSearchBar />
                <TrustBadge />
            </div>

            <BrandBadge />
        </section>
    );
}

export default VibizHero;
