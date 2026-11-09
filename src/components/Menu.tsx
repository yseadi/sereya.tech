"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconCommunity, IconGlossary, IconHome, IconSignals, IconStudio } from "./Icons";

type Props = { name: string | null; isOwner: boolean };

export function Menu({ name, isOwner }: Props) {
  const path = usePathname();
  const tabs = name
    ? [
        { href: "/", label: "Home", icon: <IconHome /> },
        { href: "/signals", label: "Signals", icon: <IconSignals /> },
        { href: "/glossary", label: "Glossary", icon: <IconGlossary /> },
        { href: "/community", label: "Community", icon: <IconCommunity /> },
        ...(isOwner ? [{ href: "/studio", label: "Studio", icon: <IconStudio /> }] : []),
      ]
    : [
        { href: "/signals", label: "Signals", icon: <IconSignals /> },
        { href: "/glossary", label: "Glossary", icon: <IconGlossary /> },
      ];
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <div className="menu-holder">
      <div className="wrap">
        <nav aria-label="Main" className="menu">
          <Link href="/" aria-label="Sereya Tech home" className="menu-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sereya-logo.svg" width={108} height={38} alt="Sereya Tech" />
          </Link>
          <div className="menu-tabs">
            {tabs.map((t) => (
              <Link key={t.href} href={t.href} className="tab" aria-current={isActive(t.href) ? "page" : undefined}>
                {t.icon}
                <span className="tab-name">{t.label}</span>
              </Link>
            ))}
            {name ? (
              <Link href="/settings" className="menu-me" aria-label={`Settings for ${name}`}>
                <span className="me-name">{name}</span>
                <span className="avatar">{name.slice(0, 1).toUpperCase()}</span>
              </Link>
            ) : (
              <>
                <Link href="/login" className="tab" aria-current={isActive("/login") ? "page" : undefined}>
                  Log in
                </Link>
                <Link href="/join" className="btn small">
                  Join Sereya
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
