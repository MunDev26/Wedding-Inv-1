import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Dancing_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan Digital",
  description: "Kami mengundang Anda untuk berbagi kebahagiaan di hari istimewa kami.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${cormorant.variable} ${lato.variable} ${dancing.variable} font-lato antialiased`}>
        {children}
      </body>
    </html>
  );
}
