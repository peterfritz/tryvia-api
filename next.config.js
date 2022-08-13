/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api.php',
        destination: '/api/questions/list',
      },
      {
        source: '/api_token.php',
        destination: '/api/token/create',
      },
      {
        source: '/api_category.php',
        destination: '/api/categories/list',
      },
    ]
  },
}

module.exports = nextConfig
