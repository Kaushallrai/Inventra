import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Inventra",
  description: "Sign in to your account",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
