"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { MessageSquare, Mic, Bot, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const services = [
    {
        title: "AI Chatbots",
        description: "Intelligent conversational interfaces that understand context and intent, not just keywords.",
        icon: MessageSquare,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        title: "AI Voicebots",
        description: "Human-like voice agents capable of handling complex phone inquiries and scheduling.",
        icon: Mic,
        gradient: "from-purple-500 to-pink-500"
    },
    {
        title: "AI Agents",
        description: "Autonomous agents that can browse, reason, and execute multi-step workflows independently.",
        icon: Bot,
        gradient: "from-amber-500 to-orange-500"
    },
    {
        title: "Workflow Automation",
        description: "End-to-end process automation connecting your disparate tools and data sources.",
        icon: Layers,
        gradient: "from-emerald-500 to-green-500"
    },
];

export function ServicesPreview() {
    return (
        <Section className="py-16 md:py-24 bg-background relative">
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-brand-secondary-orange/5 blur-[100px] rounded-full" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                        >
                            Our Services
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-lg"
                        >
                            We provide comprehensive AI solutions tailored to your specific operational needs.
                        </motion.p>
                    </div>
                    <Link href="/services">
                        <Button variant="secondary" className="hidden md:flex btn-secondary shadow-md hover:scale-105 transition-transform">
                            View All Services <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="h-full group cursor-pointer border border-border/40 bg-card/50 hover:bg-card/80 backdrop-blur-sm hover:border-brand-primary-orange/40 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-lg">
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${service.gradient} transition-opacity duration-300`} />

                                <div className="p-6 flex flex-col h-full">
                                    <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-foreground mb-5 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden shrink-0">
                                        <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${service.gradient}`} />
                                        <service.icon size={24} className="relative z-10" />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm flex-grow">
                                        {service.description}
                                    </p>
                                    <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform mt-auto">
                                        Learn more <ArrowRight className="ml-2 w-4 h-4" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
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

export default ServicesPreview;
