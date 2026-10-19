import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#030406',
        bg2: '#080C12',
        surface: '#0C121B',
        ink: '#F4F7FB',
        mute: '#929BAA',
        cyan: '#00E5FF',
        blue: '#3478FF',
        signal: '#FF244F',
        violet: '#A855F7',
        line: 'rgba(244,247,251,0.09)',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;