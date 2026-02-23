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
import { Card } from "@/components/ui/Card";
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
        <Section className="relative pt-24 pb-4 md:pt-32 md:pb-8 h-screen flex flex-col overflow-hidden">

            {/* Tech Background */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/80" />
            </div>

            {/* Chat Container */}
            <div className="flex-1 container mx-auto px-4 md:px-0 max-w-4xl relative z-10 flex flex-col min-h-0">

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto pr-2 md:pr-4 space-y-6 md:space-y-8 pb-32 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
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
                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Bot size={18} className="text-primary" />
                                </div>
                            )}

                            <div className={cn(
                                "max-w-[85%] md:max-w-[75%] px-6 py-4 text-sm md:text-base leading-relaxed shadow-sm backdrop-blur-md",
                                msg.role === 'user'
                                    ? "bg-primary text-primary-foreground rounded-3xl rounded-tr-md"
                                    : "bg-secondary/30 border border-primary/20 text-foreground rounded-3xl rounded-tl-md"
                            )}>
                                <div className="prose prose-sm dark:prose-invert max-w-none break-words whitespace-pre-wrap">
                                    {msg.content}
                                </div>
                            </div>

                            {msg.role === 'user' && (
                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center border border-border">
                                    <User size={18} className="text-muted-foreground" />
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
                            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                <Bot size={18} className="text-primary animate-pulse" />
                            </div>
                            <div className="bg-secondary/30 rounded-2xl px-5 py-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area (Fixed Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pb-4 pt-12 px-4 md:px-0">
                    <div className="max-w-3xl mx-auto relative group">

                        {/* + Menu Popup */}
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute bottom-full left-0 mb-4 w-64 bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl p-2 z-50 overflow-hidden"
                                >
                                    <div className="text-xs font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">Navigate</div>
                                    <div className="space-y-1">
                                        {navigationOptions.map((option) => (
                                            <Link
                                                key={option.label}
                                                href={option.href}
                                                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/80 transition-colors group/item"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <div className="p-2 bg-primary/10 text-primary rounded-md group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors">
                                                    <option.icon size={16} />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-foreground">{option.label}</div>
                                                    <div className="text-[10px] text-muted-foreground">{option.desc}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className={cn(
                            "relative flex items-end gap-2 p-2 bg-secondary/30 backdrop-blur-md rounded-3xl border border-white/20 dark:border-white/10 shadow-lg ring-1 ring-transparent focus-within:ring-primary/50 transition-all duration-300",
                            isMenuOpen ? "ring-primary/50" : ""
                        )}>

                            {/* Plus Button */}
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={cn(
                                    "h-10 w-10 rounded-full shrink-0 transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/5",
                                    isMenuOpen ? "rotate-45 bg-white/10 dark:bg-white/5" : ""
                                )}
                            >
                                <Plus size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>

                            <Textarea
                                ref={textareaRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about our case studies..."
                                className="min-h-[44px] max-h-[120px] py-3 resize-none border-none bg-transparent text-base placeholder:text-muted-foreground/50 focus-visible:ring-0 px-2 scrollbar-hide"
                                rows={1}
                            />

                            <Button
                                size="icon"
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isLoading}
                                className={cn(
                                    "h-10 w-10 rounded-full shrink-0 transition-all duration-300 shadow-md",
                                    inputValue.trim()
                                        ? "bg-primary text-primary-foreground hover:scale-105"
                                        : "bg-muted text-muted-foreground/30 shadow-none"
                                )}
                            >
                                <Send size={18} className={inputValue.trim() ? "ml-0.5" : ""} />
                            </Button>
                        </div>

                        <div className="text-center mt-3">
                            <p className="text-[10px] md:text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5">
                                <Sparkles size={10} />
                                <span className="hidden sm:inline">MPBx AI can make mistakes. Consider checking important information.</span>
                                <span className="sm:hidden">AI Generated Response.</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </Section>
    );
}

export default Hero;
