import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Every route on this site is prerendered, so it exports to plain files and
  // needs no adapter and no Node process to serve it. The export is opt-in so
  // the default build keeps whatever the current host does; deploy/README.md
  // sets STATIC_EXPORT=1 for Cloudflare.
  output: process.env.STATIC_EXPORT ? 'export' : undefined,
  // Two lockfiles exist above this directory; pin the root so tracing is right.
  outputFileTracingRoot: __dirname,
}

export default nextConfig
