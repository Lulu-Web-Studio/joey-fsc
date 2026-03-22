
import { config } from "@/config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {Literata, Nunito_Sans } from "next/font/google";
import "./globals.css";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import Providers from "@/components/theme-provider";
import {SchemaMarkup} from "@/components/SchemaMarkup";



const fontSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });

const fontSerif = Literata({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: [ "400", ],
});

// export const metadata: Metadata = {
//   title: {
//     absolute: config.name.metadata.title.absolute,
//     default: config.name.metadata.title.default,
//     template: config.name.metadata.title.template,
//   },
//   description: config.name.metadata.description,

// };


export const metadata: Metadata = {
  // title: config.name.metadata.title,
  title: {
    absolute: "Facial Surgery Center",
    // template: "%s | Facial Surgery Center",
    default: "Facial Surgery Center | Best Oral and Maxillofacial Surgeons",
  },
  description: "Serving Trumbull Connecticut for over 30 years, The Facial Surgery Center has been providing superior oral maxillofacial care for patients.",
  openGraph: {
    title: config.name.metadata.title,
    description: config.name.metadata.description,
    // url: config.name.metadata.url,
    siteName: "Facial Surgery Center",
    // images: [
    //   {
    //     url: `${config.name.metadata.url}/og-image.png`,
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: config.name.metadata.title,
  //   description: config.name.metadata.description,
  //   images: [`${config.name.metadata.url}/og-image.png`],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="norton-safeweb-site-verification" content="H88Z4SQO0HAGQNPYD3N4B31617QGL4SK07IURF44WDBGYHLP1H1KX7XE3QS2T8-ANUJOLXCMPV2XN248POFXRQWCVHPE2UV8GX-BGISUOB2LWUPBE8JXOJCDHCYPELP2" />
        <SchemaMarkup />
        <meta name="wot-verification" content="d8ec0942c528dedee856" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans",
          fontSans.variable,
          fontSerif.variable,

        )}
      >
        <Providers
          attribute="class"
          defaultTheme="light"
          // enableSystem
          disableTransitionOnChange
        >
          <main>
            <Header />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
