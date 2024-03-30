import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
 
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "a2x.pub",
                port: "",
                pathname: "/*"
            }
        ]
    }
};

export default withNextIntl(nextConfig);