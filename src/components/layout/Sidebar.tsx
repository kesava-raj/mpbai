"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    MessageSquare,
    Library,
    Mail,
    Plus,
    Menu,
    Home,
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/Button";

import { useChat } from "@/context/ChatContext";

const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Library },
    { name: "Services", href: "/services", icon: LayoutDashboard },
    { name: "Case Studies", href: "/case-studies", icon: MessageSquare },
    { name: "Contact", href: "/contact", icon: Mail },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const { activeSession, sessions, startNewProject, switchSession, deleteSession } = useChat();

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="lg:hidden fixed top-4 left-4 z-[60]">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl shadow-md hover:bg-white"
                >
                    {mobileOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {/* Sidebar Container */}
            <AnimatePresence mode="wait">
                <motion.aside
                    initial={false}
                    animate={{
                        width: collapsed ? 80 : 288,
                        x: mobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -300 : 0)
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={cn(
                        "fixed inset-y-0 left-0 z-50 flex flex-col transition-colors duration-300",
                        "lg:relative lg:translate-x-0",
                        mobileOpen ? "shadow-2xl translate-x-0" : "-translate-x-full lg:translate-x-0",
                        "bg-white border-r border-slate-200"
                    )}
                >
                    {/* Sidebar Header */}
                    <div className={cn(
                        "p-6 flex items-center justify-between",
                        collapsed ? "flex-col gap-4 px-2" : "flex-row"
                    )}>
                        <Link href="/" className="flex items-center gap-3 group relative shrink-0">
                            <div className={cn(
                                "relative transition-all duration-300",
                                collapsed ? "h-8 w-8" : "h-10 w-32"
                            )}>
                                <Image
                                    src="/new-logo.jpg"
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Link>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setCollapsed(!collapsed)}
                            className="hidden lg:flex h-8 w-8 rounded-full border border-slate-100 hover:bg-slate-50 transition-all"
                        >
                            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                        </Button>
                    </div>

                    {/* Chat Sessions Section */}
                    <div className="flex-1 flex flex-col min-h-0 overflow-hidden pt-2">
                        <div className={cn(
                            "text-[10px] font-bold text-slate-400 px-7 py-2 uppercase tracking-[0.2em] whitespace-nowrap transition-all mb-2",
                            collapsed ? "opacity-0" : "opacity-100"
                        )}>
                            Recent Projects
                        </div>

                        {/* Top Action */}
                        <div className={cn("px-4 mb-4", collapsed ? "px-2" : "px-4")}>
                            <Link href="/" onClick={() => {
                                startNewProject();
                                setMobileOpen(false);
                            }}>
                                <Button
                                    className={cn(
                                        "w-full h-11 bg-white border border-slate-200 text-foreground rounded-2xl flex items-center transition-all hover:bg-slate-50 hover:border-brand-primary-orange/50 shadow-sm",
                                        collapsed ? "justify-center p-0" : "gap-3 px-4"
                                    )}
                                >
                                    <Plus size={18} className="shrink-0 text-brand-primary-orange" />
                                    {!collapsed && <span className="font-medium text-sm whitespace-nowrap">New Project</span>}
                                </Button>
                            </Link>
                        </div>

                        {/* Sessions List - Scrollable */}
                        <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            <div className="space-y-1">
                                <AnimatePresence initial={false}>
                                    {sessions.map((session) => (
                                        <motion.div
                                            key={session.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            onClick={() => {
                                                switchSession(session.id);
                                                setMobileOpen(false);
                                            }}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer group relative transition-all",
                                                collapsed ? "justify-center px-0" : "",
                                                activeSession?.id === session.id
                                                    ? "bg-brand-primary-orange/5 border border-brand-primary-orange/10"
                                                    : "hover:bg-slate-50 border border-transparent"
                                            )}
                                        >
                                            <MessageSquare
                                                size={18}
                                                className={cn(
                                                    "shrink-0 transition-colors",
                                                    activeSession?.id === session.id ? "text-brand-primary-orange" : "text-slate-400"
                                                )}
                                            />
                                            {!collapsed && (
                                                <span className={cn(
                                                    "text-sm font-medium truncate flex-1 transition-colors",
                                                    activeSession?.id === session.id ? "text-slate-900" : "text-slate-500"
                                                )}>
                                                    {session.title}
                                                </span>
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteSession(session.id);
                                                }}
                                                className={cn(
                                                    "hover:text-brand-red transition-all p-1 rounded-lg hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-sm text-slate-300",
                                                    collapsed ? "absolute -top-1 -right-1" : "opacity-0 group-hover:opacity-100"
                                                )}
                                            >
                                                <X size={14} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {sessions.length === 0 && !collapsed && (
                                    <div className="px-4 py-8 text-center">
                                        <p className="text-xs text-slate-400 italic">No temporary projects yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 mx-4" />

                    {/* Navigation - Bottom Section */}
                    <nav className="px-3 py-6 space-y-1 border-t border-slate-50">
                        <div className={cn(
                            "text-[10px] font-bold text-slate-400 px-3 py-2 uppercase tracking-[0.2em] whitespace-nowrap overflow-hidden transition-all",
                            collapsed ? "opacity-0 h-0" : "opacity-100"
                        )}>
                            Quick Access
                        </div>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)}>
                                    <div className={cn(
                                        "flex items-center rounded-2xl transition-all group relative overflow-hidden",
                                        collapsed ? "justify-center h-12 w-12 mx-auto" : "gap-4 px-4 py-2.5",
                                        isActive
                                            ? "bg-brand-primary-orange/5 text-brand-primary-orange"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-foreground",
                                    )}>
                                        <link.icon size={20} className="shrink-0" />
                                        {!collapsed && <span className="font-medium whitespace-nowrap text-sm">{link.name}</span>}

                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute left-0 w-1 h-6 bg-brand-primary-orange rounded-r-full"
                                            />
                                        )}

                                        {collapsed && (
                                            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[100]">
                                                {link.name}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </motion.aside>
            </AnimatePresence>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}
        </>
    );
}
