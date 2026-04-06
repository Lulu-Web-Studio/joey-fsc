"use client"
import React from "react"
import HeaderText from "./ui/HeaderText"
import BodyText from "./ui/BodyText"
import Button from "./Button"
import {RoughNotation} from "react-rough-notation"
import {isMobile} from "react-device-detect"

type CTAProps = {
  ctaText?: string
  serviceTitle?: string
  buttonHref?: string
}

export default function CTA({ctaText, serviceTitle, buttonHref = "/contact"}: CTAProps) {
  const strokeWidth = isMobile ? 4 : 8

  // Fallback city
  const city = "Trumbull, CT"

  // Button text
  const buttonText = serviceTitle
    ? `Book ${serviceTitle} Consultation`
    : "Schedule Appointment"

  return (
    <section
      className="flex flex-col items-center justify-center py-32"
      aria-labelledby="cta-heading"
    >
      <div className="flex flex-col items-center justify-center w-10/12 sm:w-3/5 mx-auto text-center space-y-8">
        <HeaderText className="text-header-text font-serif font-medium">
          <span>Schedule Your </span>
          <RoughNotation
            type="underline"
            show={true}
            color="#69d9e3"
            animationDuration={1000}
            iterations={1}
            padding={2}
            strokeWidth={strokeWidth}
          >
            {serviceTitle ? `${serviceTitle} ` : "Consultation "}
          </RoughNotation>
          Appointment Today
        </HeaderText>

        <BodyText className="text-body-text">
          {ctaText || "Get personalized care and experience why The Facial Surgery Center is the best oral and maxillofacial surgical center in Trumbull, CT. We are here to help with all your oral and facial needs."}
        </BodyText>
      </div>

      <Button
        text={buttonText}
        href={buttonHref}
        className="mt-8"
        aria-label={`${buttonText} in ${city}`}
      />
    </section>
  )
}
