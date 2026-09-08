"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ScrollNavigation() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollDown = () => {
    if (typeof window === "undefined") return;
    
    // Find the section below the hero or scroll down one viewport height
    const sections = document.querySelectorAll("section");
    if (sections.length > 1) {
      const secondSection = sections[1];
      const targetTop = secondSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: Math.max(targetTop, 500),
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.9,
        behavior: "smooth",
      });
    }
  };

  const handleScrollUp = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8">
      <AnimatePresence mode="wait">
        {!isScrolledDown ? (
          /* DOWN ARROW BUTTON (Visible near Top/Hero) */
          <motion.button
            key="scroll-down"
            type="button"
            aria-label="Scroll to content section"
            onClick={handleScrollDown}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            whileHover={{ scale: 1.08, y: 2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-white/90 p-0 text-[#111111] shadow-lg shadow-[#D4AF37]/20 backdrop-blur-md transition-colors duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white cursor-pointer"
          >
            <ChevronDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </motion.button>
        ) : (
          /* UP ARROW BUTTON (Visible when Scrolled Down) */
          <motion.button
            key="scroll-up"
            type="button"
            aria-label="Scroll back to top"
            onClick={handleScrollUp}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#111111]/90 p-0 text-white shadow-lg shadow-[#D4AF37]/25 backdrop-blur-md transition-colors duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white cursor-pointer"
          >
            <ChevronUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
