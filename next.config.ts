import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // stop turbopack from reading ANY sourcemaps
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["@prisma/client"], // prevents sourcemap loading
  },
  turbopack: {},
};

export default nextConfig;
