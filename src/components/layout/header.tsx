"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="header-wrap">
      <div className="site-header">
        <Link href="/" className="wordmark" aria-label="Sandesh Apparala home">
          sandesh<span className="wordmark-dot">.</span>
          <span className="wordmark-suffix">io</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="button button-small header-cta">
          Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className="menu-toggle" aria-label="Open navigation">
              <Menu size={24} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content
              className="mobile-menu"
              aria-describedby={undefined}
            >
              <div className="mobile-menu-top">
                <Dialog.Title className="wordmark">
                  sandesh<span className="wordmark-dot">.</span>io
                </Dialog.Title>
                <Dialog.Close
                  className="icon-button"
                  aria-label="Close navigation"
                >
                  <X />
                </Dialog.Close>
              </div>
              <nav aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <Dialog.Close key={item.href} asChild>
                    <Link href={item.href}>
                      {item.label}
                      <ArrowUpRight size={24} />
                    </Link>
                  </Dialog.Close>
                ))}
              </nav>
              <p>
                AI agents, built around
                <br />
                the way your business works.
              </p>
              <Dialog.Close asChild>
                <Link href="/contact" className="button">
                  Let’s talk <ArrowUpRight size={18} />
                </Link>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
