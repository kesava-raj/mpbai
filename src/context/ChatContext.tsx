"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";

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
    startChatWithMessage: (msg: string) => void;
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
        const hasUserMessage = messages.some(m => m.role === 'user');
        if (!hasUserMessage) return;

        let newId: string | null = null;

        setSessions(prev => {
            const index = prev.findIndex(s => s.id === activeSessionId);

            const firstUserMsg = messages.find(m => m.role === 'user')?.content || "New Session";
            const title = firstUserMsg.length > 30 ? firstUserMsg.substring(0, 30) + "..." : firstUserMsg;

            if (index !== -1) {
                const session = prev[index];
                if (session.messages.length === messages.length &&
                    session.messages[session.messages.length - 1].content === messages[messages.length - 1].content) {
                    return prev;
                }

                const updatedSessions = [...prev];
                updatedSessions[index] = { ...session, messages, title };
                return updatedSessions;
            } else {
                newId = Date.now().toString();
                const newSession: ChatSession = {
                    id: newId,
                    title,
                    messages,
                    createdAt: new Date()
                };
                return [newSession, ...prev];
            }
        });

        if (newId) {
            setActiveSessionId(newId);
        }
    }, [activeSessionId]);

    useEffect(() => {
        if (!activeSessionId && sessions.length > 0) {
            setActiveSessionId(sessions[0].id);
        }
    }, [sessions, activeSessionId]);

    const switchSession = useCallback((id: string) => {
        setActiveSessionId(id);
    }, []);

    const deleteSession = useCallback((id: string) => {
        setSessions(prev => prev.filter(s => s.id !== id));
        setActiveSessionId(current => current === id ? null : current);
    }, []);

    const startChatWithMessage = useCallback((msg: string) => {
        const newId = Date.now().toString();
        const newSession: ChatSession = {
            id: newId,
            title: msg.length > 30 ? msg.substring(0, 30) + "..." : msg,
            messages: [
                {
                    id: 'welcome',
                    role: 'assistant',
                    content: "Hello! I am the Lead AI Architect at MPBx AI Labs. I'm here to translate your vision into a production-ready system. \n\nDescribe your project idea to me, and I can help you architect the solution, build a Business Requirement Document (BRD), and provide a competitive landscape analysis. What are we building today?",
                    timestamp: new Date()
                }
            ],
            createdAt: new Date()
        };
        setSessions(prev => [newSession, ...prev]);
        setActiveSessionId(newId);
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
            startChatWithMessage,
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
