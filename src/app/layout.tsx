import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DesignerContextProvider from "@/components/context/designerContext";
import NextTopLoader from "nextjs-toploader";


export const metadata: Metadata = {
  title: "Form Builder",
  description: "Form Builder App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let session = null

  try {
    session = await auth.api.getSession({
      headers: await headers(),
    })
  } catch (error) {
    console.error("Bad Network, check internet and retry:", error)
  }


  return (
    <html lang="en">
      <body
      >
        <NextTopLoader />
        <DesignerContextProvider>
          <Navbar session={session} />
          <main>
            {children}
          </main>
        </DesignerContextProvider>

      </body>
    </html>
  );
}
