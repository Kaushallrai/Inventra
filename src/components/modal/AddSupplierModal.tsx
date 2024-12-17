"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

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
import { useAddSupplierMutation } from "@/redux/apiSlice";
import { toast } from "sonner";
import { BaseModal } from ".";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  contact: z
    .string()
    .min(2, { message: "Contact must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .optional()
    .or(z.literal("")),
});

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddSupplierModal({ isOpen, onClose }: AddSupplierModalProps) {
  const [addSupplier, { isLoading }] = useAddSupplierMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const trimmedValues = {
        name: values.name.trim(),
        contact: values.contact.trim(),
        email: values.email?.trim() || null,
        address: values.address?.trim() || null,
      };

      const response = await addSupplier(trimmedValues).unwrap();

      toast.success("Supplier added successfully");
      form.reset();
      onClose();

      return response;
    } catch (error) {
      console.error("Failed to add supplier:", error);
      toast.error("Failed to add supplier");
      throw error;
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Supplier"
      description="Enter the details for the new supplier"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter supplier's name"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <span className="flex items-center px-3 py-[5px] bg-gray-100 border border-gray-200 text-gray-600 rounded-l-md shadow-sm ">
                      🇳🇵
                    </span>
                    <span className="flag-icon flag-icon-np"></span>
                    <Input
                      placeholder="(+977)&nbsp;Enter supplier's contact "
                      {...field}
                      autoComplete="off"
                      className="rounded-l-none"
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value.startsWith("+977") ? value.slice(4) : value
                        );
                      }}
                      value={field.value || ""}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter supplier's email"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter supplier's address"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
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
              {isLoading ? "Adding..." : "Add Supplier"}
            </Button>
          </div>
        </form>
      </Form>
    </BaseModal>
  );
}
