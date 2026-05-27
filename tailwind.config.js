/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.source.html'],
  theme: {
    extend: {
      colors: {
        navy:   { 950:'#0A1730', 900:'#0E1D3B', 800:'#142852', 700:'#1C3468' },
        gold:   { 600:'#B8862C', 500:'#C99A3D', 400:'#D9B05A', 300:'#E7C885' },
        cream:  { 50:'#FBF7EE', 100:'#F5EFE0', 200:'#EDE3CC' },
        ink:    { 900:'#0A0F1F', 700:'#2A2F40' },
      },
      fontFamily: {
        serif: ['Fraunces','ui-serif','Georgia','serif'],
        sans:  ['Inter','ui-sans-serif','system-ui','sans-serif'],
      },
      boxShadow: {
        frame: '0 30px 60px -30px rgba(10,23,48,0.45), 0 10px 20px -10px rgba(10,23,48,0.25)',
      },
    }
  }
}
