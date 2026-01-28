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
    <div className="h-full flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <header className="space-y-3 mb-6">
            <p className="text-sm font-semibold uppercase text-slate-500">
              Datenschutz
            </p>
            <h2 className="text-2xl font-bold text-slate-900">Datenschutzerklärung</h2>
            <p className="text-slate-600">
              Sie werden zur offiziellen Datenschutzerklärung von PROMPT ARCHITEKT auf{" "}
              <span className="font-semibold">promptarchitekt.de</span> weitergeleitet.
            </p>
          </header>

          <section className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-6">
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
      </div>
    </div>
  );
}
