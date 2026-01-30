import type { Metadata } from "next";
import "./app.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Createconomy Admin Console",
    template: "%s | Admin",
  },
  description: "Admin console for managing Createconomy platform",
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
