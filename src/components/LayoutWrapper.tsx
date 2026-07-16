"use client";

import {usePathname} from "next/navigation";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import Providers from "@/components/theme-provider";
import {SchemaMarkup} from "@/components/SchemaMarkup";

interface SiteContactInfo {
    phone?: string | null;
    email?: string | null;
}

interface SiteSocialLinks {
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    youtube?: string | null;
}

export default function LayoutWrapper({
    children,
    siteContact,
    siteSocialLinks,
    siteDescription,
}: {
    children: React.ReactNode;
    siteContact?: SiteContactInfo | null;
    siteSocialLinks?: SiteSocialLinks | null;
    siteDescription?: string | null;
}) {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/studio");

    if (isStudio) {
        return <>{children}</>;
    }

    return (
        <Providers
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
            disableTransitionOnChange
        >
            <main>
                <SchemaMarkup />
                <Header siteContact={siteContact} />
                {children}
                <Footer
                    siteSocialLinks={siteSocialLinks}
                    siteDescription={siteDescription}
                />
            </main>
        </Providers>
    );
}
