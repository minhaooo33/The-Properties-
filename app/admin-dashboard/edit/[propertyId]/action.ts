"use server"

import { auth, firestore } from "@/firebase/sever";
import { Property } from "@/types/property"
import { formDataSchema } from "@/validation/formSchema";

export const updateProperty = async (data: Property, authToken: string) => {
    const { id, ...formData } = data;
    const verifiedToken  = await auth.verifyIdToken(authToken);

    if(!verifiedToken.admin){
        return {
            error:true,
            message: "Unauthorized"
        }
    }

    const validation  = formDataSchema.safeParse(formData);
    if(!validation.success){
        return {
            error:true,
            message: validation.error.issues[0]?.message  ?? "Unknown error",
        };
    }

    await firestore.collection("properties").doc(id).update({
        ...formData,
        updatedAt: new Date(),
    });
}