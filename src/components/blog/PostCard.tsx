import Image from "next/image";
import {ArrowRight} from "lucide-react";
import HeaderText from "@/components/ui/HeaderText";
import BodyText from "@/components/ui/BodyText";
import {FadeInItem} from "@/components/ui/FadeIn";
import {cn} from "@/lib/utils";
import {formatPostDate, postHref, type PostSummary} from "@/lib/blog";

interface PostCardProps {
  post: PostSummary;
  /** "featured" is the wide, side-by-side treatment used for the newest post. */
  variant?: "default" | "featured";
  /** h2 on the index page, h3 under a "Keep reading" heading. */
  headingAs?: "h2" | "h3";
}

/** Warm brand wash for posts that have no cover image set. */
function CoverFallback({label}: {label?: string}) {
  return (
    <div className="flex size-full items-center justify-center bg-gradient-to-br from-bg2 via-primaryPink/40 to-primaryCyan/40">
      <span className="px-6 text-center font-serif text-lg text-header-text/70">
        {label || "Facial Surgery Center"}
      </span>
    </div>
  );
}

/** Post card shared by the blog index and the related-posts rail. Must sit inside a FadeInStagger. */
export default function PostCard({
  post,
  variant = "default",
  headingAs = "h2",
}: PostCardProps) {
  const isFeatured = variant === "featured";
  const publishedOn = formatPostDate(post.publishedAt);

  return (
    <FadeInItem
      as="a"
      href={postHref(post.slug)}
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary-teal",
        isFeatured && "sm:grid sm:grid-cols-2 sm:items-stretch",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-bg2",
          isFeatured ? "aspect-[16/10] sm:aspect-auto sm:h-full" : "aspect-[16/10]",
        )}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            fill
            sizes={
              isFeatured
                ? "(max-width: 640px) 100vw, 50vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <CoverFallback label={post.category} />
        )}
      </div>

      <div className={cn("flex flex-1 flex-col p-7", isFeatured && "sm:p-10")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.14em] text-body-text-light">
          {post.category && (
            <span className="rounded-full bg-bg2 px-3 py-1 text-primary-teal">
              {post.category}
            </span>
          )}
          {publishedOn && <span>{publishedOn}</span>}
        </div>

        <HeaderText
          as={headingAs}
          variant="small"
          className={cn(
            "mt-4 font-serif font-medium text-header-text transition-colors duration-300 group-hover:text-primary-teal",
            isFeatured && "sm:text-4xl",
          )}
        >
          {post.title}
        </HeaderText>

        {post.excerpt && (
          <BodyText
            as="p"
            variant="small"
            className="mt-3 flex-1 leading-relaxed text-body-text-light"
          >
            {post.excerpt}
          </BodyText>
        )}

        <span className="mt-6 flex items-center justify-between border-t border-misty-blue pt-4 text-sm font-medium text-primary-teal transition-colors duration-300 group-hover:text-primaryCyan">
          <span>{post.readMinutes} min read</span>
          <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </FadeInItem>
  );
}
