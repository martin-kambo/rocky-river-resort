import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest:  { DEFAULT: '#1C3A2B', light: '#2A5240', dark: '#112218' },
        earth:   { DEFAULT: '#2C2418', light: '#3D3220', dark: '#1A1510' },
        gold:    { DEFAULT: '#C8A85A', light: '#D4BC7A', dark: '#A88A3A' },
        cream:   { DEFAULT: '#F5F0E8', light: '#FAFAF7', dark: '#E8DCC8' },
        sand:    { DEFAULT: '#8a7a65', light: '#a69880', dark: '#6b5c48' },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans:  ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out forwards',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config