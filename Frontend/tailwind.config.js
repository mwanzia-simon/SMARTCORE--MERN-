/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#0f172a",
        card: "#1e293b",
        hover: "#334155",
        accent: "#3b82f6",
        "accent-hover": "#2563eb",
        highlight: "#22d3ee",
        primary: "#f8fafc",
        secondary: "#cbd5e1",
        muted: "#94a3b8",
        "border-color": "#334155",
      },
    },
  },
  plugins: [],
};
