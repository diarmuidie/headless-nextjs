const { withAtlasConfig } = require("@wpengine/atlas-next")

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // cacheHandler: require.resolve('./cache-handler'),
  // output: 'standalone',
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/before',
          destination: '/sample-isr/12',
        },
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        {
          source: '/this/:path*',
          destination: '/:one/:path*',
          has: [
            {
              type: 'header',
              key: 'one',
              value: '(?<one>.*)',
            },
          ],
        },
        {
          source: '/sample-odisr-rewrite',
          destination: '/sample-odisr',
        },
        // {
        //   source: '/:first/:second',
        //   destination: '/:first?second=:second',
        // },
      ],
      afterFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
        {
          source: '/after',
          destination: '/somewhere-else',
        },
      ],
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/fallback/:path*',
          destination: `https://my-old-site.com/:path*`,
        },
      ],
    }
  },
  async redirects() {
    return [
      {
        source: '/bar/:path',
        destination: '/:path',
        permanent: true,
      },
    ]
  },
  // output: 'standalone',
  async headers() {
    return [
      {
        source: '/api/revalidate',
        headers: [
          {
            key: 'cache-control',
            value: 'no-cache',
          }
        ]
      },
      {
        source: '/sample-odisr',
        headers: [
          {
            key: 'x-foo',
            value: 'some-foo',
          },
          {
            key: 'x-bar',
            value: 'some-bar',
          },
          {
            key: 'x-nextjs-cache-stale',
            value: 'STALE',
          },
        ],
      },
    ]
  }
}



module.exports = withAtlasConfig(nextConfig, {})
// module.exports = nextConfig
