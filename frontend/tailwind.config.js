/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B4513",
        secondary: "#e11d48",
      },
      fontFamily: {
        serif: ["Libre Baskerville", "serif"],
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
