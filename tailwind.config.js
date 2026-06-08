/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // Dark mode is configured via @custom-variant in index.css (Tailwind v4)
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1e293b',
          accent: '#3b82f6',
        },
      },
    },
  },
  plugins: [],
}
