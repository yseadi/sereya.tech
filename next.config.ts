import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Post images come from the sources' own sites (og:image links), so we use
  // plain <img> tags and do not proxy them through Next's image optimizer.
  poweredByHeader: false,
  // Photos Yasmim uploads go through a server action; the browser shrinks big ones first.
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
};

export default nextConfig;
