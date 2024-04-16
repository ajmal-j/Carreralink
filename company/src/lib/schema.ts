import { z } from "zod";

const InterviewValidationSchema = z.object({
  applicant: z.string(),
  job: z.string(),
  startDate: z.string(),
  agenda: z.string(),
  interviewer: z.string(),
  time: z.string(),
  status: z.enum(["scheduled", "cancelled", "completed"]),
});

const InterviewUpdateValidationSchema = z.object({
  startDate: z.string().min(1, "Invalid Data"),
  agenda: z.string(),
  time: z.string().min(1, "Invalid Data"),
  interview: z.string().min(1, "Invalid Data"),
});

export { InterviewValidationSchema, InterviewUpdateValidationSchema };
