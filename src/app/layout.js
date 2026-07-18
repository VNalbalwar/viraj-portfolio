import { Bricolage_Grotesque, Geist, Fira_Code } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  title: "Viraj Nalbalwar — Cloud & Full-Stack Engineer",
  description:
    "Portfolio of Viraj Nalbalwar — Cloud Engineer, DevOps practitioner, and Full-Stack builder.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${geist.variable} ${firaCode.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
