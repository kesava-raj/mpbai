"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { CheckCircle2, Bot, Layers, ShieldCheck, Target, Lightbulb } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pt-10">
            {/* Hero Section */}
            <Section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden text-center">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(252,81,9,0.1)_0%,transparent_60%)] pointer-events-none will-change-[transform,opacity]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(93,36,143,0.1)_0%,transparent_60%)] pointer-events-none will-change-[transform,opacity]" />
                </div>

                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                            Architecting the Future <br className="hidden md:block" /> of Enterprise Intelligence
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                            At MPBx AI Labs, we turn visionary concepts into production-ready AI systems through expert engineering and strategic integration.
                        </p>

                        <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-semibold text-foreground/80">
                            <span className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-brand-primary-orange shadow-[0_0_8px_rgba(252,81,9,0.5)]" />
                                Workflow Automation
                            </span>
                            <span className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(93,36,143,0.5)]" />
                                Custom Agents
                            </span>
                            <span className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-brand-red shadow-[0_0_8px_rgba(239,62,37,0.5)]" />
                                Generative AI
                            </span>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* What Sets Us Apart */}
            <Section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="lg:sticky lg:top-32"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">What Sets Us Apart</h2>
                            <p className="text-muted-foreground mb-10 text-lg leading-relaxed max-w-lg">
                                We turn complex workflows into highly efficient operations through custom AI agents, robust integrations, and hands-on technical support.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {["Production-Ready", "Autonomous Agents", "Custom LLMs", "Workflow Integration", "Scalable Systems"].map((badge) => (
                                    <span
                                        key={badge}
                                        className="px-5 py-2.5 rounded-full border border-slate-200 bg-white/50 hover:border-brand-primary-orange/50 hover:bg-brand-primary-orange/5 font-inter transition-all text-sm font-medium text-foreground shadow-sm"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        <div className="space-y-10">
                            {[
                                {
                                    icon: CheckCircle2,
                                    title: "AI-First Advisory",
                                    desc: "From refining your workflows to assessing automation potential, we ensure you are adopting the most impactful AI strategies tailored for your enterprise."
                                },
                                {
                                    icon: Layers,
                                    title: "Enterprise Integrations",
                                    desc: "Connect seamlessly with leading LLM providers, secure vector databases, and your internal tools to build a cohesive and powerful AI infrastructure."
                                },
                                {
                                    icon: Bot,
                                    title: "Smart Support Infrastructure",
                                    desc: "We provide resources like scalable cloud hosting, autonomous agents, and real-time monitoring to accelerate your AI adoption journey and ensure 99.9% uptime."
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Technical Edge",
                                    desc: "Benefit from guidance on data privacy, state-of-the-art foundation models, compliance standards, and enterprise-grade security protocols."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex gap-5 group"
                                >
                                    <div className="shrink-0 mt-1">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-purple/5 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-300 shadow-sm border border-brand-purple/10">
                                            <item.icon size={22} strokeWidth={2} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-brand-primary-orange transition-colors">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* Impact at a Glance */}
            <Section className="py-20 md:py-24 bg-slate-50/50">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Our Impact at a Glance</h2>
                        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
                            We fuel enterprise growth with expert engineering and strategic support, driving success through experience and innovation.
                        </p>
                    </motion.div>

                    <Card className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md border border-slate-200 shadow-xl overflow-hidden glass">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                            {[
                                { number: "50", suffix: "+", label: "Models Deployed" },
                                { number: "25", suffix: "+", label: "Enterprise Clients" },
                                { number: "5", suffix: "M+", label: "Tasks Automated" },
                                { number: "10", suffix: "+", label: "Years of Experience" }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="p-8 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center pointer-events-auto"
                                >
                                    <div className="text-4xl md:text-5xl font-bold text-foreground mb-3 flex items-baseline">
                                        {stat.number}
                                        <span className="text-2xl md:text-3xl text-brand-primary-orange font-semibold ml-1">{stat.suffix}</span>
                                    </div>
                                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest font-inter">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </Card>
                </div>
            </Section>

            {/* Vision & Mission */}
            <Section className="py-20 md:py-32 relative">
                <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-[radial-gradient(circle,rgba(252,81,9,0.05)_0%,transparent_60%)] pointer-events-none will-change-[transform,opacity]" />

                <div className="container mx-auto px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Fueling Enterprise Success with Purpose</h2>
                        <p className="text-muted-foreground mb-16 max-w-3xl mx-auto text-lg leading-relaxed">
                            At MPBx AI Labs, we empower enterprises to become AI-first through expert engineering, strategic planning, and cutting-edge research.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full p-8 md:p-10 glass border-slate-200 hover:border-brand-red/30 transition-all duration-300">
                                <div className="w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center mb-6 shadow-sm">
                                    <Target size={20} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    To democratize access to production-grade AI across the industry by making every business intelligent, automated, and truly future-ready.
                                </p>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full p-8 md:p-10 glass border-slate-200 hover:border-brand-primary-orange/30 transition-all duration-300">
                                <div className="w-10 h-10 rounded-full bg-brand-primary-orange/10 border border-brand-primary-orange/20 text-brand-primary-orange flex items-center justify-center mb-6 shadow-sm">
                                    <Lightbulb size={20} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    To support enterprises with strategic AI implementation, autonomous workflows, and custom agent development that lead directly to measurable operational excellence.
                                </p>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* Final CTA Banner */}
            <Section className="py-10 pb-24 px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-brand-purple/5 to-white text-foreground p-12 md:p-20 text-center relative overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.06)] border border-brand-purple/10"
                >
                    {/* Decorative Background Patterns inside CTA */}
                    <div className="absolute inset-0 bg-brand-purple/5 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #5d248f 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                    <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-primary-orange/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 max-w-4xl mx-auto font-sans">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-slate-900">
                            We do not just believe in your <span className="text-brand-primary-orange">vision</span><br className="hidden md:block" />
                            we help you prove it to the <span className="text-brand-primary-orange">world</span>
                        </h2>
                        <p className="text-xl md:text-2xl mb-12 text-slate-600 font-medium font-inter">Let us build the future together.</p>

                        <Link href="/contact">
                            <Button className="bg-brand-primary-orange hover:bg-brand-dark-orange text-white border-none rounded-full px-10 py-7 text-lg md:text-xl font-bold transition-all shadow-xl shadow-brand-primary-orange/20 hover:shadow-brand-primary-orange/40 hover:-translate-y-1">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </Section>

            <Footer />
        </div>
    );
}
