# Ergebnis: Skill Lifecycle in dieser Umgebung nutzen

**Zweck**: Nutzung des Skills sk-skill-lifecycle hier verankern und sofort verwertbare Artefakte liefern (Pfade, Registry-Vorschlag).

**Workspace**: 09-DSGVO-Ampel  
**Skill**: sk-skill-lifecycle (Monorepo)

---

## 1. Nutzung in dieser Umgebung

In 09-DSGVO-Ampel gibt es keinen lokalen `.agent/skills/` – der Skill liegt im Monorepo. Nutzung von **hier** aus:

| Aktion | So geht’s |
|--------|-----------|
| **Skill lesen** | SKILL.md und references unter dem Monorepo-Pfad öffnen (siehe §2). |
| **Lifecycle starten** | Im Chat: `/create-skill [Idea]` – der Agent nutzt dann wf-90 + sk-skill-lifecycle (Quellen/Validierung aus dem Monorepo). |
| **Quellen/Validierung** | Bei Unklarheit zuerst `sources.md` und `validation.md` im Monorepo lesen. |

**Ergebnis dieser Nutzung**: Dieses Dokument + der Registry-Vorschlag unten (§3) – paste-ready für den Monorepo-Eintrag.

---

## 2. Pfade zum Skill (Copy-Paste)

```
# Skill & Referenzen (Monorepo)
C:\pa\01-dev-monorepo\.agent\skills\sk-skill-lifecycle\SKILL.md
C:\pa\01-dev-monorepo\.agent\skills\sk-skill-lifecycle\references\sources.md
C:\pa\01-dev-monorepo\.agent\skills\sk-skill-lifecycle\references\validation.md

# Workflow
C:\pa\01-dev-monorepo\.agent\workflows\wf-90-skill-lifecycle-m.md

# Registry (Eintrag vornehmen)
C:\pa\01-dev-monorepo\.agent\SkillRegistryEntry.json
```

---

## 3. Registry-Eintrag für sk-skill-lifecycle (paste-ready)

In `C:\pa\01-dev-monorepo\.agent\SkillRegistryEntry.json` unter `"skills"` folgenden Eintrag ergänzen (neben bestehendem `sk-integrity-guard`):

```json
"sk-skill-lifecycle": {
  "path": ".agent/skills/sk-skill-lifecycle",
  "status": "beta",
  "version": "1.0.0",
  "owner": "@mreic",
  "description": "Orchestriert wf-90 Skill-Lifecycle (Discovery→Design→Implementation→Validation); Quellen/Validierung in references/"
}
```

**Vollständiges JSON** (zum Ersetzen der kompletten `skills`-Sektion, falls gewünscht):

```json
{
  "skills": {
    "sk-integrity-guard": {
      "path": ".agent/skills/sk-integrity-guard",
      "status": "beta",
      "version": "1.1.0",
      "owner": "@mreic",
      "description": "AI Integrity Validator (Professional Grade)"
    },
    "sk-skill-lifecycle": {
      "path": ".agent/skills/sk-skill-lifecycle",
      "status": "beta",
      "version": "1.0.0",
      "owner": "@mreic",
      "description": "Orchestriert wf-90 Skill-Lifecycle (Discovery→Design→Implementation→Validation); Quellen/Validierung in references/"
    }
  }
}
```

---

## 4. Nächster Schritt

- **Option A**: Registry-Eintrag im Monorepo vornehmen (JSON aus §3 einfügen).
- **Option B**: Beim nächsten `/create-skill [Idea]` im Chat den Skill wie unter §1 nutzen – Agent soll zuerst `sources.md`/`validation.md` aus dem Monorepo lesen.

---

*Erzeugt durch Nutzung von sk-skill-lifecycle für die Umgebung 09-DSGVO-Ampel.*
