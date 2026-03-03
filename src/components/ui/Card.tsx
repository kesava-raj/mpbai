import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "glass rounded-3xl p-6 text-foreground transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary-orange/5",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

export { Card };
