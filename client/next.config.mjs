/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn2.hubspot.net",
      "1000logos.net",
      "images.crowdspring.com",
      "icon-library.com",
      "w7.pngwing.com",
      "placehold.co",
      "raw.githubusercontent.com",
      "lh3.googleusercontent.com",
      "carreralink.s3.ap-south-1.amazonaws.com",
    ],
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
