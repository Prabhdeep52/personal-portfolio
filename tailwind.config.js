/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gambarino: ["Gambarino", "serif"], // custom name (references the font-family declared in the @font-face)
        serif: ["var(--font-merriweather)", "serif"],
      },
    },
  },
  plugins: [],
};
