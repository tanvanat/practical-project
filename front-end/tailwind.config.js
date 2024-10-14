/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#76A6B9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}