import type { Metadata } from "next";
import "./app.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Createconomy - Digital Marketplace for Creators",
    template: "%s | Createconomy",
  },
  description:
    "Discover and sell digital products, templates, courses, and more. Createconomy is the premier marketplace for digital creators.",
  keywords: [
    "digital marketplace",
    "createconomy",
    "digital products",
    "templates",
    "courses",
    "creators",
    "sell digital downloads",
  ],
  authors: [{ name: "Createconomy" }],
  creator: "Createconomy",
  publisher: "Createconomy",
  metadataBase: new URL("https://createconomy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://createconomy.com",
    title: "Createconomy - Digital Marketplace for Creators",
    description:
      "Discover and sell digital products, templates, courses, and more.",
    siteName: "Createconomy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Createconomy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Createconomy - Digital Marketplace for Creators",
    description:
      "Discover and sell digital products, templates, courses, and more.",
    images: ["/og-image.png"],
    creator: "@createconomy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
