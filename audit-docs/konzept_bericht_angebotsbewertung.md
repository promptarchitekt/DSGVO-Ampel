# Berichtskonzept: Compliance-Bericht & Angebotsbewertung

**Zweck**: Einheitliches Konzept für den Kundenbericht und die Angebotsbewertung – mit klarem Nutzen, ROI- und Gewinn-Logik und Zielgruppe.

**Referenzen**: [Quality Gate](quality_gate_bericht_angebot.md), [Ampel & Compliance-Test](ampel_compliance_test_authentische_beurteilung.md).

**Grundlage**: Nutzen entlang vier Ebenen (rechtlich verpflichtend, rechtlich regelnd, organisatorisch, persönlicher Mehrwert inkl. Klarheit für Geregelte) und Ausgangslage „DSGVO-Einhaltung ist schwer – für Verantwortliche, Umsetzende, Verantwortungsträger; Angst und Unklarheit bei den Geregelten (z.B. Mitarbeiter)“ – vgl. [Quality Gate](quality_gate_bericht_angebot.md) Ausgangslage, vier Ebenen und Mehrwert pro Persona.

---

## 1. Zielgruppe und Anlass

| Zielgruppe | Anlass | Erwartung |
|------------|--------|-----------|
| **Entscheider (nicht-technisch)** | Angebotsbewertung, Compliance-Check, Investitionsentscheidung | Verständliche Ampeln, priorisierte Risiken, konkreter Nutzen (ROI, Gewinn, vermiedene Kosten). |
| **Fachverantwortliche (Datenschutz, Recht, IT)** | Umsetzungsplan, Audit-Vorbereitung | Vollständige Fragen/Antworten, Rechtsverweise, Next Steps, Abgleich mit Skript. |
| **Vertrieb/Verkauf** | Angebot an Kunden | Argumentation: authentischer ROI, echter Gewinn, Differenzierung durch Transparenz. |
| **Geregelte (Mitarbeiter)** | Von Regeln betroffen, oft Angst und Unklarheit | Klarheit, was gilt; Orientierung statt diffuse Ängste; sichtbare Next Steps mindern das „alles ist verboten“-Gefühl (vgl. [Quality Gate](quality_gate_bericht_angebot.md) Abschnitt „Mehrwert aus Kunden-Persona-Sicht“). |

---

## 2. Berichtstypen und Zweck

| Berichtstyp | Zweck | Kerninhalt |
|-------------|------|------------|
| **Compliance-Selbstcheck-Bericht** | Stand der DSGVO/KI-Akt-Compliance abbilden | Ampeln, GAPs priorisiert, Next Steps, Rechtsverweise (vgl. [Ampel & Compliance-Test](ampel_compliance_test_authentische_beurteilung.md)). |
| **Angebotsbewertungs-Bericht** | Kunden zeigen: Was bringt das Angebot? (ROI, Gewinn) | Ist-Soll-Vergleich, vermiedene Risiken/Kosten, messbare Verbesserung, klare Empfehlung. |
| **Kombinierter Bericht** | Compliance + Angebotsbewertung in einem Dokument | Teil 1: Compliance-Ampeln und GAPs; Teil 2: Angebotsbewertung mit ROI/Gewinn; Teil 3: Empfehlung und Next Steps. |

---

## 3. Berichtsstruktur (Pflichtbestandteile)

### 3.1 Compliance-Teil (immer)

| Abschnitt | Inhalt | Quelle |
|-----------|--------|--------|
| Executive Summary | 2–4 Sätze: Gesamtbild, größtes Risiko, wichtigste Empfehlung | [Ampel & Compliance-Test](ampel_compliance_test_authentische_beurteilung.md), [Quality Gate](quality_gate_bericht_angebot.md) |
| Kennzahlen / Ampel-Übersicht | Tabelle: Thema, Ampel, Kurzbegründung, Artikel | [Skript vollständig](skript_vollstaendig_fragen_antworten_verweise.md) §6, [Ampel & Compliance-Test](ampel_compliance_test_authentische_beurteilung.md) |
| GAPs priorisiert | Fehlt/Stört/Doppelt/Unklar, Priorität, Empfehlung, Verweis | [Skript vollständig](skript_vollstaendig_fragen_antworten_verweise.md), [Ampel & Compliance-Test](ampel_compliance_test_authentische_beurteilung.md) |
| Next Steps | Nummerierte Schritte; erster sofort umsetzbar | [Quality Gate](quality_gate_bericht_angebot.md), [Ampel & Compliance-Test](ampel_compliance_test_authentische_beurteilung.md) |
| Rechtsverweise | Pro Thema mind. 1 Verweis (Artikel, URL) | [Skript vollständig](skript_vollstaendig_fragen_antworten_verweise.md) §7 |
| Offene Punkte | Nicht erhoben, nicht belegt, unklar | Optional, bei Lücken empfohlen |

### 3.2 Angebotsbewertungs-Teil (für ROI/Gewinn)

| Abschnitt | Inhalt |
|-----------|--------|
| Ist-Soll-Vergleich | Aktueller Stand (Ampeln) vs. Zielbild nach Umsetzung des Angebots. |
| Vermiedene Risiken/Kosten | Bußgelder, Sanktionen, Reputationsschaden – mit realistischen Bandbreiten und Quellen (DSGVO bis 4 % Jahresumsatz, NIS2 bis 4 %, KI-VO bis 7 %). |
| Messbare Verbesserung | Anzahl Themen grün vorher/nachher, Reduktion offener GAPs, Erfüllung von Fristen (z.B. KI-Schulung 02.02.2025, BFSG 28.06.2025). |
| ROI-/Gewinn-Logik | Siehe [angebotsbewertung_roi_echter_gewinn.md](angebotsbewertung_roi_echter_gewinn.md): Formeln, Szenarien, Darstellung für Kunden. |
| Empfehlung | Klare Ja/Nein/Eingeschränkt-Empfehlung mit Begründung. |

### 3.3 Einheitliche Meta-Infos

- Erhebungsdatum, Berichtsdatum, Version.
- Kontext: Firma, Mitarbeiterzahl, Use-Case (aus Skript).
- Verwendetes Skript: Verweis auf skript_vollstaendig_fragen_antworten_verweise.md (oder Version).

---

## 4. Ablage und Versionierung

| Typ | Standard-Ablage | Namenskonvention |
|-----|------------------|-------------------|
| Compliance-Bericht | `audit-docs/bericht_compliance_[Kunde_ oder Datum].md` | bericht_compliance_YYYY-MM-DD.md |
| Angebotsbewertung | `audit-docs/bericht_angebotsbewertung_[Kunde_ oder Datum].md` | bericht_angebotsbewertung_YYYY-MM-DD.md |
| Kombiniert | `audit-docs/bericht_compliance_angebot_[Kunde_ oder Datum].md` | wie oben + „_angebot“ |

Versionierung: Im Dokument „Stand: YYYY-MM-DD“ bzw. „Version: x.y“.

---

## 5. Qualitäts-Anforderungen (vor Freigabe)

- Executive Summary vorhanden und in 2–4 Sätzen verständlich.
- Jedes bewertete Thema mit Ampel und mindestens einem Rechtsverweis.
- Mindestens ein sofort umsetzbarer Next Step.
- Bei Angebotsbewertung: ROI-/Gewinn-Abschnitt mit klarer Aussage (vgl. [quality_gate_bericht_angebot.md](quality_gate_bericht_angebot.md)).
- Keine Aussage „vollständig compliant“, solange ein Thema rot oder „nicht erhoben“ ist.
- Offene Punkte/Lücken explizit genannt.

---
*Berichtskonzept für Compliance-Bericht und Angebotsbewertung. Qualitäts-Gates siehe [quality_gate_bericht_angebot.md](quality_gate_bericht_angebot.md); ROI/Gewinn-Logik siehe [angebotsbewertung_roi_echter_gewinn.md](angebotsbewertung_roi_echter_gewinn.md).*
