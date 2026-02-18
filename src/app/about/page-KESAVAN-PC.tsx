"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Plus, Play, ShieldCheck, Target, Compass, Zap, BarChart3, Users, Globe } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen font-sans text-zinc-900 selection:bg-brand-primary-orange/20">

            {/* --- Hero Section --- */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-gray-50 to-white -z-10" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary-orange/5 rounded-full blur-[120px] -z-10" />

                <div className="container mx-auto px-4 md:px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight max-w-4xl mx-auto leading-tight"
                    >
                        Empowering Enterprises to <br className="hidden md:block" />
                        <span className="text-brand-primary-orange">Scale with AI</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        At MPBx AI Labs, we turn visionary concepts into intelligent, investable realities through expert AI engineering and strategic innovation.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-3 md:gap-4"
                    >
                        {["Generative AI", "Automation", "Predictive Analytics"].map((tag, i) => (
                            <span key={i} className="flex items-center px-4 py-2 rounded-full bg-white border border-zinc-200 shadow-sm text-zinc-600 text-sm font-medium">
                                <span className="w-2 h-2 rounded-full bg-brand-primary-orange mr-2" />
                                {tag}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* --- What Sets Us Apart --- */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

                        {/* Left Side: Sticky Content */}
                        <div className="md:sticky md:top-32">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Sets Us Apart</h2>
                            <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
                                We turn startups into compelling investment opportunities through market insight, investor access, and hands-on support.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {["AI-First Approach", "Rapid Prototyping", "Scalable Tech", "Data Security"].map((item, i) => (
                                    <span key={i} className="px-5 py-2.5 rounded-full bg-brand-gray-50 border border-zinc-100 text-zinc-700 font-medium text-sm hover:bg-zinc-100 transition-colors cursor-default">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Feature List */}
                        <div className="space-y-10">
                            {[
                                {
                                    icon: CheckCircle2,
                                    color: "text-brand-purple",
                                    bg: "bg-brand-purple/10",
                                    title: "Enterprise-Grade Engineering",
                                    desc: "From refining your AI strategy to assessing technical feasibility, we ensure you are building scalable, future-proof systems."
                                },
                                {
                                    icon: Plus,
                                    color: "text-brand-primary-orange",
                                    bg: "bg-brand-primary-orange/10",
                                    title: "Access to Top Talent",
                                    desc: "Connect with over 20+ specialized AI engineers, data scientists, and industry mentors to accelerate your development."
                                },
                                {
                                    icon: Play, // Simulating the video icon
                                    color: "text-blue-600",
                                    bg: "bg-blue-50",
                                    title: "End-to-End Infrastructure",
                                    desc: "We provide resources like dedicated GPUs, cloud environments, and MLOps pipelines to streamline your deployment journey."
                                },
                                {
                                    icon: ShieldCheck, // Regulatory
                                    color: "text-indigo-600",
                                    bg: "bg-indigo-50",
                                    title: "Regulatory Compliance",
                                    desc: "Benefit from guidance on data privacy (GDPR/HIPAA), AI ethics, and security standards to ensure your product is market-ready."
                                }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-5"
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${feature.bg} ${feature.color}`}>
                                        <feature.icon size={20} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                        <p className="text-zinc-500 leading-relaxed text-base">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>


            {/* --- Impact at a Glance --- */}
            <section className="py-24 bg-brand-gray-50/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact at a Glance</h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto">
                            We fuel startup growth with expert leadership and strategic support, driving success through experience and innovation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { val: "50+", label: "Projects Delivered", sub: "Global Reach" },
                            { val: "95%", label: "Client Retention", sub: "Satisfaction Score" },
                            { val: "20+", label: "AI Experts", sub: "In-House Team" },
                            { val: "5+", label: "Years Experience", sub: "Industry Leadership" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 text-center hover:shadow-lg transition-shadow duration-300">
                                <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-1 text-zinc-900">
                                    {stat.val}
                                </div>
                                <div className="text-zinc-900 font-bold mb-1">{stat.label}</div>
                                <div className="text-zinc-500 text-xs uppercase tracking-wider font-medium">{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* --- Vision & Mission --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Fueling Startup Success with Purpose</h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto">
                            At MPBx AI Labs, we empower founders to become investment-ready through mentorship, strategy, and engineering excellence.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Vision Card */}
                        <div className="p-8 md:p-10 rounded-3xl bg-white border border-zinc-100 shadow-xl shadow-zinc-200/50 flex flex-col items-start text-left hover:-translate-y-1 transition-transform duration-300 group">
                            <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                                <Target size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                            <p className="text-zinc-500 leading-relaxed">
                                To democratize access to state-of-the-art AI technologies, ensuring that every visionary founder has the tools to build scalable, intelligent, and world-changing products.
                            </p>
                        </div>

                        {/* Mission Card */}
                        <div className="p-8 md:p-10 rounded-3xl bg-white border border-zinc-100 shadow-xl shadow-zinc-200/50 flex flex-col items-start text-left hover:-translate-y-1 transition-transform duration-300 group">
                            <div className="w-12 h-12 rounded-full bg-brand-primary-orange/10 flex items-center justify-center text-brand-primary-orange mb-6 group-hover:bg-brand-primary-orange group-hover:text-white transition-colors duration-300">
                                <Compass size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-zinc-500 leading-relaxed">
                                To support entrepreneurs with technical mentorship, strategic AI guidance, and robust development resources that lead to successful product launches and fundraising.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
