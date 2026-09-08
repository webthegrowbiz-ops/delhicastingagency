import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  // Filter out any duplicate "Home" item from items array
  const filteredItems = items.filter(
    (item) => item.label.toLowerCase() !== "home" && item.href !== "/"
  );

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#666666]">
      <Link href="/" className="transition hover:text-[#D4AF37]">Home</Link>
      {filteredItems.map((item) => (
        <span key={`${item.label}-${item.href ?? "current"}`} className="flex items-center gap-2">
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          {item.href ? <Link href={item.href} className="transition hover:text-[#D4AF37]">{item.label}</Link> : <span className="text-[#111111] font-semibold">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
