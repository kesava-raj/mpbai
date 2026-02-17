"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { MessageSquare, Mic, Bot, Workflow, Check } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="pt-20 bg-background min-h-screen">
            <Section className="container mx-auto px-4 md:px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center mb-24"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Enterprise AI Capabilities
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We deliver specialized AI components designed to be embedded into your existing technology stack and operational workflows.
                    </p>
                </motion.div>

                <div className="space-y-24">
                    <ServiceSection
                        id="chatbots"
                        title="AI Chatbots"
                        icon={MessageSquare}
                        description="Enterprise conversational systems embedded into workflows."
                        whatWeBuild={[
                            "Level 1 Support Automation",
                            "Internal Knowledge Retrieval Assistants",
                            "Customer Onboarding Concierges"
                        ]}
                        howAiUsed="We use RAG (Retrieval-Augmented Generation) to ground answers in your data, ensuring accuracy and reducing hallucinations. We integrate with your APIs to allow the bot to take action, not just chat."
                    />

                    <ServiceSection
                        id="voicebots"
                        title="AI Voicebots"
                        icon={Mic}
                        description="Voice-based automation for operations and support."
                        whatWeBuild={[
                            "Inbound Call Triage",
                            "Outbound Appointment Scheduling",
                            "Post-Service Feedback Collection"
                        ]}
                        howAiUsed="Using low-latency speech-to-text and text-to-speech models, combined with conversational logic. Our systems handle interruptions, accent variations, and turn-taking naturally."
                    />

                    <ServiceSection
                        id="agents"
                        title="AI Agents"
                        icon={Bot}
                        description="Task-driven AI agents operating inside real systems."
                        whatWeBuild={[
                            "Document Processing & Extraction Agents",
                            "Competitive Intelligence Scrapers",
                            "Supply Chain Anomaly Detectors"
                        ]}
                        howAiUsed="Agents are designed with reasoning loops (ReAct pattern) to break down complex goals into sub-tasks, execute tools (web search, database queries), and verify their own output before reporting back."
                    />

                    <ServiceSection
                        id="automation"
                        title="Workflow Automation"
                        icon={Workflow}
                        description="End-to-end automation combining rules, AI, and orchestration."
                        whatWeBuild={[
                            "RFP/Tender Response Generation",
                            "Invoice Reconciliation Workflows",
                            "Candidate Screening Pipelines"
                        ]}
                        howAiUsed="We combine deterministic logic (rules) for safety with probabilistic AI for flexibility. We use LLMs to bridge the gap between structured systems (like ERPs) and unstructured data (emails, PDFs)."
                    />
                </div>
            </Section>
        </div>
    );
}

function ServiceSection({ id, title, icon: Icon, description, whatWeBuild, howAiUsed }: any) {
    return (
        <div id={id} className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border pt-16">
            <div className="lg:col-span-4">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-primary">
                        <Icon size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                </div>
                <p className="text-lg text-muted-foreground font-medium">{description}</p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">What We Typically Build</h3>
                    <ul className="space-y-3">
                        {whatWeBuild.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-secondary shrink-0" />
                                <span className="text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">How AI is Used</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        {howAiUsed}
                    </p>
                </div>
            </div>
        </div>
    );
}
