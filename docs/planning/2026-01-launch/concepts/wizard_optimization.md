# Wizard Optimization Plan - DSGVO-Ampel

**Ziel**: Wizard-UX nach Best Practices 2025 optimieren

---

## 🎯 User-Feedback

1. **Tooltip mit "?" Icon** statt sichtbarem `helpText`
2. **Code-Länge reduzieren** (aktuell 1575 Zeilen)
3. **Glass-Effekt entfernen** → Klarere, stabilere Buttons
4. **Scroll-Problem lösen** (zu viel Inhalt pro Seite)

---

## 📚 Best Practices (Research)

### Wizard Forms (2025)
- **Progressive Disclosure**: Nur essenzielle Info zeigen
- **5-9 Felder pro Step** (aktuell: 1 Frage = 1 Step ✅)
- **Clear Navigation**: Vor/Zurück klar erkennbar
- **Progress Indicator**: Position + verbleibende Steps
- **Real-time Validation**: Sofortiges Feedback
- **Mobile-First**: Touch targets ≥ 44px

### Tooltips
- **Für nicht-kritische Kontextinfo** (perfekt für unsere helpText!)
- **Kurz & prägnant** (max. 1-2 Sätze)
- **Nicht für kritische Infos** (Warnungen separat)
- **Icon-basiert**: "?" oder "i" Icon
- **Click/Hover**: Mobile-friendly (Click, nicht Hover)

### Popovers
- **Für ausführliche Details** (perfekt für infoCard!)
- **Auf Anfrage zeigen**: User öffnet bewusst
- **Schließbar**: Click outside oder X-Button

---

## 🔧 Technische Umsetzung

### 1. Tooltip-Komponente

**Option A**: Native `<details>`/`<summary>` (bereits verwendet für Hilfe)
- ✅ Zero Dependencies
- ✅ Accessibility built-in
- ❌ Limitierte Positionierung

**Option B**: Custom Tooltip (Radix-inspiriert)
- ✅ Volle Kontrolle über Positionierung
- ✅ Lightweight (<50 LOC)
- ✅ Accessibility mit ARIA
- **EMPFOHLEN**

### 2. Code-Struktur

**Vorher**: Alles in `page.tsx` (1575 Zeilen)

**Nachher**:
```
app/dsgvo-ampel/
├── page.tsx          (200 LOC - Hauptlogik)
├── questions.ts      (700 LOC - Questions-Array)
├── components/
│   ├── QuestionCard.tsx    (Wiederverwendbar)
│   ├── HelpTooltip.tsx     (? Icon + Popover)
│   ├── ResultsPage.tsx     (Ergebnisse)
│   └── EmailGate.tsx       (E-Mail Formular)
```

**Reduktion**: ~1575 → ~1100 Zeilen (aufgeteilt)

### 3. Glass-Effekt entfernen

**Aktuell**:
```css
.glow-btn {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}
```

**Neu (Solid & Clear)**:
```css
.btn-primary {
  background: #6366f1; /* Indigo-500 */
  border: 2px solid #6366f1;
  color: white;
  /* Kein blur, kein glow */
}

.btn-secondary {
  background: transparent;
  border: 2px solid #4b5563; /* Gray-600 */
  color: white;
}
```

---

## 📋 Implementation Checklist

### Phase 1: Tooltip/Popover (P1 - High Value)

- [ ] **HelpTooltip Component** erstellen
  - Click-based (Mobile-friendly)
  - Positioned: Top/Right der Frage
  - Max-width: 300px
  - Close on outside click

- [ ] **helpText umbauen**
  - Von `<p>` zu `<HelpTooltip text={...} />`
  - Icon: `<HelpCircle className="w-4 h-4" />`
  - Inline neben Fragetitel

- [ ] **infoCard umbauen**
  - Details-Element behalten (gut für SEO/A11y)
  - Aber: Nur bei langen Infos (>100 Zeichen)
  - Kurze Infos → Tooltip

**Beispiel**:
```tsx
<h2 className="text-lg font-semibold flex items-center gap-2">
  {currentQuestion.title}
  {currentQuestion.helpText && (
    <HelpTooltip>{currentQuestion.helpText}</HelpTooltip>
  )}
</h2>
```

### Phase 2: Code-Struktur (P1)

- [ ] **questions.ts** extrahieren
  - `export const questions: Question[]`
  - Type-Safety mit TypeScript Interface

- [ ] **Component extraction**
  - QuestionCard.tsx (Radio/Select rendering)
  - EmailGate.tsx
  - ResultsPage.tsx

- [ ] **Custom Hooks**
  - `useWizardNavigation()` (next/back/progress)
  - `useFormValidation()` (real-time validation)

### Phase 3: Button-Styling (P2 - Polish)

- [ ] **Glass-Effekt entfernen**
  - `glow-btn` class → `btn-primary`
  - Solid backgrounds
  - Clear borders

- [ ] **Konsistente States**
  - `:hover` (Darken 10%)
  - `:disabled` (Opacity 50%, Cursor not-allowed)
  - `:focus-visible` (Outline ring)

### Phase 4: Scroll-Optimierung (P2)

- [ ] **Viewport-Height prüfen**
  - Frage + Optionen + Navigation < 100vh
  - Falls nicht: Optionen-Text kürzen

- [ ] **Lazy Loading für infoCard**
  - Nur laden, wenn Details geöffnet

---

## 🎨 Visuelles Design

### Tooltip-Design

**Trigger (? Icon)**:
```tsx
<button
  type="button"
  className="text-white/50 hover:text-white transition-colors"
  aria-label="Hilfe anzeigen"
>
  <HelpCircle className="w-4 h-4" />
</button>
```

**Popover Content**:
```tsx
<div className="
  bg-[#1a1d24] 
  border border-white/20 
  rounded-lg 
  p-4 
  shadow-xl 
  max-w-xs
">
  <p className="text-sm text-white/80">
    {helpText}
  </p>
</div>
```

### Button-Design (Ohne Glass)

**Primary (Weiter)**:
```css
background: #6366f1;
border: 2px solid #6366f1;
color: white;
padding: 12px 24px;
font-weight: 600;
transition: all 150ms;

:hover {
  background: #4f46e5; /* Darken */
}
```

**Secondary (Zurück)**:
```css
background: transparent;
border: 2px solid #4b5563;
color: white;
padding: 12px 24px;
font-weight: 600;

:hover {
  background: rgba(75, 85, 99, 0.1);
  border-color: #6b7280;
}
```

---

## 📊 Erwartete Verbesserungen

| Metrik | Vorher | Nachher | Verbesserung |
|--------|--------|---------|--------------|
| **Scroll benötigt** | 60% der Fragen | <10% | -83% |
| **Code-Zeilen** | 1575 | ~1100 (aufgeteilt) | -30% |
| **Cognitive Load** | Hoch (viel Text) | Niedrig (on-demand) | 📉 |
| **Mobile UX** | Gut | Exzellent | ✅ |
| **Wartbarkeit** | Schwer (1 File) | Einfach (modulär) | ✅ |

---

## 🚀 Nächste Schritte

1. **Approve Plan** ✅
2. **Phase 1**: HelpTooltip Component implementieren
3. **Phase 2**: Code auslagern (questions.ts)
4. **Phase 3**: Button-Styling refactoren
5. **Testing**: Alle Fragen durchklicken, Scroll prüfen

**Zeitaufwand**: ~2-3h (alle Phasen)
