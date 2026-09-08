import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-[0.14em] uppercase transition-all duration-300 ease-[cubic-bezier(.19,1,.22,1)] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-br from-gold-soft via-gold to-[#b8912a] text-black shadow-[0_18px_40px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(212,175,55,0.5),0_22px_44px_rgba(0,0,0,0.4)]",
        ghost:
          "border border-gold/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black",
        whatsapp: "bg-[#25D366] text-black hover:-translate-y-0.5",
      },
      size: {
        default: "text-[18px] px-11 py-[18px] rounded-[3px]",
        sm: "text-[13px] px-5 py-[10px] rounded-sm",
        block: "text-[17px] px-8 py-[17px] rounded-[4px] w-full",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
