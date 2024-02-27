import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "./(context)/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "All Products From Videos",
  description: "You can find all products that you have seen in videos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ContextProvider>
        <body className={inter.className}>{children}</body>
      </ContextProvider>
    </html>
  );
}
