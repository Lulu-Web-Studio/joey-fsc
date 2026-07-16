import {Metadata} from "next";
import {config} from "@/config";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${config.baseUrl}${path}`;

  return {
    title,
    description,
    alternates: {canonical: url},
    openGraph: {title, description, url},
    twitter: {title, description},
  };
}
