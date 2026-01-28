# Prozess: Compliance-Automation & Nachvollziehbarkeit (Business & Enterprise)

**Zweck**: Ein Prozess für Solo-Selbstständige mit alleiniger Verantwortung, der Compliance-Prüfung **automatisiert**, **nachvollziehbar** macht und bei **kritischen Punkten warnt bzw. informiert**. Gesetzesänderungen werden wie ein **Changelog** aufbereitet und über eine **öffentliche Dokumentationsquelle** einsichtbar. Das Niveau ist **Enterprise-Level** – unabhängig von der Anzahl der Personen im Unternehmen oder der Zahl der Auftraggeber.

**Referenzen**: [Konzept Vercel-Agent & Datumsachtsamkeit](konzept_vercel_agent_datumsachtsamkeit_perplexity_n8n.md), [Gesetzeslage Stand 28.01.2026](gesetzeslage_stand_280126.md), [_dokumentenstandard](_dokumentenstandard.md).

**Stand**: 28.01.2026

---

## 1. Zielbild (Solo + Enterprise)

| Anspruch | Bedeutung |
|----------|-----------|
| **Automatisiert** | Tägliche Prüfung läuft ohne manuellen Start; Validierung, Changelog und Reports werden automatisch erzeugt. |
| **Nachvollziehbar** | Jede Warnung, jede Änderung und jede Gesetzesreferenz ist mit **Datum**, **Quelle** und **Grund** dokumentiert; Audit-Trail in Git + Evidence-Ledger. |
| **Verlässlich bei Kritik** | Bei kritischen Punkten wird **gewarnt** oder **informiert** – klar definiert: **was** wird gewarnt, **wann**, **wie** (Kanal, Format). |
| **Changelog Gesetzeslage** | Änderungen an Gesetzen/Fristen/Verordnungen werden wie ein **Changelog** aufbereitet (Datum, betroffene Norm, Kurzbeschreibung, Quelle). |
| **Öffentlich einsichtbar** | Changelog und zentrale Dokumentation (Gesetzeslage, Prozessbeschreibung) sind über eine **öffentliche Dokumentationsquelle** abrufbar (z. B. öffentliches Repo, GitHub Pages, Vercel-Deployment einer Docs-Seite). |
| **Enterprise-Level** | Der **Prozess** und die **Qualitätsstandards** sind so definiert, dass sie dem Anspruch „Enterprise“ genügen – unabhängig davon, ob eine Person oder mehrere Personen das Unternehmen bilden oder für wie viele Auftraggeber gearbeitet wird. Skalierung erfolgt über den Prozess, nicht über mehr Köpfe. |

---

## 2. Was wird gewarnt? Wann? Wie? (nachvollziehbar)

### 2.1 Warnstufen und Definition

| Stufe | Bezeichnung | Bedeutung | Beispiel |
|-------|-------------|-----------|----------|
| **Kritisch** | Sofort handeln | Frist/Verpflichtung betroffen oder Inhalte widersprechen amtlicher Quelle; Risiko für Verantwortung. | KI-VO-Frist 02.08.2026 in Gesetzeslage falsch; NIS2-Meldepflicht in Dokumentation veraltet. |
| **Warnung** | Prüfen, zeitnah handeln | Mögliche Abweichung von Primärquelle oder fehlende Quelle/Datum bei rechtsrelevanter Aussage. | Aussage ohne „Datum der Validierung“ oder ohne Quellenangabe; Link zu amtlicher Quelle defekt. |
| **Info** | Zur Kenntnis | Automatischer Lauf abgeschlossen; Changelog aktualisiert; keine Aktion nötig. | Täglicher Report: „Keine Änderung der referenzierten Gesetzeslage.“ |

### 2.2 Wann wird gewarnt? (Trigger)

| Trigger | Stufe | Bedingung |
|---------|-------|-----------|
| **Täglicher Lauf: Abweichung** | Kritisch oder Warnung | Automatisierte Prüfung (z. B. Perplexity/Recherche + Abgleich mit [Gesetzeslage](gesetzeslage_stand_280126.md)) findet **Abweichung** oder **neue amtliche Meldung** zu DSGVO/KI-VO/NIS2/BFSG/GoBD. |
| **Täglicher Lauf: Validierung fehlgeschlagen** | Warnung | Eine rechtsrelevante Aussage in audit-docs hat **kein** „Datum der Validierung“ oder **keine** Quellenangabe (Whitelist Primärquellen). |
| **Täglicher Lauf: Link/Struktur** | Warnung | Referenzierter Link (EUR-Lex, BSI, etc.) ist defekt oder Dokumentenstandard (Zweck, ---, Referenzen) verletzt. |
| **Täglicher Lauf: Erfolg** | Info | Lauf ok; keine kritischen/warnenden Befunde; Report und ggf. Changelog-Eintrag erzeugt. |
| **Manueller Freigabe-Schritt** | Info | Du bestätigst eine Änderung (z. B. Merge eines PRs); Eintrag im Changelog mit deinem Entscheidungsdatum. |

### 2.3 Wie wird gewarnt? (Kanal, Format – nachvollziehbar)

| Kanal | Verwendung | Nachvollziehbarkeit |
|-------|------------|----------------------|
| **Issue (z. B. GitHub/GitLab)** | Pro Warnung/Kritik ein **Issue** mit Label `compliance-critical` oder `compliance-warning`; Titel enthält Datum + Kurzbeschreibung. | Jedes Issue = fester Eintrag; Verlauf, Kommentare, Schließung nachvollziehbar. |
| **E-Mail/Benachrichtigung** | Optional: Bei **Kritisch** zusätzlich E-Mail oder Push-Benachrichtigung (z. B. über GitHub Notifications, n8n, oder Vercel Integration). | E-Mail-Betreff: „[Compliance] Kritisch: …“ mit Link zum Issue/Report. |
| **Report-Datei** | Täglich: `audit-docs/validations/YYYY-MM-DD.md` (oder Changelog-Anhang) mit allen Befunden (Kritisch/Warnung/Info), Quellen und Empfehlung. | Datei versioniert in Git; jeder Tag = ein Report; Diff nachvollziehbar. |
| **Changelog-Eintrag** | Jede Änderung an Gesetzeslage oder jede bestätigte Warnung → Eintrag in `audit-docs/CHANGELOG_GESETZESLAGE.md` (Datum, Norm, Änderung, Quelle). | Changelog = chronologische, öffentlich einsehbare Historie. |

**Feste Regel**: Es **gibt** den Prozess – was gewarnt wird, wann und wie ist in diesem Dokument und in der Automatisierung (z. B. Workflow-Beschreibung, CI-Job) festgehalten. Keine stillen Änderungen ohne Eintrag in Report oder Changelog.

---

## 3. Changelog Gesetzeslage (Format & öffentliche Quelle)

### 3.1 Format (changelog-artig)

Jeder Eintrag enthält:

- **Datum** (TT.MM.JJJJ) der Feststellung bzw. der Freigabe
- **Norm** (z. B. KI-VO, NIS2, DSGVO, BFSG, GoBD)
- **Kurzbeschreibung** (was hat sich geändert oder was wurde validiert?)
- **Quelle** (URL oder amtliche Referenz)
- **Stufe** (Kritisch / Warnung / Info), falls aus einer Warnung entstanden

Beispiel:

```markdown
## [Unreleased] / 28.01.2026
- **KI-VO** – Validierung Stichtage 02.02.2025, 02.08.2026, 02.08.2027 (Quelle: EUR-Lex 2024/1689; Stand Prüfung: 28.01.2026). Info.
- **NIS2** – Validierung Inkrafttreten DE 06.12.2025 (Quelle: BGBl.; Stand Prüfung: 28.01.2026). Info.
```

### 3.2 Wo ist der Changelog öffentlich einsichtbar?

| Option | Beschreibung | Nachvollziehbarkeit |
|--------|--------------|----------------------|
| **Öffentliches Git-Repo** | Repo (oder Unterordner) mit audit-docs inkl. `CHANGELOG_GESETZESLAGE.md` und `gesetzeslage_stand_*.md` ist öffentlich lesbar. | Jeder kann Historie und Stand einsehen; Links teilen. |
| **GitHub Pages / Vercel** | Eine statische Seite (z. B. `/docs` oder eigenes Subdomain) rendert INDEX, Gesetzeslage und Changelog aus dem Repo. | Öffentliche URL; gleicher Inhalt wie Repo; für Auftraggeber und Prüfer verlinkbar. |
| **Eigene Docs-Domain** | z. B. `compliance-docs.promptarchitekt.de` zeigt Gesetzeslage + Changelog (aus Repo gebaut). | Professioneller, wiedererkennbarer Zugang; Enterprise-Optik. |

**Empfehlung**: Mindestens **öffentliches Repo** (oder öffentlicher Zweig) mit Leserecht für `audit-docs/` inkl. Changelog und Gesetzeslage; optional Ausbau zu **öffentlicher Docs-URL** (GitHub Pages oder Vercel) für einfache Weitergabe.

---

## 4. Ablauf Prozess (automatisiert, nachvollziehbar)

```
[Täglich, feste Uhrzeit]
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. Automatischer Lauf (Cron / GitHub Actions / n8n)         │
│    – Abgleich Gesetzeslage mit Primärquellen / Recherche     │
│    – Prüfung audit-docs: Datum+Quelle, Links, Standard      │
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Report erzeugen                                           │
│    – audit-docs/validations/YYYY-MM-DD.md                   │
│    – Einträge: Kritisch / Warnung / Info + Quelle + Datum   │
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Bei Kritisch / Warnung: Issue erstellen + ggf. Benachrichtigung │
│    – Du erhältst eine Info (Issue, E-Mail, etc.)            │
│    – Keine automatische Änderung an Inhalten ohne Freigabe │
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Changelog Gesetzeslage aktualisieren                      │
│    – CHANGELOG_GESETZESLAGE.md: neue Einträge (Datum, Norm, Quelle) │
│    – Optional: gesetzeslage_stand_*.md anpassen (nur mit PR/Freigabe) │
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Öffentliche Dokumentation                                 │
│    – Repo (oder Build) enthält aktuellen Changelog + Gesetzeslage │
│    – Öffentliche URL (Pages/Vercel) zeigt Stand (optional)  │
└─────────────────────────────────────────────────────────────┘
```

**Du** entscheidest bei Kritisch/Warnung: Inhalte anpassen (PR), Changelog bestätigen, Issue schließen. Der Prozess **warnt und dokumentiert**; die **Freigabe** bleibt bei dir.

---

## 5. Enterprise-Level unabhängig von Teamgröße

| Prinzip | Umsetzung |
|---------|-----------|
| **Prozess trägt Qualität** | Definitionen (Was/Wann/Wie gewarnt, Changelog-Format, Evidence-Ledger) sind im Repo und in diesem Dokument festgehalten. Gültig unabhängig davon, ob eine oder mehrere Personen arbeiten. |
| **Skalierung über Prozess** | Mehr Auftraggeber oder mehr Themen = gleicher Prozess, ggf. erweiterte Whitelist (weitere Normen), gleiche Warnlogik und Changelog. |
| **Audit-Trail** | Git-Historie + Report-Dateien + Changelog = nachvollziehbare Entscheidungen; für Prüfer, Auftraggeber oder Behörden darlegbar. |
| **Keine stillen Änderungen** | Automatisierung schreibt keine rechtsrelevanten Inhalte ohne PR/Freigabe; nur Reports, Issues und Changelog-Einträge werden automatisch erzeugt. |
| **Öffentliche Dokumentation** | Changelog und Gesetzeslage sind über öffentliche Quelle einsehbar – stärkt Vertrauen und Nachweisbarkeit auch als Solo. |

---

## 6. Nächste Schritte (priorisiert)

1. **Changelog-Datei anlegen**: `audit-docs/CHANGELOG_GESETZESLAGE.md` im obigen Format; initiale Einträge aus [Gesetzeslage](gesetzeslage_stand_280126.md) (Stand 28.01.2026) übernehmen.
2. **Validierungsordner**: `audit-docs/validations/` anlegen; Platzhalter oder erstes Report-Template (YYYY-MM-DD.md).
3. **Automatisierung umsetzen**: Täglicher Lauf (GitHub Actions oder n8n/Vercel) mit Report-Erzeugung + Issue bei Kritisch/Warnung; Integration mit diesem Prozess (Was/Wann/Wie).
4. **Öffentliche Quelle festlegen**: Repo-Zweig oder Repo öffentlich lesbar machen und/oder GitHub Pages / Vercel für Docs-URL einrichten; Link in INDEX oder README.
5. **Warnkanal konkretisieren**: Entscheidung, ob E-Mail/Push bei Kritisch gewünscht ist; ggf. GitHub Notifications oder n8n-Webhook konfigurieren.

---

*Prozess definiert für Solo-Selbstständige mit alleiniger Verantwortung; Enterprise-Level durch Prozess und Dokumentation, unabhängig von der Anzahl der Personen. Keine Rechtsberatung.*
