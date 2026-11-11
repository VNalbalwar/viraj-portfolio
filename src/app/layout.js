import { Archivo, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site, socials } from "@/content/profile";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: "viraj-verse",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Viraj Nalbalwar",
    "Viraj Nalbalwar portfolio",
    "Viraj Nalbalwar COEP",
    "cloud engineer",
    "DevOps engineer",
    "Kubernetes scheduler",
    "thermal-aware scheduling",
    "GPU performance research",
    "OpenStack",
    "RHCSA",
    "Linux",
    "COEP Technological University",
    "Pune",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
    firstName: "Viraj",
    lastName: "Nalbalwar",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Paste the code from Google Search Console into this env var on Vercel.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2fa" },
    { media: "(prefers-color-scheme: dark)", color: "#070a1c" },
  ],
};

// Runs before first paint so the right theme is there from frame one.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: site.title,
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}/viraj-nalbalwar.jpg`,
      description: site.description,
      jobTitle: "Cloud and Systems Engineer",
      address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "COEP Technological University" },
        { "@type": "CollegeOrUniversity", name: "Dr. Babasaheb Ambedkar Technological University" },
      ],
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", name: "Red Hat Certified System Administrator (RHCSA)" },
      ],
      knowsAbout: ["Cloud computing", "Kubernetes", "OpenStack", "Linux", "GPU computing", "High-performance computing", "DevOps", "Next.js"],
      sameAs: socials.map((s) => s.href),
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
