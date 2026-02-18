"use client";

import { useState, useRef, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, ChevronDown, ArrowRight } from "lucide-react";

const services = [
    "AI Agents",
    "AI Chatbots",
    "AI Voicebots",
    "Workflow Automation",
    "AI Consulting",
    "Other"
];

// Custom Select Component - Futuristic Border-Bottom Style
const CustomSelect = ({ value, onChange, options, placeholder }: { value: string, onChange: (val: string) => void, options: string[], placeholder: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative group" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full px-1 py-3 text-left bg-transparent border-b transition-all rounded-none ${isOpen ? 'border-brand-primary-orange' : 'border-border group-hover:border-brand-primary-orange/50'}`}
            >
                <span className={`text-lg ${!value ? 'text-muted-foreground/40' : 'text-foreground'}`}>
                    {value || placeholder}
                </span>
                <ChevronDown size={18} className={`text-muted-foreground/50 transition-transform ${isOpen ? 'rotate-180 text-brand-primary-orange' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5 max-h-60 overflow-y-auto"
                    >
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-left transition-colors text-sm hover:bg-brand-primary-orange/10 hover:text-brand-primary-orange ${value === option ? 'bg-brand-primary-orange/5 text-brand-primary-orange font-medium' : 'text-zinc-700'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function ContactPage() {
    const [formState, setFormState] = useState({
        fullName: "",
        email: "",
        company: "",
        service: "",
        message: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.fullName || !formState.email || !formState.service || !formState.message) return;
        // Simulate API call
        setTimeout(() => setIsSubmitted(true), 1500);
    };

    return (
        <div className="pt-20 pb-16 min-h-screen flex flex-col justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-brand-primary-orange/10 rounded-full blur-[120px] animate-pulse-glow" />
                <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-brand-purple/10 rounded-full blur-[120px] animate-pulse-glow delay-1000" />
            </div>

            <Section>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Start Your <span className="text-gradient">AI Journey</span>
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Tell us about your project. We'll help you build the future.
                            </p>
                        </motion.div>

                        <Card className="relative overflow-hidden p-8 md:p-12 border border-white/10 dark:border-white/5 shadow-2xl bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-3xl">
                            {/* Decorative Gradient Blob */}
                            <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary-orange/10 rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-purple/10 rounded-full blur-[80px] pointer-events-none" />

                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-20 flex flex-col items-center justify-center"
                                    >
                                        <div className="w-24 h-24 bg-gradient-to-tr from-green-500/20 to-emerald-500/10 rounded-full flex items-center justify-center mb-8 text-green-500 shadow-xl ring-1 ring-green-500/20 relative">
                                            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-20" />
                                            <Check size={48} strokeWidth={2.5} />
                                        </div>
                                        <h2 className="text-3xl font-bold mb-4 text-foreground">Message Sent</h2>
                                        <p className="text-muted-foreground text-lg mb-10 max-w-md">
                                            We've received your inquiry. Our team will review your project details and get back to you shortly.
                                        </p>
                                        <Button
                                            onClick={() => setIsSubmitted(false)}
                                            variant="outline"
                                            className="border-brand-primary-orange/20 hover:bg-brand-primary-orange/5 text-foreground px-8 py-6 rounded-xl transition-all"
                                        >
                                            Start Another Project
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-10 relative z-10"
                                    >
                                        {/* Row 1 */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                            <div className="space-y-3 group">
                                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1 group-focus-within:text-brand-primary-orange transition-colors">Full Name <span className="text-brand-primary-orange">*</span></label>
                                                <Input
                                                    placeholder="John Smith"
                                                    className="bg-transparent border-0 border-b border-border rounded-none px-1 h-12 text-lg focus-visible:ring-0 focus-visible:border-brand-primary-orange transition-all placeholder:text-muted-foreground/40"
                                                    value={formState.fullName}
                                                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-3 group">
                                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1 group-focus-within:text-brand-primary-orange transition-colors">Email Address <span className="text-brand-primary-orange">*</span></label>
                                                <Input
                                                    placeholder="john@company.com"
                                                    type="email"
                                                    className="bg-transparent border-0 border-b border-border rounded-none px-1 h-12 text-lg focus-visible:ring-0 focus-visible:border-brand-primary-orange transition-all placeholder:text-muted-foreground/40"
                                                    value={formState.email}
                                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Row 2 */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                            <div className="space-y-3 group">
                                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1 group-focus-within:text-brand-primary-orange transition-colors">Company Name</label>
                                                <Input
                                                    placeholder="Acme Inc."
                                                    className="bg-transparent border-0 border-b border-border rounded-none px-1 h-12 text-lg focus-visible:ring-0 focus-visible:border-brand-primary-orange transition-all placeholder:text-muted-foreground/40"
                                                    value={formState.company}
                                                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-3 group">
                                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1 group-focus-within:text-brand-primary-orange transition-colors">Service Interest <span className="text-brand-primary-orange">*</span></label>
                                                <CustomSelect
                                                    value={formState.service}
                                                    onChange={(val) => setFormState({ ...formState, service: val })}
                                                    options={services}
                                                    placeholder="Select a service"
                                                />
                                            </div>
                                        </div>

                                        {/* Row 3 - Message */}
                                        <div className="space-y-3 group">
                                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1 group-focus-within:text-brand-primary-orange transition-colors">Project Details <span className="text-brand-primary-orange">*</span></label>
                                            <Textarea
                                                placeholder="Tell us about your project, challenges, and goals..."
                                                className="bg-transparent border-0 border-b border-border rounded-none px-1 min-h-[120px] text-lg focus-visible:ring-0 focus-visible:border-brand-primary-orange transition-all resize-none placeholder:text-muted-foreground/40 leading-relaxed"
                                                value={formState.message}
                                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="pt-8">
                                            <Button
                                                type="submit"
                                                size="lg"
                                                variant="primary"
                                                className="w-full py-6 text-lg font-bold shadow-2xl shadow-brand-primary-orange/20 hover:shadow-brand-primary-orange/40 bg-gradient-to-r from-brand-primary-orange to-brand-red border-none hover:scale-[1.02] active:scale-[0.98] transition-all rounded-xl"
                                            >
                                                Send Message <ArrowRight className="ml-2 w-5 h-5" />
                                            </Button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </Card>
                    </div>
                </div>
            </Section>
        </div>
    );
}
