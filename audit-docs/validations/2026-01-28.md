# Compliance-Validierungsreport (MVP) – 2026-01-28

**Zweck**: Minimaler täglicher Prüfbericht für `audit-docs` (Dokumentenstandard, Links).

---

## A) Einordnung

- Bereich: `audit-docs`
- Geprüfte Dateien (.md): 31
- Aktivierte Checks: docStandard=true, links=true

## B) Fakten

- Dokumentenstandard-Verstöße: 2
- Gefundene Links (einzigartig): 29
- Problematische Links: 16

### Details Dokumentenstandard-Verstöße

- audit-docs/docs/DSGVO_Ampel_Aufbereitung_v2.md: missing **Zweck**, missing --- separator
- audit-docs/docs/REVIEW_DSGVO_Ampel_Aufbereitung_v2.md: missing **Zweck**

### Details problematische Links

- https://www.datenschutz-wiki.de/wiki/Bu%C3%9Fgelddatenbank (Status: 404, Fehler: –)
- https://dsgvo-ampel.promptarchitekt.de` (Status: n/a, Fehler: TypeError: fetch failed)
- https://gpt-export-viewer.vercel.app/ (Status: 404, Fehler: –)
- https://example.com" (Status: n/a, Fehler: TypeError: fetch failed)
- https://dsgvo-ampel.promptarchitekt.de" (Status: n/a, Fehler: TypeError: fetch failed)
- https://www.npmjs.com/package/@openrouter/ai-sdk-provider (Status: 403, Fehler: –)
- https://www.bitkom.org/Themen/Datenschutz-Sicherheit/Datenschutz/Auftragsverarbeitung.html (Status: 404, Fehler: –)
- https://www.datenschutz.org/auftragsverarbeitung/ (Status: 404, Fehler: –)
- https://www.bundesnetzagentur.de/DE/Beschlusskammern/Beschlusskammer1/KI/start.html (Status: 404, Fehler: –)
- https://www.bundesnetzagentur.de/DE/Beschlusskammern/Beschlusskammer1/KI/KI-Kompetenz.html (Status: 404, Fehler: –)
- https://www.ihk.de/rhein-neckar/ausbildung-weiterbildung/weiterbildung-channel/eu-ai-act-artikel-4-6434562 (Status: n/a, Fehler: TypeError: fetch failed)
- https://www.ihk.de/rhein-neckar/recht/barrierefreiheitsstaerkungsgesetz-bfsg-5209948 (Status: n/a, Fehler: TypeError: fetch failed)
- https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/NIS2/nis2_node.html (Status: 400, Fehler: –)
- https://www.bmi.bund.de/DE/themen/it-und-digitalpolitik/nis2/nis2-node.html (Status: 400, Fehler: –)
- https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2019-11-28-GoBD.html (Status: 404, Fehler: –)
- https://www.ldi.nrw.de/datenschutz/verwaltung/..." (Status: 403, Fehler: –)

## C) Plausibilitätscheck

- Normen-Konfiguration (Config.norms): ["DSGVO","KI-VO","NIS2"]
- Grundannahme: Alle relevanten fachlichen Dokumente liegen in `audit-docs/`.

## D) Empfehlung

- Dokumentenstandard-Verstöße in den oben genannten Dateien beheben (Zweck/--- ergänzen).
- Problematische Links prüfen und ggf. korrigieren oder entfernen.

## E) Unsicherheiten

- Diese MVP-Version prüft noch keine Gesetzeslage/Primärquellen.
- Externe Links können temporär fehlschlagen (z. B. 5xx), ohne dass dies ein echtes Compliance-Problem ist.

## F) Quellen

- Interne Quelle: `audit-docs/*.md` in diesem Repository.
- Externe Links (geprüft):
  - https://www.datenschutz-wiki.de/wiki/Bu%C3%9Fgelddatenbank
  - https://dsgvo-ampel.promptarchitekt.de`
  - https://gpt-export-viewer.vercel.app/
  - https://example.com"
  - https://dsgvo-ampel.promptarchitekt.de"
  - https://sdk.vercel.ai
  - https://www.npmjs.com/package/@openrouter/ai-sdk-provider
  - https://modelcontextprotocol.io
  - https://www.datenschutz-grundverordnung.eu/grundverordnung/art-30-ds-gvo/
  - https://www.ldi.nrw.de/datenschutz/verwaltung/verarbeitungsverzeichnis-nach-artikel-30-ds-gvo
  - https://emodeon.de/kostenlose-vorlage-fuer-das-verzeichnis-von-verarbeitungstaetigkeiten-vvt/
  - https://www.ldi.nrw.de/datenschutz/datenschutz-folgenabschaetzung
  - https://www.datenschutzzentrum.de/sdm/
  - https://www.bitkom.org/Themen/Datenschutz-Sicherheit/Datenschutz/Auftragsverarbeitung.html
  - https://www.datenschutz.org/auftragsverarbeitung/
  - https://www.bundesnetzagentur.de/DE/Beschlusskammern/Beschlusskammer1/KI/start.html
  - https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R1689
  - https://www.bundesnetzagentur.de/DE/Beschlusskammern/Beschlusskammer1/KI/KI-Kompetenz.html
  - https://www.ihk.de/rhein-neckar/ausbildung-weiterbildung/weiterbildung-channel/eu-ai-act-artikel-4-6434562
  - https://www.ihk.de/rhein-neckar/recht/barrierefreiheitsstaerkungsgesetz-bfsg-5209948
  - https://www.w3.org/WAI/WCAG22/quickref/
  - https://wave.webaim.org/
  - https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/NIS2/nis2_node.html
  - https://www.bmi.bund.de/DE/themen/it-und-digitalpolitik/nis2/nis2-node.html
  - https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2019-11-28-GoBD.html
  - https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Steuern/e-rechnung.html
  - https://www.ldi.nrw.de/datenschutz/verwaltung/..."
  - https://www.youtube.com/watch?v=example"
  - https://emodeon.de/kostenlose-vorlage-fuer-das-verzeichnis..."
