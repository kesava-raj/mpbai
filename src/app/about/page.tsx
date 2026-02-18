"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Users, Target, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <Section className="pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary-orange/20 rounded-full blur-[120px] animate-pulse-glow" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/20 rounded-full blur-[120px] animate-pulse-glow delay-1000" />
                </div>

                <div className="container mx-auto px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            We are <span className="text-gradient">MPBx AI Labs</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            A futuristic AI Delivery Studio. We don&apos;t just research algorithms; we forge them into production-ready systems that power your business.
                        </p>
                    </motion.div>
                </div>
            </Section>

            {/* Mission & Vision */}
            <Section className="py-20 bg-background/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="h-full p-8 md:p-12 bg-gradient-to-br from-brand-gray-900 to-black text-white border-none shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-brand-red/10 group-hover:bg-brand-red/20 transition-colors duration-500" />
                                <h2 className="text-3xl font-bold mb-4 relative z-10">Our Mission</h2>
                                <p className="text-lg text-gray-300 relative z-10">
                                    To build practical, robust AI systems for real-world workflows. We strip away the hype and deliver engineering excellence.
                                </p>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="h-full p-8 md:p-12 bg-gradient-to-br from-brand-gray-50 to-white dark:from-white/5 dark:to-white/10 border border-border/50 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-brand-purple/5 group-hover:bg-brand-purple/10 transition-colors duration-500" />
                                <h2 className="text-3xl font-bold mb-4 relative z-10">Our Vision</h2>
                                <p className="text-lg text-muted-foreground relative z-10">
                                    To make AI operational everywhere. A future where intelligent agents handle the mundane, freeing humans to solve the extraordinary.
                                </p>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* Powered By */}
            <Section className="py-20">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto glass p-8 rounded-2xl border border-white/20"
                    >
                        <span className="text-sm font-bold tracking-widest uppercase text-brand-dark-orange mb-2 block">Ecosystem</span>
                        <h2 className="text-3xl font-bold mb-4">Powered by MyProBuddy</h2>
                        <p className="text-muted-foreground">
                            MPBx AI Labs operates within the MyProBuddy ecosystem, leveraging a vast network of expert talent and cutting-edge resources to deliver unparalleled AI solutions.
                        </p>
                    </motion.div>
                </div>
            </Section>

            {/* Values */}
            <Section className="py-20 pb-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Execution", icon: Zap, text: "We ship. Ideas are cheap; delivery is everything." },
                            { title: "Innovation", icon: Target, text: "We push boundaries, but never at the cost of stability." },
                            { title: "Trust", icon: ShieldCheck, text: "Your data and your business logic are sacred to us." },
                            { title: "Accountability", icon: Users, text: "We own our code and our outcomes." }
                        ].map((val, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="glass h-full p-6 text-center hover:scale-105 transition-transform duration-300">
                                    <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center text-foreground mb-4">
                                        <val.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{val.title}</h3>
                                    <p className="text-sm text-muted-foreground">{val.text}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>
        </>
    );
}
