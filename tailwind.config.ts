import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        accent: "var(--accent)",
        "accent-warm": "var(--accent-warm)",
        text: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)",
        saffron: "var(--saffron)",
        "saffron-soft": "var(--saffron-soft)",
        "mi-blue": "var(--mi-blue)",
        "india-green": "var(--india-green)",
        "white-soft": "var(--white-soft)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        heavy: ["var(--font-archivo-black)", "Impact", "sans-serif"],
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
    },
  },
  plugins: [],
};

export default config;
