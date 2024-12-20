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
import { useAddCategoryMutation } from "@/redux/apiSlice";
import { BaseModal } from ".";
import { toast } from "sonner";

const formSchema = z.object({
  categoryName: z.string().min(1, {
    message: "Category name must be at least 1 character.",
  }),
});

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addCategory({ name: values.categoryName.trim() }).unwrap();
      form.reset();

      toast.success("Category added successfully");
      onClose();
    } catch (error) {
      console.error("Failed to add category:", error);
      toast.error("Failed to add category");
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Category"
      description="Enter the name for the new category"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter category name"
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
              {isLoading ? "Adding..." : "Add Category"}
            </Button>
          </div>
        </form>
      </Form>
    </BaseModal>
  );
}
