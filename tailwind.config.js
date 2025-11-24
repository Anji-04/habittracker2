/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        border: '#e5e7eb',
      },
    },
  },
  darkMode: ["class"],
  important: true,
  plugins: [],
}
