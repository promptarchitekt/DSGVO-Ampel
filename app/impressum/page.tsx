"use client";

import Link from "next/link";

const contact = {
  company: "PROMPT ARCHITEKT (Update with legal entity)",
  owner: "Marcel Reichl",
  street: "Straße & Hausnummer eintragen",
  city: "PLZ Ort",
  phone: "+49 000 00000000",
  email: "mailto:hallo@promptarchitekt.de",
  vat: "USt-IdNr. ergänzen"
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase text-slate-500">
          Recht & Vertrauen
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Impressum</h1>
        <p className="text-slate-600">
          Bitte ersetzen Sie die Platzhalter durch die offiziell gültigen
          Angaben, bevor das Projekt live geht.
        </p>
      </header>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Verantwortlich
          </p>
          <p className="text-xl font-semibold text-slate-900">
            {contact.company}
          </p>
          <p className="text-slate-600">{contact.owner}</p>
        </div>
        <div className="text-slate-600 space-y-1">
          <p>{contact.street}</p>
          <p>{contact.city}</p>
        </div>
        <div className="space-y-1 text-slate-600">
          <a className="text-blue-600" href={`tel:${contact.phone}`}>
            {contact.phone}
          </a>
          <br />
          <Link className="text-blue-600" href={contact.email}>
            hallo@promptarchitekt.de
          </Link>
        </div>
        <p className="text-slate-500 text-sm">{contact.vat}</p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Verantwortlich für Inhalte
        </h2>
        <p className="text-slate-600">
          Nach § 55 Abs. 2 RStV: Bitte hier den Namen der verantwortlichen
          Person eintragen.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Haftung & Hinweise
        </h2>
        <p className="text-slate-600">
          Die bereitgestellten Informationen ersetzen keine Rechtsberatung. Trotz
          sorgfältiger Prüfung übernehmen wir keine Haftung für externe Links.
        </p>
      </section>
    </div>
  );
}
