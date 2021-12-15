module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ['Noto Sans JP', 'Helvetica Neue', 'Arial', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Meiryo', 'sans-serif'],
    },
    extend: {
      colors: {
        'fg': 'rgb(55, 53, 47)',
        'fg-0': 'rgb(55, 53, 47, 0.09)',
        'fg-1': 'rgb(55, 53, 47, 0.16)',
        'fg-2': 'rgb(55, 53, 47, 0.4)',
        'fg-3': 'rgb(55, 53, 47, 0.6)',
        'fg-4': 'rgb(55, 53, 47, 0.8)'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
