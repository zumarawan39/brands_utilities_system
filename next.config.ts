import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    experimental: {
    allowedHosts: ['mybrand.local', 'zumar.local'],
  },
};

export default nextConfig;
