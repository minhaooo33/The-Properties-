"use server"

import { auth, firestore } from "@/firebase/sever"
import { formDataSchema } from "@/validation/formSchema"


export const createProperty = async (data: {
    address1: string,
    address2?: string,
    city: string,
    postcode: string,
    price: number,
    description: string,
    bedrooms: number,
    bathrooms: number,
    status:  "for-sale" | "draft" | "withdrawn" | "sold",
}, authToken: string) => {
    const verifiedToken  = await auth.verifyIdToken(authToken);

    if(!verifiedToken.admin){
        return {
            error:true,
            message: "Unauthorized"
        }
    }

    const validation  = formDataSchema.safeParse(data);
    if(!validation.success){
        return {
            error:true,
            message: validation.error.issues[0]?.message  ?? "Unknown error",
        };
    }

    const property = await firestore
    .collection("properties")
    .add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    return {
        propertyId: property.id,
    }
}

