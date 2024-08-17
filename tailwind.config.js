/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms"

export default {
  content: ["./src/**/*.{html,ts,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    forms
  ],
}
