/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2E86AB",
        accent: "#6FB07F",
        secondary: "#F6C85F",
        surface: "#1a1a1a",
        surfacelight: "#282c34",
        highlight: "#E87A41"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: [],
};
