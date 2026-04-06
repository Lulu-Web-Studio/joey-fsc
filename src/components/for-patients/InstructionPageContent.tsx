"use client"

import CTA from "@/components/CTA"
import BodyText from "@/components/ui/BodyText"
import HeaderText from "@/components/ui/HeaderText"
import {RoughNotation} from "react-rough-notation"

interface InstructionItem {
  title: string | null
  content: string | null
}

interface InstructionSection {
  sectionTitle: string | null
  sectionIntro?: string | null
  items?: InstructionItem[] | null
}

interface InstructionPageSettings {
  title: string | null
  introduction: string | null
  sections?: InstructionSection[] | null
}

interface InstructionPageContentProps {
  settings: InstructionPageSettings | null
  defaultTitle: string
  defaultIntroduction: string
  highlightColor: string
  itemAccentClassName: string
}

export default function InstructionPageContent({
  settings,
  defaultTitle,
  defaultIntroduction,
  highlightColor,
  itemAccentClassName,
}: InstructionPageContentProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-6 py-16 pt-40">
      <section className="space-y-4 py-20 text-center">
        <HeaderText className="pb-6 font-serif font-medium text-header-text">
          <RoughNotation
            type="underline"
            show={true}
            color={highlightColor}
            animationDuration={1000}
            iterations={1}
            padding={2}
            strokeWidth={8}
          >
            {settings?.title || defaultTitle}
          </RoughNotation>
        </HeaderText>
        <BodyText className="mx-auto max-w-3xl text-body-text">
          {settings?.introduction || defaultIntroduction}
        </BodyText>
      </section>

      {settings?.sections?.map((section, sectionIndex) => (
        <section
          key={`${section.sectionTitle || "section"}-${sectionIndex}`}
          className="space-y-6"
        >
          <HeaderText className="font-serif font-medium text-header-text">
            {section.sectionTitle}
          </HeaderText>
          {section.sectionIntro && (
            <BodyText className="text-body-text">{section.sectionIntro}</BodyText>
          )}
          {section.items?.map((item, itemIndex) => (
            <BodyText
              className="text-body-text"
              key={`${item.title || "item"}-${itemIndex}`}
            >
              <strong className={itemAccentClassName}>{item.title} - </strong>
              {item.content}
            </BodyText>
          ))}
        </section>
      ))}

      <CTA />
    </div>
  )
}
