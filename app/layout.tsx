import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://premiummarblecontractors.in"),
  title: {
    default: "Premium Marble & Tile Contractors | Punjab & J&K",
    template: "%s | Premium Marble & Tile Contractors",
  },
  description:
    "Expert marble and tile fitting services across Punjab and Jammu & Kashmir. Specialising in homes, halls, kitchens, and bathrooms. Call your local contractor today.",
  keywords: [
    "marble contractor",
    "tile fitting",
    "marble installation",
    "tile contractor punjab",
    "marble jalandhar",
    "tile rajouri",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://premiummarblecontractors.in",
    siteName: "Premium Marble & Tile Contractors",
    title: "Premium Marble & Tile Contractors | Punjab & J&K",
    description:
      "Expert marble and tile fitting across Punjab and J&K. Homes, halls, kitchens, bathrooms. Call now.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Marble & Tile Contractors",
    description: "Expert marble and tile fitting across Punjab and J&K.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
