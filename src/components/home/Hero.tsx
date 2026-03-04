"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import {
    Send,
    Plus,
    Cpu,
    CircleUser,
    Sparkles,
    Code2,
    Briefcase,
    Mail,
    FileText,
    X,
    Check
} from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { useChat } from "@/context/ChatContext";

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    quickReplies?: string[];
};

interface ChatHeroProps {
    initialMessage?: string;
}

export function ChatHero({ initialMessage }: ChatHeroProps) {
    const { activeSession, updateActiveSession } = useChat();
    // Initialize messages from active session if it exists, otherwise use welcome message
    const [messages, setMessages] = useState<Message[]>(activeSession?.messages || [
        {
            id: 'welcome',
            role: 'assistant',
            content: "Hello! I am the Lead AI Architect at MPBx AI Labs. I'm here to translate your vision into a production-ready system. \n\nDescribe your project idea to me, and I can help you architect the solution, build a Business Requirement Document (BRD), and provide a competitive landscape analysis. What are we building today?",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const initialSent = useRef(false);
    const isUpdatingFromContext = useRef(false);

    // Sync messages with global context
    useEffect(() => {
        if (!isUpdatingFromContext.current) {
            updateActiveSession(messages);
        }
        isUpdatingFromContext.current = false;
    }, [messages, updateActiveSession]);

    // Handle switching between sessions (if activeSession changes from outside)
    useEffect(() => {
        if (activeSession && activeSession.messages !== messages) {
            isUpdatingFromContext.current = true;
            setMessages(activeSession.messages);
        } else if (!activeSession && messages.length > 1) {
            // If active session was cleared externally, reset to welcome
            isUpdatingFromContext.current = true;
            setMessages([
                {
                    id: 'welcome',
                    role: 'assistant',
                    content: "Hello! I am the Lead AI Architect at MPBx AI Labs. I'm here to translate your vision into a production-ready system. \n\nDescribe your project idea to me, and I can help you architect the solution, build a Business Requirement Document (BRD), and provide a competitive landscape analysis. What are we building today?",
                    timestamp: new Date()
                }
            ]);
        }
    }, [activeSession, messages]);

    // Contact form state
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactData, setContactData] = useState({ name: "", email: "", phone: "" });
    const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setContactStatus('submitting');
        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...contactData,
                    company: "AI Lead (Chat)",
                    message: "User requested lead follow-up through AI Chat interface."
                })
            });
            setContactStatus('success');
            setTimeout(() => {
                setShowContactForm(false);
                setContactStatus('idle');
            }, 3000);
        } catch (error) {
            console.error(error);
            setContactStatus('error');
        }
    };

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

    const handleSendMessage = useCallback(async (text: string) => {
        const trimmedText = text.trim();
        if (!trimmedText || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: trimmedText,
            timestamp: new Date()
        };

        let currentMessages: Message[] = [];
        setMessages(prev => {
            currentMessages = [...prev, userMessage];
            return currentMessages;
        });

        setInputValue("");
        setIsLoading(true);

        try {
            const context = currentMessages.map(m => ({ role: m.role, content: m.content }));
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.content, context })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Failed to fetch');

            let replyText = data.reply;
            if (replyText.includes('[TRIGGER_CONTACT_FORM]')) {
                replyText = replyText.replace('[TRIGGER_CONTACT_FORM]', '').trim();
                setTimeout(() => setShowContactForm(true), 1500); // Small delay before popup
            }

            let quickReplies: string[] = [];
            const quickRepliesMatch = replyText.match(/\[QUICK_REPLIES\]\s*(.*)/i);
            if (quickRepliesMatch) {
                const optionsString = quickRepliesMatch[1];
                quickReplies = optionsString.split('|').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
                replyText = replyText.replace(/\[QUICK_REPLIES\].*/i, '').trim();
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: replyText,
                timestamp: new Date(),
                quickReplies: quickReplies.length > 0 ? quickReplies : undefined
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error: unknown) {
            console.error(error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, messages]); // messages added to prevent stale closure warning

    // Handle initial message
    useEffect(() => {
        if (initialMessage && !initialSent.current && !isLoading) {
            initialSent.current = true;
            // Introduce a tiny delay to ensure everything is mounted
            const timer = setTimeout(() => {
                handleSendMessage(initialMessage);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [initialMessage, handleSendMessage, isLoading]);

    const onSendClick = () => handleSendMessage(inputValue);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSendClick();
        }
    };

    return (
        <Section className="relative flex-1 flex flex-col p-0 overflow-hidden bg-background h-[100dvh] w-full">
            {/* Top Fade for scrolling text */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />

            {/* Futuristic Tech Background */}
            <div className="absolute inset-0 -z-10 bg-background overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(252,81,9,0.2)_0%,transparent_60%)] pointer-events-none will-change-[transform,opacity]"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.05)_100%)]" />
            </div>

            {/* Chat Container */}
            <div className="flex-1 container mx-auto px-4 md:px-0 max-w-4xl relative z-10 flex flex-col min-h-0 pt-4 md:pt-10">

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto pr-2 md:pr-4 space-y-4 md:space-y-8 pb-32 md:pb-40 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
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
                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-brand-primary-orange to-brand-red flex items-center justify-center border border-slate-100 shadow-lg mt-1">
                                    <Cpu size={18} className="text-white" />
                                </div>
                            )}

                            <div className="flex flex-col gap-1 md:gap-2 max-w-[90%] md:max-w-[80%]">
                                <div className={cn(
                                    "px-4 py-3 md:px-6 md:py-4 text-sm md:text-base leading-relaxed transition-all",
                                    msg.role === 'user'
                                        ? "bg-brand-primary-orange text-white shadow-xl shadow-brand-primary-orange/20 rounded-[20px] md:rounded-[24px] rounded-tr-none"
                                        : "bg-white border border-slate-100 shadow-sm text-slate-800 rounded-[20px] md:rounded-[24px] rounded-tl-none"
                                )}>
                                    <div className="max-w-none break-words font-inter text-sm md:text-base [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_li]:mb-1 [&_li>p]:inline [&_h1]:text-lg md:[&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-2 [&_h1]:mt-4 [&_h2]:text-base md:[&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:mt-3 [&_h3]:text-sm md:[&_h3]:text-base [&_h3]:font-bold [&_h3]:mb-1 [&_h3]:mt-2 [&_strong]:font-bold [&_strong]:text-brand-primary-orange">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                                {msg.quickReplies && msg.quickReplies.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {msg.quickReplies.map((qr, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    if (qr.toLowerCase().includes('contact') || qr.toLowerCase().includes('connect')) {
                                                        setShowContactForm(true);
                                                    } else {
                                                        handleSendMessage(qr);
                                                    }
                                                }}
                                                className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:bg-brand-primary-orange/10 hover:border-brand-primary-orange/30 hover:text-brand-primary-orange transition-all active:scale-95 shadow-sm"
                                            >
                                                {qr}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {msg.role === 'user' && (
                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-md mt-1">
                                    <CircleUser size={18} className="text-brand-primary-orange" />
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
                                <Cpu size={18} className="text-brand-primary-orange animate-pulse" />
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
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent pb-8 pt-32 px-4 md:px-0 z-20 pointer-events-none">
                    <div className="max-w-3xl mx-auto relative group pointer-events-auto">

                        {/* Quick Suggestions */}
                        {!isLoading && messages.length === 1 && (
                            <div className="flex flex-wrap gap-2 mb-4 justify-center animate-in fade-in slide-in-from-bottom-2 duration-700">
                                {[
                                    "Build a BRD for my AI product",
                                    "Analyze my competitors",
                                    "How can AI automate my workflow?"
                                ].map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() => setInputValue(suggestion)}
                                        className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 hover:bg-brand-primary-orange/10 hover:border-brand-primary-orange/30 hover:text-brand-primary-orange transition-all active:scale-95 shadow-sm"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className={cn(
                            "relative flex items-end gap-2 p-2 bg-white rounded-[32px] border border-slate-200 shadow-[0_32px_64px_rgba(0,0,0,0.08)] transition-all duration-500 focus-within:border-brand-primary-orange/40 focus-within:ring-4 focus-within:ring-brand-primary-orange/10 pl-6",
                        )}>

                            <Textarea
                                id="chat-textarea"
                                name="message"
                                ref={textareaRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Describe your project idea..."
                                className="min-h-[52px] max-h-[250px] py-4 resize-none border-none bg-white text-slate-700 md:text-lg font-medium placeholder:text-slate-400 focus-visible:ring-0 px-2 scrollbar-hide font-jakarta"
                                rows={1}
                            />

                            <Button
                                size="icon"
                                onClick={onSendClick}
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
                            <p className="text-[10px] md:text-xs text-slate-400 flex items-center justify-center gap-2 font-inter tracking-wide">
                                <Sparkles size={12} className="text-brand-primary-orange/30" />
                                <span>MPBx AI Labs Delivery Studio • Powered by MyProBuddy Ecosystem</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Contact Form Modal */}
            <AnimatePresence>
                {showContactForm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                            onClick={() => setShowContactForm(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-2xl glass"
                        >
                            <button
                                onClick={() => setShowContactForm(false)}
                                className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {contactStatus === 'success' ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                                        <Check size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-foreground">Received.</h3>
                                    <p className="text-muted-foreground">We will connect with you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleContactSubmit} className="space-y-6">
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-foreground mb-2">Let&apos;s Connect</h3>
                                        <p className="text-sm text-muted-foreground">Share your details to proceed with the blueprint.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <Textarea
                                            placeholder="Name"
                                            className="h-12 min-h-[48px] px-4 font-jakarta text-foreground bg-white border-slate-200 rounded-xl resize-none shrink-0 focus:border-brand-primary-orange/40"
                                            value={contactData.name}
                                            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                                            required
                                            rows={1}
                                        />
                                        <Textarea
                                            placeholder="Email Address"
                                            className="h-12 min-h-[48px] px-4 font-jakarta text-foreground bg-white border-slate-200 rounded-xl resize-none shrink-0 focus:border-brand-primary-orange/40"
                                            value={contactData.email}
                                            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                                            required
                                            rows={1}
                                        />
                                        <Textarea
                                            placeholder="Phone Number"
                                            className="h-12 min-h-[48px] px-4 font-jakarta text-foreground bg-white border-slate-200 rounded-xl resize-none shrink-0 focus:border-brand-primary-orange/40"
                                            value={contactData.phone}
                                            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                                            required
                                            rows={1}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={contactStatus === 'submitting'}
                                        className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-primary-orange to-brand-red text-white hover:opacity-90 transition-opacity font-jakarta font-medium text-lg shadow-lg shadow-brand-primary-orange/20"
                                    >
                                        {contactStatus === 'submitting' ? 'Sending...' : 'Send Details'}
                                    </Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </Section>
    );
}

export default ChatHero;
