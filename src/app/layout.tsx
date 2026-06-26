import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CommerceOS — Global AI Commerce Operating System",
    template: "%s | CommerceOS",
  },
  description:
    "CommerceOS is the Global AI Commerce Operating System. One platform, every marketplace — powered by AI. Generate product images, videos, copywriting, SEO, and auto-publish to Amazon, Shopify, TikTok Shop, Taobao and more.",
  keywords: [
    "CommerceOS",
    "AI commerce OS",
    "commerce operating system",
    "AI product images",
    "AI product video",
    "AI copywriting",
    "commerce automation",
    "Amazon listing AI",
    "TikTok Shop AI",
    "AI电商操作系统",
    "商品图生成",
    "AI短视频",
    "电商自动化",
  ],
  openGraph: {
    title: "CommerceOS — Global AI Commerce Operating System",
    description:
      "One Platform. Every Marketplace. Powered by AI. Generate images, videos, copywriting, and auto-publish worldwide.",
    siteName: "CommerceOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CommerceOS — Global AI Commerce Operating System",
    description:
      "One Platform. Every Marketplace. Powered by AI. The operating system for global commerce sellers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-warm-white text-warm-800">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
