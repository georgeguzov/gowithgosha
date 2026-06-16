import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Авторский тур в Китай — Гоша Гузов",
  description: "Панды, киберпанк и настоящий Китай. Чэнду + Чунцин, 10–18 октября. Авторский тур от Гоши Гузова.",
  openGraph: {
    title: "Авторский тур в Китай — Гоша Гузов",
    description: "Панды, киберпанк и настоящий Китай. Чэнду + Чунцин, 10–18 октября.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#f5f0e8]">
        {children}
      </body>
    </html>
  );
}