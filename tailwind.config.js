/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-green': 'rgb(104, 183, 58)',
        'secound-green': 'rgba(0, 193, 52, 0.702)',
      },
    },
  },
  plugins: [],
}