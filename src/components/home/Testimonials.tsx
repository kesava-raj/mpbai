"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "MPBx AI Labs delivered a working voice assistant in 3 weeks that actually handles 60% of our inbound calls. No fluff, just results.",
        role: "VP of Operations",
        industry: "Logistics Company"
    },
    {
        quote: "Finally an AI partner that understands governance. Their middleware gave our compliance team the confidence to approve the rollout.",
        role: "CTO",
        industry: "FinTech Scaleup"
    },
    {
        quote: "The document extraction agent they built saved us 40 hours of manual data entry per week. The ROI was immediate.",
        role: "Head of Product",
        industry: "Insurance Firm"
    }
];

export default function Testimonials() {
    return (
        <Section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Operations Leaders</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <Card key={i} className="relative p-8 border-border">
                            <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20" />
                            <div className="relative z-10 pt-6">
                                <p className="text-foreground text-lg italic mb-6 leading-relaxed">
                                    "{t.quote}"
                                </p>
                                <div>
                                    <p className="font-bold text-foreground">{t.role}</p>
                                    <p className="text-muted-foreground text-sm uppercase tracking-wide">{t.industry}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Section>
    );
}
