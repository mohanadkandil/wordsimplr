import type { Metadata } from "next";

import "./globals.css";
import MainNav from "@/components/ui/main-nav";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="">
        <MainNav user={session?.user} expires={session?.expires as string} />
        {children}
      </body>
    </html>
  );
}
