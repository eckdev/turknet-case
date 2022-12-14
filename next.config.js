/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_KEY:process.env.API_KEY,
    API_BASE: process.env.API_BASE
  }
}

module.exports = nextConfig
