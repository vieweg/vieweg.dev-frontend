module.exports = {
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: ['h-96', 'font-extrabold', 'text-3xl', 'my-12', 'right-0'],
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
    }
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
