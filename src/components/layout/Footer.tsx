"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-muted border-t border-border mt-auto">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">

                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="relative h-8 w-8">
                                <img src="/logo.svg" alt="MPBx AI Labs" className="h-full w-full object-contain" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-foreground">
                                MPBx <span className="text-primary">AI Labs</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed">
                            Enterprise AI Delivery Studio. <br />
                            Building systems that work.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github size={20} />
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground tracking-wide uppercase text-xs">Services</h4>
                        <ul className="space-y-3">
                            <li><Link href="/services#chatbots" className="text-muted-foreground hover:text-primary transition-colors">AI Chatbots</Link></li>
                            <li><Link href="/services#voicebots" className="text-muted-foreground hover:text-primary transition-colors">AI Voicebots</Link></li>
                            <li><Link href="/services#agents" className="text-muted-foreground hover:text-primary transition-colors">Autonomous Agents</Link></li>
                            <li><Link href="/services#automation" className="text-muted-foreground hover:text-primary transition-colors">Workflow Automation</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground tracking-wide uppercase text-xs">Company</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground tracking-wide uppercase text-xs">Legal</h4>
                        <ul className="space-y-3">
                            <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} MPBx AI Labs. All rights reserved.</p>
                    <p>Powered by MyProBuddy Ecosystem.</p>
                </div>
            </div>
        </footer>
    );
}
