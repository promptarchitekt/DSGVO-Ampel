# Prüfung: GAP-Behebung (Ansatz neue Grundlage)

**Zweck**: Umfängliche Prüfung aller GAPs aus dem Review und Vorbereitung der GAP-Dokumente (Konzept, Aufbereitung, Prüfbericht, INDEX, Beurteilung) zur Behebung. Jeder GAP ist einer konkreten Aktion und paste-ready Formulierung zugeordnet.

**Referenzen**: [Review: Letzte Agent-Antwort (Ansatz neue Grundlage)](review_last_agent_ansatz_neue_grundlage.md) – (A) Kritik + GAPs (Technik/Domäne, Struktur/Methodik, Kommunikation/UX).

**Status**: Vorbereitung abgeschlossen; Behebungen unten als Edits ausgeführt (Checkliste zum Abhaken).

**Stand**: 28.01.2026

---

## 1. Vollständige GAP-Liste (aus Review)

### 1.1 Technik / Domäne

| ID | Typ | GAP | Ziel-Dokument |
|----|-----|-----|----------------|
| T1 | Unklar | Konzept verweist auf „Persona-Tabelle“, im Quality Gate steht „Mehrwert aus Kunden-Persona-Sicht“. | konzept_bericht_angebotsbewertung.md |
| T2 | Fehlt | Einheitlichkeit „vier Ebenen“ (Reihenfolge) in allen Dokumenten nicht explizit bestätigt. | pruefbericht_qualitaet_auf_neuer_grundlage.md |
| T3 | Stört | Aufbereitung §6 „vgl. audit-docs [Quality Gate](…)“ – für externe Leser unklar, was „audit-docs“ ist. | aufbereitung-270126/DSGVO_Ampel_Aufbereitung.md |

### 1.2 Struktur / Methodik

| ID | Typ | GAP | Ziel-Dokument |
|----|-----|-----|----------------|
| S1 | Fehlt | Prüfbericht §3 keine konkrete Edit-Liste pro Dokument. | pruefbericht_qualitaet_auf_neuer_grundlage.md |
| S2 | Fehlt | Prüfbericht und Review nicht in Quick Navigation „Für Angebotsbewertung & Kundenbericht“. | INDEX.md |
| S3 | Doppelt | „Geregelte“ im Konzept (Zielgruppe) und im Quality Gate (Persona) – gewollte Verzahnung im Prüfbericht nicht erwähnt. | pruefbericht_qualitaet_auf_neuer_grundlage.md |
| S4 | Unklar | Prüfbericht einmalig oder lebendig? | pruefbericht_qualitaet_auf_neuer_grundlage.md |

### 1.3 Kommunikation / UX & Schnittstellen

| ID | Typ | GAP | Ziel-Dokument |
|----|-----|-----|----------------|
| K1 | Fehlt | Adressat des Prüfberichts unklar (Prüfer? Redakteur?). | pruefbericht_qualitaet_auf_neuer_grundlage.md |
| K2 | Unklar | Beurteilung_DSGVO_Ampel_Aufbereitung: Kurzvermerk zur neuen Grundlage ja/nein? | aufbereitung-270126/Beurteilung_DSGVO_Ampel_Aufbereitung.md |

---

## 2. Aktionen und paste-ready Edits (pro GAP)

### T1 – Konzept: Verweis „Persona-Tabelle“ präzisieren

**Ziel**: konzept_bericht_angebotsbewertung.md, Zeile „Geregelte (Mitarbeiter)“ in der Tabelle Erwartung.

**Aktion**: Ersetze „Persona-Tabelle“ durch die exakte Bezeichnung aus dem Quality Gate.

**Paste-ready**:
- **Alt**: `(vgl. [Quality Gate](quality_gate_bericht_angebot.md) Persona-Tabelle)`
- **Neu**: `(vgl. [Quality Gate](quality_gate_bericht_angebot.md) Abschnitt „Mehrwert aus Kunden-Persona-Sicht“)`

---

### T2 – Prüfbericht: Einheitlichkeit vier Ebenen bestätigen

**Ziel**: pruefbericht_qualitaet_auf_neuer_grundlage.md, neuer Kurzabschnitt (z.B. am Ende von §2 oder in §4).

**Aktion**: Ein Satz ergänzen, dass die Reihenfolge der vier Ebenen (rechtlich verpflichtend → regelnd → organisatorisch → persönlich) in Konzept, Ampel, ROI und Aufbereitung einheitlich verwendet ist.

**Paste-ready**:
- **Einzufügen** in §4 „Konsistenz-Check (nach Anpassungen)“ als neuer Bullet:
  - `- **Vier Ebenen**: Die Reihenfolge (rechtlich verpflichtend → rechtlich regelnd → organisatorisch → persönlicher Mehrwert) ist in Konzept, Ampel, ROI und Aufbereitung einheitlich.`

---

### T3 – Aufbereitung §6: „audit-docs“ für Externe klären

**Ziel**: aufbereitung-270126/DSGVO_Ampel_Aufbereitung.md, §6 erster Absatz.

**Aktion**: Formulierung so anpassen, dass auch ohne Projektkontext klar ist, wo die vollständige Checkliste steht.

**Paste-ready**:
- **Alt**: `vgl. audit-docs [Quality Gate](../quality_gate_bericht_angebot.md)`
- **Neu**: `Vollständige Checkliste und Mehrwert-Ebenen: [Quality Gate](../quality_gate_bericht_angebot.md) (in audit-docs).`

---

### S1 – Prüfbericht §3: Konkrete Edit-Liste pro Dokument

**Ziel**: pruefbericht_qualitaet_auf_neuer_grundlage.md, §3 „Einzelbewertung und umgesetzte Anpassungen“.

**Aktion**: Bei jedem Unterabschnitt (3.1–3.4) „Anpassungen“ durch eine kurze, paste-fähige Edit-Liste ersetzen bzw. ergänzen.

**Paste-ready** (als Ersatz für die pauschalen „vgl. Änderungen im Dokument“):

- **3.1 Konzept**:  
  `**Edits**: (1) Nach Zweck neuer Absatz „Grundlage“ mit Verweis Quality Gate. (2) In Zielgruppe neue Zeile „Geregelte (Mitarbeiter)“ mit Anlass, Erwartung und Verweis Quality Gate „Mehrwert aus Kunden-Persona-Sicht“.`
- **3.2 Ampel**:  
  `**Edits**: (1) Nach Zweck neuer Absatz „Kontext“ (Compliance schwer, Angst/Unklarheit bei Geregelten; Beurteilung zielt auf Klarheit/Orientierung; vgl. Quality Gate Ausgangslage und Mehrwert).`
- **3.3 ROI**:  
  `**Edits**: (1) In §6 Verknüpfung bei Quality Gate: Ergänzung „Mehrwert-Ebenen: ROI/Gewinn stützt rechtlich verpflichtend, rechtlich regelnd, organisatorisch, persönlicher Mehrwert (inkl. Klarheit für Geregelte).“
- **3.4 Aufbereitung**:  
  `**Edits**: (1) §1: Nach „Next Steps“ ein Satz zur Ausgangslage (Compliance für Verantwortliche, Umsetzende, von Regeln Betroffene oft schwer und unklar; Bericht zielt auf Klarheit und Orientierung). (2) §6: Einleitung um „Mehrwert auf vier Ebenen …“ und Link Quality Gate ergänzt.`

---

### S2 – INDEX: Prüfbericht und Review in Quick Navigation

**Ziel**: INDEX.md, Abschnitt „Für Angebotsbewertung & Kundenbericht“.

**Aktion**: Zwei Zeilen ergänzen (Prüfbericht, Review).

**Paste-ready** (einzufügen nach „ROI/Gewinn“):
```markdown
- **Konsistenz neue Grundlage**: [**Prüfbericht**](pruefbericht_qualitaet_auf_neuer_grundlage.md), [**Review Agent-Antwort**](review_last_agent_ansatz_neue_grundlage.md)
```

---

### S3 – Prüfbericht: „Geregelte“ doppelt – gewollt erwähnen

**Ziel**: pruefbericht_qualitaet_auf_neuer_grundlage.md, z.B. in §2 oder §4.

**Aktion**: Einen Kurzschaft hinzufügen, der die Dopplung Konzept vs. Quality Gate als gewollte Verzahnung erklärt.

**Paste-ready** (z.B. in §4 als neuer Bullet):
- `- **Geregelte**: Im Konzept als Zielgruppe, im Quality Gate als Persona mit Schwerpunkten – gewollte Verzahnung (Zielgruppe = wer liest; Persona = Mehrwert-Ebenen).`

---

### S4 – Prüfbericht: Status einmalig/lebendig

**Ziel**: pruefbericht_qualitaet_auf_neuer_grundlage.md, Kopf oder §5.

**Aktion**: Einen Satz zum Status des Prüfberichts aufnehmen.

**Paste-ready** (unter **Geprüft** oder am Ende von §5):
- `**Status dieses Prüfberichts**: Einmaliger Konsistenz-Check zum Stichtag. Bei inhaltlicher Änderung der „neuen Grundlage“ (Quality Gate) Prüfbericht ggf. aktualisieren.`

---

### K1 – Prüfbericht: Adressat

**Ziel**: pruefbericht_qualitaet_auf_neuer_grundlage.md, direkt unter der Überschrift oder in §1.

**Aktion**: Adressaten-Hinweis ergänzen.

**Paste-ready** (nach **Referenz** oder in §1):
- `**Adressat**: Prüfer und Redakteure – als Nachweis der Konsistenz von Konzept, Ampel, ROI und Aufbereitung mit der neuen Grundlage (Ausgangslage, vier Ebenen, Geregelte).`

---

### K2 – Beurteilung: Kurzvermerk neue Grundlage

**Ziel**: aufbereitung-270126/Beurteilung_DSGVO_Ampel_Aufbereitung.md, z.B. in §1 Kurzbewertung oder §3 Konsistenz.

**Aktion**: Einen Satz ergänzen, dass die Aufbereitung die neue Grundlage (Ausgangslage, vier Ebenen, Geregelte) abbildet.

**Paste-ready** (in §1 Kurzbewertung als Zusatzsatz oder in §3 als Zeile):
- `Die Aufbereitung bildet die **neue Grundlage** (Ausgangslage „DSGVO schwer“, vier Mehrwert-Ebenen, Geregelte als Nutznießer) in §1 und §6 ab; vgl. [Quality Gate](../quality_gate_bericht_angebot.md) und [Prüfbericht](../pruefbericht_qualitaet_auf_neuer_grundlage.md).`

*(Hinweis: Links aus Beurteilung heraus – Beurteilung liegt in aufbereitung-270126/, also ../ für audit-docs.)*

---

## 3. GAP-Dokumente (betroffene Dateien)

| Dokument | GAP-IDs | Aktion |
|----------|---------|--------|
| konzept_bericht_angebotsbewertung.md | T1 | Verweis „Persona-Tabelle“ → „Abschnitt Mehrwert aus Kunden-Persona-Sicht“ |
| aufbereitung-270126/DSGVO_Ampel_Aufbereitung.md | T3 | §6 Formulierung audit-docs klären |
| pruefbericht_qualitaet_auf_neuer_grundlage.md | T2, S1, S3, S4, K1 | Edit-Liste §3; Vier-Ebenen-Bestätigung §4; Geregelte-Verzahnung §4; Status; Adressat |
| INDEX.md | S2 | Quick Nav „Für Angebotsbewertung & Kundenbericht“ um Prüfbericht + Review ergänzen |
| aufbereitung-270126/Beurteilung_DSGVO_Ampel_Aufbereitung.md | K2 | Kurzvermerk neue Grundlage (§1 oder §3) |

---

## 4. Umsetzungsreihenfolge und Checkliste

**Reihenfolge** (Abhängigkeiten: Prüfbericht hat viele Edits, INDEX verlinkt alles):

1. Konzept (T1) – einziger Edit.
2. Aufbereitung §6 (T3).
3. Prüfbericht (T2, S1, S3, S4, K1) – alle Prüfbericht-Edits in einem Durchgang.
4. INDEX Quick Nav (S2).
5. Beurteilung (K2).

**Checkliste (zum Abhaken nach Umsetzung)**:

- [x] **T1** konzept_bericht_angebotsbewertung.md: „Persona-Tabelle“ → „Abschnitt Mehrwert aus Kunden-Persona-Sicht“
- [x] **T3** DSGVO_Ampel_Aufbereitung.md §6: „audit-docs“-Formulierung durch paste-ready Text ersetzt
- [x] **T2** Prüfbericht §4: Bullet „Vier Ebenen“ Einheitlichkeit ergänzt
- [x] **S1** Prüfbericht §3.1–3.4: Konkrete Edit-Liste (Edits) bei jedem Unterpunkt
- [x] **S3** Prüfbericht §4: Bullet „Geregelte“ gewollte Verzahnung ergänzt
- [x] **S4** Prüfbericht: Status einmalig/lebendig (Kopf oder §5)
- [x] **K1** Prüfbericht: Adressat ergänzt
- [x] **S2** INDEX: Quick Nav „Für Angebotsbewertung & Kundenbericht“ um Prüfbericht + Review + Prüfung GAP-Behebung
- [x] **K2** Beurteilung: Kurzvermerk neue Grundlage (§1)
- [x] **Dieses Dokument** in INDEX „Angebotsbewertung & Bericht“ und „Alle Dokumente“ verlinken

**Umsetzungsstand**: Alle Edits aus §2 am 27.01.2026 umgesetzt; GAP-Dokumente (Konzept, Aufbereitung, Prüfbericht, INDEX, Beurteilung) angepasst.

---

## 5. INDEX-Vorbereitung: GAP-Prüfung verlinken

Damit die GAP-Dokumente „hinzugefügt“ werden können, sind im INDEX folgende Einträge vorgesehen:

- In **Dokumenten-Übersicht** unter „Angebotsbewertung & Bericht“:
  - `📋 [**Prüfung GAP-Behebung (Ansatz neue Grundlage)**](pruefung_gap_behebung_ansatz_neue_grundlage.md) – GAP-Liste, Aktionen, paste-ready Edits, Checkliste`
- In **Alle Dokumente** (Tabelle):
  - `| [pruefung_gap_behebung_ansatz_neue_grundlage.md](pruefung_gap_behebung_ansatz_neue_grundlage.md) | Prüfung GAP-Behebung: Liste, Aktionen, Checkliste (Review-Folge) | ✅ Referenz |`

---

*Prüfung erstellt zur Vorbereitung der GAP-Behebung aus review_last_agent_ansatz_neue_grundlage.md. Nach Umsetzung aller Edits Checkliste §4 abhaken.*
