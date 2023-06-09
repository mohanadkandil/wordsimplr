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
      <body className=" bg-[#F2F3F5]">
        <MainNav user={session?.user} expires={session?.expires as string} />
        {children}
        <div className="absolute bottom-0 mx-12 flex justify-between space-x-8 py-12 text-center font-thin">
          <span>© Mohanad Kandil</span>
          <span>Privacy Terms</span>
        </div>
      </body>
    </html>
  );
}
