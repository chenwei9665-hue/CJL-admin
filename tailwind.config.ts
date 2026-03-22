import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A8CFF",
        accent: "#FF6900",
        textPrimary: "#0F172A",
        textSecondary: "#475569",
        border: "#E2E8F0",
        background: "#F8FAFC",
        heroDark: "#071A2F",
        lightBlue: "#EFF6FF",
        lightOrange: "#FFF4EB"
      },
      boxShadow: {
        card: "0 8px 24px rgba(15, 23, 42, 0.08)",
        cardHover: "0 14px 34px rgba(15, 23, 42, 0.14)"
      },
      borderRadius: {
        card: "24px",
        btn: "16px"
      },
      maxWidth: {
        content: "1200px"
      }
    }
  },
  plugins: []
};

export default config;
