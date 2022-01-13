const colors = require('tailwindcss/colors')
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        secondary: colors.sky,
        dark: colors.stone,
      },
    },
  },
  plugins: [],
}
