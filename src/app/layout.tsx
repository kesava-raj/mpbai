import type { Metadata } from "next";
import { Poppins, Inter, Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/layout/Sidebar";
import { ChatProvider } from "@/context/ChatContext";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif-vibiz",
});

export const metadata: Metadata = {
  title: "MPBx AI Labs | Enterprise AI Solutions",
  description: "Enterprise-grade AI solutions embedded into your operational workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} ${jakarta.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground font-body`}
      >
        <ChatProvider>
          <div className="flex min-h-screen bg-background whitespace-normal">
            <Sidebar />
            <main className="flex-1 relative scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {children}
            </main>
          </div>
        </ChatProvider>
      </body>
    </html>
  );
}
