import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowLeft} from "lucide-react";
import HeaderText from "@/components/ui/HeaderText";
import BodyText from "@/components/ui/BodyText";
import {FadeIn, FadeInStagger} from "@/components/ui/FadeIn";
import CTA from "@/components/CTA";
import PostCard from "@/components/blog/PostCard";
import MarkdownContent from "@/components/blog/MarkdownContent";
import ReadingProgress from "@/components/blog/ReadingProgress";
import TableOfContents from "@/components/blog/TableOfContents";
import FaqList from "@/components/areas/FaqList";
import {SchemaMarkup} from "@/components/SchemaMarkup";
import {blogPostingSchema, breadcrumbSchema, faqSchema, type Crumb} from "@/lib/schema";
import {pageMetadata} from "@/lib/metadata";
import {
  BLOG_BASE_PATH,
  formatPostDate,
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
  headingIdsByLine,
  postHref,
} from "@/lib/blog";

/** The element the reading progress bar and TOC rail are measured against. */
const ARTICLE_ID = "post-body";

const MAX_RELATED_POSTS = 3;

const PRACTICE_AUTHORS = new Set([
  "Facial Surgery Center",
  "The Facial Surgery Center",
]);

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {title: "Article Not Found | Facial Surgery Center"};
  }

  return pageMetadata(
    post.metaTitle || `${post.title} | Facial Surgery Center`,
    post.metaDescription || post.excerpt,
    postHref(slug),
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const publishedOn = formatPostDate(post.publishedAt);
  const updatedOn = formatPostDate(post.updatedAt);
  const reviewedOn = formatPostDate(post.reviewedAt);
  const isPracticeAuthor = !post.author || PRACTICE_AUTHORS.has(post.author);
  const authorUrl =
    post.authorUrl || (isPracticeAuthor ? "/about" : undefined);
  const headingIds = headingIdsByLine(post.headings);

  // Same category first, then most recent — getAllPosts() already returns
  // newest first, and Array#sort is stable, so recency holds within each group.
  const relatedPosts = getAllPosts()
    .filter((candidate) => candidate.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.category === post.category) - Number(a.category === post.category),
    )
    .slice(0, MAX_RELATED_POSTS);

  const crumbs: Crumb[] = [
    {name: "Home", path: "/"},
    {name: "Blog", path: BLOG_BASE_PATH},
    {name: post.title, path: postHref(slug)},
  ];

  return (
    <div className="min-h-screen">
      <ReadingProgress targetId={ARTICLE_ID} />
      <SchemaMarkup data={breadcrumbSchema(crumbs)} />
      <SchemaMarkup
        data={blogPostingSchema({
          title: post.title,
          description: post.excerpt,
          path: postHref(slug),
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          imageUrl: post.coverImage,
          author: post.author,
          authorTitle: post.authorTitle,
          authorUrl,
          authorType: isPracticeAuthor ? "Organization" : "Person",
          reviewedBy: post.reviewedBy,
          reviewerTitle: post.reviewerTitle,
          reviewerUrl: post.reviewerUrl,
          reviewedAt: post.reviewedAt,
        })}
      />

      <div className="container px-6 pt-40 sm:px-8">
        <FadeIn>
          <Link
            href={BLOG_BASE_PATH}
            className="group inline-flex items-center text-sm font-medium text-body-text-light transition-colors hover:text-primary-teal"
          >
            <ArrowLeft className="mr-2 size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            All articles
          </Link>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.14em] text-body-text-light">
            {post.category && (
              <span className="rounded-full bg-bg2 px-3 py-1 text-primary-teal">
                {post.category}
              </span>
            )}
            {publishedOn && <span>Published {publishedOn}</span>}
            {updatedOn && updatedOn !== publishedOn && (
              <span>Updated {updatedOn}</span>
            )}
            <span>{post.readMinutes} min read</span>
          </div>

          <HeaderText
            as="h1"
            className="mt-6 font-serif font-medium text-header-text"
          >
            {post.title}
          </HeaderText>

          {post.excerpt && (
            <BodyText as="p" className="mt-6 text-body-text-light">
              {post.excerpt}
            </BodyText>
          )}

          {(post.author || post.reviewedBy) && (
            <div className="mx-auto mt-7 flex max-w-2xl flex-col items-center gap-2 text-sm text-body-text-light">
              {post.author && (
                <p>
                  Written by{" "}
                  {authorUrl ? (
                    <Link
                      href={authorUrl}
                      className="font-semibold text-primary-teal hover:text-primaryCyan"
                    >
                      {post.author}
                    </Link>
                  ) : (
                    <span className="font-semibold text-header-text">{post.author}</span>
                  )}
                  {post.authorTitle ? `, ${post.authorTitle}` : ""}
                </p>
              )}
              {post.reviewedBy && (
                <p>
                  Medically reviewed by{" "}
                  {post.reviewerUrl ? (
                    <Link
                      href={post.reviewerUrl}
                      className="font-semibold text-primary-teal hover:text-primaryCyan"
                    >
                      {post.reviewedBy}
                    </Link>
                  ) : (
                    <span className="font-semibold text-header-text">
                      {post.reviewedBy}
                    </span>
                  )}
                  {post.reviewerTitle ? `, ${post.reviewerTitle}` : ""}
                  {reviewedOn ? ` on ${reviewedOn}` : ""}
                </p>
              )}
            </div>
          )}
        </FadeIn>

        {post.coverImage && (
          <FadeIn className="mx-auto mt-12 max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-bg2 shadow-xl">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          </FadeIn>
        )}
      </div>

      <div className="container px-6 pb-24 pt-16 sm:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-16 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <article id={ARTICLE_ID} className="w-full max-w-2xl">
            <MarkdownContent content={post.content} headingIds={headingIds} />

            <div className="mt-16 border-t border-misty-blue pt-8">
              <Link
                href={BLOG_BASE_PATH}
                className="group inline-flex items-center text-sm font-medium text-primary-teal transition-colors hover:text-primaryCyan"
              >
                <ArrowLeft className="mr-2 size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to all articles
              </Link>
            </div>
          </article>

          <div>
            <TableOfContents headings={post.headings} targetId={ARTICLE_ID} />
          </div>
        </div>
      </div>

      {post.faqs && post.faqs.length > 0 && (
        <>
          <SchemaMarkup data={faqSchema(post.faqs)} />
          <FaqList title="Common questions" faqs={post.faqs} />
        </>
      )}

      {relatedPosts.length > 0 && (
        <section className="border-t border-misty-blue">
          <div className="container px-6 py-20 sm:px-8">
            <FadeIn>
              <HeaderText
                as="h2"
                variant="small"
                className="text-center font-serif font-medium text-header-text"
              >
                Keep reading
              </HeaderText>
            </FadeIn>

            <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <PostCard key={related.slug} post={related} headingAs="h3" />
              ))}
            </FadeInStagger>
          </div>
        </section>
      )}

      <CTA />
    </div>
  );
}
