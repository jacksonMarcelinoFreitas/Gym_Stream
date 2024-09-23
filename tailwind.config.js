const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(),
  ],
  plugins: [
    flowbite.plugin(),
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      'white': '#FFFFFF',
      // 'white': '#ffffff',

      'light-color': '#F1F0F0',
      'dark-color': '#FFFFFF',

      'orange-primary': '#EB3B00',
      'orange-900': '#431407',
      'orange-600': '#ea580c',
      'orange-300': '#fb923c',

      'stone-800': '#1c1917',
      'stone-700': '#44403c',
      'stone-600': '#57534e',
      'stone-500': '##78716c',
      'stone-400': '#a8a29e',
      'stone-300': '#d6d3d1',

      'violet-primary': '#5800EB',
      'violet-900': '#2e1065',
      'violet-600': '#7c3aed',
      'violet-300': '#a78bfa',

      'cyan-primary': '#00EBB4',
      'cyan-900': '#082f49',
      'cyan-600': '#0284c7',
      'cyan-300': '#67e8f9',
    },
    fontFamily: {
      'display': ['Montserrat'],
      'body': ['Montserrat'],
      'default-font': ['Montserrat'],
    }
  }
}

