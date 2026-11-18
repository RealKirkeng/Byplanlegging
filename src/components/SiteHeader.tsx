'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS, SITE_CONFIG } from '@/config/site';

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (
      typeof HTMLElement !== 'undefined' &&
      !Object.hasOwn(HTMLElement.prototype, 'popover')
    ) {
      import('@oddbird/popover-polyfill').catch(() => {
        // Progressive enhancement: ignore if polyfill fails to load
      });
    }
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    const menu = menuRef.current;
    if (!header || !inner || !menu) return;

    let lastCollapsedWidth = 0;
    let rafId = 0;

    const measureAndSync = (force = false) => {
      const currentlyWide = header.classList.contains('is-wide');
      const currentWidth = header.getBoundingClientRect().width;

      if (!force && !currentlyWide && currentWidth <= lastCollapsedWidth) {
        return;
      }

      let wasOpen = false;
      try {
        wasOpen = menu.matches(':popover-open') || menu.classList.contains(':popover-open');
      } catch {
        wasOpen = menu.classList.contains(':popover-open');
      }

      header.classList.add('is-measuring');
      if (wasOpen && typeof menu.hidePopover === 'function') {
        try {
          menu.hidePopover();
        } catch {
          // ignore
        }
      }

      header.classList.add('is-wide');
      menu.removeAttribute('popover');

      const fitsInline = inner.scrollWidth <= inner.clientWidth + 1;

      if (fitsInline) {
        header.classList.add('is-wide');
        menu.removeAttribute('popover');
        setMenuOpen(false);
      } else {
        header.classList.remove('is-wide');
        menu.setAttribute('popover', 'auto');
        lastCollapsedWidth = currentWidth;
        if (wasOpen && typeof menu.showPopover === 'function') {
          try {
            menu.showPopover();
          } catch {
            // ignore
          }
        }
      }

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        header.classList.remove('is-measuring');
      });
    };

    const onToggle = (e: Event) => {
      const toggleEvt = e as ToggleEvent;
      setMenuOpen(toggleEvt.newState === 'open');
    };

    menu.addEventListener('toggle', onToggle);
    measureAndSync(true);

    const observer = new ResizeObserver(() => {
      measureAndSync(false);
    });
    observer.observe(header);
    observer.observe(menu);

    return () => {
      cancelAnimationFrame(rafId);
      menu.removeEventListener('toggle', onToggle);
      observer.disconnect();
    };
  }, []);

  // Lukk mobilmeny automatisk ved ruteskifte
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menu.hasAttribute('popover') && typeof menu.hidePopover === 'function') {
      try {
        if (menu.matches(':popover-open')) {
          menu.hidePopover();
        }
      } catch {
        // ignore
      }
    }
  }, [pathname]);

  const isPathActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/omrader' && pathname.startsWith('/omrader/lagmannsholmen')) {
      return false;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header ref={headerRef} className="site-header">
      <div ref={innerRef} className="container header-inner">
        <Link href="/" className="site-logo" aria-label={`${SITE_CONFIG.name} — Til forsiden`}>
          <span className="site-logo-wordmark">{SITE_CONFIG.shortMark}</span>
          <span className="site-logo-tag">Åpen byplanlegging</span>
        </Link>

        <nav className="site-nav" aria-label="Hovedmeny">
          <button
            className="menu-button"
            type="button"
            popoverTarget="site-menu"
            popoverTargetAction="toggle"
            aria-controls="site-menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={16} aria-hidden="true" />
            ) : (
              <Menu size={16} aria-hidden="true" />
            )}
            <span>Meny</span>
          </button>

          <ul
            id="site-menu"
            ref={menuRef}
            className="site-menu"
            popover="auto"
          >
            {NAV_LINKS.map((item) => {
              const active = isPathActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="site-menu-link"
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/send-inn"
                className="site-menu-cta"
                aria-current={pathname === '/send-inn' ? 'page' : undefined}
              >
                Send inn forslag
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
