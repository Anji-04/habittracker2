export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      borderColor: {
        border: '#your-color-value', // add your desired border color here
      },
    },
  },
  plugins: [],
}
