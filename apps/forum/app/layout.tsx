import type { Metadata } from "next";
import "./app.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Createconomy Forum - Community Discussions",
    template: "%s | Createconomy Forum",
  },
  description:
    "Join the conversation. Discuss, share, and learn with fellow creators in our community forum.",
  keywords: [
    "creator forum",
    "community discussions",
    "createconomy forum",
    "digital creators",
    "creator community",
  ],
  authors: [{ name: "Createconomy" }],
  creator: "Createconomy",
  publisher: "Createconomy",
  metadataBase: new URL("https://discuss.createconomy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://discuss.createconomy.com",
    title: "Createconomy Forum - Community Discussions",
    description: "Join the conversation with fellow creators.",
    siteName: "Createconomy Forum",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Createconomy Forum",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Createconomy Forum - Community Discussions",
    description: "Join the conversation with fellow creators.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
