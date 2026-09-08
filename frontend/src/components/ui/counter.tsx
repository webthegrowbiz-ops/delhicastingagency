"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function Counter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const step = Math.max(1, Math.floor(target / 60));
    let cur = 0;
    let frame: number;
    const tick = () => {
      cur += step;
      if (cur >= target) {
        setValue(target);
        return;
      }
      setValue(cur);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-[28px] md:text-[38px] font-extrabold tracking-tight text-[#D4AF37]">
        {value.toLocaleString()}
        {value === target ? "+" : ""}
      </div>
      <div className="mt-1 text-[11.5px] font-medium tracking-wide text-cream/50 uppercase">
        {label}
      </div>
    </div>
  );
}
