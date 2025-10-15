import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./_brand.scss";
import BrandClientProvider from "../components/BrandInitailizer/BrandClientProvider";
import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Branding - Starter",
  description: "A minimal professional responsive starter layout",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <BrandClientProvider>
          <Header />
          <Container>
            <main className="min-h-[60vh] ">{children}</main>
          </Container>
          <Footer />
        </BrandClientProvider>
      </body>
    </html>
  );
}
