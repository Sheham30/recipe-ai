import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discover Your Next Favorite Dish with Recipe AI",
  description: "let Recipe AI craft a unique recipe for you to try",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex-grow  flex-1">{children}</div>
      </body>
    </html>
  );
}
