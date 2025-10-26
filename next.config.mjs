// src/next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gzdrvntnlendpjaizsfa.supabase.co',
      },
    ],
  },
};

export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   i18n: {
//     locales: ['fr'],
//     defaultLocale: 'fr',
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'gzdrvntnlendpjaizsfa.supabase.co', // <-- LA LIGNE IMPORTANTE
//       },
//     ],
//   },
// };

// export default nextConfig;