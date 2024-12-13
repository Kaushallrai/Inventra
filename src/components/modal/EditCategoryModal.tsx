"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/apiSlice";
import { BaseModal } from ".";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
  categoryName: z.string().min(1, {
    message: "Category name must be at least 1 character.",
  }),
});

interface Category {
  id: number;
  name: string;
}

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditCategoryModal({ isOpen, onClose }: EditCategoryModalProps) {
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  const onCategorySelect = (categoryId: string) => {
    const category = categories.find(
      (cat: Category) => cat.id.toString() === categoryId
    );
    if (category) {
      setSelectedCategory(category);
      form.setValue("categoryName", category.name);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedCategory) return;

    try {
      const result = await updateCategory({
        id: selectedCategory.id,
        name: values.categoryName.trim(),
      }).unwrap();
      console.log("Update result:", result);
      toast.success("Category updated successfully");
      setSelectedCategory(null);
      form.reset();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  }

  async function onDelete() {
    if (!selectedCategory) return;

    try {
      const result = await deleteCategory(selectedCategory.id).unwrap();
      console.log("Delete result:", result);
      toast.success("Category deleted successfully");
      setSelectedCategory(null);
      form.reset();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  }

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Category"
        description="Select a category to edit or delete"
      >
        <div className="space-y-6">
          <Select onValueChange={onCategorySelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {isCategoriesLoading ? (
                <SelectItem value="loading" disabled>
                  Loading categories...
                </SelectItem>
              ) : (
                categories.map((category: Category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {selectedCategory && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                <div className="flex justify-between space-x-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete
                  </Button>
                  <div className="space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedCategory(null);
                        form.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Update Category"}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          )}
        </div>
      </BaseModal>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this category?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
