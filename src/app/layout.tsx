import {config} from "@/config";
import {cn} from "@/lib/utils";
import type {Metadata} from "next";
import {Literata, Nunito_Sans} from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import {VisualEditing} from "next-sanity/visual-editing";
import {draftMode} from "next/headers";
import {SITE_SETTINGS_QUERY} from "@/sanity/queries/settings";

const fontSans = Nunito_Sans({subsets: ["latin"], variable: "--font-sans"});

const fontSerif = Literata({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(config.baseUrl),
  title: {
    absolute: "Facial Surgery Center",
    default: "Facial Surgery Center | Oral & Maxillofacial Surgeons",
  },
  description: "Serving Trumbull Connecticut for over 30 years, The Facial Surgery Center has been providing superior oral maxillofacial care for patients.",
  openGraph: {
    title: config.name.metadata.title,
    description: config.name.metadata.description,
    siteName: "Facial Surgery Center",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.name.metadata.title,
    description: config.name.metadata.description,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {data: siteSettings} = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    stega: false,
  });

  return (
    <html lang="en">
      <head>
        <meta name="norton-safeweb-site-verification" content="H88Z4SQO0HAGQNPYD3N4B31617QGL4SK07IURF44WDBGYHLP1H1KX7XE3QS2T8-ANUJOLXCMPV2XN248POFXRQWCVHPE2UV8GX-BGISUOB2LWUPBE8JXOJCDHCYPELP2" />
        <meta name="wot-verification" content="d8ec0942c528dedee856" />
        <meta name="tp-claim" content="82df465bfeebed" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans",
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <LayoutWrapper
          siteContact={siteSettings?.contact || null}
          siteSocialLinks={siteSettings?.socialLinks || null}
          siteDescription={siteSettings?.siteDescription || null}
        >
          {children}
        </LayoutWrapper>

        {/* Enable live preview */}
        <SanityLive />

        {/* Enable visual editing in draft mode */}
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
