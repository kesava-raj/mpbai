"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function Hero() {
    const [step, setStep] = useState(1);
    const [projectDesc, setProjectDesc] = useState("");

    const handleContinue = () => {
        if (projectDesc.trim().length > 0) {
            setStep(2);
        }
    };

    return (
        <Section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[85vh]">

            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary-orange/15 rounded-full blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-purple/15 rounded-full blur-[100px] animate-pulse-glow delay-1000" />
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60%] h-[60%] bg-brand-red/5 rounded-full blur-[80px] animate-float" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-sm font-semibold text-foreground shadow-lg hover:scale-105 transition-transform duration-300 ring-1 ring-white/20">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-brand-primary-orange to-brand-red text-white shadow-sm">
                            <Sparkles size={10} fill="currentColor" />
                        </span>
                        <span>AI-Powered Solutions</span>
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance mb-6"
                >
                    Got an idea? <br />
                    <span className="text-gradient">Let’s build it.</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Describe your project and we’ll show you how AI can make it happen.
                </motion.p>

                {/* Input Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 100 }}
                    className="w-full max-w-2xl mx-auto"
                >
                    <Card className="glass p-2 md:p-3 shadow-xl ring-1 ring-black/5 dark:ring-white/20 bg-white/60 dark:bg-black/40 backdrop-blur-xl">
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col gap-4"
                                >
                                    <div className="relative">
                                        <Textarea
                                            placeholder="Tell us what you want to build..."
                                            className="min-h-[100px] resize-none border-none bg-transparent text-lg placeholder:text-muted-foreground/50 focus-visible:ring-0 p-4"
                                            value={projectDesc}
                                            onChange={(e) => setProjectDesc(e.target.value)}
                                        />
                                        <div className="absolute bottom-2 right-2">
                                            <Button
                                                onClick={handleContinue}
                                                size="sm"
                                                variant="primary"
                                                className="rounded-full w-10 h-10 p-0 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-brand-primary-orange/30 bg-gradient-to-br from-brand-primary-orange to-brand-dark-orange"
                                                disabled={!projectDesc.trim()}
                                            >
                                                <ArrowRight size={18} strokeWidth={2.5} />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col gap-3 p-3"
                                >
                                    <div className="text-left mb-1">
                                        <h3 className="text-sm font-medium text-muted-foreground">Almost there! Where should we send the plan?</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Input placeholder="Your Name" className="bg-white/50 dark:bg-black/20 border-black/5 dark:border-white/10" />
                                        <Input placeholder="Work Email" type="email" className="bg-white/50 dark:bg-black/20 border-black/5 dark:border-white/10" />
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Back
                                        </button>
                                        <Link href="/contact">
                                            <Button variant="primary" className="gap-2 group shadow-md text-sm px-6">
                                                Continue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>

                    {/* Trust/Floating Elements */}
                    <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10 opacity-60 hover:opacity-100 transition-opacity duration-500">
                        {/* Abstract Logos or Text */}
                        <span className="text-sm font-semibold text-muted-foreground">FinTech</span>
                        <span className="text-sm font-semibold text-muted-foreground">HealthCare</span>
                        <span className="text-sm font-semibold text-muted-foreground">Logistics</span>
                        <span className="text-sm font-semibold text-muted-foreground">EdTech</span>
                    </div>
                </motion.div>

            </div>
        </Section>
    );
}

export default Hero;
