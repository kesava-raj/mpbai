"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface ChatSession {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
}

interface ChatContextType {
    activeSession: ChatSession | null;
    startNewProject: () => void;
    updateActiveSession: (messages: Message[]) => void;
    clearAll: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [activeSession, setActiveSession] = useState<ChatSession | null>(null);

    const startNewProject = () => {
        setActiveSession(null);
        // On navigation to '/', the Home component will show the LandingHero
    };

    const updateActiveSession = (messages: Message[]) => {
        if (messages.length === 0) return;

        // Use the first user message or a generic title
        const firstUserMsg = messages.find(m => m.role === 'user')?.content || "New Session";
        const title = firstUserMsg.length > 30 ? firstUserMsg.substring(0, 30) + "..." : firstUserMsg;

        setActiveSession(prev => ({
            id: prev?.id || Date.now().toString(),
            title: title,
            messages: messages,
            createdAt: prev?.createdAt || new Date(),
        }));
    };

    const clearAll = () => {
        setActiveSession(null);
    };

    return (
        <ChatContext.Provider value={{ activeSession, startNewProject, updateActiveSession, clearAll }}>
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
