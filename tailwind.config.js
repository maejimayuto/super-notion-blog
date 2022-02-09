module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ['Noto Sans JP', 'Helvetica Neue', 'Arial', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Meiryo', 'sans-serif'],
      code: ['Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', 'monospace']
      // TODO: Notion's default font and VSCode's default font are Menlo, which I want to use, but Google fonts doesn't have it, so I gave up.
      // code: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      8: '8px'
    },
    extend: {
      colors: {
        fg: 'rgb(55, 53, 47)',
        'fg-0': 'rgb(55, 53, 47, 0.09)',
        'fg-1': 'rgb(55, 53, 47, 0.16)',
        'fg-2': 'rgb(55, 53, 47, 0.4)',
        'fg-3': 'rgb(55, 53, 47, 0.6)',
        'fg-4': 'rgb(55, 53, 47, 0.8)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
