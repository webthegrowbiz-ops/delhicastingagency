"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export function SuccessModal({
  memberId,
  onClose,
}: {
  memberId: string | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {memberId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-200 bg-black/97 flex items-center justify-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-md"
          >
            <PartyPopper className="w-12 h-12 text-[#D4AF37] mx-auto" />
            <h2 className="mt-4 font-bold text-[28px] tracking-tight text-white">
              Welcome to {SITE.name}!
            </h2>
            <p className="mt-2.5 text-cream/70 text-sm font-normal">
              Congratulations — your Premium Membership is now active.
            </p>
            <p className="mt-4 text-[12.5px] text-cream/50">
              Membership ID: <b className="text-[#D4AF37]">{memberId}</b> &nbsp;·&nbsp; Payment Status:{" "}
              <b className="text-[#4caf50]">Paid ✅</b>
            </p>
            <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="inline-block mt-6">
              <Button variant="whatsapp">Join WhatsApp Community</Button>
            </a>
            <p className="mt-6 text-xs text-cream/40 max-w-[380px] mx-auto">
              Thank you for becoming a Premium Member. Our team will verify your profile and you will
              start receiving verified casting opportunities shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 text-[12px] tracking-wide text-cream/40 underline underline-offset-4"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
