import type {Metadata} from "next";
import Link from "next/link";
import HeaderText from "@/components/ui/HeaderText";
import BodyText from "@/components/ui/BodyText";
import Underline from "@/components/ui/Underline";
import {FadeIn, FadeInStagger} from "@/components/ui/FadeIn";
import CTA from "@/components/CTA";
import PostCard from "@/components/blog/PostCard";
import {SchemaMarkup} from "@/components/SchemaMarkup";
import {SITE_COLORS} from "@/config/colors";
import {breadcrumbSchema, type Crumb} from "@/lib/schema";
import {pageMetadata} from "@/lib/metadata";
import {BLOG_BASE_PATH, getAllPosts} from "@/lib/blog";

const CRUMBS: Crumb[] = [
  {name: "Home", path: "/"},
  {name: "Blog", path: BLOG_BASE_PATH},
];

export const metadata: Metadata = pageMetadata(
  "Blog | Oral & Maxillofacial Surgery Insights",
  "Articles from the surgeons at the Facial Surgery Center in Trumbull, CT, on wisdom teeth, dental implants, jaw surgery, recovery, and what to expect from treatment.",
  BLOG_BASE_PATH,
);

export default function BlogPage() {
  const posts = getAllPosts();
  const [featuredPost, ...remainingPosts] = posts;

  return (
    <div className="min-h-screen">
      <SchemaMarkup data={breadcrumbSchema(CRUMBS)} />

      <div className="container px-6 pb-16 pt-40 sm:px-8">
        <FadeIn className="mt-8 text-center">
          <HeaderText
            as="h1"
            variant="large"
            className="font-serif font-medium text-header-text sm:py-10"
          >
            From the <Underline color={SITE_COLORS.primaryCyan}>Surgery</Underline>{" "}
            Center
          </HeaderText>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl text-center">
          <BodyText as="p" className="text-body-text">
            Straight answers to the questions patients actually ask us — about
            wisdom teeth, implants, jaw surgery, anaesthesia, and what recovery
            really looks like. Written by the surgeons who do the procedures.
          </BodyText>
        </FadeIn>

        {posts.length === 0 ? (
          <FadeIn className="mx-auto mt-16 max-w-2xl rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-lg">
            <HeaderText
              as="h2"
              variant="small"
              className="font-serif font-medium text-header-text"
            >
              Articles are on the way
            </HeaderText>
            <BodyText as="p" variant="small" className="mt-4 text-body-text-light">
              We are writing our first posts now. In the meantime, our{" "}
              <Link
                href="/for-patients/what-to-expect"
                className="font-semibold text-primary-teal underline-offset-4 hover:underline"
              >
                what to expect
              </Link>{" "}
              guide covers most of what patients ask before a first visit.
            </BodyText>
          </FadeIn>
        ) : (
          <>
            <FadeInStagger className="mt-16">
              <PostCard post={featuredPost} variant="featured" />
            </FadeInStagger>

            {remainingPosts.length > 0 && (
              <FadeInStagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </FadeInStagger>
            )}
          </>
        )}
      </div>

      <CTA />
    </div>
  );
}
