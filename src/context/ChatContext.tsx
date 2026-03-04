"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    quickReplies?: string[];
}

interface ChatSession {
    messages: Message[];
}

interface ChatContextType {
    activeSession: ChatSession | null;
    startNewProject: () => void;
    updateActiveSession: (messages: Message[]) => void;
    startChatWithMessage: (msg: string) => void;
    clearAll: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [activeSession, setActiveSession] = useState<ChatSession | null>(null);

    const startNewProject = useCallback(() => {
        setActiveSession(null);
    }, []);

    const updateActiveSession = useCallback((messages: Message[]) => {
        const hasUserMessage = messages.some(m => m.role === 'user');
        if (!hasUserMessage) return;

        setActiveSession(prev => {
            // Only update if messages actually changed
            if (prev && prev.messages.length === messages.length &&
                prev.messages[prev.messages.length - 1].content === messages[messages.length - 1].content) {
                return prev;
            }
            return { messages };
        });
    }, []);

    const startChatWithMessage = useCallback((msg: string) => {
        const welcomeMsg: Message = {
            id: 'welcome',
            role: 'assistant',
            content: "Hello! I am the Lead AI Architect at MPBx AI Labs. I'm here to translate your vision into a production-ready system. \n\nDescribe your project idea to me, and I can help you architect the solution, build a Business Requirement Document (BRD), and provide a competitive landscape analysis. What are we building today?",
            timestamp: new Date()
        };
        setActiveSession({ messages: [welcomeMsg] });
    }, []);

    const clearAll = useCallback(() => {
        setActiveSession(null);
    }, []);

    return (
        <ChatContext.Provider value={{
            activeSession,
            startNewProject,
            updateActiveSession,
            startChatWithMessage,
            clearAll
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}
