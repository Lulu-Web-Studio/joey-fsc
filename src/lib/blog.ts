import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {format} from "date-fns";
import type {Faq} from "@/config/areas";

/** Markdown posts live here, one file per post. Filename becomes the URL slug. */
const POSTS_DIRECTORY = path.join(process.cwd(), "blogs");

const MARKDOWN_EXTENSION = ".md";

/** Average adult reading speed for non-technical prose. */
const WORDS_PER_MINUTE = 200;

const MAX_HEADING_ID_LENGTH = 60;

export const BLOG_BASE_PATH = "/blog";

/** Everything an author can set in a post's frontmatter block. */
export interface PostFrontmatter {
  title: string;
  excerpt: string;
  category?: string;
  publishedAt?: string;
  author?: string;
  authorTitle?: string;
  coverImage?: string;
  coverImageAlt?: string;
  /** Overrides the <title> tag. Defaults to "{title} | Facial Surgery Center". */
  metaTitle?: string;
  /** Overrides the meta description. Defaults to the excerpt. */
  metaDescription?: string;
  /** Hidden from the site in production builds; still visible in dev. */
  draft?: boolean;
  /**
   * Optional Q&A block rendered under the article. Also emitted as FAQPage
   * JSON-LD, so keep answers self-contained and factual.
   */
  faqs?: Faq[];
}

export interface TocHeading {
  /** Matches the `id` rendered on the corresponding heading element. */
  id: string;
  text: string;
  /** 2 for top-level sections, 3 for nested ones. */
  level: 2 | 3;
  /** 1-based line in the source file — how ids are matched to rendered nodes. */
  line: number;
}

export interface PostSummary extends PostFrontmatter {
  slug: string;
  readMinutes: number;
}

export interface Post extends PostSummary {
  /** Raw markdown body, frontmatter already stripped. */
  content: string;
  headings: TocHeading[];
}

export function postHref(slug: string) {
  return `${BLOG_BASE_PATH}/${slug}`;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, MAX_HEADING_ID_LENGTH)
    .replace(/-+$/, "");
}

/** Turns `**Bold** and [linked](/x)` into plain text for the contents list. */
function stripInlineMarkdown(text: string) {
  return text
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
    .trim();
}

/**
 * Pulls the heading outline out of the markdown source. Ids are derived here —
 * rather than in the renderer — so the table of contents and the rendered
 * headings are guaranteed to agree, including the numeric suffix that
 * disambiguates repeated headings. Each entry carries its source line, which is
 * what the renderer matches on.
 */
export function extractHeadings(markdown: string): TocHeading[] {
  const usedIds = new Map<string, number>();
  const headings: TocHeading[] = [];
  let insideCodeFence = false;

  markdown.split("\n").forEach((rawLine, index) => {
    // A `#` inside a fenced code block is a comment, not a heading.
    if (/^\s*(```|~~~)/.test(rawLine)) {
      insideCodeFence = !insideCodeFence;
      return;
    }
    if (insideCodeFence) return;

    const match = /^(#{1,3})\s+(.+?)\s*#*\s*$/.exec(rawLine);
    if (!match) return;

    const text = stripInlineMarkdown(match[2]);
    if (!text) return;

    const base = slugify(text) || "section";
    const seen = usedIds.get(base) ?? 0;
    usedIds.set(base, seen + 1);

    headings.push({
      id: seen === 0 ? base : `${base}-${seen}`,
      text,
      // The post title is the page's h1, so `#` and `##` are both top-level
      // sections in the body; only `###` nests.
      level: match[1].length === 3 ? 3 : 2,
      line: index + 1,
    });
  });

  return headings;
}

/** Maps each heading's source line to its id, for the markdown renderer. */
export function headingIdsByLine(headings: TocHeading[]) {
  return Object.fromEntries(headings.map((heading) => [heading.line, heading.id]));
}

/** Rounds up so a short post never reads as "0 min". */
export function readingTime(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^[#>\-*+\s]+/gm, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export function formatPostDate(date: string | null | undefined) {
  if (!date) return "";

  const dateOnly = DATE_ONLY_PATTERN.exec(date);

  // `new Date("2026-07-30")` is parsed as UTC midnight, which formats as the
  // previous day in any timezone west of Greenwich. Build calendar dates from
  // their parts so the date an author typed is the date a reader sees.
  const parsed = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(date);

  return Number.isNaN(parsed.getTime()) ? "" : format(parsed, "MMMM d, yyyy");
}

/**
 * YAML turns an unquoted `2026-07-30` into a Date at UTC midnight. Keep such
 * values as plain calendar dates; only a quoted timestamp keeps its time.
 */
function normalizePublishedAt(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);

  return String(value);
}

function readPostFile(slug: string) {
  const filePath = path.join(POSTS_DIRECTORY, `${slug}${MARKDOWN_EXTENSION}`);

  if (!fs.existsSync(filePath)) return null;

  const {data, content} = matter(fs.readFileSync(filePath, "utf8"));
  const frontmatter = data as Partial<PostFrontmatter>;

  // A post with no title would render a blank heading and an empty <title>.
  if (!frontmatter.title) return null;

  return {
    frontmatter: {
      ...frontmatter,
      title: frontmatter.title,
      excerpt: frontmatter.excerpt ?? "",
      publishedAt: normalizePublishedAt(frontmatter.publishedAt),
    } as PostFrontmatter,
    content,
  };
}

/** Drafts stay visible while developing and disappear from production builds. */
function isVisible(frontmatter: PostFrontmatter) {
  return !frontmatter.draft || process.env.NODE_ENV !== "production";
}

/** Slugs of every visible post — for generateStaticParams() and the sitemap. */
export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

/** Every visible post, newest first. Bodies are not included. */
export function getAllPosts(): PostSummary[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return [];

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith(MARKDOWN_EXTENSION))
    .map((file) => {
      const slug = file.slice(0, -MARKDOWN_EXTENSION.length);
      const post = readPostFile(slug);

      if (!post || !isVisible(post.frontmatter)) return null;

      return {
        ...post.frontmatter,
        slug,
        readMinutes: readingTime(post.content),
      };
    })
    .filter((post): post is PostSummary => post !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? 0).getTime() -
        new Date(a.publishedAt ?? 0).getTime(),
    );
}

export function getPostBySlug(slug: string): Post | null {
  const post = readPostFile(slug);

  if (!post || !isVisible(post.frontmatter)) return null;

  return {
    ...post.frontmatter,
    slug,
    content: post.content,
    headings: extractHeadings(post.content),
    readMinutes: readingTime(post.content),
  };
}
