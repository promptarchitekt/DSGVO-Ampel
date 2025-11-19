import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1D4ED8",
          green: "#0F766E",
          amber: "#F59E0B",
          red: "#DC2626"
        }
      }
    }
  },
  plugins: []
};

export default config;
