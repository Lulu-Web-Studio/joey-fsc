import type {PortableTextComponents} from "next-sanity";

export const portableTextComponents: PortableTextComponents = {
    block: {
        h1: ({children}) => (
            <h2 className="text-3xl font-bold text-header-text mt-12 mb-6">
                {children}
            </h2>
        ),
        h2: ({children}) => (
            <h3 className="text-2xl font-bold text-header-text mt-10 mb-4">
                {children}
            </h3>
        ),
        h3: ({children}) => (
            <h4 className="text-xl font-bold text-header-text mt-8 mb-3">
                {children}
            </h4>
        ),
        normal: ({children}) => (
            <p className="text-body-text mb-6 leading-relaxed">
                {children}
            </p>
        ),
        blockquote: ({children}) => (
            <blockquote className="border-l-4 border-primary-teal pl-6 py-2 my-6 italic text-body-text">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({children}) => (
            <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
        ),
        number: ({children}) => (
            <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({children}) => <li className="text-body-text">{children}</li>,
        number: ({children}) => <li className="text-body-text">{children}</li>,
    },
    marks: {
        strong: ({children}) => (
            <strong className="font-bold text-header-text">{children}</strong>
        ),
        em: ({children}) => <em className="italic">{children}</em>,
        link: ({children, value}) => (
            <a
                href={value?.href}
                className="text-primary-teal hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
    },
};
