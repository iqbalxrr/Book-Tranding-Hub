/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",   // optional but recommended
        hostname: "i.ibb.co",
        pathname: "/**",     // সব path allow করবে
      },
    ],
  },
};

export default nextConfig;