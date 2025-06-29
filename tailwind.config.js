/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'playful': ['Fredoka', 'sans-serif'],
        'friendly': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};