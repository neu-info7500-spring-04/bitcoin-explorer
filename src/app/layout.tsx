import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {BitcoinDocument} from "@/graphql/__generated__/graphql";
import {graphqlClient} from "@/graphql/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NU Bitcoin Explorer",
  description: "Northeastern University's Bitcoin Explorer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
