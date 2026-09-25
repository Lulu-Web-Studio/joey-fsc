import React from "react"
import HeaderText from "./ui/HeaderText"
import BodyText from "./ui/BodyText"
import Button from "./Button"
import Underline from "./ui/Underline"
import { FadeIn } from "./ui/FadeIn"
import {SITE_COLORS} from "@/config/colors"

type CTAProps = {
  ctaText?: string
  serviceTitle?: string
  buttonHref?: string
}

export default function CTA({ctaText, serviceTitle, buttonHref = "/contact"}: CTAProps) {
  // Fallback city
  const city = "Trumbull, CT"

  // Button text
  const buttonText = serviceTitle
    ? `Book ${serviceTitle} Consultation`
    : "Schedule Appointment"

  return (
    <section
      className="flex flex-col items-center justify-center py-32"
      aria-label="Request a consultation"
    >
      <FadeIn className="flex flex-col items-center justify-center w-10/12 sm:w-3/5 mx-auto text-center space-y-8">
        <HeaderText className="text-header-text font-serif font-medium">
          <span>Schedule Your </span>
          <Underline color={SITE_COLORS.primaryCyan}>
            {serviceTitle ? `${serviceTitle} ` : "Consultation "}
          </Underline>
          Appointment Today
        </HeaderText>

        <BodyText as="p" className="text-body-text">
          {ctaText || "Discuss your concerns and treatment options with our oral and maxillofacial surgery team in Trumbull, CT. We welcome patients from throughout Fairfield County."}
        </BodyText>
      </FadeIn>

      <Button
        text={buttonText}
        href={buttonHref}
        className="mt-8"
        aria-label={`${buttonText} in ${city}`}
      />
    </section>
  )
}
