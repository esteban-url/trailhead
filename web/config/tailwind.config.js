const colors = require('tailwindcss/colors')
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        secondary: colors.sky,
        gray: colors.stone,
        dark: colors.stone,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
