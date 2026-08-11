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

      // --- Wix blog ---------------------------------------------------------
      // Every post lived at /post/<slug> on Wix, and those links are already
      // out in the world on Facebook. The new slugs are identical to the Wix
      // ones (verified against all 16 posts via the Wix API), so a single
      // wildcard carries every shared link straight to the new article.
      { source: "/post/:slug", destination: "/essays/:slug", permanent: true },

      // Older Wix Blog installs used /single-post/<slug>; anything shared back
      // then still resolves.
      { source: "/single-post/:slug", destination: "/essays/:slug", permanent: true },

      // The blog index and Wix's category/tag archives all now live in one
      // place. These are prefix rules, so /blog/anything is covered too.
      { source: "/blog", destination: "/books-and-ideas", permanent: true },
      { source: "/blog/:path*", destination: "/books-and-ideas", permanent: true },
      { source: "/categories/:path*", destination: "/books-and-ideas", permanent: true },
      { source: "/tags/:path*", destination: "/books-and-ideas", permanent: true },
    ];
  },
};

export default nextConfig;
