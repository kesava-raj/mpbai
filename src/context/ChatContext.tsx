"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

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

    const startNewProject = useCallback(() => {
        setActiveSession(null);
    }, []);

    const updateActiveSession = useCallback((messages: Message[]) => {
        if (messages.length === 0) return;

        setActiveSession(prev => {
            // Guard: Only update if the messages are actually different
            const isDifferent = !prev ||
                prev.messages.length !== messages.length ||
                prev.messages[prev.messages.length - 1].content !== messages[messages.length - 1].content;

            if (!isDifferent) return prev;

            const firstUserMsg = messages.find(m => m.role === 'user')?.content || "New Session";
            const title = firstUserMsg.length > 30 ? firstUserMsg.substring(0, 30) + "..." : firstUserMsg;

            return {
                id: prev?.id || Date.now().toString(),
                title: title,
                messages: messages,
                createdAt: prev?.createdAt || new Date(),
            };
        });
    }, []);

    const clearAll = useCallback(() => {
        setActiveSession(null);
    }, []);

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
