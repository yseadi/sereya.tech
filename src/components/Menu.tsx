"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "./Avatar";
import { IconCommunity, IconGlossary, IconHome, IconSave, IconSignals, IconStudio } from "./Icons";

type Props = { name: string | null; isOwner: boolean; avatarUrl?: string | null };

export function Menu({ name, isOwner, avatarUrl }: Props) {
  const path = usePathname();
  const tabs = name
    ? [
        { href: "/", label: "Home", icon: <IconHome /> },
        { href: "/signals", label: "Signals", icon: <IconSignals /> },
        { href: "/glossary", label: "Glossary", icon: <IconGlossary /> },
        { href: "/community", label: "Community", icon: <IconCommunity /> },
        { href: "/saved", label: "Saved", icon: <IconSave size={20} /> },
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
        {/* The pearly gradient the active tab's icon is drawn with. */}
        <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="pearl-stroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0" stopColor="#c97a8e" />
              <stop offset="0.3" stopColor="#8a76c4" />
              <stop offset="0.55" stopColor="#6d8fd0" />
              <stop offset="0.8" stopColor="#5aa596" />
              <stop offset="1" stopColor="#c9a46a" />
              <animateTransform attributeName="gradientTransform" type="rotate" from="0 12 12" to="360 12 12" dur="6s" repeatCount="indefinite" />
            </linearGradient>
          </defs>
        </svg>
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
                <Avatar name={name} url={avatarUrl} />
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
