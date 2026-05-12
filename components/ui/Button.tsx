"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium tracking-wider
    transition-all duration-300
    active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-[#8B2942] to-[#A33D56]
      text-[#F5F5F5]
      hover:shadow-lg hover:shadow-[rgba(139,41,66,0.4)]
      hover:scale-105
    `,
    secondary: `
      bg-[rgba(139,41,66,0.15)]
      border border-[rgba(139,41,66,0.4)]
      text-[#D4A574]
      hover:bg-[rgba(139,41,66,0.25)]
      hover:border-[rgba(139,41,66,0.6)]
    `,
    ghost: `
      bg-transparent
      text-[#A0A0A0]
      hover:text-[#F5F5F5]
      hover:bg-[rgba(255,255,255,0.05)]
    `,
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}