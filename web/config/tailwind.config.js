const colors = require('tailwindcss/colors')
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        secondary: colors.teal,
        gray: colors.stone,
        dark: colors.stone,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
