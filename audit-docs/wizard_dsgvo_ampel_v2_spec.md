# DSGVO-Ampel Wizard V2 – Spezifikation

**Zweck**: Dieses Dokument definiert den **Wizard V2** der DSGVO-Ampel als Single-Card-Flow (Präsentationsmodus) – inklusive UX, Struktur, Navigation und Kopplung an Ampel-/Berichtslogik. Es ist die **Single Source of Truth** für die App-Routen `dsgvo-ampel-v2`.

**Referenzen**:  
- `audit-docs/docs/DSGVO_Ampel_Aufbereitung_v2.md` (Inhalte & Angebot)  
- `audit-docs/skript_vollstaendig_fragen_antworten_verweise.md` (Fragen-SSOT)  
- `audit-docs/gesetzeslage_stand_280126.md` (Rechtslage)  
- `audit-docs/konzept_vercel_agent_datumsachtsamkeit_perplexity_n8n.md` (Datumsachtsamkeit)  
- `audit-docs/prozess_compliance_automation_und_nachvollziehbarkeit.md` (Automation & Changelog)

**Stand**: 28.01.2026 (V2 – Single-Card-Wizard, eigener App-Ordner)

---

## 1. Zielbild & Scope

- **Wizard-Typ**: Geführter **Single-Card-Wizard** im Präsentationsmodus: pro Schritt **genau eine Frage** im Fokus.  
- **Route**: `GET /dsgvo-ampel-v2` (Next.js App Router).  
- **Zielgruppe**: Entscheider:innen ohne tiefes Technik-/Rechtswissen; wenig Zeit, hohe Klarheit.  
- **Nicht-Ziel**: Vollständige Rechtsberatung oder Detail-Config für Fachabteilungen.

**Ergebnis pro Durchlauf**:
- Ampel-Bewertung je Themenblock (DSGVO, KI-VO, BFSG, NIS2, GoBD, Mitarbeiter).  
- Priorisierte Maßnahmenliste (Top-Todos).  
- PDF-Report mit Executive Summary, Ampel-Übersicht, Maßnahmen (siehe `DSGVO_Ampel_Aufbereitung_v2.md`).

---

## 2. UX & Layout-Regeln (Wizard V2)

**2.1 Frame**
- Viewport: Vollbild-Hintergrund (`h-screen`), zentrierte Card (`max-w-3xl`, `w-full`).
- Kein Seiten-Scroll; Inhalte scollen nur **innerhalb** der Card, falls nötig.

**2.2 Struktur eines Schritts**
- **Header** (innerhalb der Card):
  - Kleiner Block-Titel (z. B. „DSGVO – Dokumentation“).
  - Hauptfrage als H2.
  - Progress: „Frage X von Y (relevante Fragen)“ + Progress-Bar.
- **Body**:
  - Antwort-Element (Radio-Cards / Input).  
  - Kurze Hilfestellung (1–3 Zeilen) direkt unter der Frage.
- **Footer**:
  - Buttons „Zurück“ und „Weiter/Ergebnis anzeigen“.  
  - Hinweis auf Shortcuts (←/→, Enter).

**2.3 Navigation & Tastatur**
- **Linear**: Nutzer sieht nur „Zurück/Weiter“, keine seitliche Fragenübersicht.  
- **Keyboard**:
  - `ArrowLeft` → Schritt zurück (wenn möglich).  
  - `ArrowRight` oder `Enter` → Schritt vor (nur wenn Frage beantwortet und Fokus nicht im Textfeld).  
  - Radio-Cards sind fokusierbare Buttons (Space/Enter wählt Option).

---

## 3. Inhaltsstruktur (Blöcke & Fragen)

Die fachliche Struktur stammt aus `skript_vollstaendig_fragen_antworten_verweise.md` und `DSGVO_Ampel_Aufbereitung_v2.md`. V2 verwendet folgende **Blöcke**:

1. **Kontext / Unternehmen** – Mitarbeiterzahl, Use-Case.  
2. **DSGVO – Dokumentation** – VVT, DSFA, Auftragsverarbeitung.  
3. **EU KI-VO / KI-Nutzung** – KI-Systeme, Risikoklasse, Kompetenz/Schulung.  
4. **BFSG (Barrierefreiheit)** – Digitales Produkt ja/nein, Barrierepflicht.  
5. **NIS2** – Relevanz für das Unternehmen.  
6. **GoBD** – Relevanz und Status.  
7. **Mitarbeiter-Themen** – Datenschutz, Betriebsvereinbarungen, Schulungen, Richtlinien.  
8. **Kontakt / Übergabe** – Name, Firma, E-Mail (optional).

Implementierungsdetail (V2):
- Ein zentrales Config-Objekt (z. B. `questions` in `app/dsgvo-ampel-v2/page.tsx` oder eigener Config-Datei) enthält:
  - `block`, `id`, `title`, `type`, `options`, `helpText`, optional `ampelKey`, `normKey`.

---

## 4. Branching & Skip-Logic

- Branching (z. B. KI-Block nur bei KI-Use-Case) erfolgt **intern**:
  - UI zeigt immer nur „Frage X von Y (relevante Fragen)“.  
  - Relevanz wird aus Antworten (Use-Case etc.) + Config abgeleitet.
- **Regeln** (Beispiele):
  - KI-Fragen werden nur gezeigt, wenn Use-Case „KI-System“ oder vergleichbar ist.  
  - BFSG-Fragen werden nur gezeigt, wenn ein digitales Produkt / Service vorliegt.  
  - NIS2/GoBD werden nur bei potentiell betroffenen Unternehmen durchlaufen (Konfigurationslogik).

Technisch:
- Funktionen `getRelevantQuestions(formData)` und `getNextIndex(currentIndex, formData)` definieren den Flow.  
- Back/Next arbeiten immer auf der **Liste relevanter Fragen**.

---

## 5. Ampel- & Bewertungslogik

- Jede Frage hat einen Bezug zu einem Themenblock (`ampelKey`) und ggf. zu konkreten Normen (`normKey`), die in `audit-docs` dokumentiert sind.  
- Die Ampel-Logik orientiert sich an `ampel_compliance_test_authentische_beurteilung.md` und `DSGVO_Ampel_Aufbereitung_v2.md`:
  - Grün: Anforderung erfüllt oder nicht anwendbar, aber begründet.  
  - Gelb: unklar, teilweise erfüllt, geplant, oder „Weiß nicht“.  
  - Rot: relevante Lücke.

Die Implementierung der Ampelberechnung wird aus V1 übernommen und auf V2-Fragen gemappt (1:1 Beibehaltung der fachlichen Regeln, nur geänderte Präsentation im Wizard).

---

## 6. Validierung & Datumsachtsamkeit

- Rechtsrelevante Texte (Fragen-Hilfen, Ergebnis-Texte, PDF-Report) folgen der **Validierungsregel** aus `gesetzeslage_stand_280126.md`:
  - Aussagen mit **Datum der Prüfung** und **Quelle** (z. B. KI-VO-Stichtage).  
  - Keine pauschalen „Stand = heute“-Angaben ohne echte Prüfung.
- Änderungen an Wizard-Inhalten, die Rechtslage betreffen, werden:
  - über PRs nachvollziehbar gemacht,  
  - in `CHANGELOG_GESETZESLAGE.md` bzw. Validierungsreports dokumentiert.

---

## 7. Artefakte & Routen

- **App-Wizard**: `app/dsgvo-ampel-v2/page.tsx` (Single-Card-Wizard gemäß dieser Spec).  
- **PDF-Report**: Client-seitig erzeugt (jsPDF), basierend auf Ampel-Ergebnis + Todos.  
- **Dokumentation**:  
  - `DSGVO_Ampel_Aufbereitung_v2.md` beschreibt Angebot & Ergebnisse.  
  - Dieses Dokument (`wizard_dsgvo_ampel_v2_spec.md`) beschreibt den Wizard selbst.

---

## 8. Nächste Schritte (für Implementierung)

1. `app/dsgvo-ampel-v2/page.tsx` von V1 entkoppeln und als eigenen Single-Card-Wizard implementieren (Layout wie oben).  
2. Fragenkonfiguration in V2 konsolidieren und an diese Spec anpassen (Blöcke, Branching, Mapping zu Ampel).  
3. Navigation (Back/Next, Keyboard) und Enter-Verhalten implementieren.  
4. UI-Tests mit typischen Pfaden (nur DSGVO, DSGVO+KI, Full Enterprise) durchführen.  
5. Kurzabschnitt in `DSGVO_Ampel_Aufbereitung_v2.md` ergänzen: „Wizard V2 – Ablauf in 5–7 Schritten“.

