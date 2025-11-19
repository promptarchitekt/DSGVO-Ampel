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
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-900/5">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
              <Shield className="h-4 w-4" />
              Zero-Data Compliance Suite
            </p>
            <h1 className="mt-6 text-4xl font-bold text-slate-900">
              Zwei Tools. Sofort Klarheit zu DSGVO & EU AI Act.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Wähle den passenden Checker: Ampel für Datenschutz-Use-Cases oder
              Kompetenztest für KI-Regulatorik. Beide laufen 100% im Browser.
            </p>
          </div>
          <div className="grid gap-4 rounded-2xl bg-slate-900/90 p-6 text-slate-100">
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-300">
                Statusübersicht
              </p>
              <p className="text-3xl font-bold">Ampel-First</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-200">
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
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-blue-400"
          >
            <div
              className={`pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br ${card.accent}`}
            />
            <card.icon className="relative h-10 w-10 text-blue-600" />
            <h2 className="relative mt-4 text-2xl font-semibold text-slate-900">
              {card.title}
            </h2>
            <p className="relative mt-2 text-slate-600">{card.description}</p>
            <span className="relative mt-6 inline-flex items-center text-sm font-semibold text-blue-600">
              Tool öffnen →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
