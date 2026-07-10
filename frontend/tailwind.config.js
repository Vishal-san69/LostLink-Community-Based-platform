/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],

  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          light: "#3b82f6",
          dark: "#1d4ed8",
        },

        secondary: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dark: "#4f46e5",
        },

        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        info: "#0ea5e9",

        background: "#f8fafc",
        surface: "#ffffff",

        text: {
          DEFAULT: "#1f2937",
          light: "#6b7280",
        },

        border: "#e5e7eb",
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },

      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },

      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.08)",
        soft: "0 2px 12px rgba(0,0,0,0.06)",
        navbar: "0 2px 10px rgba(0,0,0,0.05)",
        popup: "0 20px 40px rgba(0,0,0,0.15)",
      },

      transitionDuration: {
        400: "400ms",
      },

      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },

        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        bounceSlow: {
          "0%,100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-8px)",
          },
        },

        pulseSlow: {
          "0%,100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".6",
          },
        },
      },

      animation: {
        fade: "fadeIn .4s ease-in-out",
        slide: "slideUp .5s ease",
        bounceSlow: "bounceSlow 3s infinite",
        pulseSlow: "pulseSlow 2s infinite",
      },
    },
  },

  plugins: [],
};