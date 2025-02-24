import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/Provider";
import Footer from "@/components/footer";
import { cn } from "@/utils/cn";
import { Toaster } from "sonner";

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
          <Toaster/>
          <main>{children}</main>
          {/* <Footer/> */}
        </Provider>
      </body>
    </html>
  );
}
