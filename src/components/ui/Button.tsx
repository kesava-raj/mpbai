"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
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
            primary: "bg-brand-primary-orange text-white hover:bg-brand-dark-orange shadow-sm",
            secondary: "bg-brand-purple text-white hover:bg-brand-purple/90 shadow-sm",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        };

        const sizes = {
            sm: "h-9 px-3 rounded-md text-xs",
            md: "h-10 px-4 py-2 rounded-md text-sm",
            lg: "h-11 px-8 rounded-md text-base",
            icon: "h-10 w-10 p-0 rounded-md",
        };

        const MotionButton = motion.button as any;

        return (
            <MotionButton
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
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
