import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CastingCardProps {
  title: string;
  category: string;
  description: string;
  href: string;
  image?: string;
  demo?: boolean;
}

export function CastingCard({
  title,
  category,
  description,
  href,
  image,
  demo = false,
}: CastingCardProps) {
  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D4AF37]/60 hover:shadow-md sm:p-7 text-[#111111]">
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            {category}
          </span>
          {demo && (
            <span className="rounded-full border border-[#D4AF37]/40 bg-[#F7F7F5] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
              Sample Brief
            </span>
          )}
        </div>

        <h3 className="font-sans mb-3 text-xl font-bold tracking-tight text-[#111111] transition-colors group-hover:text-[#D4AF37]">
          {title}
        </h3>

        {image && (
          <div className="relative mb-4 aspect-16/10 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        <p className="flex-1 text-xs leading-relaxed text-[#555555]">
          {description}
        </p>
      </div>

      <div className="mt-6 flex shrink-0 items-center justify-between border-t border-gray-200 pt-4">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] transition-colors group-hover:text-[#D4AF37]"
        >
          <span>View Casting Call</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#777777]">
          DCA Verified
        </span>
      </div>
    </div>
  );
}
