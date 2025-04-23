"use client"

import PropertyForm from "@/components/property-form";
import { auth, storage } from "@/firebase/client";
import { Property } from "@/types/property"
import { propertySchema } from "@/validation/formSchema";
import { SaveIcon } from "lucide-react";
import { z } from "zod";
import { updateProperty } from "./action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteObject, ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { savePropertyImages } from "../../action";

type Props = Property;

export default function EditPropertyForm({
  id,
  address1,
  address2,
  city,
  postcode,
  bathrooms,
  bedrooms,
  description,
  price,
  status,
  images = [],
}:Props) {

const router = useRouter();

const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
  const  token  = await auth?.currentUser?.getIdToken();
  if(!token){
      return;
  }

  const {images: newImages, ...restData} = data;

  const response = await updateProperty({...restData, id}, token);

if(!!response?.error){
  toast.error("Error!", {
    description: response.message,
  });
  return;
}

  const storageTask: (UploadTask | Promise<void>)[]=[];
  const imagesToDelete = images.filter(image => !newImages.find(newImage => image === newImage.url))

  imagesToDelete.forEach(image => {
    storageTask.push(deleteObject(ref(storage, image)));
  })

  const paths: string[] = [];
  newImages.forEach((image, index) => {
    if(image.file){
      const path = `properties/${id}/${Date.now()}-${index}-${image.file.name}`
      paths.push(path);
      const refStorage = ref(storage, path);
      storageTask.push(uploadBytesResumable(refStorage , image.file));
    }else {
      paths.push(image.url)
    }
  })

  await Promise.all(storageTask);
  await savePropertyImages({propertyId: id, images: paths}, token);

  toast.success("Success!", {
    description: "Property updated successfully",
})
  router.push("/admin-dashboard");
};

return (
    <div>
    <PropertyForm 
    handleSubmit={handleSubmit}
    submitButtonLabel={
    <>
    <SaveIcon/>Save Property
    </>
    }
    defaultValues={{
      address1,
      address2,
      city,
      postcode,
      bathrooms,
      bedrooms,
      description,
      price,
      status,
      images: images.map(image => ({
        id: image,
        url:image
      }))
    }}/>
    </div>
)
}