"use client";

import { useEffect } from "react";
import Link from "next/link";

const IMPRESSUM_URL = "https://www.promptarchitekt.de/impressum";

export default function ImpressumPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = IMPRESSUM_URL;
    }
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase text-slate-500">
          Recht & Vertrauen
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Impressum</h1>
        <p className="text-slate-600">
          Sie werden zum offiziellen Impressum von PROMPT ARCHITEKT auf{" "}
          <span className="font-semibold">promptarchitekt.de</span> weitergeleitet.
        </p>
      </header>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-600">
          Falls die automatische Weiterleitung nicht funktioniert, nutzen Sie bitte
          diesen Link zur aktuellen Impressumsseite:
        </p>
        <Link
          href={IMPRESSUM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all"
        >
          {IMPRESSUM_URL}
        </Link>
      </section>
    </div>
  );
}
