"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 text-sm font-medium text-[var(--pa-muted)]">
      {pathname !== "/dsgvo-ampel" && (
        <Link
          className="transition-colors hover:text-[var(--accent-cyan)]"
          href="/dsgvo-ampel"
        >
          DSGVO Ampel
        </Link>
      )}
      {pathname !== "/ki-kompetenztest" && (
        <Link
          className="transition-colors hover:text-[var(--accent-cyan)]"
          href="/ki-kompetenztest"
        >
          KI Kompetenztest
        </Link>
      )}
    </nav>
  );
}

