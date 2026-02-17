"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("submitting");
        // Simulate submit
        setTimeout(() => {
            setFormState("success");
        }, 1500);
    };

    return (
        <div className="pt-20 bg-background min-h-screen">
            <Section className="container mx-auto px-4 md:px-6 py-16">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Start a Conversation
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Tell us about your operational challenge. We treat all discussions as confidential.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <Card className="p-8 shadow-lg border-border">
                        {formState === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-4">Request Received</h3>
                                <p className="text-muted-foreground mb-8">
                                    We will review your preliminary details and get back to you within 24 hours.
                                </p>
                                <Button onClick={() => setFormState("idle")} variant="outline">
                                    Send another message
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Organization Name *</label>
                                        <Input placeholder="e.g. Acme Enterprise Logistics" required className="bg-background" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Industry *</label>
                                        <Input placeholder="e.g. Supply Chain, FinTech" required className="bg-background" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Problem Description *</label>
                                    <Textarea
                                        placeholder="Describe the workflow or operational bottleneck you want to solve..."
                                        className="min-h-[120px] bg-background"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Estimated Timeline</label>
                                        <Input placeholder="e.g. Q3 2024, ASAP" className="bg-background" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Budget Range (Optional)</label>
                                        <Input placeholder="e.g. $50k+, $100k+" className="bg-background" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Data Availability</label>
                                    <Input placeholder="e.g. We have historical logs in SQL, PDFs..." className="bg-background" />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full md:w-auto"
                                        isLoading={formState === "submitting"}
                                    >
                                        Start a Conversation
                                    </Button>
                                    <p className="text-xs text-muted-foreground mt-4 text-center md:text-left">
                                        By submitting this form, you acknowledge that MPBx AI Labs will handle your data in accordance with our Privacy Policy.
                                    </p>
                                </div>
                            </form>
                        )}
                    </Card>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-foreground">Email Us</p>
                                <p className="text-muted-foreground">hello@mpbxailabs.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-foreground">Location</p>
                                <p className="text-muted-foreground">Global Delivery / Remote First</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
