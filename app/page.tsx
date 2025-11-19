"use client";

import Link from "next/link";
import { Shield, Gauge, Brain } from "lucide-react";

const cards = [
  {
    href: "/dsgvo-ampel",
    title: "DSGVO Ampel",
    description:
      "Geführte Fragen, Sofortbewertung und To-do-Liste für Datenschutz-Projekte.",
    icon: Gauge,
    accent: "from-emerald-300/40 to-emerald-600/30"
  },
  {
    href: "/ki-kompetenztest",
    title: "KI Kompetenztest",
    description:
      "Skills-Check in drei Levels zum EU AI Act inkl. Lernmodus und Tipps.",
    icon: Brain,
    accent: "from-sky-300/40 to-sky-600/30"
  }
];

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 text-[var(--pa-foreground)]">
      <section className="rounded-3xl border border-white/10 bg-[var(--pa-surface)]/80 p-10 shadow-[0_35px_120px_rgba(0,0,0,0.55)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[rgba(0,250,255,0.08)] px-4 py-1 text-sm font-medium text-[var(--pa-cyan)]">
              <Shield className="h-4 w-4" />
              Zero-Data Compliance Suite
            </p>
            <h1 className="mt-6 text-4xl font-bold text-[var(--pa-foreground)]">
              Zwei Tools. Sofort Klarheit zu DSGVO & EU AI Act.
            </h1>
            <p className="mt-4 text-lg text-[var(--pa-muted)]">
              Wähle den passenden Checker: Ampel für Datenschutz-Use-Cases oder
              Kompetenztest für KI-Regulatorik. Beide laufen 100% im Browser.
            </p>
          </div>
          <div className="grid gap-4 rounded-2xl border border-white/10 bg-[#05090f]/80 p-6 text-[var(--pa-foreground)]">
            <div>
              <p className="text-sm uppercase tracking-wide text-[var(--pa-muted)]">
                Statusübersicht
              </p>
              <p className="text-3xl font-bold">Ampel-First</p>
            </div>
            <ul className="space-y-2 text-sm text-[var(--pa-muted)]">
              <li>✔ Keine Datenübertragung</li>
              <li>✔ Schritt-für-Schritt Guidance</li>
              <li>✔ Exportfähige Ergebnisse</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group pa-card"
          >
            <card.icon className="relative z-10 h-10 w-10 text-[var(--pa-cyan)]" />
            <h2 className="pa-card-title relative z-10 mt-4 text-2xl font-semibold">
              {card.title}
            </h2>
            <p className="pa-card-text relative z-10 mt-2">{card.description}</p>
            <span className="pa-card-link relative z-10 mt-6">
              Tool öffnen
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
