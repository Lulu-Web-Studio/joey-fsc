import { MetadataRoute } from 'next'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.facialsurgeryct.com'

// Use a no-CDN client so the sitemap always gets fresh slugs at build/revalidation time
const sitemapClient = createClient({ projectId, dataset, apiVersion, useCdn: false })

const staticRoutes: { path: string; priority: number }[] = [
    { path: '',                              priority: 1.0 },
    { path: '/about',                        priority: 0.8 },
    { path: '/about/meet-the-doctors',       priority: 0.7 },
    { path: '/about/meet-the-team',          priority: 0.7 },
    { path: '/contact',                      priority: 0.9 },
    { path: '/for-patients/what-to-expect',  priority: 0.6 },
    { path: '/for-patients/pre-op',          priority: 0.6 },
    { path: '/for-patients/post-op',         priority: 0.6 },
]

// Paths that should never appear in the sitemap
const excludedPrefixes = ['/studio']

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const services = await sitemapClient
        .fetch<{ slug: string }[]>(`*[_type == "service"]{ "slug": slug.current }`)
        .catch(() => [])

    const staticEntries: MetadataRoute.Sitemap = staticRoutes
        .filter(({ path }) => !excludedPrefixes.some((p) => path.startsWith(p)))
        .map(({ path, priority }) => ({
            url: `${BASE_URL}${path}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority,
        }))

    const serviceEntries: MetadataRoute.Sitemap = services
        .filter((s) => Boolean(s.slug))
        .map((service) => ({
            url: `${BASE_URL}/service/${service.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        }))

    return [...staticEntries, ...serviceEntries]
}
