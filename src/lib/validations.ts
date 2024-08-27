import { z } from "zod";
import { DEFAULT_PET_IMAGE_URL } from "./constants";

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name is too long" }),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(50, { message: "Owner name is too long" }),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Invalid image URL" }),
    ]),
    age: z.coerce
      .number()
      .int()
      .positive({ message: "Invalid age" })
      .max(30, { message: "Age is too high" }),
    notes: z.union([
      z.literal(""),
      z.string().trim().max(500, { message: "Notes are too long" }),
    ]),
  })
  .transform((data) => {
    return {
      ...data,
      imageUrl: data.imageUrl || DEFAULT_PET_IMAGE_URL,
    };
  });

export type TPetForm = z.infer<typeof petFormSchema>;

export const petIdSchema = z.string().cuid();

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

export type TAuthSchema = z.infer<typeof authSchema>;