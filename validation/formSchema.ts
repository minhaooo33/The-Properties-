import { z } from "zod";

export const formDataSchema = z.object({
    address1: z.string().min(1, "Address 1 is required"),
    address2: z.string().optional(),
    city: z.string().min(3, "City must contain at least 3 characters"),
    postcode: z.string().min(5, "Postcode must contain at least 5 characters"),
    price: z.coerce.number().positive().min(1, "Price must be a positive number"),
    description: z.string().min(10, "Description must contain at least 10 characters"),
    bedrooms: z.coerce.number().positive().min(0, "Bedrooms must be at least 0 "),
    bathrooms: z.coerce.number().positive().min(0, "Bathrooms must be at least 0"),
    status: z.enum(["draft", "for-sale", "withdrawn", "sold"]),
});

export const ImageSchema = z.object({
    images: z.array(z.object({
        id: z.string(),
        url: z.string(),
        file: z.instanceof(File).optional()
    }))
})

export const propertySchema = formDataSchema.and(ImageSchema);