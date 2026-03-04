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
    const { activeSession, startNewProject } = useChat();

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

                    <div className="flex-1 flex flex-col justify-between">
                        {/* Navigation Section */}
                        <nav className="px-3 py-4 space-y-1">
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

                        {/* Bottom Actions */}
                        <div className="p-4 border-t border-slate-100">
                            <button
                                onClick={() => {
                                    startNewProject();
                                    setMobileOpen(false);
                                    if (window.location.pathname === '/') {
                                        window.scrollTo(0, 0);
                                    }
                                }}
                                className="w-full"
                            >
                                <Button
                                    className={cn(
                                        "w-full h-11 bg-white border border-slate-200 text-foreground rounded-2xl flex items-center transition-all hover:bg-slate-50 hover:border-brand-primary-orange/50 shadow-sm",
                                        collapsed ? "justify-center p-0" : "gap-3 px-4"
                                    )}
                                >
                                    <Plus size={18} className="shrink-0 text-brand-primary-orange" />
                                    {!collapsed && <span className="font-medium text-sm whitespace-nowrap">New Project</span>}
                                </Button>
                            </button>
                        </div>
                    </div>
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
