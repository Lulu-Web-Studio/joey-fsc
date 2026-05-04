"use client"

import CTA from "@/components/CTA"
import { portableTextComponents } from "@/components/sanity/PortableTextComponents"
import BodyText from "@/components/ui/BodyText"
import HeaderText from "@/components/ui/HeaderText"
import { PortableText } from "@portabletext/react"
import { RoughNotation } from "react-rough-notation"

interface WhatToExpectStep {
  title: string | null
  content?: any[] | null
}

interface WhatToExpectSettings {
  title: string | null
  introduction: string | null
  steps?: WhatToExpectStep[] | null
}

interface WhatToExpectContentProps {
  settings: WhatToExpectSettings | null
}

export default function WhatToExpectContent({
  settings,
}: WhatToExpectContentProps) {
  return (
    <section className="px-6 py-16 pt-44 sm:pt-52">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <HeaderText as="h1" className="mb-6 font-serif font-medium text-header-text">
            <RoughNotation
              multiline
              type="underline"
              show={true}
              color="#FFBA01"
              animationDuration={1000}
              iterations={1}
              padding={1}
              strokeWidth={8}
            >
              {settings?.title || "What to Expect During Your Visit"}
            </RoughNotation>
          </HeaderText>
          <BodyText className="mx-auto max-w-3xl leading-relaxed text-body-text">
            {settings?.introduction ||
              "Our commitment to exceptional care means you'll work with highly qualified Oral and Maxillofacial Surgeons. Here's what you can expect during your visit with us."}
          </BodyText>
        </div>

        <div className="mx-auto flex flex-col items-center justify-center">
          {settings?.steps?.map((step, index) => (
            <div key={`${step.title || "step"}-${index}`} className="flex items-start">
              <div className="pb-20">
                <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                  <div className="mb-4 flex flex-row items-center justify-between">
                    <div className="mb-4 flex flex-col items-start gap-4">
                      <span className="mr-3 rounded-full bg-primary-teal px-3 py-1 text-sm font-semibold text-white">
                        STEP {index + 1}
                      </span>
                      <HeaderText
                        variant="small"
                        className="font-serif font-medium text-header-text"
                      >
                        {step.title}
                      </HeaderText>
                    </div>
                  </div>

                  <div className="space-y-4 text-body-text-light">
                    <PortableText
                      value={step.content || []}
                      components={portableTextComponents}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <CTA />
      </div>
    </section>
  )
}
