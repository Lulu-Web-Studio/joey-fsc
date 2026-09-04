import { MetadataRoute } from 'next'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { AREAS, AREAS_BASE_PATH, areaHref, getArea } from '@/config/areas'
import { BLOG_BASE_PATH, getAllPosts, postHref } from '@/lib/blog'
import { ALL_AREA_SERVICE_ROUTES_QUERY } from '@/sanity/queries/areaServicePages'
import type { AreaServicePage } from '@/types/sanity'

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
    { path: AREAS_BASE_PATH,                 priority: 0.8 },
    { path: BLOG_BASE_PATH,                  priority: 0.7 },
]

// Paths that should never appear in the sitemap
const excludedPrefixes = ['/studio']

export const revalidate = 3600

function validDate(value?: string) {
    if (!value) return undefined

    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? undefined : date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [services, areaServicePages] = await Promise.all([
        sitemapClient.fetch<{ slug: string; updatedAt?: string }[]>(
            `*[_type == "service"]{ "slug": slug.current, "updatedAt": _updatedAt }`,
        ).catch(() => []),
        sitemapClient.fetch<
            Pick<AreaServicePage, 'townSlug' | 'serviceSlug' | '_updatedAt'>[]
        >(ALL_AREA_SERVICE_ROUTES_QUERY).catch(() => []),
    ])

    // Blog posts are local markdown files, not Sanity documents
    const posts = getAllPosts()

    const staticEntries: MetadataRoute.Sitemap = staticRoutes
        .filter(({ path }) => !excludedPrefixes.some((p) => path.startsWith(p)))
        .map(({ path, priority }) => ({
            url: `${BASE_URL}${path}`,
            changeFrequency: 'monthly',
            priority,
        }))

    const serviceEntries: MetadataRoute.Sitemap = services
        .filter((s) => Boolean(s.slug))
        .map((service) => {
            const lastModified = validDate(service.updatedAt)

            return {
                url: `${BASE_URL}/service/${service.slug}`,
                ...(lastModified ? {lastModified} : {}),
                changeFrequency: 'monthly',
                priority: 0.8,
            }
        })

    const areaEntries: MetadataRoute.Sitemap = AREAS.map((area) => ({
        url: `${BASE_URL}${areaHref(area)}`,
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    // Publishing a valid Sanity document turns on the corresponding route.
    const areaServiceEntries: MetadataRoute.Sitemap = areaServicePages.flatMap(
        (page) => {
            const area = getArea(page.townSlug)
            const isOffered = area?.services.some(
                (service) => service.slug === page.serviceSlug,
            )

            if (!area || !isOffered) return []

            const lastModified = validDate(page._updatedAt)

            return [
                {
                    url: `${BASE_URL}${areaHref(area)}/${page.serviceSlug}`,
                    ...(lastModified ? {lastModified} : {}),
                    changeFrequency: 'monthly',
                    priority: 0.6,
                },
            ]
        },
    )

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
        const lastModified = validDate(post.updatedAt || post.publishedAt)

        return {
            url: `${BASE_URL}${postHref(post.slug)}`,
            ...(lastModified ? {lastModified} : {}),
            changeFrequency: 'monthly',
            priority: 0.6,
        }
    })

    return [
        ...staticEntries,
        ...serviceEntries,
        ...areaEntries,
        ...areaServiceEntries,
        ...postEntries,
    ]
}
