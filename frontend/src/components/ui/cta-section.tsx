import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  label?: string;
  buttonHref?: string;
  buttonLabel?: string;
}

export function CTASection({
  eyebrow = "Take the next step",
  title,
  description,
  href = "/profile/setup",
  label = "Register Now",
  buttonHref,
  buttonLabel,
}: CTASectionProps) {
  const rawHref = buttonHref ?? href;
  const finalHref = (rawHref === "/register" || rawHref === "/register/") 
    ? "/profile/setup" 
    : rawHref;
  const finalLabel = buttonLabel ?? label;

  return (
    <section className="px-6 py-20 md:py-28 bg-white border-t border-gray-200">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-gray-200 bg-[#F7F7F5] p-8 md:p-12 shadow-sm">
        {/* Decorative glow */}
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Content */}
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              {eyebrow}
            </p>

            <h2 className="font-sans text-3xl font-extrabold leading-tight tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
              {title}
            </h2>

            {description && (
              <p className="mt-4 text-base font-normal leading-7 text-[#444444] md:text-lg">{description}</p>
            )}
          </div>

          {/* CTA */}
          <Link
            href={finalHref}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:scale-[1.03] shadow-md"
          >
            {finalLabel}

            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
