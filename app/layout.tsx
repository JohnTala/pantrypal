import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { auth } from "@/auth";
import AuthProvider from "@/components/providers/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PantryPal",
    template: "%s | PantryPal",
  },
  description:
    "PantryPal helps households organize pantry items, track expiration dates, and reduce food waste.",
  keywords: [
    "PantryPal",
    "pantry management",
    "food inventory",
    "expiration tracker",
    "meal planning",
    "food waste reduction",
  ],
  authors: [{ name: "PantryPal Team" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar user={session?.user} />

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>

            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}