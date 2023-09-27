/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cloud.modyocdn.com',
          port: '',
          pathname: '/uploads/**/original/**',
        },
      ],
    },
}

module.exports = nextConfig
