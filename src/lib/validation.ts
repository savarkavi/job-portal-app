import * as z from "zod/v4";

export const recruiterFormSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  about: z.string().trim().min(10, "At least 10 characters are required"),
  logo: z.string().optional(),
  websiteURL: z.url().optional(),
  linkedInProfile: z.url().optional(),
});

export const jobSeekerFormSchema = z.object({
  location: z.string().min(1, "Location is required"),
  about: z.string().trim().min(10, "At least 10 characters are required"),
  role: z.string().min(1, "Role is required"),
  experience: z.number(),
  isStudent: z.boolean(),
  avatar: z.string().optional(),
  websiteURL: z.url().optional(),
  linkedInProfile: z.url().optional(),
});
