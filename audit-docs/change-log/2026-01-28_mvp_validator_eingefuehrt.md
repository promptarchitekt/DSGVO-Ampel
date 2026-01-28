# Änderung: MVP-Validator eingeführt (2026-01-28)

**Datum der Änderung**: 28.01.2026  
**Betroffen**: Validierungsprozess für `audit-docs` (Dokumentenstandard, Links)  
**Auslöser**: Einführung von `scripts/compliance-daily.mjs` und erster Lauf am 28.01.2026.

## 1. Vorher

- Kein automatisierter, skriptbasierter Validierungsprozess für `audit-docs`.
- Keine tägliche Report-Erzeugung in `audit-docs/validations/`.

## 2. Nachher

- **Runner**: `scripts/compliance-daily.mjs` führt folgende Checks aus:
  - Dokumentenstandard (Zweck, `---`) für `audit-docs/*.md` (ausgenommen `validations/` und `change-log/`).
  - HTTP(S)-Link-Prüfung auf Erreichbarkeit.
- **Reports**:
  - Erster Report: `audit-docs/validations/2026-01-28.md`.
  - Aktueller Stand: `audit-docs/validations/latest-divergence.md` (Kopie des letzten Reports).
- **Konfiguration**:
  - `audit-docs/compliance-automation.config.json` (MVP: docStandard + links aktiv, datumQuelle/gesetzeslageAbgleich inaktiv).

## 3. Quellen

- Interne Quelle: `audit-docs/*.md` im Repository `09-DSGVO-Ampel`.

## 4. Abnahme

- Geprüft: Ausführung von `node scripts/compliance-daily.mjs` erfolgreich (Exit-Code 0).  
- Report-Dateien vorhanden und lesbar, keine Änderung an `gesetzeslage_stand_280126.md`.

