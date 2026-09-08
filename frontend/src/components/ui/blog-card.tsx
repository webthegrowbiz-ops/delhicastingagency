import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  category: string;
  excerpt: string;
  href: string;
  image?: string;
}

export function BlogCard({ title, category, excerpt, href, image }: BlogCardProps) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/50">
      <div className="aspect-[16/9] overflow-hidden bg-gray-100">{image && <div className="h-full w-full bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${image})` }} />}</div>
      <div className="p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{category}</p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-[#111111] sm:text-2xl">{title}</h3>
            <p className="mt-2 text-sm font-normal leading-6 text-[#555555]">{excerpt}</p>
          </div>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-[#D4AF37]" />
        </div>
      </div>
    </Link>
  );
}
