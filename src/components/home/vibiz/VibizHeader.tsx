"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Contact", href: "/contact" }
];

export function VibizHeader() {
    return (
        <header className="absolute top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 flex items-center justify-between pointer-events-auto">
            <Link href="/" className="relative h-8 w-24">
                <Image
                    src="/new-logo.jpg"
                    alt="MPBx AI Labs"
                    fill
                    className="object-contain contrast-125"
                />
            </Link>

            <nav className="hidden md:flex items-center gap-8 bg-white/60 backdrop-blur-md px-6 py-2 rounded-full border border-slate-200/50 shadow-sm">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer hover:text-slate-900 transition-colors uppercase tracking-wider">
                    <Globe size={14} strokeWidth={3} />
                    <span>EN</span>
                </div>
                <button className="bg-slate-900 border border-slate-900 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-white hover:text-slate-900 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95">
                    Sign in
                </button>
            </div>
        </header>
    );
}
