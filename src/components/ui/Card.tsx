import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "enterprise-card rounded-lg p-6 text-gray-900 transition-all",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

export { Card };
