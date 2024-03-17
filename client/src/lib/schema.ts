import { z } from "zod";

export const DateSchema = z.union([
  z
    .string()
    .refine((value) => {
      const date = new Date(value);
      return (
        !isNaN(date.getTime()) && value === date.toISOString().slice(0, 10)
      );
    })
    .transform((value) => new Date(value)),
  z.instanceof(Date),
  z.literal("Present"),
]);
