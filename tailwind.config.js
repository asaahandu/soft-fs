/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'eduka-orange': '#3B4D8F',
        'eduka-teal': '#A5A6C8',
        'eduka-dark-teal': '#A5A6C8',
        'eduka-light-orange': '#3B4D8F',
        'eduka-blue': '#3B4D8F',
        'eduka-blue-dark': '#2D3A7A',
      },
    },
  },
  plugins: [],
}