"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signInSchema } from "@/lib/zod";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import LoadingButton from "./loading-button";
import ErrorMessage from "./error-message";
import Link from "next/link";

export default function SignIn() {
  const [globalError, setGlobalError] = useState<string>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setGlobalError(result.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("An unexpected error occurred while signing in:", error);
      setGlobalError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center w-full p-4 justify-center">
      <div className="flex text-card-foreground shadow-md border rounded-xl overflow-hidden">
        <Card className="hidden md:flex bg-gray-500 w-[400px]"></Card>
        <Card className="w-[400px] max-w-md">
          <CardHeader className="my-6">
            <CardTitle className="text-2xl font-semibold text-center text-gray-800">
              Welcome Back
            </CardTitle>
            <CardTitle className="text-sm text-center font-medium text-gray-400">
              Enter your email and password below to login to your account
            </CardTitle>
          </CardHeader>
          <CardContent>
            {globalError && <ErrorMessage error={globalError} />}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <LoadingButton pending={form.formState.isSubmitting} />
              </form>
              <div className="flex items-center justify-center mt-4 mb-6">
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
