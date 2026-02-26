"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import {
    Send,
    Plus,
    Bot,
    User,
    Sparkles,
    Code2,
    Briefcase,
    Mail,
    FileText
} from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
};

const navigationOptions = [
    { label: "Our Services", href: "/services", icon: Code2, desc: "Explore our AI capabilities" },
    { label: "Case Studies", href: "/case-studies", icon: Briefcase, desc: "See what we've built" },
    { label: "Get a Quote", href: "/contact", icon: Mail, desc: "Start your project" },
    { label: "About Us", href: "/about", icon: FileText, desc: "Who we are" },
];

export function Hero() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: "Hello! I'm MPBx AI. I can tell you about our case studies, services, or how we build enterprise AI solutions. What would you like to know?",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [inputValue]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.content })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Failed to fetch');

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.reply,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Error: ${error.message || "Unknown error occurred"}`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Section className="relative h-screen flex flex-col p-0 overflow-hidden bg-background">

            {/* Futuristic Tech Background */}
            <div className="absolute inset-0 -z-10 bg-background overflow-hidden">
                {/* Standard Grid */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />

                {/* Animated Brand Glows */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-brand-primary-orange/20 rounded-full blur-[120px] pointer-events-none"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -40, 0],
                        y: [0, 40, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-purple/15 rounded-full blur-[100px] pointer-events-none"
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.4)_100%)]" />
            </div>

            {/* Header / Logo (Floating) */}
            <div className="pt-8 pb-4 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="flex items-center gap-3">
                    <img src="/logo.svg" alt="MPBx AI Labs" className="h-10 w-10 md:h-12 md:w-12 drop-shadow-2xl" />
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-jakarta">
                        MPBx <span className="text-gradient">AI Labs</span>
                    </h1>
                </div>
            </div>

            {/* Chat Container */}
            <div className="flex-1 container mx-auto px-4 md:px-0 max-w-4xl relative z-10 flex flex-col min-h-0">

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto pr-2 md:pr-4 space-y-8 pb-40 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex gap-4 md:gap-6",
                                msg.role === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            {msg.role === 'assistant' && (
                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-brand-primary-orange to-brand-red flex items-center justify-center border border-white/20 shadow-lg mt-1">
                                    <Bot size={18} className="text-white" />
                                </div>
                            )}

                            <div className={cn(
                                "max-w-[85%] md:max-w-[80%] px-6 py-4 text-sm md:text-base leading-relaxed transition-all",
                                msg.role === 'user'
                                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md rounded-[24px] rounded-tr-sm"
                                    : "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm text-foreground rounded-[24px] rounded-tl-sm"
                            )}>
                                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none break-words whitespace-pre-wrap font-inter">
                                    {msg.content}
                                </div>
                            </div>

                            {msg.role === 'user' && (
                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-border shadow-md mt-1">
                                    <User size={18} className="text-brand-primary-orange" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-4 md:gap-6 justify-start"
                        >
                            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-primary-orange/20 flex items-center justify-center border border-brand-primary-orange/30">
                                <Bot size={18} className="text-brand-primary-orange animate-pulse" />
                            </div>
                            <div className="rounded-2xl px-5 py-4 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 bg-brand-primary-orange/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2.5 h-2.5 bg-brand-primary-orange/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2.5 h-2.5 bg-brand-primary-orange/40 rounded-full animate-bounce"></span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area (Centered Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/90 to-transparent pb-8 pt-20 px-4 md:px-0">
                    <div className="max-w-3xl mx-auto relative group">

                        {/* Resource Menu */}
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute bottom-full left-0 mb-6 w-72 bg-background/95 backdrop-blur-2xl border border-border/50 rounded-[32px] shadow-2xl p-3 z-50 overflow-hidden ring-1 ring-black/5"
                                >
                                    <div className="text-[10px] font-bold text-brand-primary-orange px-4 py-2 uppercase tracking-[0.2em] opacity-80">Knowledge Base</div>
                                    <div className="space-y-1">
                                        {navigationOptions.map((option) => (
                                            <Link
                                                key={option.label}
                                                href={option.href}
                                                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-secondary transition-all group/item"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <div className="p-2.5 bg-brand-primary-orange/10 text-brand-primary-orange rounded-xl group-hover/item:bg-brand-primary-orange group-hover/item:text-white transition-all shadow-sm">
                                                    <option.icon size={18} />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-foreground">{option.label}</div>
                                                    <div className="text-[10px] text-muted-foreground font-inter tracking-tight">{option.desc}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className={cn(
                            "relative flex items-end gap-2 p-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl rounded-[32px] border border-zinc-200/60 dark:border-zinc-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-500 focus-within:border-brand-primary-orange/40 focus-within:ring-4 focus-within:ring-brand-primary-orange/10",
                            isMenuOpen ? "ring-4 ring-brand-primary-orange/10 border-brand-primary-orange/40" : ""
                        )}>

                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={cn(
                                    "h-12 w-12 rounded-full shrink-0 transition-all duration-300 hover:bg-brand-primary-orange/10",
                                    isMenuOpen ? "bg-brand-primary-orange/10 rotate-45" : ""
                                )}
                            >
                                <Plus size={24} className={cn("transition-colors", isMenuOpen ? "text-brand-primary-orange" : "text-muted-foreground")} />
                            </Button>

                            <Textarea
                                id="chat-textarea"
                                name="message"
                                ref={textareaRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about our case studies..."
                                className="min-h-[52px] max-h-[250px] py-4 resize-none border-none bg-transparent text-base md:text-lg font-medium placeholder:text-muted-foreground/30 focus-visible:ring-0 px-2 scrollbar-hide font-jakarta"
                                rows={1}
                            />

                            <Button
                                size="icon"
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isLoading}
                                className={cn(
                                    "h-12 w-12 rounded-full shrink-0 transition-all duration-500 shadow-xl",
                                    inputValue.trim()
                                        ? "bg-gradient-to-br from-brand-primary-orange to-brand-red text-white hover:scale-105 shadow-brand-primary-orange/30"
                                        : "bg-muted text-muted-foreground/20 shadow-none grayscale opacity-30"
                                )}
                            >
                                <Send size={22} className={inputValue.trim() ? "ml-0.5" : ""} />
                            </Button>
                        </div>

                        <div className="text-center mt-5">
                            <p className="text-[10px] md:text-xs text-muted-foreground/40 flex items-center justify-center gap-2 font-inter tracking-wide">
                                <Sparkles size={12} className="text-brand-primary-orange/30" />
                                <span>MPBx AI Labs Delivery Studio • Powered by MyProBuddy Ecosystem</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </Section>
    );
}

export default Hero;
