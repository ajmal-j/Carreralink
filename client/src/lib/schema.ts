import { z } from "zod";

export const DateSchema = z.union([
  z.string().min(5, "Invalid date"),
  z.date(),
  z.literal("Present"),
]);

export const ImageSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");
