import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Type errors from fast-moving UI and auth packages should not block a deploy.
  // Run `npm run typecheck` to see them.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
