"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Footer from "@/components/layout/Footer";

const industries = ["FinTech", "HealthTech", "Logistics", "EdTech", "Legal", "E-commerce", "GovTech", "Other"];
const projectTypes = [
    "AI Agent Systems & Automation",
    "Workflow-first AI Integration",
    "Production-grade AI Delivery",
    "Enterprise AI Strategy & BRD",
    "Custom LLM / RAG Solutions",
    "Digital Transformation"
];
const timelines = ["Immediate", "1-3 Months", "3-6 Months", "Exploring / Long-term"];

export default function ContactPage() {
    const [formState, setFormState] = useState({
        fullName: "",
        email: "",
        company: "",
        industry: "FinTech",
        otherIndustry: "",
        projectType: projectTypes[0],
        timeline: timelines[0],
        painPoints: "",
        projectScope: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Attempt to hit the actual API if it exists, mapping new fields to old backend structure
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formState.fullName,
                    email: formState.email,
                    phone: "N/A (Main Form)",
                    company: formState.company,
                    message: `Industry: ${formState.industry === 'Other' ? formState.otherIndustry : formState.industry}\nProject Type: ${formState.projectType}\nTimeline: ${formState.timeline}\nPain Points: ${formState.painPoints}\nVision: ${formState.projectScope}`
                })
            }).catch(() => { });
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1200);
    };

    return (
        <div className="pt-24 pb-20 min-h-screen flex flex-col justify-center relative overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.03]" />
            <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[80%] h-[50%] bg-[radial-gradient(ellipse,rgba(93,36,143,0.05)_0%,transparent_60%)] pointer-events-none -z-10" />

            <Section className="flex-grow">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10 max-w-3xl mx-auto"
                    >
                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-50 backdrop-blur-xl border border-brand-purple/20 text-xs font-semibold text-brand-purple shadow-sm mb-6 font-inter">
                            Architect Your Enterprise Intelligence
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            Tell Us About <span className="text-gradient hover:scale-105 transition-transform inline-block">Your Needs</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Got a project in mind or just exploring options? Fill in a few quick details — our team will reach out within 1 business day to help you get started with MPBx AI Labs.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-3xl mx-auto"
                    >
                        <Card className="glass p-6 md:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.06)] border border-slate-200 rounded-[2rem] relative bg-white/80 backdrop-blur-2xl">
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-24"
                                    >
                                        <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-lg">
                                            <Check size={40} />
                                        </div>
                                        <h2 className="text-3xl font-bold mb-4 tracking-tight">Received.</h2>
                                        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                                            We&apos;ll analyze your request and get back to you within 24 hours with a preliminary roadmap.
                                        </p>
                                        <Button
                                            onClick={() => { setIsSubmitted(false); }}
                                            variant="secondary"
                                            className="rounded-full px-8 py-6 font-semibold"
                                        >
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
                                        className="space-y-6 md:space-y-8"
                                    >
                                        {/* Full Name & Email */}
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-sm font-semibold text-foreground">Full Name<span className="text-brand-red ml-1">*</span></label>
                                                <Input
                                                    placeholder="e.g. Jane Doe"
                                                    className="h-14 text-base focus:border-brand-purple/50 focus:ring-brand-purple/20 transition-all font-inter rounded-xl shadow-inner"
                                                    value={formState.fullName}
                                                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-semibold text-foreground">Work Email<span className="text-brand-red ml-1">*</span></label>
                                                <Input
                                                    type="email"
                                                    placeholder="e.g. jane.doe@company.com"
                                                    className="bg-white border-slate-200 h-14 text-base focus:border-brand-purple/50 focus:ring-brand-purple/20 transition-all font-inter rounded-xl shadow-inner"
                                                    value={formState.email}
                                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Company & Industry */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-sm font-semibold text-foreground">Company Name<span className="text-brand-red ml-1">*</span></label>
                                                <Input
                                                    placeholder="e.g. Acme Labs"
                                                    className="bg-white border-slate-200 h-14 text-base focus:border-brand-purple/50 focus:ring-brand-purple/20 transition-all font-inter rounded-xl shadow-inner"
                                                    value={formState.company}
                                                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-semibold text-foreground">Industry<span className="text-brand-red ml-1">*</span></label>
                                                <select
                                                    className="flex h-14 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base font-inter ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-brand-purple/10 focus:border-brand-purple/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-inner appearance-none cursor-pointer"
                                                    style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '2.5rem' }}
                                                    value={formState.industry}
                                                    onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                                                >
                                                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Dynamic Other Industry Input */}
                                        <AnimatePresence>
                                            {formState.industry === "Other" && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="space-y-3 pb-2">
                                                        <label className="text-sm font-semibold text-foreground">Please Specify Industry<span className="text-brand-red ml-1">*</span></label>
                                                        <Input
                                                            placeholder="Enter your industry"
                                                            className="bg-white border-slate-200 h-14 text-base focus:border-brand-purple/50 focus:ring-brand-purple/20 transition-all font-inter rounded-xl shadow-inner"
                                                            value={formState.otherIndustry}
                                                            onChange={(e) => setFormState({ ...formState, otherIndustry: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Project Type & Timeline */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-sm font-semibold text-foreground">Service Interest<span className="text-brand-red ml-1">*</span></label>
                                                <select
                                                    className="flex h-14 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base font-inter ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-brand-purple/10 focus:border-brand-purple/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-inner appearance-none cursor-pointer"
                                                    style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '2.5rem' }}
                                                    value={formState.projectType}
                                                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                                                >
                                                    {projectTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-semibold text-foreground">Target Timeline<span className="text-brand-red ml-1">*</span></label>
                                                <select
                                                    className="flex h-14 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base font-inter ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-brand-purple/10 focus:border-brand-purple/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-inner appearance-none cursor-pointer"
                                                    style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '2.5rem' }}
                                                    value={formState.timeline}
                                                    onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                                                >
                                                    {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Pain Points Textarea */}
                                        <div className="space-y-3 pt-2">
                                            <label className="text-sm font-semibold text-foreground">Current Operational Pain Points<span className="text-brand-red ml-1">*</span></label>
                                            <Textarea
                                                placeholder="What manual processes are slowing you down? Where do you see the most potential for AI intervention?"
                                                className="min-h-[100px] text-base focus:border-brand-purple/50 focus:ring-brand-purple/20 transition-all font-inter rounded-xl shadow-inner resize-none p-4"
                                                value={formState.painPoints}
                                                onChange={(e) => setFormState({ ...formState, painPoints: e.target.value })}
                                                required
                                            />
                                        </div>

                                        {/* Project Scope Textarea */}
                                        <div className="space-y-3 pt-2">
                                            <label className="text-sm font-semibold text-foreground">Vision for AI Integration<span className="text-brand-red ml-1">*</span></label>
                                            <Textarea
                                                placeholder="Describe your ideal solution. How would it impact your daily operations?"
                                                className="min-h-[140px] text-base focus:border-brand-purple/50 focus:ring-brand-purple/20 transition-all font-inter rounded-xl shadow-inner resize-none p-4"
                                                value={formState.projectScope}
                                                onChange={(e) => setFormState({ ...formState, projectScope: e.target.value })}
                                                required
                                            />
                                        </div>



                                        {/* Submit Button */}
                                        <div className="pt-6">
                                            <Button
                                                type="submit"
                                                size="lg"
                                                disabled={isSubmitting}
                                                className="w-full text-lg font-bold shadow-xl shadow-brand-primary-orange/20 hover:-translate-y-1 transition-all rounded-[1rem] bg-gradient-to-r from-brand-primary-orange to-brand-red hover:shadow-[0_0_30px_rgba(252,81,9,0.3)] text-white relative overflow-hidden h-16"
                                            >
                                                <span className="relative z-10 flex items-center justify-center">
                                                    {isSubmitting ? "Processing..." : "Contact Sales"}
                                                    {!isSubmitting && <ArrowUpRight className="ml-2 w-5 h-5" />}
                                                </span>
                                            </Button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                </div>
            </Section>

            <div className="mt-8">
                <Footer />
            </div>
        </div>
    );
}
