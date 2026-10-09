/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dino: {
          light: '#81C784',
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
          belly: '#FFF59D',
          crest: '#FF9800',
        },
        letter: {
          i: '#0288D1',
          u: '#E91E63',
          star: '#FFD54F',
        }
      },
      borderWidth: {
        '3': '3px',
      },
      spacing: {
        '22': '5.5rem',
        '26': '6.5rem',
      },
      scale: {
        '102': '1.02',
      },
      fontFamily: {
        kids: ['Fredoka', 'Quicksand', 'Nunito', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'wiggle': 'wiggleGentle 0.4s ease-in-out 2',
        'rubber': 'rubberBand 0.8s ease-out',
      },
      keyframes: {
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 4px 8px rgba(255, 193, 7, 0.4))' },
          '50%': { transform: 'scale(1.06)', filter: 'drop-shadow(0 6px 16px rgba(255, 193, 7, 0.8))' },
        },
        wiggleGentle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-6deg)' },
          '75%': { transform: 'rotate(6deg)' },
        },
        rubberBand: {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '30%': { transform: 'scale3d(1.25, 0.75, 1)' },
          '40%': { transform: 'scale3d(0.75, 1.25, 1)' },
          '50%': { transform: 'scale3d(1.15, 0.85, 1)' },
          '65%': { transform: 'scale3d(0.95, 1.05, 1)' },
          '75%': { transform: 'scale3d(1.05, 0.95, 1)' },
          '100%': { transform: 'scale3d(1, 1, 1)' },
        }
      }
    },
  },
  plugins: [],
}
