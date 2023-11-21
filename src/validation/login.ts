import z from "zod";

export const loginValidation = z.object({
  email: z.string().min(1, { message: "נדרש מייל תקין" }),
  password: z.string(),
  // .min(8, "סיסמא צריכה להכיל לפחות 8 תווים")
  // .max(16, "מקסימום 16 תווים"),
});

export type LoginSchema = z.infer<typeof loginValidation>;
