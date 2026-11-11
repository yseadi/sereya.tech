import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Glow } from "@/components/Glow";
import { Menu } from "@/components/Menu";
import { firstName, getViewer } from "@/lib/auth";
import "./globals.css";

const description =
  "Signals, trends and readings on technology, culture and the world outside the usual centres. Made in Brasil, reading the world.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sereya.tech"),
  title: { default: "Sereya Tech", template: "%s · Sereya Tech" },
  description,
  applicationName: "Sereya Tech",
  openGraph: {
    type: "website",
    siteName: "Sereya Tech",
    title: "Sereya Tech",
    description,
    url: "/",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sereya Tech, signals from the world outside the usual centres" }],
  },
  twitter: { card: "summary_large_image", title: "Sereya Tech", description, images: ["/og.png"] },
};

export const viewport = { themeColor: "#f1ecfb" };

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
        <Glow />
        <Menu name={name} isOwner={profile?.role === "owner"} avatarUrl={profile?.avatar_url} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
