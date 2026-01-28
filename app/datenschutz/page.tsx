"use client";

import { useEffect } from "react";
import Link from "next/link";

const DATENSCHUTZ_URL = "https://www.promptarchitekt.de/datenschutz";

export default function DatenschutzPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = DATENSCHUTZ_URL;
    }
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase text-slate-500">
          Datenschutz
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Datenschutzerklärung</h1>
        <p className="text-slate-600">
          Sie werden zur offiziellen Datenschutzerklärung von PROMPT ARCHITEKT auf{" "}
          <span className="font-semibold">promptarchitekt.de</span> weitergeleitet.
        </p>
      </header>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-600">
          Falls die automatische Weiterleitung nicht funktioniert, nutzen Sie bitte
          diesen Link zur aktuellen Datenschutzerklärung:
        </p>
        <Link
          href={DATENSCHUTZ_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all"
        >
          {DATENSCHUTZ_URL}
        </Link>
      </section>
    </div>
  );
}
