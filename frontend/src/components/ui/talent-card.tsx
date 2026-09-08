import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface TalentCardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
}

export function TalentCard({ title, description, href, image }: TalentCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37]/60 hover:shadow-xl"
    >
      <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-100">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/20 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

        <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Category
              </p>
              <h3 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {title}
              </h3>
              {description && (
                <p className="mt-1 line-clamp-2 text-xs font-normal leading-relaxed text-white/80">
                  {description}
                </p>
              )}
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-xs transition duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white">
              <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
