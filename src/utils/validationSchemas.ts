
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  subject: z.string().min(2, { message: "Subject is required" }).optional(),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.string().length(0)),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
