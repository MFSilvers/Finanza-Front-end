/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          dark: '#1E3A8A',
          navy: '#1E3A8A',
          slate: '#1F2937',
          light: '#3B82F6',
        },
        secondary: {
          DEFAULT: '#3B82F6',
          medium: '#3B82F6',
          graphite: '#1F2937',
        },
        accent: {
          blue: '#1E3A8A',
          'blue-light': '#3B82F6',
          'blue-dark': '#1E3A8A',
        },
        success: {
          DEFAULT: '#059669',
          light: '#059669',
          dark: '#059669',
        },
        error: {
          DEFAULT: '#DC2626',
          light: '#DC2626',
          dark: '#DC2626',
        },
        warning: {
          DEFAULT: '#D97706',
          light: '#D97706',
          dark: '#D97706',
        },
        neutral: {
          50: '#FFFFFF',
          100: '#E5E7EB',
          200: '#E5E7EB',
          300: '#E5E7EB',
          400: '#6B7280',
          500: '#6B7280',
          600: '#6B7280',
          700: '#1F2937',
          800: '#1F2937',
          900: '#1F2937',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.5rem',
      },
      boxShadow: {
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
