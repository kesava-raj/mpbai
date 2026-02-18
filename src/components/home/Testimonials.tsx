"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Quote, ArrowLeft, ArrowRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

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
    },
    {
        quote: "We were skeptical about AI agents, but the proof of concept they built in days convinced our board to go full production.",
        role: "Director of Innovation",
        industry: "Healthcare Provider"
    }
];

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Section className="py-24 bg-muted/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] dark:bg-grid-black/[0.02]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-foreground mb-4"
                    >
                        What Our Clients Say
                    </motion.h2>
                    <p className="text-muted-foreground text-lg">Trusted by operations leaders across industries.</p>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    <div className="absolute top-1/2 -left-12 -translate-y-1/2 hidden md:block z-20">
                        <Button variant="ghost" size="sm" onClick={prev} className="rounded-full p-2 hover:bg-muted">
                            <ArrowLeft size={24} />
                        </Button>
                    </div>

                    <div className="absolute top-1/2 -right-12 -translate-y-1/2 hidden md:block z-20">
                        <Button variant="ghost" size="sm" onClick={next} className="rounded-full p-2 hover:bg-muted">
                            <ArrowRight size={24} />
                        </Button>
                    </div>

                    <div className="overflow-hidden relative min-h-[300px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className="w-full"
                            >
                                <Card className="bg-background/80 backdrop-blur-sm border-border p-8 md:p-12 shadow-xl relative text-center">
                                    <Quote className="w-12 h-12 text-brand-primary-orange/20 mx-auto mb-6" />

                                    <p className="text-lg md:text-2xl font-light italic text-foreground leading-relaxed mb-8">
                                        &quot;{testimonials[currentIndex].quote}&quot;
                                    </p>

                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex gap-1 text-brand-primary-orange mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill="currentColor" />
                                            ))}
                                        </div>
                                        <p className="font-bold text-foreground text-lg">{testimonials[currentIndex].role}</p>
                                        <p className="text-muted-foreground text-sm uppercase tracking-wide font-medium">
                                            {testimonials[currentIndex].industry}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "bg-brand-primary-orange w-8"
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default Testimonials;
