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
    LogOut,
    Home
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/Button";

const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Library },
    { name: "Services", href: "/services", icon: LayoutDashboard },
    { name: "Case Studies", href: "/case-studies", icon: MessageSquare },
    { name: "Contact", href: "/contact", icon: Mail },
];

export default function Sidebar() {
    const collapsed = false;
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();



    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="bg-background/80 backdrop-blur-md border border-border/50 rounded-xl"
                >
                    {mobileOpen ? <LogOut className="rotate-90" /> : <Menu />}
                </Button>
            </div>

            {/* Sidebar Container */}
            <AnimatePresence mode="wait">
                {(mobileOpen || !collapsed) && (
                    <motion.aside
                        initial={mobileOpen ? { x: -300 } : false}
                        animate={{ x: 0 }}
                        exit={mobileOpen ? { x: -300 } : {}}
                        className={cn(
                            "fixed inset-y-0 left-0 z-40 flex flex-col transition-all duration-300",
                            collapsed && !mobileOpen ? "w-20" : "w-72",
                            mobileOpen ? "translate-x-0" : "lg:static",
                            "bg-slate-50/80 backdrop-blur-2xl border-r border-slate-200 shadow-xl"
                        )}
                    >
                        {/* Sidebar Header */}
                        <div className="p-6 flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="relative h-10 w-32 shrink-0 transition-transform group-hover:scale-105">
                                    <Image
                                        src="/new-logo.jpg"
                                        alt="Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </Link>


                        </div>

                        {/* Top Action */}
                        <div className="px-4 mb-8">
                            <Link href="/">
                                <Button
                                    className={cn(
                                        "w-full h-12 bg-white border border-slate-200 text-foreground rounded-2xl flex items-center gap-3 transition-all hover:bg-slate-50 hover:border-brand-primary-orange/50 shadow-sm",
                                        collapsed && !mobileOpen ? "justify-center px-0" : "px-4"
                                    )}
                                >
                                    <Plus size={20} className="shrink-0 text-brand-primary-orange" />
                                    <span className={cn(
                                        "font-medium transition-all duration-300",
                                        collapsed && !mobileOpen ? "hidden" : "block"
                                    )}>New Project</span>
                                </Button>
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-3 space-y-2 overflow-y-auto scrollbar-hide">
                            <div className={cn(
                                "text-[10px] font-bold text-slate-400 px-3 py-2 uppercase tracking-[0.2em]",
                                collapsed && !mobileOpen ? "hidden" : "block"
                            )}>
                                Navigation
                            </div>
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link key={link.name} href={link.href}>
                                        <div className={cn(
                                            "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group relative",
                                            isActive
                                                ? "bg-brand-primary-orange/10 text-brand-primary-orange"
                                                : "text-slate-500 hover:bg-black/5 hover:text-foreground",
                                            collapsed && !mobileOpen ? "justify-center" : ""
                                        )}>
                                            <link.icon size={20} className="shrink-0" />
                                            <span className={cn(
                                                "font-medium transition-all duration-300",
                                                collapsed && !mobileOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                                            )}>
                                                {link.name}
                                            </span>
                                            {isActive && !collapsed && (
                                                <motion.div
                                                    layoutId="sidebar-active"
                                                    className="absolute left-0 w-1 h-6 bg-brand-primary-orange rounded-r-full"
                                                />
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}


                        </nav>


                    </motion.aside>
                )}
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
