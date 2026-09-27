import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fdf6ef",
        rose: {
          DEFAULT: "#c9847a",
          light: "#e8b4ae",
          dark: "#a0635a",
        },
        gold: {
          DEFAULT: "#c4a96b",
          light: "#e8d5a3",
        },
        dark: {
          DEFAULT: "#3d2c2c",
          muted: "#8a6f6f",
        },
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        lato: ["var(--font-lato)", "sans-serif"],
        dancing: ["var(--font-dancing)", "cursive"],
      },
      maxWidth: {
        mobile: "480px",
      },
    },
  },
  plugins: [],
};
export default config;
