"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Github, ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-background border-t border-border overflow-hidden mt-auto">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">

                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative h-10 w-32 transition-transform group-hover:scale-105">
                                <Image
                                    src="/new-logo.jpg"
                                    alt="MPBx AI Labs"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed max-w-xs">
                            Architecting the future of enterprise intelligence. Modular. Scalable. Autonomous.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {[Linkedin, Twitter, Github].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground tracking-wide">Solutions</h4>
                        <ul className="space-y-3">
                            {['AI Chatbots', 'Voice Agents', 'Workflow Automation', 'Data Intelligence'].map((item) => (
                                <li key={item}>
                                    <Link href={`/services#${item.toLowerCase().replace(' ', '-')}`} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
                                        {item}
                                        <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground tracking-wide">Company</h4>
                        <ul className="space-y-3">
                            {['About Us', 'Case Studies'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-muted-foreground hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground tracking-wide">Connect</h4>
                        <ul className="space-y-3">
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Support</Link></li>
                            <li><Link href="/book-demo" className="text-muted-foreground hover:text-primary transition-colors">Book a Demo</Link></li>
                        </ul>
                        <div className="pt-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium border border-green-500/20">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                All Systems Operational
                            </div>
                        </div>
                    </div>

                </div>

                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                    <p>&copy; {new Date().getFullYear()} MPBx AI Labs. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
