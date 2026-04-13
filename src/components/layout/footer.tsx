"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteData } from "@/data";

const SocialIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="6" r="1.5" fill="currentColor" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  };
  return icons[type] || null;
};

const socialLinks = [
  { name: "Facebook", href: siteData.social.facebook, type: "facebook" },
  { name: "Twitter", href: siteData.social.twitter, type: "twitter" },
  { name: "Instagram", href: siteData.social.instagram, type: "instagram" },
  { name: "YouTube", href: siteData.social.youtube, type: "youtube" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--secondary)] text-[var(--secondary-foreground)] border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative h-12 w-12">
                <Image
                  src="/assets/icon.png"
                  alt={`${siteData.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display text-xl font-bold text-[var(--foreground)]">
                {siteData.name}
              </span>
            </Link>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              {siteData.tagline}
            </p>
            <div className="space-y-2">
              <a
                href={`mailto:${siteData.contact.email}`}
                className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {siteData.contact.email}
              </a>
              <a
                href={`tel:${siteData.contact.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {siteData.contact.phone}
              </a>
              <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                <MapPin className="h-4 w-4 shrink-0" />
                {siteData.contact.formattedAddress}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[var(--foreground)]">
              Shop
            </h3>
            <ul className="space-y-2">
              {siteData.links.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[var(--foreground)]">
              Categories
            </h3>
            <ul className="space-y-2">
              {siteData.links.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[var(--foreground)]">
              Support
            </h3>
            <ul className="space-y-2">
              {siteData.links.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[var(--foreground)]">
              Company
            </h3>
            <ul className="space-y-2">
              {siteData.links.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted-foreground)]">
            © {siteData.year} {siteData.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="p-2 text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
                aria-label={social.name}
              >
                <SocialIcon type={social.type} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
