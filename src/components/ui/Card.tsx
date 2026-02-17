import * as React from "react";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
