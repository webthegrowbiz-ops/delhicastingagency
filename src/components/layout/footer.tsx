"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";

import { SITE } from "@/lib/constants";
import { FOOTER_GROUPS } from "@/lib/site-navigation";
import { OFFICIAL_DCA_INSTAGRAM_URL, OFFICIAL_DCA_LINKEDIN_URL } from "@/data/media";

function InstagramIcon({ className = "h-5 w-5 text-[#111111]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-5 w-5 text-[#111111]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ className = "h-5 w-5 text-[#111111]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className = "h-5 w-5 text-[#111111]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-gray-200 bg-[#F7F7F5] text-[#111111]">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-wider text-[#111111] uppercase">Delhi Casting Agency</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#555555]">Delhi Casting Agency is an online-first casting platform serving talent across India. Explore casting categories, talent segments, resources and registration information.</p>
            <div className="mt-6 space-y-3 text-xs text-[#666666]">
              <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" /><span>Membership and casting information presented with clear selection disclaimers.</span></div>
              <div className="flex items-start gap-3"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" /><span>Online-first support and community access information.</span></div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link) => <li key={link.href}><Link href={link.href} className="text-xs text-[#555555] transition hover:text-[#D4AF37]">{link.label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-y border-gray-200 py-6 sm:grid-cols-2 md:grid-cols-4">
          <a href="tel:+917074545456" className="flex items-center gap-3 text-xs text-[#555555] transition hover:text-[#D4AF37]"><Phone className="h-4 w-4 text-[#D4AF37]" />+91 7074545456</a>
          <a href="mailto:klmn@gmail.com" className="flex items-center gap-3 text-xs text-[#555555] transition hover:text-[#D4AF37]"><Mail className="h-4 w-4 text-[#D4AF37]" />klmn@gmail.com</a>
          <a href={OFFICIAL_DCA_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs text-[#555555] transition hover:text-[#D4AF37]"><InstagramIcon className="h-4 w-4 text-[#111111] transition-colors group-hover:text-[#D4AF37]" />@delhicastingagency</a>
          <a href={OFFICIAL_DCA_LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs text-[#555555] transition hover:text-[#D4AF37]"><LinkedinIcon className="h-4 w-4 text-[#111111] transition-colors group-hover:text-[#D4AF37]" />Delhi Casting Agency</a>
        </div>

        <div className="mt-8 rounded-xl border border-[#D4AF37]/30 bg-white p-5 shadow-xs">
          <p className="text-center text-xs leading-relaxed text-[#555555]"><span className="font-semibold text-[#D4AF37]">Important Notice:</span> Membership does not guarantee selection, employment, auditions, or roles. Final selection depends on production requirements and audition performance.</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-[#777777] md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.agency}. All Rights Reserved.</p>
          
          {/* Recognizable Social Media Icon Links */}
          <div className="flex items-center gap-5">
            <a href={OFFICIAL_DCA_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#111111] hover:text-[#D4AF37] transition-colors">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={OFFICIAL_DCA_LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#111111] hover:text-[#D4AF37] transition-colors">
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#111111] hover:text-[#D4AF37] transition-colors">
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[#111111] hover:text-[#D4AF37] transition-colors">
              <YoutubeIcon className="h-5 w-5" />
            </a>
          </div>

          <p>Serving aspiring artists across India.</p>
        </div>
      </motion.div>
    </footer>
  );
}
