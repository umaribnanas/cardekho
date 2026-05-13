import z from "zod";

export const carSchema = z.object({
  id: z.number(),
  make: z.enum([
    "Tata",
    "Toyota",
    "Honda",
    "BMW",
    "Suzuki",
    "Volkswagen",
    "Maruti",
  ]),
  model: z.string().min(3).max(64),
  variant: z.string().min(3).max(64),
  color: z.string().min(3).max(64),
  price: z.number().positive(),
  specs: z.object({
    engine: z.string().min(2).max(64),
    transmission: z.enum(["Manual", "Automatic"]),
    fuelType: z.enum(["Petrol", "Diesel", "CNG", "Electric", "Hybrid"]),
    seatingCapacity: z.number().min(1).max(12),
    topSpeed: z.number().positive(),
    mileage: z.number().positive(),
  }),
  safetyRating: z.number().min(0).max(1),
  userReviews: z.number().min(0).max(5),
});

export type Car = z.infer<typeof carSchema>;
