"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Workflow, Server, Lock } from "lucide-react";

const features = [
    {
        title: "Workflow-First Delivery",
        description: "We don't just build models; we build systems. We integrate AI directly into your existing ERPs, CRMs, and operational tools.",
        icon: Workflow,
    },
    {
        title: "Governance & Middleware",
        description: "Our proprietary middleware layer ensures all AI outputs are logged, validated, and compliant before reaching your users.",
        icon: ShieldCheck,
    },
    {
        title: "Private Infrastructure",
        description: "Deploy models on your own cloud (AWS, Azure, GCP). Your data never leaves your controlled environment.",
        icon: Server,
    },
    {
        title: "Enterprise Security",
        description: "SOC2 compliant practices, RBAC integration, and full audit trails for every AI interaction.",
        icon: Lock,
    },
];

export default function WhyChooseUs() {
    return (
        <Section className="py-24 bg-muted/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Built for the Enterprise, <br /> Not Just the Sandbox.
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        We bridge the gap between experimental AI and reliable, scalable production systems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-border">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </Section>
    );
}
