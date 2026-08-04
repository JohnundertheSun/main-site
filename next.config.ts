import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The site was restructured around courses, in-house training and
    // performances. Keep the old URLs alive so existing links, search results
    // and anything already shared do not 404.
    return [
      { source: "/speaking", destination: "/performances", permanent: true },
      { source: "/arts", destination: "/performances", permanent: true },
      { source: "/books", destination: "/books-and-ideas", permanent: true },
      { source: "/insights", destination: "/books-and-ideas", permanent: true },
      { source: "/consulting", destination: "/advisory", permanent: true },
      { source: "/board-advisory", destination: "/advisory", permanent: true },
      { source: "/yabinan-di-poder", destination: "/courses/yabinan-di-poder", permanent: true },
    ];
  },
};

export default nextConfig;
