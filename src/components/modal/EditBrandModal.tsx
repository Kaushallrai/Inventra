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
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetBrandsQuery,
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
  brandName: z.string().min(1, {
    message: "Brand name must be at least 1 character.",
  }),
});

interface Brand {
  id: number;
  name: string;
}

interface EditBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditBrandModal({ isOpen, onClose }: EditBrandModalProps) {
  const { data: brands = [], isLoading: isBrandLoading } = useGetBrandsQuery(
    {}
  );
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();
  const [deleteBrand, { isLoading: isDeleting }] = useDeleteBrandMutation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
    },
  });

  const onBrandSelect = (brandId: string) => {
    const selected = brands.find(
      (brand: Brand) => brand.id.toString() === brandId
    );
    if (selected) {
      setSelectedBrand(selected);
      form.setValue("brandName", selected.name);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedBrand) return;

    try {
      await updateBrand({
        id: selectedBrand.id,
        name: values.brandName.trim(),
      }).unwrap();
      toast.success("Brand updated successfully");
      resetState();
    } catch (error) {
      console.error("Failed to update brand:", error);
      toast.error("Failed to update brand.");
    }
  };

  const onDelete = async () => {
    if (!selectedBrand) return;

    try {
      await deleteBrand(selectedBrand.id).unwrap();
      toast.success("Brand deleted successfully");
      resetState();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Failed to delete brand:", error);
      toast.error("Failed to delete brand.");
    }
  };

  const resetState = () => {
    setSelectedBrand(null);
    form.reset();
  };

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Brand"
        description="Select a brand to edit or delete"
      >
        <div className="space-y-6">
          <Select onValueChange={onBrandSelect}>
            <SelectTrigger aria-label="Select a brand">
              <SelectValue placeholder="Select a brand" />
            </SelectTrigger>
            <SelectContent>
              {isBrandLoading ? (
                <SelectItem value="loading" disabled>
                  Loading brands...
                </SelectItem>
              ) : brands.length > 0 ? (
                brands.map((brand: Brand) => (
                  <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>
                  No brands available
                </SelectItem>
              )}
            </SelectContent>
          </Select>

          {selectedBrand && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                <div className="flex justify-between space-x-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isDeleting}
                    aria-label="Delete brand"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                  <div className="space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetState}
                      aria-label="Cancel"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isUpdating}
                      aria-label="Update brand"
                    >
                      {isUpdating ? "Updating..." : "Update Brand"}
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
              Are you sure you want to delete this brand?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              brand.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel aria-label="Cancel">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              disabled={isDeleting}
              aria-label="Confirm delete"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
