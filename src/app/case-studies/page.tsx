"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const caseStudies = [
    {
        title: "Tender Automation Platform",
        industry: "Construction & Infrastructure",
        context: "A large infrastructure firm handles hundreds of complex tender documents monthly.",
        problem: "Manual review of 500+ page PDFs was slow, prone to error, and delayed bid decisions.",
        solution: "Built a RAG-based analysis engine that extracts key technical requirements, commercial constraints, and compliance risks automatically.",
        aiUsed: "Large context LLMs, Vector Search, OCR pipeline.",
        outcome: "Bid review time reduced by 70%. Risk detection improved by 40%."
    },
    {
        title: "Healthtech Workflow System",
        industry: "Healthcare",
        context: "A patient intake coordination center struggling with high call operational costs.",
        problem: "Nurses spent 40% of their time on repetitive data entry and symptom triage documentation.",
        solution: "Deployed a voice-enabled triage assistant that listens to calls, transcribes medical notes, and suggests ICD-10 codes for review.",
        aiUsed: "Real-time Speech-to-Text, Medical Entity Extraction, Clinical LLM.",
        outcome: "Nurse admin time cut by half. Patient throughput increased by 25%."
    },
    {
        title: "Edtech Assessment Platform",
        industry: "Education",
        context: "An online certification provider needed to scale exam grading.",
        problem: "Human grading was expensive and inconsistent across thousands of students.",
        solution: "Developed an AI grading assistant that provides preliminary scores and detailed feedback justifications for human graders to approve.",
        aiUsed: "Fine-tuned LLM for pedagogical feedback, Chain-of-Thought reasoning.",
        outcome: "Grading cost reduced by 60%. Consistency score improved to 98%."
    },
    {
        title: "Equity Readiness Platform",
        industry: "FinTech",
        context: "A platform helping startups prepare for fundraising.",
        problem: "Founders needed personalized feedback on pitch decks and financial models which required expensive consultants.",
        solution: "Created an automated analyst agent that reviews documents and generates investment memos highlighting gaps.",
        aiUsed: "Multi-modal LLM (Vision + Text), Financial Reasoning Agent.",
        outcome: "Service capacity expanded 10x with zero headcount increase."
    },
    {
        title: "Grant Intelligence Platform",
        industry: "Non-Profit / GovTech",
        context: "A consultancy helping NGOs find relevant grants.",
        problem: "Matching thousands of tailored grants to specific NGO missions was manually impossible at scale.",
        solution: "Built a semantic matching engine that proactively alerts NGOs to high-fit opportunities.",
        aiUsed: "Semantic Search, Embedding Models, Automated Email Agent.",
        outcome: "Grant match relevance increased by 300%."
    }
];

export default function CaseStudiesPage() {
    return (
        <div className="pt-20 bg-background min-h-screen">
            <Section className="container mx-auto px-4 md:px-6 py-16">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Case Studies
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Real-world examples of AI embedded into operational workflows.
                    </p>
                    <p className="text-sm text-muted-foreground/60 mt-4 italic">
                        *All case studies are anonymised to respect client confidentiality.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
                    {caseStudies.map((study, index) => (
                        <Card key={index} className="overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8">
                                <div className="bg-muted/50 p-8 md:col-span-4 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">
                                            {study.industry}
                                        </span>
                                        <h2 className="text-2xl font-bold text-foreground mb-4">{study.title}</h2>
                                    </div>
                                    <div className="mt-8 md:mt-0">
                                        <p className="text-sm font-semibold text-foreground mb-1">Impact</p>
                                        <p className="text-muted-foreground leading-snug">{study.outcome}</p>
                                    </div>
                                </div>

                                <div className="p-8 md:col-span-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-sm font-bold text-foreground uppercase mb-2">The Problem</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{study.problem}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-foreground uppercase mb-2">Context</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{study.context}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-foreground uppercase mb-2">The Solution</h3>
                                        <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-md border border-border">
                                        <h3 className="text-xs font-bold text-foreground uppercase mb-1">AI Technology Used</h3>
                                        <p className="text-sm text-muted-foreground font-mono">{study.aiUsed}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-24 text-center bg-muted/30 py-16 rounded-xl">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Have a similar challenge?</h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        We can assess your workflow and propose a production-grade AI solution.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" variant="primary">Discuss a Similar Project</Button>
                    </Link>
                </div>
            </Section>
        </div>
    );
}
