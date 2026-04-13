import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ClientLayout from "./client-layout";
import { Navbar, Footer, MiniCart } from "@/components/layout";
import { siteData } from "@/data";

export const metadata: Metadata = {
  title: {
    default: `${siteData.name} - Premium E-Commerce Platform`,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.description,
  keywords: [
    "e-commerce",
    "online shopping",
    "fashion",
    "electronics",
    "home goods",
    "accessories",
  ],
  authors: [{ name: siteData.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteData.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="h-full flex flex-col antialiased">
        <Providers>
          <ClientLayout>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <MiniCart />
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
