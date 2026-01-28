# Dokumentenstandard audit-docs

**Zweck**: Einheitliche Struktur und Metadaten für alle Markdown-Dokumente in audit-docs. Sichere Orientierung, Nachvollziehbarkeit und SSOT-taugliche Referenzen.

**Stand**: 28.01.2026

---

## 1. Kopf (Metadatenblock)

Jedes Dokument hat direkt unter der H1-Überschrift einen **Metadatenblock** mit mindestens:

| Feld | Pflicht | Format / Inhalt |
|------|---------|------------------|
| **Zweck** | Ja (inhaltliche/strategische Docs) | Ein prägnanter Satz: wofür das Dokument da ist, wer es nutzt. |
| **Referenzen** / **Referenz** / **Quelle** | Optional | Links zu anderen audit-docs oder externen Quellen (relative Pfade `[Text](datei.md)`). |
| **Stand** / **Datum** / **Prüfdatum** | Optional, bei zeitkritischen Inhalten | Datum im Format **DD.MM.JJJJ**. |

**Typ-spezifische Felder** bleiben erlaubt (z.B. **Geprüft**, **Format** bei Reviews; **An**, **Von**, **Betreff** bei Status-Updates).

---

## 2. Trennlinie und Haupttext

- Nach dem Metadatenblock steht stets eine **horizontale Trennlinie** (`---`).
- Der **Haupttext** beginnt danach mit Überschriften **##**, **###** usw.; Tabellen und Listen nach Bedarf.

---

## 3. Gliederung und Sprache

- **Kommunikation/Doku**: Deutsch (außer technische Artefakte, die bewusst englisch geführt werden).
- **Code/Variablen** in Snippets: Englisch (vgl. AGENTS.md / standards.md).
- **Links**: relativ zu audit-docs; aus Unterordnern (z.B. `aufbereitung-270126/`) mit `../` für Dateien eine Ebene höher.

---

## 4. Sign-off (optional)

Am Ende eines Dokuments kann stehen:

- **Letzte Aktualisierung**: DD.MM.JJJJ  
- oder ein fachlicher Hinweis (z.B. „Keine Rechtsberatung.“), wo passend.

---

## 5. Ausnahmen

- **INDEX.md**: Navigation und Tabellen; Zweck im ersten Absatz, kein formales „Zweck“-Label.
- **task.md**: Checklisten-Format; Zweck ein Satz unter dem Titel.
- Technische **Implementation Plans** oder Export-Artefakte aus externen Audits können englisch und mit **Purpose** /**Date** statt Zweck/Stand geführt werden.

---

*Dieser Standard gilt für den Ordner audit-docs und den Unterordner aufbereitung-270126. Änderungen am Standard: nur nach Abstimmung.*
