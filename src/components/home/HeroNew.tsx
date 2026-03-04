"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { ArrowRight, Bot } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

interface HeroProps {
    onStartChat?: (message: string) => void;
}

export function Hero({ onStartChat }: HeroProps) {
    const [projectDesc, setProjectDesc] = useState("");

    const handleStartChat = () => {
        if (projectDesc.trim().length > 0 && onStartChat) {
            onStartChat(projectDesc);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleStartChat();
        }
    };

    return (
        <Section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden flex flex-col justify-center min-h-[90vh]">

            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* Left: Typography & CTA */}
                    <div className="flex flex-col items-start text-left max-w-xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-medium tracking-tighter text-foreground mb-6 leading-[1.05]"
                        >
                            Got an idea?<br />
                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-orange to-brand-red">Let&apos;s build it.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                            className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed"
                        >
                            Describe your project and we&apos;ll show you how AI can make it happen. All conversations are confidential.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                        >
                            <Button
                                onClick={() => document.getElementById('hero-input')?.focus()}
                                className="rounded-[2rem] px-8 py-7 text-lg font-bold bg-brand-primary-orange hover:bg-brand-dark-orange text-white transition-all shadow-xl shadow-brand-primary-orange/20 hover:shadow-brand-primary-orange/40 hover:-translate-y-1 group border-none"
                            >
                                Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>

                        {/* Footer Sub Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-16 sm:mt-24 flex flex-wrap items-center gap-x-4 gap-y-3 text-[13px] md:text-[15px] text-muted-foreground/60 font-medium font-inter"
                        >
                            <span className="hover:text-foreground transition-colors cursor-default">AI Infrastructure</span>
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-border"></span>
                            <span className="hover:text-foreground transition-colors cursor-default">Search Architecture</span>
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-border"></span>
                            <span className="hover:text-foreground transition-colors cursor-default">Interface Engineering</span>
                            <span className="hidden xl:inline-block w-1.5 h-1.5 rounded-full bg-border"></span>
                            <span className="hover:text-foreground transition-colors cursor-default">Algorithmic Systems</span>
                        </motion.div>
                    </div>

                    {/* Right: Mockup Interface */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 80 }}
                        className="w-full max-w-lg mx-auto lg:mr-0 lg:ml-auto relative"
                    >
                        {/* Glow Behind Chat */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle,rgba(252,81,9,0.05)_0%,transparent_50%)] pointer-events-none -z-10 will-change-transform" />

                        <Card className="p-6 md:p-8 rounded-[2rem] shadow-[0_32px_64px_rgba(0,0,0,0.08)] border border-slate-200/60 bg-white/95 backdrop-blur-3xl">
                            {/* Chat Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm relative overflow-hidden">
                                        <Bot className="text-slate-600" size={24} />
                                    </div>
                                    <div>
                                        <div className="text-[15px] font-bold text-foreground">Agent Violet</div>
                                        <div className="text-[13px] font-medium text-muted-foreground">AI Strategy Advisor</div>
                                    </div>
                                </div>
                                {/* Status dot on the right side */}
                                <div className="w-2.5 h-2.5 bg-[#22c55e] rounded-full shadow-sm" />
                            </div>

                            {/* AI Message Bubble */}
                            <div className="bg-slate-50 text-foreground border border-slate-200 shadow-sm p-5 rounded-3xl rounded-tl-sm text-[15px] md:text-base mb-8 leading-relaxed max-w-[90%] font-medium">
                                I see you&apos;re building something. Something that needs intelligence. Tell me about your workflow or project idea.
                            </div>

                            {/* Input Area */}
                            <div className="relative bg-white rounded-[1.75rem] p-1.5 border border-slate-200 focus-within:border-brand-primary-orange/30 focus-within:ring-4 focus-within:ring-brand-primary-orange/5 transition-all group shadow-sm">
                                <Textarea
                                    id="hero-input"
                                    placeholder="Type your response..."
                                    className="min-h-[56px] resize-none border-none bg-white text-slate-700 text-[15px] placeholder:text-slate-400 focus-visible:ring-0 p-4 pt-4 pb-12 w-full font-inter"
                                    value={projectDesc}
                                    onChange={(e) => setProjectDesc(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <div className="absolute bottom-2 right-2">
                                    <Button
                                        onClick={handleStartChat}
                                        size="icon"
                                        className="w-[42px] h-[42px] rounded-full bg-slate-900 hover:bg-brand-primary-orange text-white transition-all shadow-md group-focus-within:bg-brand-primary-orange group-focus-within:text-white shrink-0"
                                        disabled={!projectDesc.trim()}
                                    >
                                        <ArrowRight size={20} className={projectDesc.trim() ? "translate-x-0.5 transition-transform" : ""} />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
}

export default Hero;
