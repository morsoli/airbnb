/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        appDir: true,
    },
    images:{
        domains: ['avatars.githubusercontent.com','z1.muscache.cn'],
    },
}

module.exports = nextConfig
