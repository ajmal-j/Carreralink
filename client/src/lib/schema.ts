import { z } from "zod";

export const DateSchema = z.union([
  z.string().min(5, "Invalid date"),
  z.date(),
  z.literal("Present"),
]);

export const ImageSchema = z.custom<File>();
