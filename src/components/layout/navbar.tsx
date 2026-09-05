"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, User, X } from "lucide-react";

import Image from "next/image";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { NAV_GROUPS, type NavGroup, type NavItem } from "@/lib/site-navigation";
import { AccountTypeModal } from "@/components/auth/AccountTypeModal";
import { NotificationBell } from "@/components/notifications/NotificationBell";

function DesktopDropdown({ group }: { group: NavGroup }) {
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);

  if (!group.items) {
    return (
      <Link
        href={group.href}
        className="whitespace-nowrap text-[11px] lg:text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-semibold uppercase tracking-[0.08em] xl:tracking-[0.12em] text-[#111111] transition duration-200 hover:text-[#D4AF37]"
      >
        {group.label}
      </Link>
    );
  }

  const activeItem = hoveredItem || group.items[0];
  const previewImage = activeItem?.image || group.defaultImage || "/media/dca/actors/dca-actors-hero-banner.jpg";
  const previewTitle = activeItem?.label || group.label;
  const previewDesc = activeItem?.description || group.defaultDescription || "";

  return (
    <div className="group relative flex items-center">
      <Link
        href={group.href}
        className="inline-flex items-center gap-1 xl:gap-1.5 whitespace-nowrap text-[11px] lg:text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-semibold uppercase tracking-[0.08em] xl:tracking-[0.12em] text-[#111111] transition duration-200 hover:text-[#D4AF37]"
      >
        <span>{group.label}</span>
        <ChevronDown className="h-3 w-3 xl:h-3.5 xl:w-3.5 shrink-0 text-[#D4AF37] transition duration-200 group-hover:rotate-180" />
      </Link>

      <div className="pointer-events-none absolute left-1/2 top-full w-[620px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 z-50">
        <div className="rounded-2xl border border-gray-200 bg-white/98 p-4 shadow-2xl backdrop-blur-xl grid grid-cols-12 gap-4 items-stretch text-left">
          
          {/* Left Column: Menu Items List */}
          <div className="col-span-6 flex flex-col justify-center space-y-1 pr-1 border-r border-gray-100">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              {group.label} Categories
            </div>
            {group.items.map((item) => {
              const isActive = activeItem?.href === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item)}
                  onFocus={() => setHoveredItem(item)}
                  className={cn(
                    "group/item flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition duration-200",
                    isActive
                      ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                      : "text-[#222222] hover:bg-[#F7F7F5] hover:text-[#D4AF37]"
                  )}
                >
                  <span>{item.label}</span>
                  <ArrowRight
                    className={cn(
                      "h-3.5 w-3.5 text-[#D4AF37] transition-all duration-200",
                      isActive ? "opacity-100 translate-x-0.5" : "opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Column: Contextual Image Preview */}
          <div className="col-span-6 flex flex-col justify-between rounded-xl border border-gray-100 bg-[#F7F7F5] p-3">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-gray-200 shadow-2xs border border-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={previewImage}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={previewImage}
                    alt={previewTitle}
                    fill
                    sizes="300px"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 right-2.5 text-left">
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[#D4AF37] bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {previewTitle}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-2 px-0.5 text-left">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#111111] line-clamp-1">
                {previewTitle}
              </h4>
              <p className="mt-0.5 text-[11px] font-normal leading-relaxed text-[#555555] line-clamp-2">
                {previewDesc}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleOpenAccountModal = () => {
      setAccountModalOpen(true);
    };

    window.addEventListener("open-registration", handleOpenAccountModal);
    window.addEventListener("open-account-modal", handleOpenAccountModal);

    return () => {
      window.removeEventListener("open-registration", handleOpenAccountModal);
      window.removeEventListener("open-account-modal", handleOpenAccountModal);
    };
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileGroup(null);
  };

  const toggleMobile = () => {
    setMobileOpen((open) => !open);
    setMobileGroup(null);
  };

  const handleRegisterNowClick = () => {
    setAccountModalOpen(true);
    if (mobileOpen) {
      closeMobile();
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-gray-200/90 bg-white/95 py-1.5 shadow-md backdrop-blur-md"
            : "border-b border-gray-100/80 bg-white/95 py-2 shadow-xs backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-10">
          
          {/* =========================================================
              1. LEFT: BRAND SECTION (LOGO + BRAND NAME)
          ========================================================= */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              aria-label="Delhi Casting Agency home"
              onClick={closeMobile}
              className="shrink-0 transition duration-300 hover:opacity-90 flex items-center"
            >
              <Logo />
            </Link>
          </div>

          {/* =========================================================
              2. DESKTOP UNIFIED EQUAL-ALIGNMENT ROW
          ========================================================= */}
          <div className="hidden lg:flex items-center justify-between flex-1 ml-4 lg:ml-6 xl:ml-8 2xl:ml-10">
            
            {/* MIDDLE: EVENLY DISTRIBUTED NAVIGATION LINKS */}
            <nav
              className="flex items-center justify-between flex-1 max-w-[760px] 2xl:max-w-[840px] pr-2 lg:pr-4 xl:pr-6"
              aria-label="Main navigation"
            >
              {NAV_GROUPS.map((group) => (
                <DesktopDropdown key={group.label} group={group} />
              ))}
            </nav>

            {/* RIGHT: BALANCED ACTIONS SECTION */}
            <div className="flex items-center gap-2.5 lg:gap-3 xl:gap-4 2xl:gap-5 shrink-0 pl-1 lg:pl-2">
              {/* NOTIFICATION BELL */}
              <div className="flex items-center shrink-0">
                <NotificationBell />
              </div>

              {/* ACCOUNT SECONDARY CTA */}
              <motion.div
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="shrink-0 flex items-center"
              >
                <Link
                  href="/login"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-[#F7F7F5] px-2.5 lg:px-3.5 xl:px-4 py-1.5 xl:py-2 text-[10.5px] lg:text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.14em] text-[#111111] shadow-2xs transition-all duration-300 hover:border-[#D4AF37]/60 hover:bg-white hover:text-[#D4AF37] hover:shadow-xs whitespace-nowrap"
                >
                  <User className="h-3.5 w-3.5 text-[#D4AF37] transition-transform duration-300 group-hover:scale-108 shrink-0" />
                  <span>Account</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 text-[#D4AF37] shrink-0" />
                </Link>
              </motion.div>

              {/* REGISTER NOW PRIMARY CTA */}
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={handleRegisterNowClick}
                className="group flex items-center gap-1.5 lg:gap-2 rounded-full border-2 border-[#D4AF37] bg-white px-3 lg:px-3.5 xl:px-4.5 py-1.5 lg:py-2 xl:py-2.5 text-[10.5px] lg:text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-bold uppercase tracking-[0.12em] xl:tracking-[0.16em] text-[#111111] transition duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white shadow-xs hover:shadow-md hover:shadow-[#D4AF37]/20 whitespace-nowrap cursor-pointer shrink-0"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1.5 text-[#D4AF37] group-hover:text-white shrink-0" />
              </motion.button>
            </div>

          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={toggleMobile}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-[#111111] transition hover:bg-gray-100 lg:hidden ml-auto"
          >
            {mobileOpen ? (
              <X size={26} strokeWidth={1.8} />
            ) : (
              <Menu size={26} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            id="mobile-navigation"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-white px-6 pb-12 pt-28 lg:hidden"
          >
            <div className="mx-auto w-full max-w-lg">
              <nav className="space-y-2" aria-label="Mobile navigation">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label} className="border-b border-gray-100 py-2">
                    {group.items ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileGroup((current) =>
                              current === group.label ? null : group.label,
                            )
                          }
                          className="flex min-h-12 w-full items-center justify-between text-left text-base font-semibold uppercase tracking-wider text-[#111111]"
                        >
                          <span>{group.label}</span>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-[#D4AF37] transition duration-300",
                              mobileGroup === group.label && "rotate-180",
                            )}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {mobileGroup === group.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden space-y-1 pl-3 pt-2"
                            >
                              <Link
                                href={group.href}
                                onClick={closeMobile}
                                className="block rounded-lg py-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]"
                              >
                                View All {group.label}
                              </Link>

                              {group.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={closeMobile}
                                  className="block py-2 text-xs font-medium uppercase tracking-wider text-[#555555] transition hover:text-[#111111]"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={group.href}
                        onClick={closeMobile}
                        className="flex min-h-12 items-center text-base font-semibold uppercase tracking-wider text-[#111111]"
                      >
                        {group.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Login option */}
                <div className="border-b border-gray-100 py-2">
                  <Link
                    href="/login"
                    onClick={closeMobile}
                    className="flex min-h-12 items-center gap-2 text-base font-semibold uppercase tracking-wider text-[#D4AF37]"
                  >
                    <User className="h-5 w-5" />
                    <span>Login to Artist Account</span>
                  </Link>
                </div>
              </nav>

              <button
                type="button"
                onClick={handleRegisterNowClick}
                className="mt-8 flex min-h-14 w-full items-center justify-center gap-2 rounded-full border border-[#D4AF37] bg-[#D4AF37] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition active:scale-[0.98] shadow-md cursor-pointer"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AccountTypeModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
      />
    </>
  );
}