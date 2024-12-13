import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Inventra",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}