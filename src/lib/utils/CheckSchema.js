import z from "zod";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const UserSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().max(100).min(5).email(),
  password: z.string().min(6),
});
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const UserLoginSchema = z.object({
  email: z.string().max(100).min(5).email(),
  password: z.string().min(6),
});
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const TourSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  information: z.string().optional(),
  DayPeople: z.string().optional(),
  image: z.array(z.string()).optional(),
  categoryId: z.string(),
  cityId: z.string()
});