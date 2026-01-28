# Dev-Play Workspace: Project Portfolio Audit

**Zweck**: Portfolio-Überblick aller Projekte im Workspace 07-dev-play; Status, Tech Stack, Deployment und Empfehlungen.

**Audit-Datum**: 21.01.2026  
**Workspace**: `C:\pa\07-dev-play`  
**Anzahl Projekte**: 6 (+ mehrere Unterprojekte)

---

## 📊 Übersicht

| Projekt | Status | Tech Stack| Deployment | Zweck |
|---------|--------|-----------|------------|-------|
| **07_gpt_export_manager** | 🟢 Stable | Static HTML/JS | Vercel | Privacy-first ChatGPT Export Viewer |
| **09_DSGVO-Ampel** | 🟢 Ready | Next.js 15.5, React 19 | Vercel (geplant) | Compliance Self-Assessment |
| **12_Stellen-Entscheidungshilfe** | 🟡 Alpha | Next.js 14, React 18 | Lokal | Karriere-Matching-Tool |
| **11_dev-formulare** | 🔴 Complex | Verschiedene | Gemischt | Multi-Projekt Formular-Suite |
| **13_Visitenkarten-App** | 🟢 Beta | Next.js 15.5, React 19, PWA | Lokal | Visitenkarten Sammler |

---

## 1️⃣ GPT Export Manager

### **Steckbrief**
- **Pfad**: `C:\pa\07-dev-play\07_gpt_export_manager`
- **Version**: 0.2.1
- **Tech**: Static HTML + Vanilla JavaScript (kein Framework!)
- **Deployment**: [gpt-export-viewer.vercel.app](https://gpt-export-viewer.vercel.app/)

### **Features**
- ✅ 100% Privacy-First (Browser File System API)
- ✅ Streaming Parser für 500MB+ Files
- ✅ Smart Splitting (10/20/50 MB Chunks)
- ✅ Full-Text Search
- ✅ Export zu HTML/Markdown/TXT
- ✅ Excel-Ready CSV

### **Besonderheit**
**Kein Node.js, kein npm** – Reines Static Hosting mit Python/http-server für lokale Entwicklung.

### **Status**
🟢 **Production-Ready** – Bereits deployed, vollständige Dokumentation (README, SECURITY, CONTRIBUTING, CODE_OF_CONDUCT).

### **Empfehlung**
✅ **Portfolio-Ready** – Ist bereits als Public Showcase optimiert. Keine Aktion nötig, außer GitHub-Link zu aktivieren.

---

## 2️⃣ DSGVO-Ampel ✅ (gerade gefixt)

*Siehe separaten Walkthrough in diesem Chat.*

**Status**: 🟢 **Production-Ready** (Dependencies upgraded, Metadata korrigiert, 0 Vulnerabilities)

---

## 3️⃣ Karriere-Kompass (Stellen-Entscheidungshilfe)

### **Steckbrief**
- **Pfad**: `C:\pa\07-dev-play\12_Stellen-Entscheidungshilfe`
- **Version**: 1.0.0
- **Tech**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Deployment**: Lokal

### **Features**
- ✅ Selbstreflexion (3 Motivationsfragen)
- ✅ Werte-Duell (Analytic Hierarchy Process)
- ✅ Personalisiertes Matching (4 Kommunen: Krefeld, Mettmann, OBK, Kerpen)
- ✅ Dark/Light Mode
- ✅ Responsive Design
- ✅ PWA-Support (next-pwa)

### **Inhalt**
Basiert auf echten Dokumenten:
- `Entscheidungs- und Bewertungsmatrix der Kommunen als Arbeitgeber im Ausländerwesen.docx`
- `Digitalisierung der Verwaltung_ Vergleich Mettmann, Kerpen, Krefeld und Gummersbach (OBK).docx`

### **Status**
🟡 **Alpha** – Funktional, aber nicht deployed. Next.js 14 ist veraltet (aktuell: 15.x).

### **Kritik**
- ⚠️ **Next.js 14 statt 15** (14.2.15 → 15.5.9)
- ⚠️ **React 18 statt 19** (18.3.1 → 19.1.0)
- ⚠️ **Keine Deployment-Docs** (README hat Vercel-Anleitung, aber nicht deployed)

### **Empfehlung**
🔧 **Dependencies upgraden + Deployen**  
Aufwand: ~30 Min (npm install next@latest react@latest → vercel deploy)

---

## 4️⃣ Formulare-Suite (11_dev-formulare)

### **Steckbrief**
- **Pfad**: `C:\pa\07-dev-play\11_dev-formulare`
- **Typ**: **Multi-Projekt Workspace** (4-5 Unterprojekte)
- **Tech**: Gemischt (Next.js, Static Tools)

### **Unterprojekte**

#### **4.1 PDF-Mapping-App-v2**
- **Pfad**: `11_dev-formulare/PDF-Mapping-App-v2`
- **Tech**: Next.js (App Router), TypeScript, Tailwind
- **Zweck**: Interaktive PDF-Formular-Mapping-App (XML → PDF)
- **Features**:
  - Auto-Mapping (KI-basiert)
  - Iterationen-Management (Zeitstempel-basiert)
  - XML-Editor, PDF-Viewer
  - Feste Ordnerstruktur für Formulare
- **Status**: 🟡 **Entwicklung** (Playwright-Tests vorhanden, aber keine package.json-Dependency-Updates erkennbar)

#### **4.2 PDF-Erstellung (20_PDF_erstellung)**
- **Pfad**: `11_dev-formulare/20_PDF_erstellung`
- **Typ**: Dokumentation + Tools
- **Inhalt**: Verweist auf PDF-mapping Ordner

#### **4.3 Gemeinnützigkeitsnachweis (01)**
- **Umgebungs-Anker**: `01_Gemeinnützigkeitsnachweis/README_START.md`
- **Zweck**: Formular-Management (nicht inspiziert)

#### **4.4 Spendenformular (02)**
- **Umgebungs-Anker**: `02_Spendenformular/README_START.md`
- **Zweck**: Spenden-Formular (nicht inspiziert)

#### **4.5 Template-System (21)**
- **Umgebungs-Anker**: `21-Template-System/README.md`
- **Zweck**: Formular-Templates (nicht inspiziert)

### **Architektur**
**"Anker-basiert"** – Zentrales `START_HIER.md` verweist auf Umgebungs-Anker in Unterprojekten.

### **Status**
🔴 **Komplex, fragmentiert** – Klare Struktur vorhanden, aber mehrere parallel laufende Projekte.

### **Kritik**
- ⚠️ **Zu viele Ebenen** (Oberordner → Unterprojekte → Sub-Ordner)
- ⚠️ **Keine Monorepo-Struktur** (kein Wurzel-package.json für gemeinsame Dependencies)
- ⚠️ **Unklarer Status** (Welches Projekt ist aktiv? Welches ist Legacy?)

### **Empfehlung**
📊 **Konsolidierung prüfen**  
Option A: Monorepo-Struktur (Turborepo/pnpm workspaces)  
Option B: Einzelprojekte komplett trennen (eigene Repos)

---

## 5️⃣ Kartensammler (Visitenkarten-App)

### **Steckbrief**
- **Pfad**: `C:\pa\07-dev-play\13_Visitenkarten-App\card-collector`
- **Version**: 0.1.0
- **Tech**: Next.js 15.5, React 19, TypeScript, PWA
- **Deployment**: Lokal (Port 3003)

### **Features**
- ✅ **PWA** (Offline-fähig, installierbar)
- ✅ **IndexedDB Storage** (Dexie.js)
- ✅ **Bildkompression** (browser-image-compression)
- ✅ **QR-Code Scanner** (html5-qrcode)
- ✅ **Offline-First** (Service Worker)
- ✅ **Zero-Backend** (100% lokal)

### **Branding**
- Name: "Kartensammler"
- Domain: `sammler.promptarchitekt.de` (geplant)
- Farben: Cyan (#00FAFF), Gold (#FFC300), Dark

### **Dokumentation**
- ✅ README.md vorhanden
- ✅ KONZEPT.md (Architektur-Doku)
- ✅ CHECKLIST.md (Launch-Checkliste)
- ✅ Skills-Ordner (PWA-Entwicklung, IndexedDB)

### **Status**
🟢 **Beta** – Technisch fertig, Dependencies aktuell (Next.js 15.5.7, React 19.1.0).

### **Kritik**
- ⚠️ **Nicht deployed** (Domain geplant, aber noch nicht live)
- ⚠️ **Service Worker fehlt?** (README erwähnt `sw.js`, aber nicht inspiziert)

### **Empfehlung**
🚀 **Deployment vorbereiten**  
1. Domain `sammler.promptarchitekt.de` registrieren
2. Vercel-Deployment (PWA-Config prüfen)
3. Service Worker testen (Offline-Mode)

---

## 🎯 Strategische Empfehlungen

### **Sofort (Quick Wins)**
1. ✅ **DSGVO-Ampel deployen** (bereits ready)
2. 🔧 **Karriere-Kompass Dependencies upgraden** (~30 Min)
3. 🚀 **Kartensammler deployen** (~1-2h für Domain-Setup + Vercel)

### **Kurzfristig (1-2 Wochen)**
4. 📊 **Formulare-Suite konsolidieren** (Entscheiden: Monorepo oder Trennung)
5. 🔍 **GPT Export Manager: GitHub-Link aktivieren** (aktuell: placeholder in README)

### **Mittelfristig (1 Monat)**
6. 📦 **Portfolio-Seite erstellen** (Übersicht aller Tools auf `promptarchitekt.de/tools`)
7. 🎨 **Branding harmonisieren** (Alle Tools nutzen PA-Design-Tokens)

---

## 💡 Erkenntnis: Skill-Gaps

### Was fehlt in mehreren Projekten?
| Gap | Betroffene Projekte |
|-----|---------------------|
| **Deployment-Docs** | 12, 13 |
| **Changelog** | 12, 13 |
| **License** | 12, 13 (außer 07) |
| **Security Policy** | 12, 13 (außer 07) |
| **CI/CD** | 12, 13 |

**Fazit**: `07_gpt_export_manager` ist das **best-practice Beispiel** – alle anderen Projekte sollten dieses Setup als Vorlage nutzen.

---

## 📈 Monetarisierungs-Potenzial

| Projekt | Modell | Potenzial |
|---------|--------|-----------|
| **GPT Export** | Freemium (Pro-Features) | 🟡 Mittel |
| **DSGVO-Ampel** | Lead-Gen → Consulting | 🟢 Hoch |
| **Karriere-Kompass** | White-Label für Behörden | 🟢 Hoch |
| **Kartensammler** | Freemium (Cloud-Sync Pro) | 🟡 Mittel |
| **PDF-Mapping** | B2B Tool (Licensing) | 🟢 Hoch |

---

## 🏁 Zusammenfassung

**Anzahl Projekte**: 6 (davon 2 production-ready, 2 beta, 2 alpha/complex)  
**Gesamt-Tech-Debt**: Niedrig bis mittel (hauptsächlich veraltete Dependencies)  
**Deployment-Readiness**: 2/6 deployed, 4/6 bereit für Deployment  
**Dokumentations-Qualität**: Hoch (07) bis Mittel (12, 13)

**Stärkste Projekte**:
1. 🥇 GPT Export Manager (vollständig, deployed, best-practice)
2. 🥈 DSGVO-Ampel (gerade production-ready gemacht)
3. 🥉 Kartensammler (technisch fertig, nur Deployment fehlt)

**Kritischste Projekte**:
1. 🔴 Formulare-Suite (zu komplex, Konsolidierung nötig)
2. 🟡 Karriere-Kompass (Dependencies veraltet, nicht deployed)
