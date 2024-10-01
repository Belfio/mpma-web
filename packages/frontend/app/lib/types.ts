import { z } from "zod";

export const UserSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  roles: z.enum(["ADMIN", "USER"]),
  createdAt: z.string(),
  name: z.string(),
  avatar: z.string(),
  surname: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;

export const CredSchema = z.object({
  userId: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  createdAt: z.string(),
});

export type CredType = z.infer<typeof CredSchema>;

export const AudioSchema = z.object({
  audioId: z.string(),
  fileName: z.string(),
  userId: z.string(),
  title: z.string(),
  createdAt: z.string(),
  description: z.string().optional(),
});

export type AudioType = z.infer<typeof AudioSchema>;

export const TemplateSchema = z.object({
  userId: z.string(),
  templateId: z.string(),
  title: z.string(),
  template: z.string(),
  createdAt: z.string().default(() => new Date().toISOString()),
  updatedAt: z
    .string()
    .default(() => new Date().toISOString())
    .optional(),
  description: z.string().optional(),
});

export type TemplateType = z.infer<typeof TemplateSchema>;

export const ReportSchema = z.object({
  userId: z.string(),
  reportId: z.string(),
  audioId: z.string(),
  title: z.string(),
  report: z.string(),
  templateId: z.string(),
  createdAt: z.string().default(() => new Date().toISOString()),
});

export type ReportType = z.infer<typeof ReportSchema>;
