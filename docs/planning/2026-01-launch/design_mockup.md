# Mobile-First Design Mock-Up

**DSGVO-Ampel** – Ultra-Simple Compliance Check (Jan 2026)

---

## Design Philosophy

**Fokus 1: Eingabe** → Einfach, klar, mobile-optimiert  
**Fokus 2: Ergebnis** → Nachvollziehbar, strukturiert, Handlungsempfehlungen > Rechtsgrundlage

---

## Questionnaire Flow (Mobile-First)

![Mobile Input Flow](/docs/planning/2026-01-launch/mobile_first_layout_1769687315978.png)

### Key Features:
✅ **No Sidebar** – Removed fragenkatalog navigation  
✅ **Minimal Header** – "Frage 3 von 12" + slim progress bar  
✅ **Centered Card** – Single focus area (`max-w-2xl`)  
✅ **Collapsed Help** – 📚 Hintergrund & Hilfe (expandable)  
✅ **Simple Navigation** – Zurück / Weiter buttons  
✅ **Mobile-Optimized** – 44px touch targets, one-thumb navigation  

---

## Results Page (Plain Language - Action-First)

![Plain Language Results](/docs/planning/2026-01-launch/results_plain_language_1769687531511.png)

### Information Architecture (for Critical Items):

**1. 🔴 Problem** (Klarsprache)
- 2-3 Sätze, was fehlt und warum kritisch
- Kein Juristendeutsch
- Beispiel: "Ihr Unternehmen hat kein Verzeichnis von Verarbeitungstätigkeiten (VVT). Das ist eine zentrale Dokumentationspflicht für alle Unternehmen."

**2. ✅ Was tun** (Konkrete Schritte)
- Bullet points mit aktiven Verben
- Links zu Vorlagen/Ressourcen
- Umsetzbar ohne Vorkenntnisse

**3. 👤 Wer** (Verantwortlichkeiten)
- Spezifische Rollen (nicht "Sie")
- Primär verantwortlich vs. Unterstützung
- Beispiel: "Geschäftsführung (verantwortlich)" / "Datenschutzbeauftragter (Unterstützung)"

**4. ⏰ Deadline** (Dringlichkeit)
- "Sofort" / "Bis [Datum]" / "Mittelfristig"
- Farblich hervorgehoben bei "Sofort"

**5. 📖 Rechtsgrundlage** (Referenz)
- Klein, grau, de-emphasized
- Für Evidenz/Glaubwürdigkeit, nicht primäre Info
- Beispiel: "Art. 30 DSGVO" / "§ 8a BSIG (NIS2)"

---

## Implementation Changes

### Removed:
- ❌ Left sidebar (question overview)
- ❌ Always-visible help panel
- ❌ 3-column layout

### Added:
- ✅ Collapsed `<details>` element for help content
- ✅ Mobile-first card layout (works identically on desktop)
- ✅ Action-first results (legal citations de-emphasized)
- ✅ Accordion grouping (Kritisch/Achtung/OK)

---

## Technical Specs

**Layout**:
- Container: `max-w-2xl mx-auto px-4`
- Touch targets: `min-h-[44px]` (Apple HIG)
- Font minimum: `16px` (no zoom needed)

**Navigation**:
- Simple Vor/Zurück (no sidebar jumps)
- Keyboard: ← / → arrows, Enter

**Help Content**:
- Wrapped in `<details><summary>📚 Hintergrund & Hilfe</summary>`
- Collapsed by default
- Contains: helpText, infoCard, rechtsgrundlage, links

**Results**:
- Priority accordion (Material Design 3)
- Legal basis: `text-xs text-white/40` (visible but de-emphasized)
- Kritisch expanded, others collapsed

---

## Mobile Testing Plan

**Devices**: iPhone SE (375px), Galaxy S23 (360px)  
**Tests**:
1. Complete questionnaire with thumb only
2. Verify all touch targets ≥ 44px
3. Test collapsed help expansion
4. Verify PDF download works on mobile
5. Check accordion open/close on results

---

## Expected Impact

📊 **Completion Rate**: +25% (mobile)  
📊 **Task Time**: -40% (reduced cognitive load)  
📊 **Accessibility**: 95%+ WCAG 2.2 AA  
📊 **User Satisfaction**: Higher clarity, less overwhelm
