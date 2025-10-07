/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'eduka-orange': '#3B4D8F',
        'eduka-teal': '#A5A6C8',
        'eduka-dark-teal': '#A5A6C8',
        'eduka-light-orange': '#3B4D8F',
        'eduka-blue': '#3B4D8F',
        'eduka-blue-dark': '#2D3A7A',
        'gray': {
          25: '#FCFCFD',
          50: '#F9FAFB',
          100: '#F3F4F6',
          150: '#EBEDEF',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          850: '#1A202C',
          900: '#111827',
          950: '#0D1117',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}