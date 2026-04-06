/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://www.facialsurgeryct.com",
    generateRobotsTxt: true,
    exclude: ['/studio', '/studio/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/studio', '/studio/*'],
            },
        ],
    },
}
