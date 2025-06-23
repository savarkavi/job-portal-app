import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://yvxr8qcckq.ufs.sh/**")],
  },
};

export default nextConfig;
