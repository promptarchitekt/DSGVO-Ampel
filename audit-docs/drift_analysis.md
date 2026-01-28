# DSGVO-Ampel: Drift-Analyse (Standalone vs. Monorepo)

**Zweck**: Vergleich der Standalone- und Monorepo-Version des DSGVO-Tools; Abgrenzung, Synch-Optionen und Architektur-Entscheidungen.

**Prüfdatum**: 21.01.2026  
**Geprüfte Versionen**:
- **Standalone**: `C:\pa\07-dev-play\09-DSGVO-Ampel`
- **Monorepo**: `C:\pa\01-dev-monorepo\apps\pa-copilot\components\tools\compliance`

---

## 🔍 Wichtigste Erkenntnis

Das DSGVO-Tool existiert **zweimal**:
1. **Standalone** (`07-dev-play`): **Vollständige Next.js App** mit eigenem Routing, Layout, Landing-Page.
2. **Monorepo** (`pa-copilot`): **Modulare Komponenten** (nur Data + Components), kein eigenes Routing.

**Status**: Die Standalone-Version wurde **nicht deprecated** — sie ist ein eigenständiges Deployment-Target (z.B. für Drittanbieter, White-Label, oder öffentliche Demo ohne Copilot-Kontext).

---

## 📊 Architektur-Vergleich

| Kategorie | Standalone (07-dev-play) | Monorepo (pa-copilot) |
|-----------|--------------------------|------------------------|
| **Zweck** | Marketing-Tool, öffentliche Demo | Integriertes Feature in Copilot |
| **Deployment** | Eigene Domain (z.B. `dsgvo-ampel.vercel.app`) | Teil von `pa-copilot` |
| **Struktur** | Full Next.js App (App Router) | Nur `components/` + `data/` |
| **Routing** | Eigene Routes (`/dsgvo-ampel`, `/ki-kompetenztest`) | Keine Routes (wird in Copilot eingebettet) |
| **Layout** | Custom Landing Page, Header, Footer | Nutzt Copilot Shell (`ToolPage`) |
| **UI-Library** | Inline Tailwind (kein shadcn) | shadcn/ui (`components/ui/`) |
| **Design-Tokens** | Custom CSS-Variablen (`--pa-cyan`, etc.) | Monorepo Design-Tokens Package |
| **Icons** | Lucide (inline imports) | Icon Registry (`icon.tsx`) |
| **Dependencies** | React 19 RC ❌, Next.js 15.0.3 ❌ | React 19.1.0 ✅, Next.js 15.5.9 ✅ |

---

## 🔴 Kritische Probleme (Standalone)

### 1. **Security Vulnerabilities**
- **Next.js 15.0.3**: 6 bekannte CVEs (1x critical)
- **React 19 RC**: Nicht production-ready

### 2. **Metadata Placeholder**
```tsx
// C:\pa\07-dev-play\09-DSGVO-Ampel\app\layout.tsx:13
metadataBase: new URL("https://example.com")  // ❌ Platzhalter
```

### 3. **Legacy Files (nicht gelöscht)**
- `DSGVO-Ampel_v4.ts` (im Root, sollte gelöscht sein)
- `KI-Kompetenztest.ts` (im Root, sollte gelöscht sein)

### 4. **PDF-Export = Print-Dialog**
```tsx
// app/dsgvo-ampel/page.tsx
onClick={() => window.print()}  // ❌ Kein echtes PDF
```

---

## 🟢 Was gut ist (Standalone)

✅ **Inhaltliche Qualität**: Echte Rechtsgrundlagen, aktuelle Deadlines (AI Act Feb 2025, BFSG Juni 2025).  
✅ **UX**: Zwei Modi (Geführt/Experten), kondionale Fragen, klare Ampel-Darstellung.  
✅ **Zero-Data**: 100% clientseitig, keine Cookies, DSGVO-Ironie gelöst.  
✅ **Deployment-Ready**: Vercel-Config vorhanden, `start-dsgvo-ampel.ps1` für lokales Testing.

---

## 🟡 Drift-Bereiche

### 1. **Data-Layer (fast identisch)**
- **Standalone**: `DSGVO-Ampel_v4.ts` (818 Zeilen, im Root)
- **Monorepo**: `data/compliance/dsgvo-ampel.ts` (818 Zeilen, gleiche Struktur)
- **Drift**: ~95% identisch. Kommentar in Monorepo-Version verweist auf Standalone als Quelle.

### 2. **Component-Layer (unterschiedlich)**
- **Standalone**: Monolithische Page-Components (inline, keine Separation)
- **Monorepo**: Atomare Komponenten (`AmpelDisplay`, `TodoList`, `QuizShell`, `InfoCard`, etc.)

### 3. **Design-System**
- **Standalone**: Custom CSS-Variablen, Tailwind v3
- **Monorepo**: Design-Tokens Package, Tailwind v4

---

## 🎯 Strategie-Empfehlung

### **Option A: Sync from Monorepo → Standalone** (empfohlen)
**Ziel**: Monorepo ist SSOT für Daten + Logic, Standalone importiert diese.

**Umsetzung**:
1. Dependencies in Standalone upgraden (Next.js 15.5.9, React 19.1.0).
2. `DSGVO-Ampel_v4.ts` löschen, stattdessen via symlink/import auf Monorepo-Version verweisen.
3. Metadata fixen (`metadataBase` → echte Domain).
4. Legacy-Files löschen.

**Vorteil**: Keine Code-Duplikation, Monorepo bleibt SSOT.  
**Nachteil**: Standalone hängt von Monorepo ab (kein wirklich "standalone").

---

### **Option B: Fork (Zwei getrennte Codebases)** (aktueller Status)
**Ziel**: Beide Versionen leben unabhängig.

**Umsetzung**:
1. Dependencies in Standalone upgraden.
2. Metadata + Legacy-Files fixen.
3. Bei inhaltlichen Updates in **beiden** Versionen manuell synchronisieren.

**Vorteil**: Standalone = wirklich eigenständig, kann an Dritte weitergegeben werden.  
**Nachteil**: Doppelte Maintenance.

---

## ✅ Nächste Schritte (Standalone)

### **Critical (Vor Public Launch)**
1. **Dependencies upgraden**:
   ```json
   "next": "15.5.9",
   "react": "19.1.0",
   "react-dom": "19.1.0"
   ```
2. **Metadata fixen**:
   ```tsx
   metadataBase: new URL("https://dsgvo-ampel.promptarchitekt.de")
   ```
3. **Legacy-Files löschen**:
   - `DSGVO-Ampel_v4.ts`
   - `KI-Kompetenztest.ts`

### **Nice-to-Have**
4. **PDF-Export** (jsPDF/html2pdf statt `window.print()`).
5. **localStorage** (Ergebnisse persistieren).
6. **Share-URL** (Ergebnisse via URL-Params teilen).

---

## 📈 Monetarisierungs-Pfade

### **Standalone (Public)**
- Freemium: Tool kostenlos → PDF-Report €29.
- Lead-Gen: Kostenlos → E-Mail für Whitepaper → Consulting-Upsell.

### **Monorepo (Internal)**
- Feature in Copilot für zahlende Kunden.
- White-Label für Enterprise-Kunden (eigenes Branding).

---

## 🏁 Fazit

**Zustand**: Standalone = **Solid Alpha**, inhaltlich stark, technisch veraltet.  
**Empfehlung**: **Option B** (Fork) mit **Critical Fixes** (Dependencies + Metadata).  
**Aufwand**: ~8-10 Stunden bis Production-Ready.  
**ROI**: Hoch, wenn als Lead-Gen oder Freemium-Tool genutzt.
