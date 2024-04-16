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

export { InterviewValidationSchema };
