# Implementation Plan: Audit & Hardening (09-DSGVO-Ampel)

**Zweck**: Technischer Umsetzungsplan zur Behebung der kritischen Audit-Befunde (Technical Due Diligence); Zielstatus „Beta“, Security-Härtung.

**Stand**: 21.01.2026

---

## User Review Required

> [!IMPORTANT]
> **Dependency Upgrade**: We are moving from React 19 RC to a stable version and upgrading Next.js to the latest 15.x patch to resolve known security vulnerabilities (CVEs).
> **Removal of Legacy Files**: The files `DSGVO-Ampel_v4.ts` and `KI-Kompetenztest.ts` in the root will be deleted as they are redundant.

## Proposed Changes

### [Component] Core Infrastructure & Dependencies

#### [MODIFY] [package.json](file:///C:/pa/07-dev-play/09-DSGVO-Ampel/package.json)
- Upgrade `next` to `latest` (v15.1.x+)
- Upgrade `react` and `react-dom` to stable v19.0.0
- Upgrade `eslint-config-next` to match Next.js version
- Run `npm install` and `npm audit fix`

#### [DELETE] [DSGVO-Ampel_v4.ts](file:///C:/pa/07-dev-play/09-DSGVO-Ampel/DSGVO-Ampel_v4.ts)
- Remove legacy logic file

#### [DELETE] [KI-Kompetenztest.ts](file:///C:/pa/07-dev-play/09-DSGVO-Ampel/KI-Kompetenztest.ts)
- Remove legacy logic file

### [Component] Metadata & SEO

#### [MODIFY] [layout.tsx](file:///C:/pa/07-dev-play/09-DSGVO-Ampel/app/layout.tsx)
- Update `metadataBase` to `https://dsgvo-ampel.promptarchitekt.de`
- Ensure all OpenGraph tags are correctly configured

## Verification Plan

### Automated Tests
- `npm run build`: Verify that the project builds correctly after dependency upgrades.
- `npm run lint`: Ensure no new linting errors were introduced.

### Manual Verification
1. **Dependency Check**: Verify `package.json` and `node_modules` for updated versions.
2. **Metadata Check**: Inspect the rendered HTML (view source) to confirm `metadataBase` is correctly applied.
3. **Smoke Test**: Launch the app with `npm run dev` and navigate through both the DSGVO Ampel and KI Kompetenztest to ensure no regressions in functionality.
