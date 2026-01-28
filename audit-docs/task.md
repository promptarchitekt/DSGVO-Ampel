# Task: Audit Validation & Improvement for 09-DSGVO-Ampel

**Zweck**: Aufgaben-Tracker für Audit-Validierung und -Umsetzung; alle Schritte bis Production-Ready abhaken.

**Stand**: 21.01.2026

---

- [x] Validate audit findings in `C:\pa\07-dev-play\09-DSGVO-Ampel`
    - [x] Check `package.json` for React/Next.js versions
    - [x] Verify security vulnerabilities (Next.js 15.0.3 status)
    - [x] Audit `layout.tsx` for metadata placeholders
    - [x] Verify PDF export implementation (`window.print()`)
    - [x] Identify legacy files (`DSGVO-Ampel_v4.ts`, `KI-Kompetenztest.ts`)
- [x] Create Implementation Plan for prioritized fixes
    - [x] Upgrade Next.js to 15.1.x / Stable React
    - [x] Fix metadataBase
    - [x] Improve PDF export
- [x] Execute fixes (after approval)
    - [x] Upgrade dependencies
    - [x] Fix metadata
    - [x] Remove YouTube placeholder
    - [x] Delete legacy files
    - [x] Build test
- [/] Final Verification & Walkthrough
