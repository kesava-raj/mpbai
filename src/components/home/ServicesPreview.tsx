"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { MessageSquare, Mic, Bot, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const services = [
    {
        title: "AI Chatbots",
        description: "Customer support and internal knowledge assistants grounded in your data (RAG).",
        icon: MessageSquare,
    },
    {
        title: "AI Voicebots",
        description: "Human-like voice agents for inbound triage and outbound appointment scheduling.",
        icon: Mic,
    },
    {
        title: "Autonomous Agents",
        description: "Task-driven agents that can browse the web, execute code, and perform complex workflows.",
        icon: Bot,
    },
];

export default function ServicesPreview() {
    return (
        <Section className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Capabilities
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            From simple automation to complex reasoning engines, we deploy the right AI architecture for the job.
                        </p>
                    </div>
                    <Link href="/services">
                        <Button variant="secondary" className="hidden md:flex">
                            View All Services <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="group cursor-pointer hover:border-primary/50 transition-colors">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                <service.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {service.description}
                            </p>
                            <div className="flex items-center text-primary font-medium text-sm group-hover:underline">
                                Learn more <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 md:hidden">
                    <Link href="/services">
                        <Button variant="secondary" className="w-full">
                            View All Services <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </Section>
    );
}
