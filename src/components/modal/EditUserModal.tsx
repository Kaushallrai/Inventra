"use client";

import { useEffect, useMemo, useState } from "react";
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
  useUpdateUserMutation,
  useVerifyPasswordMutation,
} from "@/redux/apiSlice";
import { BaseModal } from ".";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name must be at least 1 character.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    role: z.enum(["Admin", "User", "Moderator"], {
      required_error: "Please select a role.",
    }),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.currentPassword || data.newPassword || data.confirmPassword) {
        return data.currentPassword && data.newPassword && data.confirmPassword;
      }
      return true;
    },
    {
      message: "All password fields must be filled to change password",
      path: ["currentPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Moderator";
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [verifyPassword] = useVerifyPasswordMutation();
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  const defaultValues = useMemo(
    () => ({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "User",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }),
    [user]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isOpen && user) {
      form.reset(defaultValues);
      setIsPasswordVerified(false);
    }
  }, [isOpen, user, form.reset, defaultValues]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;

    try {
      const updateData: any = {
        id: user.id,
        name: values.name,
        email: values.email,
        role: values.role,
      };

      if (
        values.currentPassword &&
        values.newPassword &&
        values.confirmPassword
      ) {
        if (!isPasswordVerified) {
          const verificationResult = await verifyPassword({
            userId: user.id,
            password: values.currentPassword,
          }).unwrap();

          if (!verificationResult.isValid) {
            toast.error("Current password is incorrect");
            return;
          }
          setIsPasswordVerified(true);
        }

        updateData.newPassword = values.newPassword;
      }

      const result = await updateUser(updateData).unwrap();
      console.log("Update result:", result);
      toast.success("User updated successfully");
      onClose();
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user");
    }
  }

  if (!user) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit User"
      description="Edit user details"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter user name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter user email"
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update User"}
            </Button>
          </div>
        </form>
      </Form>
    </BaseModal>
  );
}
