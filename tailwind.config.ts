import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-manrope)', 'sans-serif'],
        signature: ['var(--font-sacramento)', 'cursive'],
      },
      colors: {
        dark: {
          bg: '#080808',
          card: '#121212',
          border: '#222222',
          text: '#EAEAEA',
          muted: '#888888',
        },
        accent: {
          yellow: '#FFD700',
          blue: '#3b82f6',
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      cursor: {
        'arrow-circle': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%23444444' fill-opacity='0.9' stroke='%23666' stroke-width='1'/%3E%3Cpath d='M14 26L26 14M26 14H16M26 14V24' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") 12 12, pointer`,
        'gray-dot': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='10' fill='%23666666' fill-opacity='0.8' stroke='none'/%3E%3C/svg%3E") 16 16, auto`,
      },
    },
  },
  plugins: [],
};

export default config;
