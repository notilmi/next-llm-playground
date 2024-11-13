import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "LLM Playground",
  description: "Sign in to access the LLM Playground.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased min-h-screen font-sans",
          fontSans.variable,
          "h-screen w-screen flex items-center justify-center"
        )}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
