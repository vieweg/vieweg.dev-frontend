module.exports = {
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: ['h-96', 'font-extrabold', 'text-3xl', 'my-12', 'right-0', 'bg-indigo-700', 'bg-indigo-600', 'text-yellow-600',],
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        spinSlow: 'spin 3s linear infinite',
      }
    },
    rotate: {
      30: '30deg',
    },
    maxWidth: {
      '75ch': '75ch',
      'none': 'none',
      'fit': 'fit-content',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  variants: {
    extend: {},
    lineClamp: ['responsive', 'hover'],
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],

}
