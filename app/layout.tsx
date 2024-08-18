import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {CartProvider} from "@/context/CartContext"
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profile- Ecommerce",
  description: "xyz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
      <CartProvider>
        {children}
      </CartProvider>
      <Toaster />
    </body>
  </html>
  );
}
