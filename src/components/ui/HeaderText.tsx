import React from 'react'

interface HeaderTextProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'small' | 'default' | 'large';
    as?: keyof React.JSX.IntrinsicElements; // 'h1' | 'h2' | 'h3' | 'p' | etc.
}

export default function HeaderText({
    children,
    className = "",
    variant = 'default',
    as: Tag = 'h2' // default to <h2>
}: HeaderTextProps) {
    const variants = {
        small: "text-2xl tracking-tight sm:text-3xl",
        default: "text-4xl md:text-5xl tracking-tight",
        large: "text-4xl tracking-tight sm:text-6xl lg:text-7xl"
    }

    return (
        <Tag className={`${variants[variant]} ${className} text-pretty`}>
            {children}
        </Tag>
    );
}
