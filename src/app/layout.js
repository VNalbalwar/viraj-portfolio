import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "Viraj Nalbalwar",
  description: "Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} ${outfit.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
