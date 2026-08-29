import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Cloudflare Pages serves a directory of static files. The site has no
     server code — no API routes, no dynamic rendering — so a static export is
     the whole build, with no Pages adapter needed. */
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
