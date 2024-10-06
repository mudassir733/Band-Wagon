/** @type {import('next').NextConfig} */

import dotenv from "dotenv"

dotenv.config();
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
