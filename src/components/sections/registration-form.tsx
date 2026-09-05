"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  Upload,
  Check,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import {
  registrationSchema,
  type RegistrationInput,
  type RegistrationValues,
} from "@/lib/validation";

import { Button } from "@/components/ui/button";
import { launchRazorpayCheckout } from "@/lib/razorpay";
import { setDCAUserSession } from "@/lib/auth";
import { trackPurchase } from "@/components/analytics";
import { SITE } from "@/lib/constants";

interface Props {
  onSuccess: (memberId: string) => void;
}

/* =========================================================
   STEP 1 FIELDS
========================================================= */

const STEP_1_FIELDS: (keyof RegistrationInput)[] = [
  "fullName",
  "mobile",
  "whatsapp",
  "email",
  "gender",
  "age",
  "city",
];

/* =========================================================
   REGISTRATION FORM
========================================================= */

export function RegistrationForm({ onSuccess }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<RegistrationInput, unknown, RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
  });

  const values = watch();

  /* =========================================================
     PROGRESS
  ========================================================= */

  const progress = useMemo(() => {
    const fieldNames: (keyof RegistrationInput)[] = [
      "fullName",
      "mobile",
      "email",
      "gender",
      "age",
      "city",
      "height",
      "languages",
    ];

    const filled = fieldNames.filter((field) => {
      const value = values[field];

      return value !== undefined && value !== "" && value !== null;
    }).length;

    const withPhotos = filled + (photos?.length ? 1 : 0);

    return Math.round((withPhotos / (fieldNames.length + 1)) * 100);
  }, [values, photos]);

  /* =========================================================
     STEP 1 → STEP 2
  ========================================================= */

  const handleNext = async () => {
    const valid = await trigger(STEP_1_FIELDS);

    if (!valid) {
      const firstError = STEP_1_FIELDS.find((field) => errors[field]);

      if (firstError) {
        setFocus(firstError);
      }

      return;
    }

    setStep(2);

    setTimeout(() => {
      const regSection = document.getElementById("registration");
      if (regSection) {
        regSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  /* =========================================================
     STEP 2 → STEP 1
  ========================================================= */

  const handleBack = () => {
    setStep(1);

    setTimeout(() => {
      const regSection = document.getElementById("registration");
      if (regSection) {
        regSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  /* =========================================================
     FINAL SUBMIT
  ========================================================= */

  const onSubmit = async (data: RegistrationValues) => {
    if (step !== 2) {
      await handleNext();
      return;
    }

    try {
      setSubmitting(true);

      // Complete registration session first
      setDCAUserSession(data.email || data.mobile, "artist", true);

      await launchRazorpayCheckout({
        name: data.fullName,
        email: data.email,
        contact: data.mobile,

        onSuccess: (rzpRes) => {
          trackPurchase(SITE.price);
          const payId = typeof rzpRes === "string" ? rzpRes : rzpRes.razorpay_payment_id;
          onSuccess(`WTB-${payId.slice(-6).toUpperCase()}`);
          setSubmitting(false);
        },

        onDismiss: () => {
          setSubmitting(false);
          onSuccess(`WTB-FREE-${Date.now().toString().slice(-6)}`);
        },
      });
    } catch (error) {
      console.error("Registration/payment error:", error);

      setSubmitting(false);
    }
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-5xl overflow-hidden rounded-[32px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6 md:p-10"
    >
      {/* STEP INDICATOR */}

      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-[#D4AF37]">
            <Sparkles size={15} />

            <span>
              Step {step} of 2 —{" "}
              {step === 1 ? "Personal Information" : "Artist Information"}
            </span>
          </div>

          <span className="shrink-0 text-sm font-medium text-[#555555]">{progress}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C59B27] transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* Step dots */}

        <div className="mt-4 flex items-center justify-center gap-3">
          <div
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              step >= 1 ? "bg-[#D4AF37]" : "bg-gray-300"
            }`}
          />

          <div
            className={`h-px w-16 transition-all duration-300 ${
              step === 2 ? "bg-[#D4AF37]" : "bg-gray-300"
            }`}
          />

          <div
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              step === 2 ? "bg-[#D4AF37]" : "bg-gray-300"
            }`}
          />
        </div>
      </div>

      {/* STEPS */}

      <AnimatePresence mode="wait">
        {/* STEP 1 */}

        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {/* Personal */}

            <SectionTitle
              title="Personal Information"
              icon={<User size={18} />}
            />

            <div className="grid gap-5 md:grid-cols-2">
              {/* Full Name */}

              <Field
                label="Full Name"
                error={errors.fullName?.message}
                icon={<User size={16} />}
              >
                <input
                  {...register("fullName")}
                  placeholder="Ananya Sharma"
                  autoComplete="name"
                  className={fieldInputClass}
                />
              </Field>

              {/* Mobile */}

              <Field
                label="Mobile Number"
                error={errors.mobile?.message}
                icon={<Phone size={16} />}
              >
                <input
                  {...register("mobile")}
                  type="tel"
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  className={fieldInputClass}
                />
              </Field>

              {/* WhatsApp */}

              <Field
                label="WhatsApp Number"
                error={errors.whatsapp?.message}
                icon={<Phone size={16} />}
              >
                <input
                  {...register("whatsapp")}
                  type="tel"
                  inputMode="numeric"
                  placeholder="Same as mobile"
                  autoComplete="tel"
                  className={fieldInputClass}
                />
              </Field>

              {/* Email */}

              <Field
                label="Email Address"
                error={errors.email?.message}
                icon={<Mail size={16} />}
              >
                <input
                  type="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={fieldInputClass}
                />
              </Field>

              {/* Gender */}

              <Field label="Gender" error={errors.gender?.message}>
                <select
                  {...register("gender")}
                  defaultValue=""
                  className={fieldInputClass}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>

                  <option value="Female">Female</option>

                  <option value="Male">Male</option>

                  <option value="Other">Other</option>
                </select>
              </Field>

              {/* Age */}

              <Field label="Age" error={errors.age?.message}>
                <input
                  type="number"
                  inputMode="numeric"
                  {...register("age")}
                  placeholder="Your age"
                  className={fieldInputClass}
                />
              </Field>

              {/* City */}

              <Field
                label="City"
                full
                icon={<MapPin size={16} />}
                error={errors.city?.message}
              >
                <input
                  {...register("city")}
                  placeholder="Mumbai"
                  autoComplete="address-level2"
                  className={fieldInputClass}
                />
              </Field>
            </div>

            {/* NEXT BUTTON */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.4,
              }}
              className="mt-10 flex justify-end"
            >
              <Button
                type="button"
                onClick={handleNext}
                className="group min-h-12 min-w-[200px]"
              >
                CONTINUE TO STEP 2
                <ArrowRight
                  size={18}
                  className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </motion.div>

            {/* Validation message */}

            {Object.keys(errors).length > 0 && (
              <p className="mt-4 text-center text-sm font-medium text-red-500">
                Please complete the required information above before
                continuing.
              </p>
            )}
          </motion.div>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 20,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {/* Artist Information */}

            <SectionTitle
              title="Artist Information"
              icon={<Sparkles size={18} />}
            />

            <div className="grid gap-5 md:grid-cols-2">
              {/* Height */}

              <Field label="Height" error={errors.height?.message}>
                <input
                  {...register("height")}
                  placeholder={`5'6"`}
                  className={fieldInputClass}
                />
              </Field>

              {/* Languages */}

              <Field label="Languages Known" error={errors.languages?.message}>
                <input
                  {...register("languages")}
                  placeholder="Hindi, English"
                  className={fieldInputClass}
                />
              </Field>

              {/* Experience */}

              <Field label="Acting Experience" full>
                <textarea
                  {...register("experience")}
                  rows={4}
                  placeholder="Tell us about your acting, modelling or performance experience..."
                  className={`${fieldInputClass} resize-none`}
                />
              </Field>

              {/* Instagram */}

              <Field label="Instagram Profile">
                <input
                  {...register("instagram")}
                  placeholder="@yourusername"
                  className={fieldInputClass}
                />
              </Field>

              {/* Portfolio */}

              <Field label="Portfolio Link" error={errors.portfolio?.message}>
                <input
                  {...register("portfolio")}
                  type="url"
                  placeholder="https://yourportfolio.com"
                  className={fieldInputClass}
                />
              </Field>

              {/* Upload */}

              <div className="md:col-span-2">
                <label className="mb-3 block text-sm font-semibold text-[#111111]">
                  Upload Recent Photos
                </label>

                <label
                  htmlFor="photos"
                  className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#D4AF37]/40 bg-[#F7F7F5] px-6 py-10 text-center transition-all duration-300 hover:border-[#D4AF37] hover:bg-amber-50/50 shadow-xs sm:px-8"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/10 transition-transform duration-300 group-hover:scale-110">
                    {photos?.length ? (
                      <Check size={30} className="text-[#D4AF37]" />
                    ) : (
                      <Upload size={30} className="text-[#D4AF37]" />
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-[#111111]">
                    {photos?.length
                      ? `${photos.length} Photo(s) Selected`
                      : "Upload Your Photos"}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-[#555555]">
                    Upload 4–5 recent photographs. JPG, JPEG and PNG formats are
                    supported.
                  </p>
                </label>

                <input
                  id="photos"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => setPhotos(event.target.files)}
                />
              </div>
            </div>

            {/* PAYMENT METHODS */}

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {[
                "🔒 Razorpay",
                "📲 UPI",
                "💳 Credit / Debit Card",
                "🏦 Net Banking",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-gray-200 bg-[#F7F7F5] px-4 py-3 text-center text-sm font-medium text-[#333333] transition-all duration-300 hover:border-[#D4AF37]/50 shadow-xs sm:px-5"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* SUBMIT BUTTONS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.4,
              }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Button
                type="button"
                onClick={handleBack}
                variant="ghost"
                className="group min-h-12 border border-gray-200 text-[#111111] hover:bg-gray-100"
              >
                <ArrowLeft size={18} className="mr-2 inline-block" />
                Back
              </Button>

              <Button
                type="submit"
                size="block"
                disabled={submitting}
                className="group min-h-12 flex-1"
              >
                {submitting ? (
                  <>
                    <motion.span
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="mr-2 inline-block h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                    />
                    Opening Secure Checkout...
                  </>
                ) : (
                  <>Submit</>
                )}
              </Button>
            </motion.div>

            <p className="mt-5 text-center text-sm leading-7 text-[#555555]">
              Your payment is processed securely through Razorpay. Your personal
              information is protected and never shared with third parties.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

/* ============================================================
   SECTION TITLE
============================================================ */

function SectionTitle({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="mb-6 mt-10 flex items-center gap-3 first:mt-0">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
        {icon}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[#111111]">{title}</h3>

        <div className="mt-2 h-px w-24 bg-gradient-to-r from-[#D4AF37] to-transparent" />
      </div>
    </div>
  );
}

/* ============================================================
   INPUT CLASS
============================================================ */

export const fieldInputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-[#111111] placeholder:text-gray-400 transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/15 shadow-xs";

/* ============================================================
   FIELD
============================================================ */

function Field({
  label,
  error,
  full,
  icon,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={`${full ? "md:col-span-2" : ""}`}>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#111111]">
        {icon && <span className="text-[#D4AF37]">{icon}</span>}

        {label}
      </label>

      {children}

      {error && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
}