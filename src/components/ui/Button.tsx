"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Using a looser type definition to avoid conflicts between React 19 and Framer Motion types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, ...props }, ref) => {
        const variants = {
            primary: "bg-gradient-to-br from-brand-primary-orange to-brand-red text-white hover:brightness-110 shadow-lg shadow-brand-primary-orange/20 border-none",
            secondary: "bg-brand-purple text-white hover:bg-brand-purple/90 shadow-lg shadow-brand-purple/20 border-none",
            outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground backdrop-blur-sm",
            ghost: "hover:bg-accent/50 hover:text-accent-foreground transition-all",
            link: "text-brand-primary-orange underline-offset-4 hover:underline",
        };

        const sizes = {
            sm: "h-9 px-4 rounded-full text-xs font-semibold",
            md: "h-11 px-6 py-2 rounded-full text-sm font-semibold",
            lg: "h-13 px-10 rounded-full text-base font-bold",
            icon: "h-11 w-11 p-0 rounded-full",
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const MotionButton = motion.button as any;

        return (
            <MotionButton
                ref={ref}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-orange/50 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {props.children}
            </MotionButton>
        );
    }
);
Button.displayName = "Button";

export { Button };
