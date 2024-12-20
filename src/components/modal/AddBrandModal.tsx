"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { BaseModal } from ".";
import { toast } from "sonner";
import { useAddBrandMutation } from "@/redux/apiSlice";

const formSchema = z.object({
  brandName: z.string().min(1, {
    message: "Brand name must be at least 1 character.",
  }),
});

interface AddBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddBrandModal({ isOpen, onClose }: AddBrandModalProps) {
  const [addBrand, { isLoading }] = useAddBrandMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addBrand({ name: values.brandName.trim() }).unwrap();
      form.reset();

      toast.success("Brand added successfully");
      onClose();
    } catch (error) {
      console.error("Failed to add brand:", error);
      toast.error("Failed to add brand");
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Brand"
      description="Enter the name for the new brand"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter brand name"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2 mt-5">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Brand"}
            </Button>
          </div>
        </form>
      </Form>
    </BaseModal>
  );
}
