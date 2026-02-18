"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const industries = ["FinTech", "HealthTech", "Logistics", "EdTech", "Legal", "Other"];
const timelines = ["Urgent (< 1 month)", "1-3 months", "3-6 months", "Exploratory"];
const budgets = ["<$10k", "$10k - $50k", "$50k - $100k", "$100k+"];

export default function ContactPage() {
    const [formState, setFormState] = useState({
        org: "",
        industry: "",
        problem: "",
        timeline: "",
        budget: "",
        dataReady: false
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => setIsSubmitted(true), 1500);
    };

    return (
        <div className="pt-24 pb-20 min-h-screen flex flex-col justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-brand-primary-orange/20 rounded-full blur-[120px] animate-pulse-glow" />
                <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-brand-purple/20 rounded-full blur-[120px] animate-pulse-glow delay-1000" />
            </div>

            <Section>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Start Your <span className="text-gradient">AI Project</span>
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Tell us what you&apos;re building. All conversations are confidential.
                            </p>
                        </motion.div>

                        <Card className="glass relative overflow-hidden p-8 md:p-12 border-white/20 shadow-2xl">
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-20"
                                    >
                                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                            <Check size={40} />
                                        </div>
                                        <h2 className="text-3xl font-bold mb-4">Received.</h2>
                                        <p className="text-muted-foreground text-lg mb-8">
                                            We&apos;ll analyze your request and get back to you within 24 hours with a preliminary roadmap.
                                        </p>
                                        <Button onClick={() => { setIsSubmitted(false); }} variant="outline">
                                            Submit Another Project
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-8"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Organisation</label>
                                                <Input
                                                    placeholder="Company Name"
                                                    className="bg-muted/30 border-white/10 h-12 text-lg focus:border-brand-primary-orange"
                                                    value={formState.org}
                                                    onChange={(e) => setFormState({ ...formState, org: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Industry</label>
                                                <select
                                                    className="flex h-12 w-full rounded-md border border-white/10 bg-muted/30 px-3 py-2 text-lg ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-brand-primary-orange disabled:cursor-not-allowed disabled:opacity-50"
                                                    value={formState.industry}
                                                    onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                                                    required
                                                >
                                                    <option value="" disabled>Select Industry</option>
                                                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">The Problem / Project</label>
                                            <Textarea
                                                placeholder="Describe what you want to build or automate..."
                                                className="bg-muted/30 border-white/10 min-h-[150px] text-lg focus:border-brand-primary-orange resize-none"
                                                value={formState.problem}
                                                onChange={(e) => setFormState({ ...formState, problem: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            <div className="space-y-4">
                                                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Timeline</label>
                                                <select
                                                    className="flex h-12 w-full rounded-md border border-white/10 bg-muted/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-brand-primary-orange"
                                                    value={formState.timeline}
                                                    onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                                                >
                                                    <option value="" disabled>Select Timeline</option>
                                                    {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Budget</label>
                                                <select
                                                    className="flex h-12 w-full rounded-md border border-white/10 bg-muted/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-brand-primary-orange"
                                                    value={formState.budget}
                                                    onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                                                >
                                                    <option value="" disabled>Select Budget</option>
                                                    {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Data Availability</label>
                                                <div className="flex items-center h-12">
                                                    <label className="flex items-center gap-3 cursor-pointer group">
                                                        <input
                                                            type="checkbox"
                                                            className="w-5 h-5 rounded border-gray-300 text-brand-primary-orange focus:ring-brand-primary-orange transition-colors"
                                                            checked={formState.dataReady}
                                                            onChange={(e) => setFormState({ ...formState, dataReady: e.target.checked })}
                                                        />
                                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">Data is ready/structured</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-8 flex justify-end">
                                            <Button
                                                type="submit"
                                                size="lg"
                                                variant="primary"
                                                className="w-full md:w-auto px-12 py-6 text-lg font-bold shadow-lg shadow-brand-primary-orange/20 hover:shadow-brand-primary-orange/40 hover:scale-105 transition-all"
                                            >
                                                Start Your AI Project <ArrowRight className="ml-2" />
                                            </Button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </Card>
                    </div>
                </div>
            </Section>
        </div>
    );
}
