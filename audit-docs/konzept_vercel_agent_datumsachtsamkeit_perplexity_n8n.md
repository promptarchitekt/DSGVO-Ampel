# Konzept: Vercel-Agent mit Datumsachtsamkeit, Perplexity MCP und n8n-Option

**Zweck**: Vollständiges Konzept für einen Vercel-SDK-basierten Agenten im Workspace DSGVO-Ampel – mit prioritärem Fokus auf **Datumsachtsamkeit** (Quellen und Rechtsgrundlagen mit Datum und Quelle validieren), OpenRouter, API/MCP-Schnittstellen, **Perplexity MCP** (mind. 1 automatisierte Überprüfung pro Tag) sowie **n8n** als Alternative. Inkl. Definition Datumsachtsamkeit, aktuellem Research, Expertenblick und Best Practices.

**Referenzen**: [Gesetzeslage Stand 28.01.2026](gesetzeslage_stand_280126.md), [_dokumentenstandard](_dokumentenstandard.md), [Skript vollständig](skript_vollstaendig_fragen_antworten_verweise.md).

**Stand**: 28.01.2026

---

## 1. Datumsachtsamkeit (prioritär)

### 1.1 Definition

**Datumsachtsamkeit** bedeutet im Projektkontext:

- **Nicht**: Das Feld „Stand“ oder „Letzte Aktualisierung“ pauschal auf das heutige Datum setzen.
- **Sondern**:
  1. **Quellen und Grundlagen** bei jeder relevanten Aufgabe auf **Aktualität** prüfen (sind die genutzten Quellen und Annahmen noch gültig?).
  2. **Gesetzliche Grundlagen** (DSGVO, KI-VO, NIS2, BFSG, GoBD) **datums- und inhaltskritisch** prüfen und mit **Datum und Quelle** validieren.
  3. Jede rechts- oder fristrelevante Aussage im Material mit **Datum der Prüfung** und **Quelle** (Gesetz/Verordnung, Artikel, amtliche/offizielle Quelle oder anerkannte Referenz) belegen bzw. im Dokument festhalten.

### 1.2 Konkrete Regeln für den Agenten und für Redaktion

| Regel | Umsetzung |
|-------|-----------|
| **Quellen prüfen** | Vor Nutzung einer Quelle: Prüfung, ob Veröffentlichungsdatum bzw. Gültigkeitsstand aktuell; bei Gesetzen/Verordnungen: Fristen und Anwendungstermine prüfen (vgl. [Gesetzeslage](gesetzeslage_stand_280126.md)). |
| **Rechtsgrundlagen validieren** | Jede Aussage zu Fristen, Obergrenzen, Anwendbarkeit mit **Datum der Validierung** und **Quelle** (z. B. „Art. 113 KI-VO; Stand Prüfung: DD.MM.JJJJ; Quelle: EUR-Lex / amtliche Konsolidierung“). |
| **Stand in Dokumenten** | „Stand“ / „Letzte Aktualisierung“ nur setzen, wenn inhaltlich tatsächlich eine Prüfung/Aktualisierung zum genannten Datum erfolgt ist; bei rein historischen Dokumenten das **Ereignisdatum** beibehalten (z. B. „Audit-Datum: 21.01.2026“). |

### 1.3 Anbindung an Gesetzeslage-Referenz

Die Datei [gesetzeslage_stand_280126.md](gesetzeslage_stand_280126.md) dient als **Referenz für Stichtage und Geltungsstände**. Der Agent und alle automatisierte Prüfungen sollen:

- vor Änderungen an rechtsrelevanten Inhalten diese Referenz auf Aktualität prüfen (ggf. Perplexity/Recherche);
- neue oder geänderte Fristen/Gesetze mit **Datum und Quelle** in der Gesetzeslage-Datei oder in einem Changelog festhalten.

---

## 2. Vercel-Agent – Architektur und Aufgaben

### 2.1 Zielbild

Ein **Vercel-SDK-basierter Agent** (z. B. auf Basis Vercel AI SDK, OpenRouter, MCP-Clients) soll:

1. **Inhalte aktualisieren** (audit-docs, Aufbereitungen, Berichtsvorlagen) unter Einhaltung der [Dokumentenstandards](_dokumentenstandard.md) und **Datumsachtsamkeit**.
2. **Validieren** (Links, Struktur, Vollständigkeit Metadaten; rechtsrelevante Aussagen mit Datum + Quelle).
3. **Umgebungsstruktur bewahren** (keine unkontrollierten Verschiebungen/Umbenennungen; Änderungen nach Plan und Freigabe).

### 2.2 Technische Bausteine (Research-Stand)

| Baustein | Zweck | Quelle / Anmerkung |
|----------|--------|---------------------|
| **Vercel AI SDK** | LLM-Anbindung, Streaming, Tool Calling | [sdk.vercel.ai](https://sdk.vercel.ai); aktuell Next.js 15 kompatibel. |
| **OpenRouter** | Einheitlicher Zugang zu vielen Modellen (OpenAI, Anthropic, …) | [@openrouter/ai-sdk-provider](https://www.npmjs.com/package/@openrouter/ai-sdk-provider); `openrouter('openai/gpt-4o')` etc.; Tool Calling unterstützt. |
| **MCP (Model Context Protocol)** | Standardisierte Tools, Ressourcen, Prompts für den Agenten | [modelcontextprotocol.io](https://modelcontextprotocol.io); TypeScript-SDK `@modelcontextprotocol/sdk`; Transporte: stdio, HTTP+SSE, streamable HTTP. |
| **Perplexity MCP** | Recherche/Web-Check mit Quellenangaben für aktuelle Daten und Gesetzeslage | Perplexity API / Community perplexity-mcp; geeignet für tägliche Faktenprüfung. |
| **n8n** | Zeitgesteuerte Automatisierung (z. B. 1× täglich) als Alternative oder Ergänzung | Schedule Trigger täglich; Workflow kann MCP/HTTP aufrufen (Perplexity, eigene APIs). |

### 2.3 Priorität: Datumsachtsamkeit im Agenten

- **Jede** vom Agenten vorgeschlagene oder durchgeführte **Änderung an rechtsrelevanten Inhalten** (Ampel, Bericht, Skript, Gesetzeslage-Referenz) muss mit einer **Validierung mit Datum und Quelle** verbunden sein (entweder im Commit/Kommentar oder in einer kurzen Validierungsnotiz im Dokument/Changelog).
- Der Agent soll **nicht** eigenständig „Stand“-Daten auf „heute“ setzen, ohne dass eine inhaltliche Prüfung der Quellen/Rechtslage zum gleichen Datum erfolgt ist.

---

## 3. Perplexity MCP – mind. 1 automatisierte Überprüfung pro Tag

### 3.1 Anforderung

- **Mindestens eine automatisierte Überprüfung pro Tag** (z. B. Gesetzeslage, Fristen, amtliche Bekanntmachungen zu DSGVO/KI-VO/NIS2).
- Nutzung des **Perplexity MCP Servers** (oder Perplexity API), damit Abfragen mit Quellenangaben und aktuellem Kontext laufen.

### 3.2 Umsetzungsoptionen

| Option | Beschreibung | Voraussetzung |
|--------|--------------|----------------|
| **A) Agent + Cron/Job** | Vercel Cron Job (oder externer Scheduler) ruft täglich einen Endpoint auf; der Endpoint startet den Agenten, der den Perplexity-MCP-Client nutzt und eine definierte Prüfung (z. B. „KI-VO NIS2 Fristen Stand heute“) ausführt; Ergebnis in Log oder Datei (z. B. `audit-docs/validierung_YYYY-MM-DD.md`). | Vercel Pro für Cron; oder externer Cron (GitHub Actions, System-Cron) ruft API Route auf. |
| **B) n8n Workflow** | n8n-Workflow mit **Schedule Trigger** (1× täglich, feste Uhrzeit); erster Node ruft Perplexity API oder MCP-Client (über HTTP/SSE) auf; Ergebnis in Datei/Repo oder als Report. | n8n-Instanz (lokal im Monorepo unter `apps/n8n` oder gehostet); Perplexity API Key. |
| **C) Hybrid** | n8n führt nur den Zeitplan aus und ruft eine Vercel-API-Route auf; die Route führt die eigentliche Logik (Agent + Perplexity MCP) aus. | Wie A + B. |

### 3.3 Perplexity MCP – Research

- **Perplexity API / MCP**: Offizielle Perplexity MCP-Implementierung (Perplexity API Platform) bzw. Community-Implementierung (z. B. perplexity-mcp) für Web-Suche mit Quellen.
- **MCP-Spec**: Aktuelle Spezifikation 2025-11-25; Tools, Resources, Prompts als Bausteine.
- **Empfehlung**: Für tägliche Automatisierung entweder Perplexity API direkt (HTTP) aus n8n/Vercel aufrufen **oder** einen kleinen MCP-Client-Service betreiben, der vom Cron/n8n getriggert wird und Perplexity MCP nutzt.

---

## 4. n8n-Option und vorhandene Workflows

### 4.1 Befund im Workspace 09-DSGVO-Ampel

- **Im Standalone-Workspace** `C:\pa\07-dev-play\09-DSGVO-Ampel` sind **keine** n8n-Workflows oder n8n-Konfigurationen vorhanden (Suche nach `n8n`, `workflow`, `schedule`, `cron` ergab keine Treffer außer package-lock).

### 4.2 Befund im Monorepo (Referenz)

- **n8n-App**: `C:\pa\01-dev-monorepo\apps\n8n` (README: Start über `scripts/start-n8n.ps1`; Workflows unter `apps/n8n/workflows/*.json`).
- **Workflow-Lifecycle**: `wf-90-n8n-lifecycle-m` – Draft (Repo-First), Deploy (Repo → Runtime), Refine (UI), Sync (Runtime → Repo), Validate & Commit.
- **Hinweis**: Ein neuer Workflow für „tägliche Perplexity-/Gesetzeslage-Prüfung“ würde im Monorepo unter `apps/n8n/workflows/` angelegt und per Schedule Trigger (1× täglich) getriggert; Aufruf Ziel-API (Vercel oder Perplexity) oder MCP-Client.

### 4.3 Empfehlung n8n für DSGVO-Ampel

- **Standalone (09-DSGVO-Ampel)**: Kein n8n vor Ort; tägliche Prüfung entweder über **Vercel Cron** + API Route + Agent mit Perplexity MCP **oder** über eine **externe n8n-Instanz** (z. B. gehostet), die täglich eine URL des DSGVO-Ampel-Projekts (z. B. Vercel Deployment) aufruft.
- **Monorepo-Nutzung**: Falls das Ampel-Projekt in den Monorepo-Kontext rückgeführt wird, kann ein Workflow `apps/n8n/workflows/daily-compliance-check.json` (oder vergleichbar) mit Schedule Trigger angelegt werden, der Perplexity API oder eine Vercel-API-Route des Ampel-Projekts aufruft.

---

## 5. API- und MCP-Schnittstellen (Überblick)

| Schnittstelle | Rolle im Konzept | Datumsachtsamkeit |
|---------------|-------------------|--------------------|
| **OpenRouter** | LLM für Agent (Vercel AI SDK Provider) | Agent-Prompts müssen Regeln zur Datumsachtsamkeit und Quellenvalidierung enthalten. |
| **Perplexity MCP** | Tägliche Recherche/Prüfung (Fristen, Gesetze, amtliche Meldungen) | Ausgabe mit **Quelle und Datum**; Ergebnis in Validierungsdatei mit **Datum der Prüfung** und **Quellen** ablegen. |
| **MCP File System / Browser** | Inhalte lesen/schreiben, Struktur prüfen (falls im gleichen Kontext genutzt) | Beim Schreiben in audit-docs: Dokumentenstandard und Metadaten (Stand nur bei tatsächlicher inhaltlicher Prüfung) einhalten. |
| **Vercel API** | Deployment, Env, Projektstatus (falls der Agent Deployment prüft) | Keine direkte Rechtslage; nur indirekt für „Umgebungsstruktur bewahren“ (z. B. keine ungeplanten Env-Änderungen). |

---

## 6. Best Practices (Expertenblick)

### 6.1 Quellen und Recht

- **Immer mit Datum und Quelle**: Jede Aussage zu Fristen, Obergrenzen, Anwendbarkeit von Gesetzen/Verordnungen mit **Validierungsdatum** und **Quelle** (Gesetz/Artikel, EUR-Lex, amtliche Quelle) versehen.
- **Gesetzeslage-Datei**: [gesetzeslage_stand_280126.md](gesetzeslage_stand_280126.md) bei Änderung der Rechtslage aktualisieren; Changelog-Eintrag mit Datum und Quelle der Änderung.
- **Keine Rechtsberatung**: Alle Dokumente und Agent-Ausgaben als Orientierung kennzeichnen; bei konkreten Fällen rechtliche Prüfung einholen.

### 6.2 Agent und Automatisierung

- **Idempotenz**: Tägliche Prüfung soll bei wiederholtem Lauf keine doppelten Einträge oder Überschreibungen ohne Versionierung erzeugen (z. B. Validierungsdatei pro Tag: `validierung_2026-01-28.md`).
- **Fehlertoleranz**: Bei Ausfall von Perplexity/Cron/n8n: Logging, keine stillen Überschreibungen; optional Alert.
- **Secrets**: OpenRouter API Key, Perplexity API Key, ggf. n8n-Credentials nur über sichere Kanäle (Env, Vercel Secrets); nicht im Repo.

### 6.3 Umgebungsstruktur

- **Keine ungeplanten Moves**: Der Agent soll keine Ordner/Dateien verschieben oder umbenennen, außer es ist im Auftrag/Plan definiert.
- **audit-docs**: Alle Änderungen an bestehenden Dokumenten mit klarem Grund (z. B. „Validierung Datum+Quelle für Art. 113 KI-VO“); neue Dokumente nach [_dokumentenstandard](_dokumentenstandard.md).

---

## 7. Nächste Schritte (priorisiert)

1. **Datumsachtsamkeit** in allen zukünftigen Aufgaben anwenden: Quellen und Rechtsgrundlagen mit **Datum und Quelle** validieren; „Stand“ nur bei tatsächlicher inhaltlicher Prüfung setzen.
2. **Gesetzeslage-Referenz** um eine explizite **Validierungsregel** (Datum + Quelle) ergänzen (siehe §3 unten).
3. **Perplexity MCP** einbinden: Entweder Vercel Cron + API Route + MCP-Client **oder** n8n-Workflow (Monorepo oder gehostet) mit Schedule Trigger 1× täglich; Ausgabe in Validierungsdatei mit Datum und Quellen.
4. **n8n-Workflow** (optional): Falls n8n genutzt wird – im Monorepo unter `apps/n8n/workflows/` einen neuen Workflow anlegen (z. B. `daily-compliance-check.json`), Schedule Trigger täglich, Aufruf Perplexity API oder Vercel-API-Route; Lifecycle nach wf-90-n8n-lifecycle-m.

---

*Konzept erstellt unter Berücksichtigung Vercel AI SDK, OpenRouter, MCP, Perplexity MCP und n8n Research. Keine Rechtsberatung.*
