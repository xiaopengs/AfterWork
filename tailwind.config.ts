import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Mobile-first dark theme
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0D0D0D",
        "primary-light": "#1A1A1A",
        "accent-wine": "#8B2942",
        "accent-wine-light": "#A33D56",
        "accent-gold": "#D4A574",
        "accent-gold-light": "#E8C9A4",
        "text-primary": "#F5F5F5",
        "text-secondary": "#A0A0A0",
        "neon-pink": "#FF6B9D",
        "neon-blue": "#4ECDC4",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      // Mobile optimizations
      screens: {
        "xs": "375px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
      },
    },
  },
  plugins: [],
  // Safelist for mobile-optimized utility classes
  safelist: [
    // Mobile touch feedback classes
    "active:scale-95",
    "active:opacity-80",
    "touch-pan-y",
    "touch-pan-x",
    // Dark theme classes
    "dark",
    "dark:bg-primary",
    "dark:text-text-primary",
    // Animation reduced motion
    "motion-reduce:transition-none",
    "motion-reduce:transform-none",
    "motion-reduce:animate-none",
  ],
};

export default config;
