import * as React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full bg-neutral-50 border border-neutral-100 rounded-xl px-4 py-3 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 transition-all ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";
