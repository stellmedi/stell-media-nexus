
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  subject: z.string().min(2, { message: "Subject is required" }).optional(),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.string().length(0)),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export const consultationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(1, { message: "Company name is required for consultations" }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.string().length(0)),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, { message: "Please describe your project in at least 10 characters" }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;
