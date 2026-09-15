import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Two lockfiles exist above this directory; pin the root so tracing is right.
  outputFileTracingRoot: __dirname,
}

export default nextConfig
