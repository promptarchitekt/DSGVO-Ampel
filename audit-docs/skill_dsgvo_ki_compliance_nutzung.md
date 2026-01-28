# Skill: DSGVO & KI AI Act Compliance – Nutzung in dieser Umgebung

**Zweck**: Nutzung des Skills sk-dsgvo-ki-compliance (Monorepo) von diesem Workspace aus; Pfade, Ablageorte, Bericht-Ablage.

**Workspace**: 09-DSGVO-Ampel  
**Skill**: sk-dsgvo-ki-compliance (Monorepo)  
**Workflow**: wf-dsgvo-ki-compliance

---

## Inhalt des Skills

Der Skill **sk-dsgvo-ki-compliance** deckt ab:

1. **DSGVO & KI AI Act Compliance** – Bewertung gegen Rechtsnormen (DSGVO, EU KI-VO 2024/1689).
2. **Ablauf** – Erhebung → Bewertung → Gesetzgebungsvalidierung → Bericht (references/ablauf.md).
3. **Gesetzgebungsvalidierung** – Prüfung gegen relevante Artikel, Risikoklassen (references/legislation.md).
4. **Abfrage** – Checklisten und Self-Assessment-Fragen (references/abfrage.md), abgestimmt auf die DSGVO-Ampel-Formularfelder.
5. **Berichtswesen** – Struktur, Kennzahlen, Ampeln, GAPs priorisiert, Next Steps (references/berichtswesen.md).

---

## Nutzung von hier aus

| Aktion | So geht’s |
|--------|-----------|
| **Skill lesen** | SKILL.md und references unter dem Monorepo-Pfad öffnen (siehe Pfade unten). |
| **Compliance-Check / Bericht** | Im Chat: „Compliance-Bericht für [Use-Case]“ oder „Ablauf + Validierung + Abfrage + Bericht nach sk-dsgvo-ki-compliance“ – Agent nutzt wf-dsgvo-ki-compliance und references. |
| **Rohdaten** | Bestehende Antworten aus dem DSGVO-Ampel-Formular (VVT, DSFA, AVV, KI-Typ, BFSG, NIS2, Schulungen) können als Eingabe dienen. |

---

## Pfade (Copy-Paste)

```
# Skill & Referenzen (Monorepo)
C:\pa\01-dev-monorepo\.agent\skills\sk-dsgvo-ki-compliance\SKILL.md
C:\pa\01-dev-monorepo\.agent\skills\sk-dsgvo-ki-compliance\references\ablauf.md
C:\pa\01-dev-monorepo\.agent\skills\sk-dsgvo-ki-compliance\references\legislation.md
C:\pa\01-dev-monorepo\.agent\skills\sk-dsgvo-ki-compliance\references\abfrage.md
C:\pa\01-dev-monorepo\.agent\skills\sk-dsgvo-ki-compliance\references\berichtswesen.md

# Workflow
C:\pa\01-dev-monorepo\.agent\workflows\wf-dsgvo-ki-compliance.md
```

---

## Bericht-Ablage (Standard)

- In diesem Workspace: `audit-docs/bericht_compliance_[Datum oder Kurzname].md`
- Struktur laut references/berichtswesen.md: Executive Summary, Kennzahlen/Ampel, GAPs priorisiert, Next Steps, Rechtsverweise.

---

*Erzeugt für Nutzung von sk-dsgvo-ki-compliance und wf-dsgvo-ki-compliance in der Umgebung 09-DSGVO-Ampel.*
