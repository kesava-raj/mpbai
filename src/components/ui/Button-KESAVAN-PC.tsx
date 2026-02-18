"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Explicitly extending React.ButtonHTMLAttributes to ensure standard props are recognized
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Omit<HTMLMotionProps<"button">, keyof React.ButtonHTMLAttributes<HTMLButtonElement>> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        const variants: Record<string, string> = {
            primary: "bg-brand-dark-orange text-white hover:bg-brand-primary-orange shadow-sm",
            secondary: "bg-brand-primary-orange text-white hover:bg-brand-secondary-orange shadow-sm",
            outline: "border border-brand-dark-orange text-brand-dark-orange hover:bg-brand-dark-orange/5",
            ghost: "text-gray-700 hover:bg-gray-100",
        };

        const sizes: Record<string, string> = {
            sm: "h-8 px-3 text-sm",
            md: "h-10 px-5 text-base",
            lg: "h-12 px-8 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={cn(
                    "relative inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark-orange disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
