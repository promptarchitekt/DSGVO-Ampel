"use client";

import Link from "next/link";
import { Shield, Gauge, Brain, FileText } from "lucide-react";

const tools = [
  {
    href: "/dsgvo-ampel",
    title: "DSGVO Ampel",
    description:
      "Geführte Fragen, Sofortbewertung und To-do-Liste für Datenschutz-Projekte.",
    icon: Gauge,
    target: "_self"
  },
  {
    href: "/ki-kompetenztest",
    title: "KI Kompetenztest",
    description:
      "Skills-Check in drei Levels zum EU AI Act inkl. Lernmodus und Tipps.",
    icon: Brain,
    target: "_self"
  }
];

const offers = [
  {
    href: "/offers/02_pa-offer-dsgvo-v1.html",
    title: "DSGVO Pitch",
    description: "Das Pitch Deck zur DSGVO Ampel. Alle Details, Preise und Prozess.",
    icon: FileText,
    target: "_blank"
  },
  {
    href: "/offers/01_pa-offer-v8.html",
    title: "Time Value Pitch",
    description: "Das Pitch Deck zu KI-Workflows und Automation.",
    icon: FileText,
    target: "_blank"
  }
];

export default function HomePage() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 px-6 py-8 text-[var(--pa-foreground)]">
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

      {/* Main Tools */}
      <section className="grid gap-6 md:grid-cols-2">
        {tools.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group pa-card"
            target={card.target}
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

      {/* Offers - Narrower Height, Same Grid Width */}
      <section className="grid gap-6 md:grid-cols-2">
        {offers.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group pa-card !py-4 !px-6 flex items-center"
            target={card.target}
          >
            <div className="flex items-center gap-4 w-full">
              <card.icon className="relative z-10 h-6 w-6 text-[var(--pa-cyan)] shrink-0" />
              <div>
                <h2 className="pa-card-title relative z-10 text-lg font-semibold">
                  {card.title}
                </h2>
                <p className="pa-card-text relative z-10 text-sm text-[var(--pa-muted)]">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
