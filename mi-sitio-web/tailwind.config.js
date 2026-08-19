/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores
        brandPurple: '#8B5CF6',
        brandGreen: '#10B981',
        brandBlue: '#3B82F6',
      },
    },
  },
  plugins: [],
}