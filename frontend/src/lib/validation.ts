// import { z } from "zod";

// export const registrationSchema = z.object({
//   fullName: z.string().min(2, "Enter your full name"),
//   mobile: z
//     .string()
//     .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
//   whatsapp: z
//     .string()
//     .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit number")
//     .optional()
//     .or(z.literal("")),
//   email: z.string().email("Enter a valid email"),
//   gender: z.enum(["Female", "Male", "Other"], {
//     message: "Select a gender",
//   }),
//   age: z.coerce.number().min(4, "Enter a valid age").max(90, "Enter a valid age"),
//   city: z.string().min(2, "Enter your city"),
//   height: z.string().min(1, "Enter your height"),
//   languages: z.string().min(2, "List at least one language"),
//   experience: z.string().optional().or(z.literal("")),
//   instagram: z.string().optional().or(z.literal("")),
//   portfolio: z.string().url("Enter a valid URL").optional().or(z.literal("")),
// });

// export type RegistrationInput = z.input<typeof registrationSchema>;
// export type RegistrationValues = z.output<typeof registrationSchema>;

//=================================================================

import { z } from "zod";

export const registrationSchema = z.object({
  // Step 1
  fullName: z.string().min(2, "Enter your full name"),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),

  whatsapp: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit number")
    .optional()
    .or(z.literal("")),

  email: z.string().email("Enter a valid email"),

  gender: z.enum(["Female", "Male", "Other"], {
    message: "Select a gender",
  }),

  age: z.coerce
    .number()
    .min(4, "Enter a valid age")
    .max(90, "Enter a valid age"),

  city: z.string().min(2, "Enter your city"),

  // Step 2
  height: z.string().optional().or(z.literal("")),

  languages: z.string().optional().or(z.literal("")),

  experience: z.string().optional().or(z.literal("")),

  instagram: z.string().optional().or(z.literal("")),

  portfolio: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

export type RegistrationInput = z.input<typeof registrationSchema>;
export type RegistrationValues = z.output<typeof registrationSchema>;