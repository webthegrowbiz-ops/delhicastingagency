import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

interface ContentSectionProps {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function ContentSection({ eyebrow, title, children, className = "" }: ContentSectionProps) {
  return (
    <section className={`px-6 py-16 md:py-24 ${className}`}>
      <Reveal className="mx-auto max-w-4xl">
        {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">{eyebrow}</p>}
        {title && <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#111111] sm:text-4xl md:text-5xl">{title}</h2>}
        <div className="mt-6 space-y-5 text-base font-normal leading-8 text-[#444444]">{children}</div>
      </Reveal>
    </section>
  );
}
