"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MessageSquareText, Headset, BrainCircuit, Workflow, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer";

const services = [
    {
        id: "agents",
        title: "AI Agents",
        subtitle: "Autonomous Intelligence for Complex Tasks",
        description: "Deploy AI agents that work alongside your team, handling complex tasks with human-like reasoning and decision-making capabilities.",
        keyFeatures: [
            "Autonomous task execution and decision-making",
            "Multi-step workflow automation",
            "Natural language understanding and generation",
            "Integration with existing business systems",
            "Continuous learning and improvement",
            "24/7 availability with consistent performance"
        ],
        commonUseCases: [
            "Customer inquiry handling and resolution",
            "Lead qualification and nurturing",
            "Document processing and analysis",
            "Scheduling and appointment management"
        ],
        icon: BrainCircuit,
        color: "bg-brand-primary-orange" // Using a solid color or gradient class logic
    },
    {
        id: "chatbots",
        title: "AI Chatbots",
        subtitle: "Intelligent Conversational Interfaces",
        description: "Create engaging, intelligent chat experiences that handle customer inquiries, provide support, and drive conversions around the clock.",
        keyFeatures: [
            "Natural conversational flow",
            "Multi-language support",
            "Context retention across conversations",
            "Seamless human handoff when needed",
            "Rich media and interactive elements",
            "Analytics and conversation insights"
        ],
        commonUseCases: [
            "Customer support and FAQ handling",
            "Product recommendations",
            "Order tracking and status updates",
            "Lead capture and qualification"
        ],
        icon: MessageSquareText,
        color: "bg-brand-primary-orange"
    },
    {
        id: "voicebots",
        title: "AI Voicebots",
        subtitle: "Voice-Enabled AI at Scale",
        description: "Handle phone calls at any volume with intelligent voice AI that sounds natural, understands context, and resolves issues effectively.",
        keyFeatures: [
            "Natural speech recognition and synthesis",
            "Handle 100+ simultaneous calls",
            "Emotion detection and appropriate responses",
            "Seamless CRM and calendar integration",
            "Call recording and transcription",
            "Real-time analytics dashboard"
        ],
        commonUseCases: [
            "Appointment scheduling and reminders",
            "Patient intake and triage",
            "Order placement and tracking",
            "Payment collection and reminders"
        ],
        icon: Headset,
        color: "bg-brand-primary-orange"
    },
    {
        id: "automation",
        title: "Workflow Automation",
        subtitle: "End-to-End Process Intelligence",
        description: "Transform your business processes with AI-powered automation that connects systems, eliminates manual work, and ensures consistency.",
        keyFeatures: [
            "Process mapping and optimization",
            "API and system integration",
            "Custom business logic implementation",
            "Error handling and recovery",
            "Audit trails and compliance",
            "Scalable cloud infrastructure"
        ],
        commonUseCases: [
            "Data entry and validation",
            "Report generation and distribution",
            "Invoice processing and reconciliation",
            "Employee onboarding workflows"
        ],
        icon: Workflow,
        color: "bg-brand-primary-orange"
    }
];

export default function ServicesPage() {
    return (
        <div className="pt-24 pb-20 bg-background text-foreground">
            {/* Header */}
            <Section className="mb-16">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Our <span className="text-gradient">Services</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed"
                    >
                        Comprehensive AI solutions designed to transform your operations, delight your customers, and drive measurable business results.
                    </motion.p>
                </div>
            </Section>

            {/* Service Sections */}
            <div className="container mx-auto px-4 md:px-6 space-y-20 md:space-y-24">
                {services.map((service, index) => (
                    <Section key={service.id} id={service.id} className="scroll-mt-32">
                        <div className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Content Side */}
                            <motion.div
                                className="w-full lg:w-1/2 space-y-6"
                                initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex items-start gap-5">
                                    <div className={cn(
                                        "relative flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 transition-transform hover:scale-105 duration-300",
                                        "bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 dark:to-transparent",
                                        "border border-white/20 dark:border-white/10 shadow-lg backdrop-blur-md overflow-hidden"
                                    )}>
                                        <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${service.color === 'bg-brand-primary-orange' ? 'from-brand-primary-orange to-brand-red' : 'from-brand-purple to-blue-600'}`} />
                                        <div className="absolute inset-0 bg-noise opacity-10" />
                                        <service.icon strokeWidth={1.5} size={28} className="relative z-10 text-foreground" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{service.title}</h2>
                                        <p className="text-sm font-medium text-muted-foreground mt-1">{service.subtitle}</p>
                                    </div>
                                </div>

                                <p className="text-muted-foreground leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-sm">Key Features</h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                        {service.keyFeatures.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                <Check size={14} className="mt-0.5 text-brand-primary-orange shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-4">
                                    <Link href="/contact">
                                        <Button className="bg-brand-primary-orange text-white hover:bg-brand-dark-orange transition-colors duration-300 shadow-md hover:shadow-lg px-8 py-2 rounded-md font-medium flex items-center gap-2">
                                            Get Started <ArrowRight size={18} />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Visual/Card Side (Use Cases) */}
                            <motion.div
                                className="w-full lg:w-1/2"
                                initial={{ opacity: 0, x: index % 2 === 1 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Card className="p-6 md:p-8 border border-border shadow-sm bg-card h-full">
                                    <h3 className="text-sm font-bold mb-6 text-foreground">Common Use Cases</h3>
                                    <div className="space-y-3">
                                        {service.commonUseCases.map((useCase, i) => (
                                            <div
                                                key={i}
                                                className="w-full p-4 rounded-lg bg-muted/60 border border-border/50 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-default"
                                            >
                                                {useCase}
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>

                        </div>
                    </Section>
                ))}
            </div>
            <Footer />
        </div>
    );
}
