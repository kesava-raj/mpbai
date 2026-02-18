"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Workflow, Settings, Bot, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        title: "Workflow-first AI systems",
        description: "We don't just build models; we embed intelligence directly into your existing operational workflows.",
        icon: Workflow,
        gradient: "from-brand-primary-orange to-brand-red"
    },
    {
        title: "Production-grade delivery",
        description: "Reliable, scalable, and secure AI systems designed for real-world enterprise usage, not just demos.",
        icon: Settings,
        gradient: "from-brand-red to-brand-purple"
    },
    {
        title: "AI agents & automation",
        description: "Autonomous agents that can execute complex tasks, reducing manual overhead and increasing efficiency.",
        icon: Bot,
        gradient: "from-brand-purple to-brand-dark-orange"
    },
    {
        title: "End-to-end execution",
        description: "From strategy and design to development and deployment, we handle the entire lifecycle.",
        icon: Zap,
        gradient: "from-brand-dark-orange to-brand-primary-orange"
    }
];

export function WhyChooseUs() {
    return (
        <Section className="py-16 md:py-20 relative overflow-hidden bg-muted/20">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                    >
                        Why Choose <span className="text-gradient">MPBx AI Labs</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg"
                    >
                        We bridge the gap between experimental AI and reliable, scalable production systems.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <Card className="h-full border border-border/40 bg-background/50 backdrop-blur-sm hover:border-brand-primary-orange/50 transition-all duration-300 group overflow-hidden relative shadow-sm hover:shadow-md">
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${feature.gradient} transition-opacity duration-300`} />

                                <div className="p-6 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[1px] mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="w-full h-full rounded-2xl bg-background/90 backdrop-blur-xl flex items-center justify-center">
                                            <feature.icon strokeWidth={1.5} size={24} className="text-foreground" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

export default WhyChooseUs;
