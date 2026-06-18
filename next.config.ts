import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/move-in-cleaning",
        destination: "/services/move-in-move-out",
        permanent: true,
      },
      {
        source: "/services/move-out-cleaning",
        destination: "/services/move-in-move-out",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
