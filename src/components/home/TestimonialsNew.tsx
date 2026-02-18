"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Building2, Clock, Zap, BarChart3, Mail, Phone, ExternalLink } from "lucide-react";

// Expanded data structure to match the Case Study layout
const testimonials = [
    {
        id: 1,
        title: "Fintech Automation Suite",
        client: "Sarah Johnson",
        role: "Small Business Owner",
        company: "FinEase Corp",
        industry: "Finance",
        duration: "3 Months",
        description: "We needed to automate our loan processing workflow. MPBx AI Labs built a custom generative AI solution that reduced manual verification time by 80%. The system now handles complex document analysis with near-perfect accuracy.",
        techStack: "Python, OpenAI, AWS",
        stats: [
            { label: "Efficiency Gain", value: "119%" },
            { label: "Processing Speed", value: "5x Faster" },
            { label: "Error Reduction", value: "99%" }
        ],
        imageGradient: "from-brand-primary-orange/20 to-brand-red/20"
    },
    {
        id: 2,
        title: "Healthcare Patient Portal",
        client: "David Patel",
        role: "CTO",
        company: "MediCare Plus",
        industry: "Healthcare",
        duration: "6 Months",
        description: "Our patient onboarding was slow and cumbersome. The team developed an intelligent intake agent that streamlines data entry and triaging. It's completely transformed our patient experience and operational throughput.",
        techStack: "Next.js, LangChain, Azure",
        stats: [
            { label: "Patient Satisfaction", value: "4.8/5" },
            { label: "Admin Time Saved", value: "30 hrs/wk" },
            { label: "Onboarding Time", value: "-60%" }
        ],
        imageGradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
        id: 3,
        title: "Retail Demand Forecasting",
        client: "Emily Carter",
        role: "VP of Operations",
        company: "UrbanTrends",
        industry: "Retail / E-commerce",
        duration: "4 Months",
        description: "Predicting inventory needs was a guessing game. MPBx AI Labs implemented a predictive analytics engine that analyzes seasonal trends and sales data, virtually capturing lost revenue from stockouts.",
        techStack: "TensorFlow, Google Cloud, React",
        stats: [
            { label: "Revenue Increase", value: "22%" },
            { label: "Inventory Costs", value: "-15%" },
            { label: "Forecast Accuracy", value: "94%" }
        ],
        imageGradient: "from-brand-purple/20 to-pink-500/20"
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
                                <div className={`w-full h-64 md:h-80 rounded-3xl bg-gradient-to-br ${activeItem.imageGradient} flex items-center justify-center relative overflow-hidden border border-zinc-200 dark:border-white/10 shadow-lg`}>
                                    <div className="absolute inset-0 bg-grid-white/[0.2] dark:bg-grid-black/[0.2]" />
                                    <div className="text-center relative z-10 p-6">
                                        <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">
                                            {activeItem.company}
                                        </h3>
                                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-zinc-900 dark:text-white font-medium text-sm border border-white/30">
                                            {activeItem.industry}
                                        </span>
                                    </div>
                                </div>

                                {/* Title & Story */}
                                <div>
                                    <span className="text-brand-primary-orange font-bold tracking-widest uppercase text-xs mb-2 block">
                                        Success Story
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
                                        {activeItem.title}
                                    </h2>
                                    <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                        &quot;{activeItem.description}&quot;
                                    </p>
                                </div>

                                {/* Results Grid */}
                                <div>
                                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                                        <BarChart3 className="text-brand-primary-orange" size={24} />
                                        Key Results
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        {activeItem.stats.map((stat, i) => (
                                            <div key={i} className="bg-zinc-50 dark:bg-white/5 p-6 rounded-2xl border border-zinc-200 dark:border-white/5 hover:border-brand-primary-orange/50 transition-colors">
                                                <div className="text-2xl md:text-3xl font-bold text-brand-primary-orange mb-1">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation Controls */}
                                <div className="flex items-center gap-4 pt-8 border-t border-zinc-100 dark:border-white/5">
                                    <button
                                        onClick={prevTestimonial}
                                        className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors font-medium text-sm"
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
                            className="bg-zinc-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative border border-white/10"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary-orange/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <Zap className="text-brand-primary-orange" size={20} />
                                Project Info
                            </h3>

                            <div className="space-y-6 relative z-10">
                                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <span className="text-zinc-400 text-sm">Client</span>
                                    <span className="font-medium text-right text-brand-primary-orange">{activeItem.client}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <span className="text-zinc-400 text-sm">Role</span>
                                    <span className="font-medium text-right">{activeItem.role}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <span className="text-zinc-400 text-sm">Duration</span>
                                    <span className="font-medium text-right">{activeItem.duration}</span>
                                </div>
                                <div>
                                    <span className="text-zinc-400 text-sm block mb-2">Tech Stack</span>
                                    <div className="flex flex-wrap items-center justify-end gap-2">
                                        {activeItem.techStack.split(', ').map((tech, i) => (
                                            <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-brand-primary-orange border border-white/5">
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
                            className="bg-zinc-50 dark:bg-white/5 p-8 rounded-3xl border border-zinc-200 dark:border-white/10 shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Need a similar solution?</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                                Book a free consultation to discuss how we can transform your business.
                            </p>

                            <div className="space-y-4">
                                <a href="/contact" className="group flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-brand-primary-orange transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-brand-primary-orange/10 flex items-center justify-center text-brand-primary-orange group-hover:scale-110 transition-transform">
                                        <Phone size={14} />
                                    </div>
                                    Schedule a Call
                                </a>
                                <a href="mailto:hello@mpbxailabs.com" className="group flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-brand-primary-orange transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-brand-primary-orange/10 flex items-center justify-center text-brand-primary-orange group-hover:scale-110 transition-transform">
                                        <Mail size={14} />
                                    </div>
                                    hello@mpbxailabs.com
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
