import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Menu } from "@/components/Menu";
import { firstName, getViewer } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Sereya Tech", template: "%s · Sereya Tech" },
  description: "Signals, trends and readings on technology, culture and the world outside the usual centres.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getViewer();
  const name = user ? firstName(profile) || "You" : null;
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Menu name={name} isOwner={profile?.role === "owner"} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
