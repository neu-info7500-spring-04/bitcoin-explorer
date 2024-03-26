/** @type {import('next').NextConfig} */
const nextConfig = {env: {
    GRAPHQL_API_GATEWAY_URL: process.env.GRAPHQL_API_GATEWAY_URL
}};

export default nextConfig;
