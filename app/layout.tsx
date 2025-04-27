import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvoicePDF",
  description: "Effortless Invoicing for Freelancers & Small Businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          geistSans.variable,
          geistMono.variable
        )}
      >
        <Header />
        <div className="relative flex flex-col flex-grow">
          <main className="flex-grow pt-14">{children}</main>
        </div>
        <Footer />
        <GoogleAnalytics gaId="G-JP8B4NF8W2" />
      </body>
    </html>
  );
}
