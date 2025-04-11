/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./public/*.html",
    "./src/*.{js,html}",
  ],
  theme: {
    extend: {
      colors: {
        green: 'hsl(137, 69%, 27%)',
        shade: 'hsl(137, 49%, 21%)',
        light: 'hsl(0, 0%, 93%)',
        red: 'hsl(0, 87%, 53%)',
      },
      padding: {
        pw: '5vw',
        py: '3.5rem',
        ph: '0.875rem',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.anim-paused': {
          'animation-play-state': 'paused',
        },
        '.anim-running': {
          'animation-play-state': 'running',
        },
      })
    }
  ],
}

