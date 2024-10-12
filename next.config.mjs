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
    },
    images: {
        domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
    },
};

export default nextConfig;
