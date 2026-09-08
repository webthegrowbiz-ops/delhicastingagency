import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-sans text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl text-[#111111]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base font-normal leading-relaxed md:text-lg text-[#444444]">
          {description}
        </p>
      )}
    </Reveal>
  );
}
