import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Post images come from the sources' own sites (og:image links), so we use
  // plain <img> tags and do not proxy them through Next's image optimizer.
  poweredByHeader: false,
};

export default nextConfig;
