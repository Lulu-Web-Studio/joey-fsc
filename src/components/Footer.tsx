import {config} from "@/config"
import {AREAS_BASE_PATH} from "@/config/areas"
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {FunctionComponent} from "react"

const navigation = {
  forPatients: [
    {name: 'What to Expect', href: '/for-patients/what-to-expect'},
    {name: 'Pre Op', href: '/for-patients/pre-op'},
    {name: "Post Op", href: "/for-patients/post-op"},
  ],
  about: [
    {name: "Meet the Doctors", href: "/about/meet-the-doctors"},
    {name: "Meet the Team", href: "/about/meet-the-team"},
    {name: "About FSC", href: "/about"},
  ],
  company: [
    {name: "Contact", href: "/contact"},
    {name: "Areas We Serve", href: AREAS_BASE_PATH},
    {name: "Referral Form", href: "/referral-form.pdf"},
  ],
}

interface SiteSocialLinks {
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
}

const socialLinkConfig: Array<{
  key: keyof SiteSocialLinks;
  label: string;
  icon: FunctionComponent<{className?: string}>;
}> = [
  {key: "facebook", label: "Facebook", icon: Facebook},
  {key: "instagram", label: "Instagram", icon: Instagram},
  {key: "twitter", label: "X", icon: Twitter},
  {key: "linkedin", label: "LinkedIn", icon: Linkedin},
  {key: "youtube", label: "YouTube", icon: Youtube},
]

export const Footer: FunctionComponent<{
  siteSocialLinks?: SiteSocialLinks | null;
  siteDescription?: string | null;
}> = ({siteSocialLinks, siteDescription}) => {
  const socialLinks = socialLinkConfig.filter(({key}) => Boolean(siteSocialLinks?.[key]));
  const footerDescription =
    siteDescription ||
    "Providing oral and maxillofacial care from our Trumbull office to patients throughout Fairfield County, Connecticut.";

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-14 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="gap-16 xl:grid xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.95fr)] xl:gap-20">
          <div className="max-w-md space-y-6">
            <Link
              href="/"
              aria-label="Facial Surgery Center home"
              className="inline-block transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-4"
            >
              <Image
                width={150}
                height={50}
                alt="Facial Surgery Center Logo"
                src="/images/logo.svg"
                className="h-20 w-auto sm:h-24"
              />
            </Link>

            <p className="max-w-sm text-pretty text-base/8 text-body-text-light">
              {footerDescription}
            </p>

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-x-5 pt-1">
                {socialLinks.map(({key, label, icon: Icon}) => (
                  <a
                    key={key}
                    href={siteSocialLinks?.[key] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-text-light transition-colors hover:text-primary-teal"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon aria-hidden="true" className="size-5" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:mt-0 xl:pt-1">
            <div>
              <h3 className="text-2xl font-serif font-medium text-header-text">For Patients</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.forPatients.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-lg/7 text-body-text transition-colors hover:text-primary-teal">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-medium text-header-text">About</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.about.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-lg/7 text-body-text transition-colors hover:text-primary-teal">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-medium text-header-text">Company</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-lg/7 text-body-text transition-colors hover:text-primary-teal">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-gray-900/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm/6 text-body-text">
            &copy; {new Date().getFullYear()} The {config.name.name}, All rights reserved.
          </p>

          <Link
            target="_blank"
            href="https://www.luluwebstudio.com"
            className="self-start transition-opacity hover:opacity-80 sm:self-auto"
          >
            <Image
              src="/images/Lulu-web-studio-clear.png"
              alt="Lulu Web Studio Logo"
              width={75}
              height={75}
              quality={90}
              className="invert"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
