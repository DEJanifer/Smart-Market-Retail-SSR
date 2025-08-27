/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0A1128',
        mint: '#7DCEA0',
        coral: '#FF8E7F',
        lavender: '#E0B0FF',
        peach: '#FFCDB2',
        teal: '#40E0D0',
      },
      // Add or modify the typography section here
      typography: ({ theme }) => ({
        DEFAULT: { // This targets the default 'prose' variant
          css: {
            a: {
              textDecoration: 'none', // Remove underline for all links
              // You can also define hover states here if needed
              // '&:hover': {
              //   color: theme('colors.coral'), // Example hover color
              //   textDecoration: 'underline', // Example: add underline on hover
              // },
            },
            // ... other default prose styles
          },
        },
        invert: { // This targets the prose-invert variant
          css: {
            // Set the CSS variable that controls the body text color for prose-invert
            '--tw-prose-invert-body': 'rgba(224, 176, 255, 0.8)', // This is lavender/80
            a: {
              textDecoration: 'none', // Remove underline for links in prose-invert
            // You can also set other colors here if needed, e.g.,
            // '--tw-prose-invert-headings': theme('colors.mint'),
            // '--tw-prose-invert-links': theme('colors.coral'),
              },
          },
        },
      }),
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-pastel': 'linear-gradient(135deg, #FF8E7F 0%, #E0B0FF 50%, #7DCEA0 100%)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(125, 206, 160, 0.5)',
        'neon-intense': '0 0 30px rgba(125, 206, 160, 0.8), 0 0 50px rgba(125, 206, 160, 0.3)',
        'glow': '0 0 30px rgba(255, 142, 127, 0.3)',
        'glow-subtle': '0 0 15px rgba(255, 142, 127, 0.2)',
        'focus': '0 0 0 3px rgba(125, 206, 160, 0.3)',
        'elegant': '0 10px 30px -10px rgba(125, 206, 160, 0.3)',
      },
      transitionProperty: {
        'interactive': 'color, background-color, border-color, box-shadow, transform',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1280px',
      },
    },
  },
  plugins: [
    // Add the @tailwindcss/typography plugin here
    require('@tailwindcss/typography'),
    // Your existing custom function to add utilities
    function({ addUtilities }) {
      const newUtilities = {
        // Interactive button states
        '.btn-primary-interactive': {
          '@apply bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold transition-interactive duration-300 hover:shadow-neon-intense focus:shadow-focus focus:outline-none active:scale-95': {},
        },
        '.btn-secondary-interactive': {
          '@apply border-2 border-mint text-mint px-6 py-3 rounded-full font-semibold transition-interactive duration-300 hover:bg-mint/10 hover:shadow-glow-subtle focus:shadow-focus focus:outline-none active:scale-95': {},
        },
        // Card hover states
        '.card-interactive': {
          '@apply transition-interactive duration-300 hover:shadow-elegant hover:transform hover:scale-105': {},
        },
        // Link states
        '.link-interactive': {
          '@apply transition-interactive duration-200 hover:text-mint focus:text-mint focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-navy': {},
        },
        // Nav link states
        '.nav-link-interactive': {
          '@apply relative transition-interactive duration-200 hover:text-coral focus:text-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-navy after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-coral after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left': {},
        },
      }
      addUtilities(newUtilities)
    }
  ],
};