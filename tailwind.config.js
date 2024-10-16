/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
