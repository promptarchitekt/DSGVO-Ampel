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
    <div className="h-full flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <header className="space-y-3 mb-6">
            <p className="text-sm font-semibold uppercase text-slate-500">
              Recht & Vertrauen
            </p>
            <h2 className="text-2xl font-bold text-slate-900">Impressum</h2>
            <p className="text-slate-600">
              Sie werden zum offiziellen Impressum von PROMPT ARCHITEKT auf{" "}
              <span className="font-semibold">promptarchitekt.de</span> weitergeleitet.
            </p>
          </header>

          <section className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-6">
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
      </div>
    </div>
  );
}
