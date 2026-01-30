import type { Metadata } from "next";
import "./app.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Createconomy Seller Portal",
    template: "%s | Seller Portal",
  },
  description: "Manage your products, orders, and earnings",
  robots: {
    index: false,
    follow: false,
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
