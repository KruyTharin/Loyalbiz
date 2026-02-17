import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-black text-white hover:bg-neutral-800",
      secondary: "bg-neutral-100 text-black hover:bg-neutral-200",
      outline:
        "bg-transparent border border-neutral-200 text-black hover:bg-neutral-50",
      ghost: "bg-transparent text-black hover:bg-neutral-100",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-lg",
      md: "px-5 py-2.5 font-medium rounded-xl",
      lg: "px-8 py-4 text-lg font-semibold rounded-2xl",
    };

    return (
      <BaseButton
        ref={ref}
        className={`inline-flex items-center justify-center transition-all active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
