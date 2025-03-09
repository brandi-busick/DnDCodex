/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': 'Roboto, Helvetica, sans-serif;',
      'serif': 'Rosarivo, Georgia, serif',
    },
    extend: {
      fontSize: {
        // xs: '0.5rem',
        // sm: '0.75rem',
        //base: '0.8rem',
        // lg: '1rem',
        // xl: '1.25rem',
        // '2xl': '1.5rem',
        // '3xl': '1.8rem',
      },
      aria: {
        cur: 'current="page"',
      },
      colors: {
        zinc: {
          '850': '#1e1e20'
        },
        purple: {
          // 50: '#f8f7fb',
          // 100: '#f1f0f7',
          // 200: '#e5e3f1',
          // 300: '#d0cce6',
          // 400: '#b7aed7',
          // 500: '#9c8cc6',
          // 600: '#866fb3',
          // 700: '#7760a1',
          // 800: '#635087',
          // 900: '#53436f',
          // 950: '#352b4a',
          '50': '#efeffe',
        '100': '#e5e3fc',
        '200': '#cdcbfa',
        '300': '#b2acf5',
        '400': '#9c8bee',
        '500': '#8c6fe5',
        '600': '#7d53d8',
        '700': '#6d44be',
        '800': '#59399a',
        '900': '#49357a',
        '950': '#39285c',
          975: '#211c2c',
          980: '#1c1826',
        },
      },
    },
  },
  darkMode: ['selector', '[data-mode="dark"]'],
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    // ...
  ],
}

