import Link from "next/link";
import {SERVICE_GUIDES} from "@/config/service-guides";
import type {ServiceSlug} from "@/config/services";

export default function PatientGuide({service}: {service: ServiceSlug}) {
  const guides = SERVICE_GUIDES[service];
  if (!guides) return null;

  return (
    <section aria-label="Planning your treatment" className="container max-w-5xl px-6 py-12 sm:px-8">
      {guides.map((guide) => (
        <div key={guide.title} className="border-t border-primary-teal/20 py-9">
          <h2 className="font-serif text-2xl font-medium text-header-text sm:text-3xl">{guide.title}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-body-text">{guide.text}</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {guide.links.map((link) => (
              <li key={link.href}><Link href={link.href} className="font-semibold text-primary-teal underline underline-offset-4">{link.label}</Link></li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
