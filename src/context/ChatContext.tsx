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
    sessions: ChatSession[];
    startNewProject: () => void;
    updateActiveSession: (messages: Message[]) => void;
    switchSession: (id: string) => void;
    deleteSession: (id: string) => void;
    clearAll: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

    const activeSession = sessions.find(s => s.id === activeSessionId) || null;

    const startNewProject = useCallback(() => {
        setActiveSessionId(null);
    }, []);

    const updateActiveSession = useCallback((messages: Message[]) => {
        if (messages.length === 0) return;

        setSessions(prev => {
            const index = prev.findIndex(s => s.id === activeSessionId);

            // Generate title from first user message
            const firstUserMsg = messages.find(m => m.role === 'user')?.content || "New Session";
            const title = firstUserMsg.length > 30 ? firstUserMsg.substring(0, 30) + "..." : firstUserMsg;

            if (index !== -1) {
                // Update existing session
                const session = prev[index];
                // Guard: only update if changed
                if (session.messages.length === messages.length &&
                    session.messages[session.messages.length - 1].content === messages[messages.length - 1].content) {
                    return prev;
                }

                const updatedSessions = [...prev];
                updatedSessions[index] = { ...session, messages, title };
                return updatedSessions;
            } else {
                // Create new session
                const newId = Date.now().toString();
                const newSession: ChatSession = {
                    id: newId,
                    title,
                    messages,
                    createdAt: new Date()
                };
                setActiveSessionId(newId);
                return [newSession, ...prev];
            }
        });
    }, [activeSessionId]);

    const switchSession = useCallback((id: string) => {
        setActiveSessionId(id);
    }, []);

    const deleteSession = useCallback((id: string) => {
        setSessions(prev => prev.filter(s => s.id !== id));
        setActiveSessionId(current => current === id ? null : current);
    }, []);

    const clearAll = useCallback(() => {
        setSessions([]);
        setActiveSessionId(null);
    }, []);

    return (
        <ChatContext.Provider value={{
            activeSession,
            sessions,
            startNewProject,
            updateActiveSession,
            switchSession,
            deleteSession,
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
