// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['image.similarpng.com'], // Place this under the `images` key
//   },
//   experimental: {
//     appDir: true, // Retain this only if you are using the app directory feature
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.similarpng.com' || 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
