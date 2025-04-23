"use client"

import { propertySchema } from "@/validation/formSchema"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import MultiImageUploader, { ImageUpLoad } from "./multi-image-uploader";

type Props = {
  submitButtonLabel:React.ReactNode;
  handleSubmit: (data: z.infer<typeof propertySchema>) => void;
  defaultValues?: z.infer<typeof propertySchema>
}

export default function PropertyForm({
  handleSubmit, 
  submitButtonLabel, 
  defaultValues
}: Props) {

    const combuneDefaultValues: z.infer<typeof propertySchema> = {
      ...{            
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        price: 0,
        description: "",
        bedrooms: 0,
        bathrooms: 0,
        status: "draft",
        images:[]
      },
      ...defaultValues
    };

    const form = useForm<z.infer<typeof propertySchema>>({
        resolver: zodResolver(propertySchema),
        defaultValues: combuneDefaultValues
    });
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-2 gap-4">
            <fieldset 
                 className="flex flex-col gap-2 " 
                 disabled={form.formState.isSubmitting}>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                      className=" border border-black w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="for-sale">For Sale</SelectItem>
                        <SelectItem value="withdrawn">Withdrawn</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
            control={form.control}
            name="address1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address 1</FormLabel>
                <FormControl>
                    <Input className="border border-black"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

          <FormField 
            control={form.control}
            name="address2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address 2</FormLabel>
                <FormControl>
                    <Input className="border border-black"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>  

          <FormField 
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                    <Input className="border border-black"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>  

          <FormField 
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                    <Input className="border border-black"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            </fieldset>

          <fieldset className="flex flex-col gap-2 " disabled={form.formState.isSubmitting}>
          <FormField 
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                    <Input className="border border-black " type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

          <FormField 
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                    <Input className="border border-black " type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

          <FormField 
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                    <Input className="border border-black" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

          <FormField 
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormLabel>Description</FormLabel>
                <FormControl className="h-full">
                    <Textarea className="h-full resize-none border border-black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            </fieldset>
            </div>
            <FormField 
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormControl className="h-full">
                <MultiImageUploader 
                onImagesChange={(images: ImageUpLoad[])=>{
                form.setValue("images",images)
                }}
                images={field.value}
                urlFormatter={(image) => {
                  if(!image.file){
                    return `https://firebasestorage.googleapis.com/v0/b/foodorderhubadmin.firebasestorage.app/o/${encodeURIComponent(
                        image.url
                      )}?alt=media`;
                  }
                  return image.url;
                }}
                />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            <Button 
            type="submit"
            className="max-w-md mx-auto mt-2 w-full flex gap-2"
            disabled={form.formState.isSubmitting}>
              {submitButtonLabel}
            </Button>
            </form>
        </Form >
    )
}