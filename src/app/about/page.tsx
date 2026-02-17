"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Target, Lightbulb, Users, CheckCircle, Shield, TrendingUp } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="pt-20 bg-background min-h-screen">
            {/* Header */}
            <Section className="container mx-auto px-4 md:px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        We are MPBx AI Labs.
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        An AI Delivery Studio that bridges the gap between <br className="hidden md:block" />
                        innovation and operational reality.
                    </p>
                </motion.div>
            </Section>

            {/* Positioning */}
            <Section className="bg-muted/50 py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-6">What We Do</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            We design and deliver production-grade AI systems embedded into real operational workflows.
                            Unlike marketing agencies that focus on hype, we focus on engineering operational reliability,
                            governance, and tangible business outcomes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="border-l-4 border-l-brand-dark-orange">
                            <div className="flex items-start gap-4">
                                <Target className="w-8 h-8 text-primary mt-1 shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">Our Mission</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        To build practical AI systems that operate inside real workflows, empowering teams to move faster and smarter without sacrificing control.
                                    </p>
                                </div>
                            </div>
                        </Card>
                        <Card className="border-l-4 border-l-brand-primary-orange">
                            <div className="flex items-start gap-4">
                                <Lightbulb className="w-8 h-8 text-secondary mt-1 shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">Our Vision</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        To make AI operational, governed, and trustworthy for the enterprise, moving beyond experiments to sustained value.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Section>

            {/* Ecosystem */}
            <Section className="container mx-auto px-4 md:px-6 py-24">
                <div className="bg-brand-gray-900 rounded-xl p-8 md:p-12 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Powered by MyProBuddy</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        MPBx AI Labs operates with the product and ecosystem support of MyProBuddy,
                        leveraging established infrastructure and shared expertise to deliver enterprise-grade solutions.
                    </p>
                </div>
            </Section>

            {/* Values */}
            <Section className="container mx-auto px-4 md:px-6 py-24 bg-background">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Our Core Values</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((v, i) => (
                        <Card key={i} className="hover:shadow-md transition-shadow">
                            <v.icon className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    );
}

const values = [
    {
        title: "Execution over experimentation",
        desc: "We prioritize shipping working software over endless PoCs.",
        icon: CheckCircle,
    },
    {
        title: "Trust through transparency",
        desc: "We are open about capabilities, limitations, and costs.",
        icon: Shield,
    },
    {
        title: "Operational realism",
        desc: "We design for the messy reality of enterprise data and processes.",
        icon: TrendingUp,
    },
    {
        title: "Accountability",
        desc: "We own our code and our outcomes.",
        icon: Users,
    },
];
