import { firestore, getTotalPages } from "@/firebase/server";
import { PropertyStatus } from "@/types/propertiesStatus";
import { Property } from "@/types/property";


type GetPropertiesOptions = {
    filters?: {
        minPrice?: number | null;
        maxPrice?: number | null;
        minBedrooms?: number | null;
        status?: PropertyStatus[] | null;
    },
    pagination?: {
        pageSize?: number;
        page?: number;
}
}

export const getProperties = async (options? : GetPropertiesOptions) => {
    const page = options?.pagination?.page || 1;
    const pageSize = options?.pagination?.pageSize || 10;
    const { minPrice, maxPrice, minBedrooms, status } = options?.filters || {};

    let getPropertiesQuery = firestore.collection("properties").orderBy("updatedAt", "desc");

    if (minPrice !== null && minPrice !== undefined) {
        getPropertiesQuery = getPropertiesQuery.where("price", ">=", minPrice);
    }

    if (maxPrice !== null && maxPrice !== undefined) {
        getPropertiesQuery = getPropertiesQuery.where("price", "<=", maxPrice);
    }

    if (minBedrooms !== null && minBedrooms !== undefined) {
        getPropertiesQuery = getPropertiesQuery.where("bedrooms", ">=", minBedrooms);
    }

    if (status) {
        getPropertiesQuery = getPropertiesQuery.where("status", "in", status);
    }

    const totalPages = await getTotalPages(getPropertiesQuery, pageSize);

    try {
        const propertiesSnapshot = await getPropertiesQuery
            .limit(pageSize)
            .offset((page - 1) * pageSize)
            .get();

        const properties = propertiesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        } as Property));

        return { data: properties, totalPages };
    } catch (err) {
        console.error("❗ Firestore 查詢失敗", err);
        throw err;
    }

};

export const getPropertyById = async (propertyId: string) => {
    const propertysnapshot = await firestore
    .collection("properties")
    .doc(propertyId)
    .get();

    const propertyData = { id: propertysnapshot.id, ...propertysnapshot.data() } as Property;
    return propertyData;
}