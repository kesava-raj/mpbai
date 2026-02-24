"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText, HeartPulse, GraduationCap, TrendingUp, Search,
    ChevronDown, CheckCircle2, Zap, ArrowRight,
    ShieldCheck, BarChart3, Lock
} from "lucide-react";

const caseStudies = [
    {
        id: "tender",
        title: "End-to-End Tender Intelligence & Proposal Automation",
        industry: "Government Contracting",
        icon: FileText,
        gradient: "from-blue-600 to-indigo-600",
        challenge: "A mid-sized enterprise operating in a tender-heavy sector was spending disproportionate management time on identifying relevant tenders, manually checking eligibility, coordinating documentation, and assembling proposals under tight deadlines. The process was fragmented, error-prone, and highly dependent on a few key individuals.",
        intervention: "We built an AI-first tender intelligence and proposal automation platform that mirrors the client’s real operating workflow—without forcing process redesign. The system ingests raw tender documents, parses eligibility criteria, evaluates fit against internal capabilities, flags risks, and assembles submission-ready proposals.",
        built: [
            "Automated tender discovery and relevance scoring",
            "Eligibility logic mapped to internal capability matrices",
            "Structured ingestion of 30+ mandatory documents",
            "Risk flags, compliance checks, and audit trail",
            "Proposal assembly with version control and role-based access"
        ],
        impact: [
            "Significant reduction in bid preparation time",
            "Improved bid discipline—fewer low-probability submissions",
            "Lower dependency on individual experts",
            "Consistent, auditable tender responses across teams"
        ],
        why: "This was not 'AI for analysis only,' but AI embedded into execution, ensuring speed without compromising compliance."
    },
    {
        id: "clinical",
        title: "Clinical Workflow Automation for a Diagnostics Network",
        industry: "Diagnostics / Healthcare",
        icon: HeartPulse,
        gradient: "from-emerald-500 to-teal-500",
        challenge: "A fast-growing diagnostics and healthcare services group struggled with fragmented workflows across intake, routing, coordination, reporting, and SLAs. Legacy systems existed, but none reflected how work was actually done on the ground. Management lacked real-time visibility, and scaling risked quality dilution.",
        intervention: "We designed a workflow-first automation layer that precisely digitised the existing operational process—no abstraction, no theory. In parallel, we laid the foundation for a clinical intelligence layer that could evolve over time using real operational data.",
        built: [
            "End-to-end workflow automation (intake → delivery → reporting)",
            "Real-time operational dashboards and SLA tracking",
            "Rule engines derived from SOPs and expert heuristics",
            "Longitudinal, de-identified data exhaust for future intelligence"
        ],
        impact: [
            "Immediate operational visibility across teams",
            "Reduced coordination errors and turnaround times",
            "Foundation laid for explainable clinical intelligence",
            "Scalable architecture without disrupting existing systems"
        ],
        why: "This platform was built as a long-term operating system, not a one-off software deployment."
    },
    {
        id: "student",
        title: "AI-Driven Student Assessment & Progress Intelligence",
        industry: "EdTech",
        icon: GraduationCap,
        gradient: "from-amber-500 to-orange-500",
        challenge: "An education-focused organisation wanted a structured, objective way to assess student readiness and track progress—without relying solely on subjective evaluations or static tests. Existing tools lacked diagnostic depth and longitudinal insight.",
        intervention: "We developed a data-driven assessment and scoring framework that combines structured inputs, rule-based evaluation, and explainable scoring logic to generate actionable insights for students and educators.",
        built: [
            "Multi-dimensional assessment engine",
            "Transparent scoring logic with explainability",
            "Progress tracking across cohorts and time",
            "Insights tailored for students, parents, and institutions"
        ],
        impact: [
            "More objective decision-making",
            "Clear identification of gaps and improvement areas",
            "Improved stakeholder confidence in outcomes",
            "Platform extensible across programs and institutions"
        ],
        why: "The system prioritised trust and explainability, not black-box scores."
    },
    {
        id: "equity",
        title: "AI-Led Equity Readiness & Investor Alignment",
        industry: "FinTech / VC",
        icon: TrendingUp,
        gradient: "from-purple-600 to-violet-600",
        challenge: "Early- and growth-stage companies often approach equity fundraising without being investor-ready—leading to wasted effort, poor optics, and misaligned conversations. Founders lacked a structured way to assess readiness and positioning before engaging investors.",
        intervention: "We built an AI-assisted equity readiness and screening platform that evaluates startups across business, financial, governance, and narrative dimensions—before any investor outreach.",
        built: [
            "Structured founder and company intake",
            "AI-generated readiness diagnostics",
            "Clear classification: pursue / defer / rework",
            "Investor-aligned recommendations and next steps"
        ],
        impact: [
            "Higher quality founder-investor conversations",
            "Reduced noise and false starts",
            "Better use of founder and investor time",
            "Improved credibility in fundraising discussions"
        ],
        why: "This shifts fundraising from hope-driven outreach to data-informed preparation."
    },
    {
        id: "grant",
        title: "Grant Discovery, Eligibility & Application Intelligence",
        industry: "Non-Profit / Research",
        icon: Search,
        gradient: "from-brand-red to-brand-dark-orange",
        challenge: "Startups and MSMEs struggle to discover relevant grants, interpret eligibility clauses, and prepare compliant applications. Most rely on manual searches, consultants, or outdated information—leading to missed opportunities and rejections.",
        intervention: "We created a grant intelligence platform that combines structured grant databases with AI-driven eligibility analysis and application guidance.",
        built: [
            "Continuously updated grant corpus",
            "Eligibility extraction and rule mapping",
            "Fit scoring based on company profile",
            "Guided application workflows and documentation checks"
        ],
        impact: [
            "Improved grant discovery and success rates",
            "Lower dependence on manual consultants",
            "Faster application cycles",
            "Clear audit trail and compliance posture"
        ],
        why: "Grants became a repeatable process, not a one-time gamble."
    }
];

export default function CaseStudiesPage() {
    const [expandedId, setExpandedId] = useState<string | null>("tender");

    return (
        <div className="min-h-screen pt-24 pb-20 bg-zinc-50 dark:bg-[#020817] transition-colors duration-300">

            {/* --- Hero Section --- */}
            <div className="container mx-auto px-4 md:px-6 mb-16 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary-orange/10 text-brand-primary-orange text-xs font-bold uppercase tracking-widest mb-6"
                >
                    <Lock size={12} /> Client-Confidential
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">
                    Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-orange to-brand-red">Case Studies</span>
                </h1>

                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
                    To respect client confidentiality, all case studies are anonymised.
                    These examples demonstrate our ability to deliver robust, regulator-aware AI solutions.
                </p>
            </div>

            {/* --- Case Studies List (Collapsible) --- */}
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="space-y-6">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={study.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div
                                className={`
                                    group rounded-3xl overflow-hidden border transition-all duration-300
                                    ${expandedId === study.id
                                        ? "bg-white dark:bg-zinc-900 border-brand-primary-orange/50 shadow-2xl shadow-brand-primary-orange/10"
                                        : "bg-white/50 dark:bg-zinc-900/40 border-zinc-200 dark:border-white/10 hover:border-brand-primary-orange/30 hover:bg-white dark:hover:bg-zinc-900/80"
                                    }
                                `}
                            >
                                {/* Header (Always Visible) */}
                                <button
                                    onClick={() => setExpandedId(expandedId === study.id ? null : study.id)}
                                    className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-6"
                                >
                                    <div className="flex items-center gap-6">
                                        {/* Icon Box */}
                                        <div className={`hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl items-center justify-center text-white bg-gradient-to-br ${study.gradient} shadow-lg shadow-brand-primary-orange/20`}>
                                            <study.icon size={32} />
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}>
                                                    {study.industry}
                                                </span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-brand-primary-orange transition-colors">
                                                {study.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className={`flex-shrink-0 p-2 rounded-full transition-transform duration-300 ${expandedId === study.id ? 'rotate-180 bg-zinc-100 dark:bg-white/10' : ''}`}>
                                        <ChevronDown className="text-zinc-400" />
                                    </div>
                                </button>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {expandedId === study.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 md:px-8 pb-8 md:pb-10 pt-2 border-t border-dashed border-zinc-200 dark:border-white/10">

                                                {/* "Why it matters" Highlight */}
                                                <div className="mb-10 mt-6 p-5 rounded-2xl bg-brand-primary-orange/5 border border-brand-primary-orange/10 flex gap-4">
                                                    <Zap className="text-brand-primary-orange flex-shrink-0 mt-1" size={20} />
                                                    <div>
                                                        <span className="block text-xs font-bold uppercase text-brand-primary-orange mb-1">Why it matters</span>
                                                        <p className="text-zinc-800 dark:text-zinc-200 font-medium italic">&quot;{study.why}&quot;</p>
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                                                    {/* Left Column: Challenge & Intervention */}
                                                    <div className="space-y-8">
                                                        <div>
                                                            <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                                                                <ShieldCheck size={20} className="text-red-500" />
                                                                The Challenge
                                                            </h4>
                                                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                                {study.challenge}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                                                                <Zap size={20} className="text-brand-primary-orange" />
                                                                Our Intervention
                                                            </h4>
                                                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                                {study.intervention}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Right Column: Built & Impact */}
                                                    <div className="space-y-8">
                                                        <div className="bg-zinc-50 dark:bg-white/5 rounded-2xl p-6 border border-zinc-100 dark:border-white/5">
                                                            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">What We Built</h4>
                                                            <ul className="space-y-3">
                                                                {study.built.map((item, i) => (
                                                                    <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 text-sm">
                                                                        <CheckCircle2 size={16} className="text-brand-primary-orange flex-shrink-0 mt-0.5" />
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div>
                                                            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-2">
                                                                <BarChart3 size={16} /> Impact
                                                            </h4>
                                                            <ul className="space-y-3">
                                                                {study.impact.map((item, i) => (
                                                                    <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- CTA Section --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center bg-zinc-900 dark:bg-white text-white dark:text-black rounded-3xl p-10 md:p-16 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary-orange/20 rounded-full blur-[80px]" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">If this resonates, let&apos;s talk.</h2>
                        <p className="text-zinc-400 dark:text-zinc-600 text-lg mb-8">
                            We build systems that work in the real world, navigating complex regulatory and operational environments.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary-orange hover:bg-brand-dark-orange text-white rounded-full font-bold transition-transform hover:scale-105 shadow-lg shadow-brand-primary-orange/25"
                        >
                            Start Your Project <ArrowRight size={18} />
                        </a>
                    </div>
                </motion.div>
            </div>

        </div>
    );
}
