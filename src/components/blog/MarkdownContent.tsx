import ReactMarkdown, {type Components} from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Headings clear the fixed header when jumped to from the table of contents.
 * Must stay in step with the header's height.
 */
const HEADING_SCROLL_MARGIN = "scroll-mt-40";

/**
 * Heading ids come from the source file rather than being re-derived here, so
 * the table of contents and the rendered headings can never drift apart. The
 * source line number is the join key — remark preserves it on every node.
 */
function buildComponents(headingIds: Record<number, string>): Components {
  const idFor = (node?: {position?: {start: {line: number}}}) => {
    const line = node?.position?.start.line;
    return line === undefined ? undefined : headingIds[line];
  };

  return {
    // The post title is the page's h1, so body headings start one level down.
    h1: ({node, children}) => (
      <h2
        id={idFor(node)}
        className={`${HEADING_SCROLL_MARGIN} mb-5 mt-14 font-serif text-3xl font-medium text-header-text`}
      >
        {children}
      </h2>
    ),
    h2: ({node, children}) => (
      <h2
        id={idFor(node)}
        className={`${HEADING_SCROLL_MARGIN} mb-5 mt-14 font-serif text-3xl font-medium text-header-text`}
      >
        {children}
      </h2>
    ),
    h3: ({node, children}) => (
      <h3
        id={idFor(node)}
        className={`${HEADING_SCROLL_MARGIN} mb-4 mt-12 font-serif text-2xl font-medium text-header-text`}
      >
        {children}
      </h3>
    ),
    h4: ({children}) => (
      <h4 className="mb-3 mt-10 text-xl font-semibold text-header-text">
        {children}
      </h4>
    ),
    p: ({children}) => (
      <p className="mb-6 text-lg leading-8 text-body-text">{children}</p>
    ),
    a: ({href, children}) => {
      const isExternal = Boolean(href) && !href!.startsWith("/") && !href!.startsWith("#");

      return (
        <a
          href={href}
          className="font-medium text-primary-teal underline decoration-primary-teal/30 underline-offset-4 transition-colors hover:decoration-primary-teal"
          {...(isExternal ? {target: "_blank", rel: "noopener noreferrer"} : {})}
        >
          {children}
        </a>
      );
    },
    ul: ({children}) => (
      <ul className="mb-6 list-disc space-y-3 pl-6 marker:text-primary-teal">
        {children}
      </ul>
    ),
    ol: ({children}) => (
      <ol className="mb-6 list-decimal space-y-3 pl-6 marker:text-primary-teal">
        {children}
      </ol>
    ),
    li: ({children}) => (
      <li className="pl-1 text-lg leading-8 text-body-text">{children}</li>
    ),
    blockquote: ({children}) => (
      <blockquote className="my-10 border-l-2 border-primary-teal py-1 pl-6 font-serif text-xl italic leading-9 text-header-text [&>p]:mb-0 [&>p]:text-inherit">
        {children}
      </blockquote>
    ),
    strong: ({children}) => (
      <strong className="font-semibold text-header-text">{children}</strong>
    ),
    em: ({children}) => <em className="italic">{children}</em>,
    hr: () => <hr className="my-12 border-misty-blue" />,
    // Body images are authored as plain markdown, so their real dimensions are
    // unknown at build time — next/image would need an explicit width/height
    // pair and would distort anything that is not that exact ratio.
    img: ({src, alt}) => (
      <figure className="my-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={typeof src === "string" ? src : undefined}
          alt={alt ?? ""}
          loading="lazy"
          decoding="async"
          className="w-full rounded-3xl shadow-lg"
        />
        {alt && (
          <figcaption className="mt-3 text-center text-sm text-body-text-light">
            {alt}
          </figcaption>
        )}
      </figure>
    ),
    code: ({className, children}) => {
      const isFencedBlock = Boolean(className?.includes("language-"));

      if (isFencedBlock) {
        return <code className={className}>{children}</code>;
      }

      return (
        <code className="rounded bg-misty-blue px-1.5 py-0.5 font-mono text-[0.9em] text-header-text">
          {children}
        </code>
      );
    },
    pre: ({children}) => (
      <pre className="my-8 overflow-x-auto rounded-2xl bg-header-text p-6 text-sm leading-relaxed text-whitesmoke">
        {children}
      </pre>
    ),
    table: ({children}) => (
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse text-left text-base">
          {children}
        </table>
      </div>
    ),
    th: ({children}) => (
      <th className="border-b border-misty-blue px-4 py-3 font-semibold text-header-text">
        {children}
      </th>
    ),
    td: ({children}) => (
      <td className="border-b border-misty-blue px-4 py-3 text-body-text">
        {children}
      </td>
    ),
  };
}

interface MarkdownContentProps {
  content: string;
  /** Source line number → heading id, from `headingIdsByLine()`. */
  headingIds: Record<number, string>;
}

export default function MarkdownContent({content, headingIds}: MarkdownContentProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(headingIds)}>
      {content}
    </ReactMarkdown>
  );
}
