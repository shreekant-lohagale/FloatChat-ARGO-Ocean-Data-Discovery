/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your brand colors here
        primary: '#5e5cd0',
        secondary: '#6b7785',
        success: '#229741',
        danger: '#de5a5a',
        warning: '#eead20',
        info: '#3d99f5',
        'chat-ai-bubble': '#5e5cd0', // Specific use
        'chat-user-bubble': '#e0e0e0', // Specific use
      },
    },
  },
  plugins: [],
}