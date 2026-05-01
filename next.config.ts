import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,  // Static export ke liye zaroori
  },
  trailingSlash: true,  // SEO ke liye optional
};

export default nextConfig;
