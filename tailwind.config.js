import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Clash Display'", ...defaultTheme.fontFamily.sans],
        sans: ["'Sora'", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        soft: "0 25px 65px -30px rgba(0, 76, 31, 0.35)",
      },
      backgroundImage: {
        "grid-green":
          "radial-gradient(circle at 1px 1px, rgba(0, 90, 50, 0.12) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

