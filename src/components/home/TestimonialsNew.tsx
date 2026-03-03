"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Zap, BarChart3, Mail, Phone, FileText, HeartPulse, GraduationCap } from "lucide-react";

const testimonials = [
    {
        id: "tender",
        title: "Tender Intelligence & Proposal Automation",
        client: "Confidential Client",
        role: "GovTech Architect",
        company: "Government Contracting",
        industry: "GovTech",
        duration: "Ongoing",
        description: "A custom AI platform that mirrors real operating workflows to ingest tender documents, parse eligibility, and assemble submission-ready proposals under tight deadlines.",
        techStack: "Gemini 1.5 Pro, Vector DB, Next.js",
        stats: [
            { label: "Efficiency Gain", value: "85%" },
            { label: "Bid Speed", value: "4x Faster" },
            { label: "Compliance", value: "100%" }
        ],
        icon: FileText,
        imageGradient: "from-blue-600/20 to-indigo-600/20"
    },
    {
        id: "clinical",
        title: "Clinical Workflow Operating System",
        client: "Diagnostics Network",
        role: "Head of Operations",
        company: "Healthcare Services",
        industry: "Healthcare",
        duration: "Project Studio",
        description: "Built a workflow-first automation layer that digitised operational processes precisely, laying the foundation for an explainable clinical intelligence layer.",
        techStack: "Node.js, Python AI, AWS",
        stats: [
            { label: "Process Visibility", value: "Real-time" },
            { label: "Error Reduction", value: "70%" },
            { label: "Scalability", value: "Infinite" }
        ],
        icon: HeartPulse,
        imageGradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
        id: "student",
        title: "AI-Driven Progress Intelligence",
        client: "EdTech Leader",
        role: "VP of Learning",
        company: "Education Group",
        industry: "EdTech",
        duration: "4 Months",
        description: "Objectively assess student readiness and track progress using data-driven scoring frameworks that combine rule-based evaluation and explainable logic.",
        techStack: "LangChain, React, PostgreSQL",
        stats: [
            { label: "Objective Scoring", value: "98%" },
            { label: "Gap Identification", value: "Instant" },
            { label: "User Trust", value: "High" }
        ],
        icon: GraduationCap,
        imageGradient: "from-amber-500/20 to-orange-500/20"
    }
];

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const activeItem = testimonials[activeIndex];

    return (
        <section id="testimonials" className="py-20 md:py-32 bg-white dark:bg-[#020817] relative overflow-hidden transition-colors duration-300">
            {/* Background Grid */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-black/[0.02] dark:bg-grid-white/[0.02] pointer-events-none" />

            {/* Ambient Brand Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-brand-primary-orange/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

                    {/* --- MAIN CONTENT AREA (Left 2/3) --- */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeItem.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-10"
                            >
                                {/* Featured Image / Visual */}
                                <div className={`w-full h-64 md:h-80 rounded-3xl bg-gradient-to-br ${activeItem.imageGradient} flex items-center justify-center relative overflow-hidden border border-slate-200 shadow-lg`}>
                                    <div className="absolute inset-0 bg-grid-black/[0.05]" />
                                    <div className="text-center relative z-10 p-6 flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl mb-4 text-brand-primary-orange">
                                            <activeItem.icon size={32} />
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2 tracking-tight">
                                            {activeItem.company}
                                        </h3>
                                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md text-slate-900 font-medium text-sm border border-white/50">
                                            {activeItem.industry}
                                        </span>
                                    </div>
                                </div>

                                {/* Title & Story */}
                                <div>
                                    <span className="text-brand-primary-orange font-bold tracking-widest uppercase text-xs mb-2 block">
                                        Success Story
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                                        {activeItem.title}
                                    </h2>
                                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                                        &quot;{activeItem.description}&quot;
                                    </p>
                                </div>

                                {/* Results Grid */}
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <BarChart3 className="text-brand-primary-orange" size={24} />
                                        Key Results
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        {activeItem.stats.map((stat, i) => (
                                            <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-brand-primary-orange/50 transition-colors">
                                                <div className="text-2xl md:text-3xl font-bold text-brand-primary-orange mb-1">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation Controls */}
                                <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                                    <button
                                        onClick={prevTestimonial}
                                        className="flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-medium text-sm"
                                    >
                                        <ArrowLeft size={18} /> Prev Story
                                    </button>
                                    <button
                                        onClick={nextTestimonial}
                                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary-orange hover:bg-brand-dark-orange text-white transition-colors font-medium text-sm shadow-lg shadow-brand-primary-orange/20"
                                    >
                                        Next Story <ArrowRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* --- SIDEBAR AREA (Right 1/3) --- */}
                    <div className="space-y-8 lg:sticky lg:top-32 h-fit">

                        {/* Project Info Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden relative border border-slate-200"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary-orange/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10 text-slate-900">
                                <Zap className="text-brand-primary-orange" size={20} />
                                Project Info
                            </h3>

                            <div className="space-y-6 relative z-10">
                                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                    <span className="text-slate-400 text-sm">Client</span>
                                    <span className="font-medium text-right text-brand-primary-orange">{activeItem.client}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                    <span className="text-slate-400 text-sm">Role</span>
                                    <span className="font-medium text-right text-slate-900">{activeItem.role}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                    <span className="text-slate-400 text-sm">Duration</span>
                                    <span className="font-medium text-right text-slate-900">{activeItem.duration}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 text-sm block mb-2">Tech Stack</span>
                                    <div className="flex flex-wrap items-center justify-end gap-2">
                                        {activeItem.techStack.split(', ').map((tech, i) => (
                                            <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-slate-50 text-brand-primary-orange border border-slate-200/50">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Need a similar solution?</h3>
                            <p className="text-sm text-slate-500 mb-6">
                                Book a free consultation to discuss how we can transform your business.
                            </p>

                            <div className="space-y-4">
                                <a href="tel:+919952237700" className="group flex items-center gap-3 text-sm font-medium text-slate-700 hover:text-brand-primary-orange transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-brand-primary-orange/10 flex items-center justify-center text-brand-primary-orange group-hover:scale-110 transition-transform">
                                        <Phone size={14} />
                                    </div>
                                    +91 99522 37700
                                </a>
                                <a href="mailto:reachus@myprobuddy.com" className="group flex items-center gap-3 text-sm font-medium text-slate-700 hover:text-brand-primary-orange transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-brand-primary-orange/10 flex items-center justify-center text-brand-primary-orange group-hover:scale-110 transition-transform">
                                        <Mail size={14} />
                                    </div>
                                    reachus@myprobuddy.com
                                </a>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
