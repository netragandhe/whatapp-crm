/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#F4FBF6',   // Main Background
          100: '#EDF8F0',  // Secondary Background
          200: '#DDF7E8',  // Light Mint (Tinted surfaces & badges)
          300: '#A7E8C2',  // Fresh Green (Active states)
          400: '#86D9A9',  // Primary Green (Action buttons & primary accents)
          500: '#5EC68D',
          600: '#3BA56C',
          700: '#2E8456',
          800: '#26382E',  // Main Text
          900: '#1A2820',
        },
        primary: {
          DEFAULT: '#86D9A9',
          light: '#A7E8C2',
          dark: '#26382E',
          50: '#F4FBF6',
          100: '#EDF8F0',
          200: '#DDF7E8',
          300: '#A7E8C2',
          400: '#86D9A9',
          500: '#5EC68D',
          600: '#3BA56C',
          700: '#26382E',
          800: '#26382E',
          900: '#1A2820',
        },
        surface: {
          main: '#F4FBF6',
          secondary: '#EDF8F0',
          tint: '#DDF7E8',
          card: '#FFFFFF',
        },
        ink: {
          main: '#26382E',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
        border: {
          subtle: '#DDE8E0',
          DEFAULT: '#DDE8E0',
        },
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        error: '#DC2626',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'glass-sm': '0 4px 16px rgba(38, 56, 46, 0.04)',
        'glass': '0 8px 28px rgba(38, 56, 46, 0.06)',
        'glass-lg': '0 14px 38px rgba(38, 56, 46, 0.08)',
        'mint-glow': '0 8px 24px rgba(134, 217, 169, 0.35)',
        'subtle-lift': '0 10px 25px -4px rgba(38, 56, 46, 0.07), 0 4px 6px -2px rgba(38, 56, 46, 0.03)',
      },
      borderRadius: {
        'glass': '1.5rem',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionTimingFunction: {
        'in-out-cubic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
