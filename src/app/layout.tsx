import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export const metadata: Metadata = {
  title: "Form Builder",
  description: "Form Builder App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  return (
    <html lang="en">
      <body
      >
        <Navbar session={session} />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
