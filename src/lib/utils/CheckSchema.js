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
  image: z.string().url(),
  price: z.number().min(0),
  categoryId: z.string().uuid(),
});