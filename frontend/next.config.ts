import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', process.env.NEXT_MEDIA_BASE?.replace(/^https?:\/\//, '') || ''], // allow localhost
  },
};

export default nextConfig;
