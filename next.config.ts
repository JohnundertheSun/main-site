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

      // Wix's own archives map onto the rebuilt ones, which kept the same
      // slugs. /blog is a real section now, so it is deliberately NOT
      // redirected — a rule here would shadow the whole thing.
      { source: "/categories", destination: "/blog", permanent: true },
      { source: "/tags", destination: "/blog", permanent: true },
      { source: "/categories/:slug", destination: "/blog/category/:slug", permanent: true },
      { source: "/tags/:slug", destination: "/blog/tag/:slug", permanent: true },

      // --- Payment links ----------------------------------------------------
      // Checkout still runs on Wix, where CX Pay is connected, but this domain
      // now resolves to Vercel, so /_paylink/... would 404 here. Forward it to
      // the Wix-hosted address of the same site so a pay link keeps working.
      // Temporary on purpose: it goes away when checkout moves onto this site.
      {
        source: "/_paylink/:path*",
        destination: "https://optimizeyourvibe.wixsite.com/site/_paylink/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
