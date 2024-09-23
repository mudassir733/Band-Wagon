/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/user',
                destination: '/',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
