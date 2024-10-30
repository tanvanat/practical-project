// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#76A6B9',
        'custom-green': '#BFCCB5',
        'custom-orange': '#FF6500',
        'custom-grey': '#F5F5F5',
        'custom-blue': '#1E3E62',
        'custom-dark-blue': '#0B192C',
      },
      fontSize: {
        'normal-text': 'text-sm font-semibold leading-6 text-gray-900'
      },
      backgroundImage: {
        'signin-page': "url('/public/img/stethoscope.png')",  
        'kid-smile': "url('/public/img/kid-smile.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ],
};
