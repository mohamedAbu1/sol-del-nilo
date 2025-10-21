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
  DayPeople: z.string().optional(),
  image: z.array(
    z.object({
      name: z.string(),
      label: z.string(),
    })
  ),
  categoryId: z.string(),
  cityId: z.string(),
  rival: z.string(),
  theDate: z.string(),
  TripDuration: z.string(),
  Destination: z.string().optional(), // ✅ أضف هذا الحقل
  NumberOfParticipants: z.string().optional(), // ✅ أضف هذا الحقل
  discountPercent: z.string().optional(),
  tourimage: z
    .array(
      z.object({
        name: z.string(),
        label: z.string().optional(),
      })
    )
    .optional(), // ✅ أضف هذا الحقل إذا كنت ترسله
  tripprogram: z
    .array(
      z.object({
        time: z.string().min(1),
        program: z.string().min(1),
      })
    )
    .min(1),
  includes: z
    .array(
      z.object({
        text: z.string().min(1),
      })
    )
    .min(1),
});
