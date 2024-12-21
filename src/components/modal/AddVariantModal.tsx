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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddVariantMutation } from "@/redux/apiSlice";
import { toast } from "sonner";
import { BaseModal } from ".";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  imageUrl: z
    .string()
    .url({ message: "Invalid image URL" })
    .optional()
    .or(z.literal("")),
  brandId: z.number().int().positive({ message: "Please select a brand" }),
  productId: z
    .number()
    .int()
    .positive({ message: "Please select a product" })
    .nullable(),
  price: z.number().positive({ message: "Price must be a positive number" }),
  quantity: z
    .number()
    .int()
    .nonnegative({ message: "Quantity must be a non-negative integer" }),
  status: z.enum(["In Stock", "Out of Stock", "Low Stock"], {
    required_error: "Please select a status",
  }),
});

interface AddVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  brands: { id: number; name: string }[];
  products: { id: number; name: string }[];
  category: { id: number; name: string };
}

export function AddVariantModal({
  isOpen,
  onClose,
  brands,
  products,
  category,
}: AddVariantModalProps) {
  const [addVariant, { isLoading }] = useAddVariantMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      brandId: undefined,
      productId: null,
      price: undefined,
      quantity: undefined,
      status: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const trimmedValues = {
        ...values,
        name: values.name.trim(),
        imageUrl: values.imageUrl?.trim() || null,
        categoryId: category.id,
        lastUpdated: new Date().toISOString(),
      };

      const response = await addVariant(trimmedValues).unwrap();

      toast.success("Variant added successfully!");
      form.reset();
      onClose();

      return response;
    } catch (error: any) {
      console.error("Failed to add variant:", error);
      const errorMessage =
        error?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Variant"
      description="Enter the details for the new variant"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter variant name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brandId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id.toString()}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value ? parseInt(value) : null)
                  }
                  value={field.value?.toString() || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {products.map((product) => (
                      <SelectItem
                        key={product.id}
                        value={product.id.toString()}
                      >
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Input value={category.name} disabled />
            </FormControl>
          </FormItem>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    <SelectItem value="Low Stock">Low Stock</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2 mt-5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Variant"}
            </Button>
          </div>
        </form>
      </Form>
    </BaseModal>
  );
}
