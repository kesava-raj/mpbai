"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export default function Hero() {
    return (
        <Section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-background relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 border border-border">
                            Enterprise AI Delivery Studio
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance">
                            Build AI that <br />
                            <span className="text-primary">Actually Works.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        We design, build, and deploy production-grade AI systems embedded into your real-world operational workflows. No hype, just delivery.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full max-w-lg mx-auto"
                    >
                        <Card className="p-2 flex items-center gap-2 shadow-lg border-border bg-card">
                            <div className="pl-4 text-muted-foreground">
                                <Send size={20} />
                            </div>
                            <Input
                                placeholder="How can we automate your workflow?"
                                className="border-none shadow-none focus-visible:ring-0 text-base bg-transparent h-12"
                            />
                            <Link href="/contact">
                                <Button variant="primary" className="h-10 px-6">
                                    Start
                                </Button>
                            </Link>
                        </Card>
                        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                            <span>Try asking:</span>
                            <span className="bg-accent px-2 py-1 rounded-md text-accent-foreground border border-border">"Automate invoice processing"</span>
                            <span className="bg-accent px-2 py-1 rounded-md text-accent-foreground border border-border">"Build a support agent"</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="pt-12 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        {/* Partner Logos Placeholders - using text for now, could be SVGs */}
                        <span className="text-xl font-bold text-muted-foreground">FinTech Corp</span>
                        <span className="text-xl font-bold text-muted-foreground">MedHealth</span>
                        <span className="text-xl font-bold text-muted-foreground">LogisticsGlobal</span>
                        <span className="text-xl font-bold text-muted-foreground">EduScale</span>
                    </motion.div>

                </div>
            </div>
        </Section>
    );
}
