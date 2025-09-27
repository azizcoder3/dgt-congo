import type { Config } from 'tailwindcss'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#009B48',
        'brand-gold': '#FFD700',
        'brand-red': '#DC2626',
        'brand-blue': '#00529B',
      },
      objectPosition: {
        'top-center': 'top center',
        'bottom-center': 'bottom center',
        'left-center': 'left center',
        'right-center': 'right center',
      }
    },
  },
  plugins: [],
} satisfies Config

export default config







// // tailwind.config.ts (CODE COMPLET ET ANCIEN)
// import type { Config } from 'tailwindcss'

// const config: Config = {
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx}',
//     './src/components/**/*.{js,ts,jsx,tsx}',
//   ],
  
//   // AJOUT : On ajoute la section 'theme' ici
//   theme: {
//     extend: {
//       // On étend la configuration pour inclure nos nouvelles positions d'objet
//       objectPosition: {
//         'top-center': 'top center',
//         'bottom-center': 'bottom center',
//         'left-center': 'left center',
//         'right-center': 'right center',
//       }
//     },
//   },

//   plugins: [],
// }
// export default config