"use client";

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase text-slate-500">
          Zero-Data Prinzip
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Datenschutzerklärung</h1>
        <p className="text-slate-600">
          Diese App verarbeitet keine personenbezogenen Daten serverseitig. Alle
          Eingaben bleiben lokal im Browser der Nutzerin / des Nutzers.
        </p>
      </header>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Grundprinzip</h2>
        <p className="text-slate-600">
          Weder DSGVO Ampel noch KI Kompetenztest speichern Daten auf Servern,
          Logs oder Datenbanken. Es existieren keine Cookies, Tracker oder
          versteckte Pixel. Nach dem Neuladen der Seite sind alle Antworten
          gelöscht.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Verantwortliche Stelle
        </h2>
        <p className="text-slate-600">
          Bitte tragen Sie hier die verantwortliche Stelle inkl. Anschrift,
          Telefon (E.164-Format) und E-Mail ein, sobald die App produktiv
          genutzt wird.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Ihre Rechte</h2>
        <p className="text-slate-600">
          Trotz Zero-Data-Ansatz gelten die Rechte auf Auskunft, Berichtigung,
          Löschung, Einschränkung und Widerspruch. Da keine Daten verarbeitet
          werden, können diese Rechte in der Regel unmittelbar erfüllt werden.
        </p>
      </section>
    </div>
  );
}
