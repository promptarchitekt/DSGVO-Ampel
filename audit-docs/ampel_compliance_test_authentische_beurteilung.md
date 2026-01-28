# Ampel & Compliance-Test – Für eine authentische Beurteilung

**Zweck**: Ampel-Logik und Ablauf des Compliance-Tests so festlegen, dass die **Beurteilung authentisch** bleibt – belegbar, transparent, ohne Schönfärberei. Grundlage für DSGVO-Ampel-Formular, Bericht und Angebotsbewertung.

**Kontext**: Compliance ist für Verantwortliche, Umsetzende und Geregelte (z.B. Mitarbeiter) oft **schwer** und mit **Angst und Unklarheit** verbunden. Die authentische Beurteilung zielt auf Klarheit, Handlungsfähigkeit und Orientierung – vgl. [Quality Gate](quality_gate_bericht_angebot.md) Ausgangslage und Mehrwert pro Persona.

**Referenzen**: [Skript vollständig](skript_vollstaendig_fragen_antworten_verweise.md) §6 (Antwort → Ampel), [Quality Gate](quality_gate_bericht_angebot.md), [Angebotsbewertung ROI](angebotsbewertung_roi_echter_gewinn.md).

---

## 1. Ampel – Bedeutung und Schwellen

### 1.1 Definition der Farben

| Farbe | Bedeutung | Konsequenz für Beurteilung |
|-------|-----------|-----------------------------|
| **Grün** | Anforderung erfüllt oder nach Prüfung nicht anwendbar (mit Begründung). | Thema als „compliant“ bzw. „nicht relevant“ geführt; kein Handlungsbedarf, sofern Begründung dokumentiert. |
| **Gelb** | Teilweise erfüllt, unsicher, geplant oder Frist noch offen. | Handlungsbedarf; in Beurteilung als „offen“/„in Arbeit“ mit konkreter Empfehlung und Frist. |
| **Rot** | Anforderung nicht erfüllt oder relevante Lücke. | Handlungsbedarf priorisiert; in Beurteilung als „nicht compliant“ mit klarer Empfehlung und Rechtsverweis. |

**Authentizität**: Keine Farbe ohne **Begründung** und ohne **Zuordnung zu einer Rechtsnorm** (Artikel/Link). „Weiß nicht“ → immer **Gelb**, niemals Grün.

### 1.2 Schwellen pro Thema (verbindlich für Beurteilung)

Entspricht [Skript vollständig](skript_vollstaendig_fragen_antworten_verweise.md) §6. Abweichungen nur mit dokumentierter Begründung.

| Thema | Grün | Gelb | Rot |
|-------|------|------|-----|
| **VVT** | ja (vollständig dokumentiert) | teilweise | nein |
| **DSFA** | ja, nicht_erforderlich (mit Begründung) | nein (geplant), weiss_nicht | nein (ohne Plan); bei KI/personenbezogenen Daten: nein → i.d.R. Rot |
| **AVV** | ja, keine_dienstleister | teilweise | nein (bei externen Dienstleistern) |
| **KI-Kompetenz** | ja (alle relevanten MA geschult) | teilweise | nein |
| **BFSG** (wenn digitales Produkt) | ja (WCAG 2.2 AA) | teilweise, weiss_nicht | nein |
| **NIS2** | nein (nicht betroffen, bestätigt) | ja (pflichtig), weiss_nicht | – |
| **GoBD** | ja | teilweise, weiss_nicht | nein |
| **Mitarbeiter Datenschutz** | ja | – | nein |
| **Mitarbeiter BV** | ja, nicht_erforderlich | – | nein |

**Kontextregeln**:
- **DSFA**: Bei Use-Case KI oder „intern“ + personenbezogenen Daten → „nicht_erforderlich“ nur bei dokumentierter Risikoanalyse (sonst Gelb/Rot).
- **KI-Kompetenz / BFSG**: Nur bewerten, wenn Frage angezeigt wurde (Bedingung im Skript); sonst „nicht erhoben“ und in Beurteilung als offen führen.
- **BFSG**: Nur wenn „bfsgDigitalProdukt = ja“; sonst nicht Teil der Ampel.

---

## 2. Compliance-Test – Ablauf

### 2.1 Phasen (für authentische Beurteilung)

| Phase | Inhalt | Ergebnis |
|-------|--------|----------|
| **1. Erhebung** | Alle relevanten Fragen aus dem [Skript](skript_vollstaendig_fragen_antworten_verweise.md) stellen (oder Antworten aus DSGVO-Ampel-Formular übernehmen). Reihenfolge und Bedingungen gemäß Skript. | Rohdaten: Antwort-Set pro Thema + Kontext (MA-Zahl, Use-Case, Firma). |
| **2. Zuordnung Ampel** | Pro beantworteter Frage die Farbe nach §1.2 setzen. Keine Abweichung von den Schwellen ohne Begründung. | Ampel pro Thema + Kurzbegründung (1 Satz). |
| **3. Rechtsprüfung** | Pro bewertetem Thema mindestens einen Verweis (Artikel, URL) aus Skript §7 zuordnen. Prüfen: Ist die Norm anwendbar? Erfüllt / Teilweise / Offen? | Tabelle: Thema, Ampel, Begründung, Rechtsverweis. |
| **4. Beurteilung** | Zusammenfassung: Gesamtbild (wie viele grün/gelb/rot), größtes Risiko, priorisierte Handlungsempfehlungen. Keine pauschale „vollständig compliant“-Aussage, solange mindestens ein Thema rot oder „nicht erhoben“ ist. | Authentische Beurteilung (Executive Summary + Ampeln + GAPs + Next Steps). |

### 2.2 Was der Compliance-Test abdeckt

- **DSGVO**: VVT, DSFA, AVV, Mitarbeiter-Datenschutz (Art. 30, 35, 28, 13/14).
- **EU-KI-VO**: KI-Typ, Risikoklasse, KI-Kompetenz/Schulung (Art. 4, 6, 9, 14, 27, 50).
- **BFSG**: Barrierefreiheit bei digitalen Produkten (WCAG 2.2 AA).
- **NIS2**: Betroffenheit, Meldepflichten (falls zutreffend).
- **GoBD**: Aufbewahrung Buchungsbelege (8 Jahre ab 2025).
- **Mitarbeiter**: Betriebsvereinbarung bei Überwachungsbezug (BetrVG § 87).

**Nicht abgedeckt** (ohne explizite Erweiterung): Einzelfall-Rechtsberatung, Zertifizierungen, branchenspezifische Normen. Bei Bedarf in Beurteilung als „nicht geprüft“ kennzeichnen.

---

## 3. Authentische Beurteilung – Kriterien

### 3.1 Pflicht für jede Beurteilung

| Kriterium | Umsetzung |
|-----------|------------|
| **Belegbar** | Jede Ampelfarbe und jede „compliant“-Aussage ist über Antwort + Rechtsnorm nachvollziehbar. Keine Farbe ohne Begründung. |
| **Transparent** | Annahmen und Kontext (z.B. „nicht erforderlich weil …“, „unter der Annahme, dass kein Hochrisiko …“) sind im Text genannt. |
| **Keine Schönfärberei** | „Weiß nicht“ oder fehlende Antwort → nie Grün; unsichere Zuordnung → Gelb; nur bei klarer, dokumentierter Erfüllung → Grün. |
| **Rechtsverweise** | Pro bewertetem Thema mindestens ein Verweis (Artikel oder URL aus Skript §7). |
| **Klare Grenzen** | Hinweis: „Rechtliche Bewertung obliegt dem Rechtsberater; diese Beurteilung dient der Einordnung und Risikoreduktion.“ |

### 3.2 Verboten in der Beurteilung

- **Pauschale „alles in Ordnung“**, solange mindestens ein Thema rot oder „nicht erhoben“ ist.
- **Grün bei „Weiß nicht“** oder ohne Begründung.
- **Feste Euro-Beträge** („Sie sparen X €“) ohne zugrundeliegende Kundenangaben und ohne Kennzeichnung als Szenario.
- **Rechtliche Verbindlichkeit** suggerieren („wir bestätigen Compliance“) – stattdessen: „Stand nach Self-Assessment“ / „Einordnung nach Angaben“.

### 3.3 Formulierungen für authentische Beurteilung

| Situation | Empfohlene Formulierung |
|-----------|--------------------------|
| Mehrere Themen gelb/rot | „Nach dem durchgeführten Compliance-Test ergibt sich Handlungsbedarf in [Themen]. Priorität liegt bei [Thema], da [Begründung + Artikel].“ |
| „Weiß nicht“ bei Thema | „[Thema] wurde mit ‚Weiß nicht‘ beantwortet und wurde daher als offen (gelb) gewertet. Empfehlung: Klärung vor Freigabe.“ |
| Nicht anwendbar | „[Thema] ist nach Angaben nicht anwendbar ([Begründung], vgl. [Artikel]).“ |
| Gesamtfazit | „Stand nach Self-Assessment: [X] Themen grün, [Y] gelb, [Z] rot. Vollständige Compliance kann erst nach Schließen der offenen Punkte bestätigt werden.“ |

---

## 4. Verknüpfung mit anderen Dokumenten

| Dokument | Verwendung |
|----------|------------|
| [Skript vollständig](skript_vollstaendig_fragen_antworten_verweise.md) | Fragen, Optionen, Antwort→Ampel (§6), Verweise (§7). |
| [Konzept Bericht](konzept_bericht_angebotsbewertung.md) | Struktur des Berichts, in dem die Beurteilung steht. |
| [Quality Gate](quality_gate_bericht_angebot.md) | Freigabe erst nach erfüllten Kriterien (u.a. keine falsche „vollständig compliant“-Aussage). |
| [Angebotsbewertung ROI](angebotsbewertung_roi_echter_gewinn.md) | ROI/Gewinn-Darstellung nur mit gleichen Authentizitätsprinzipien (Bandbreiten, Transparenz). |

---

## 5. Kurz-Checkliste: Authentische Beurteilung

- [ ] Jede Ampelfarbe mit Begründung und mindestens einem Rechtsverweis.
- [ ] „Weiß nicht“ / fehlende Antwort → nie Grün; „nicht erhoben“ im Bericht genannt.
- [ ] Keine pauschale „vollständig compliant“-Aussage bei rot oder offenen Punkten.
- [ ] Annahmen und Kontext (z.B. „nicht erforderlich weil …“) erwähnt.
- [ ] Hinweis: Einordnung nach Self-Assessment, keine verbindliche Rechtsberatung.
- [ ] Compliance-Test-Ablauf (Erhebung → Ampel → Rechtsprüfung → Beurteilung) eingehalten.

---
*Ampel und Compliance-Test für eine authentische Beurteilung. Bei Abweichungen (z.B. zusätzliche Themen) Schwellen und Begründungen dokumentieren.*
