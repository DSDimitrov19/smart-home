import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/Provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { cn } from "@/utils/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'select-none bg-zinc-800 text-white')}>
        <Provider>
          {/* <Navbar/> */}
          <main>{children}</main>
          <Footer/>
        </Provider>
      </body>
    </html>
  );
}
