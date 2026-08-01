import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "BoostUp PH | Fast, Affordable & Trusted Social Media Boosting",
  description: "Boost your social media presence with affordable and reliable services. Fast delivery, secure payments, manual processing.",
  icons: { icon: "/logo.png" }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#060609] text-white antialiased selection:bg-[#FFC700] selection:text-black">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
