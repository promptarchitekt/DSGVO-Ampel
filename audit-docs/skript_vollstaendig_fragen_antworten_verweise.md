# Vollständiges Skript: Fragen, Antworten, Infos, Verweise

**Zweck**: Einheitsreferenz für Erhebung, Bericht und Angebotsbewertung. Alle Fragen, Optionen, Hilfetexte, Rechtsgrundlagen und Verweise in einem Dokument.

**Referenzen**: DSGVO-Ampel-Formular, sk-dsgvo-ki-compliance (abfrage.md, legislation.md). Konsolidiert für Bericht und Angebotsbewertung.

---

## Reihenfolge und Bedingungen (Ablauf)

| Nr | ID | Kategorie | Bedingung (wann anzeigen) |
|----|-----|------------|----------------------------|
| 1 | mitarbeiterAnzahl | Unternehmen | immer |
| 2 | useCase | Anwendungsfall | immer |
| 3 | vvt | DSGVO - Dokumentation | immer |
| 4 | dsfa | DSGVO - Risikobewertung | immer |
| 5 | avv | DSGVO - Auftragsverarbeitung | immer |
| 6 | kiTyp | EU-KI-Akt | useCase === "ki_system" \|\| "intern" |
| 7 | kiKompetenz | EU-KI-Akt - Schulung | useCase === "ki_system" \|\| "intern" |
| 8 | bfsgDigitalProdukt | BFSG | immer |
| 9 | bfsg | BFSG - Barrierefreiheit | bfsgDigitalProdukt === "ja" |
| 10 | nis2 | NIS2 | immer |
| 11 | gobd | GoBD | immer |
| 12 | mitarbeiterDatenschutz | Mitarbeiter | immer |
| 13 | mitarbeiterBetriebsvereinbarung | Mitarbeiter | immer |
| 14 | name, email, firma | Kontakt | immer (optional) |

---

## 1. Kontext / Unternehmen

### 1.1 mitarbeiterAnzahl

| Feld | Inhalt |
|------|--------|
| **Frage** | Wie viele Mitarbeiter beschäftigt Ihr Unternehmen? |
| **Typ** | select |
| **Optionen** | `<10` = Weniger als 10 Mitarbeiter; `10-49` = 10–49; `50-249` = 50–249; `250+` = 250 oder mehr |
| **HelpText** | Diese Information hilft uns, gesetzliche Ausnahmeregelungen zu prüfen. |
| **InfoCard Titel** | Warum fragen wir das? |
| **InfoCard Inhalt** | Unternehmen mit weniger als 250 Mitarbeitern haben bei bestimmten Pflichten Ausnahmen. ABER: Diese Ausnahmen gelten NICHT bei digitalen Produkten oder regelmäßiger Datenverarbeitung! |
| **Verweise** | [Art. 30 Abs. 5 DSGVO](https://www.datenschutz-grundverordnung.eu/grundverordnung/art-30-ds-gvo/) |
| **Rechtsnorm (Validierung)** | DSGVO Art. 37 (DSB-Pflicht), BFSG |

### 1.2 useCase

| Feld | Inhalt |
|------|--------|
| **Frage** | Welcher Anwendungsfall beschreibt Ihre Situation am besten? |
| **Typ** | select |
| **Optionen** | `ki_system` = KI-System im Unternehmen (z.B. ChatGPT, Copilot); `verwaltung` = Digitale Verwaltungsleistung (Portal, Chatbot); `ecommerce` = E-Commerce / Online-Shop; `intern` = Interne Prozesse; `sonstiges` = Sonstiges |
| **HelpText** | Diese Auswahl passt die folgenden Fragen optimal an Ihre Situation an. |
| **Rechtsnorm (Validierung)** | Bestimmt Anwendbarkeit DSGVO + KI-VO |

---

## 2. DSGVO – Dokumentation & Risiko

### 2.1 vvt (Verzeichnis der Verarbeitungstätigkeiten)

| Feld | Inhalt |
|------|--------|
| **Frage (guided)** | Dokumentieren Sie systematisch, welche Kundendaten Sie erheben, wo Sie diese speichern und wofür Sie diese nutzen? |
| **Frage (expert)** | Haben Sie ein vollständiges Verzeichnis der Verarbeitungstätigkeiten gemäß Art. 30 DSGVO? |
| **Typ** | radio |
| **Optionen** | `ja` = Ja, vollständig dokumentiert 🟢; `teilweise` = Teilweise, noch Lücken vorhanden 🟡; `nein` = Nein, noch nicht systematisch 🔴 |
| **HelpText** | Beispiele: Liste aller Systeme (CRM, E-Mail, Cloud), welche Daten dort gespeichert werden, wie lange aufbewahrt. / Das VVT ist Pflicht für alle Verantwortlichen. |
| **Rechtsgrundlage** | Art. 30 DSGVO |
| **InfoCard Titel** | Was ist ein Verzeichnis der Verarbeitungstätigkeiten (VVT)? |
| **InfoCard Inhalt** | Ein VVT ist eine Übersicht ALLER Prozesse, bei denen personenbezogene Daten verarbeitet werden. Beispiele: Kundenverwaltung, E-Mail-Marketing, Bewerbermanagement, Gehaltsabrechnung. Für jeden Prozess: WELCHE Daten, WOZU, WO gespeichert, WIE LANGE. |
| **Verweise** | [VVT-Mustervorlage LDI NRW](https://www.ldi.nrw.de/datenschutz/verwaltung/verarbeitungsverzeichnis-nach-artikel-30-ds-gvo); [Excel-Vorlage](https://emodeon.de/kostenlose-vorlage-fuer-das-verzeichnis-von-verarbeitungstaetigkeiten-vvt/) |

### 2.2 dsfa (Datenschutz-Folgenabschätzung)

| Feld | Inhalt |
|------|--------|
| **Frage (guided)** | Nutzen Sie KI oder andere Systeme, die automatisch Entscheidungen über Personen treffen (z.B. Kreditvergabe, Bewerbungsauswahl)? |
| **Frage (expert)** | Wurde eine Datenschutz-Folgenabschätzung (DSFA) gemäß Art. 35 DSGVO durchgeführt? |
| **Typ** | radio |
| **Optionen** | `ja` = Ja, DSFA wurde durchgeführt 🟢; `nein` = Nein, aber geplant 🟡; `nicht_erforderlich` = Nicht erforderlich (kein Hochrisiko) 🟢; `weiss_nicht` = Weiß nicht / unsicher 🟡 |
| **HelpText** | DSFA erforderlich bei: KI mit personenbezogenen Daten, Videoüberwachung, Profiling, Gesundheitsdaten, großflächiger Datenerhebung. |
| **Warning** | Bei KI-Systemen mit personenbezogenen Daten ist eine DSFA fast immer erforderlich! |
| **Rechtsgrundlage** | Art. 35 DSGVO |
| **InfoCard Titel** | Was ist eine Datenschutz-Folgenabschätzung (DSFA)? |
| **InfoCard Inhalt** | Eine DSFA prüft, ob eine Datenverarbeitung ein hohes Risiko für Personen darstellt. Pflicht bei: Automatisierten Entscheidungen (KI), Profiling, Videoüberwachung, besonderen Datenkategorien. Die DSFA beschreibt: Zweck, Risiken, Schutzmaßnahmen. |
| **Verweise** | [DSFA-Prüfliste LDI NRW](https://www.ldi.nrw.de/datenschutz/datenschutz-folgenabschaetzung); [SDM](https://www.datenschutzzentrum.de/sdm/) |

### 2.3 avv (Auftragsverarbeitungsvertrag)

| Feld | Inhalt |
|------|--------|
| **Frage (guided)** | Nutzen Sie externe Dienstleister für Cloud, E-Mail oder Webhosting? Falls ja: Haben Sie mit ALLEN Verträge abgeschlossen? |
| **Frage (expert)** | Haben Sie mit allen Auftragsverarbeitern einen AVV gemäß Art. 28 DSGVO abgeschlossen? |
| **Typ** | radio |
| **Optionen** | `ja` = Ja, mit allen Dienstleistern 🟢; `teilweise` = Teilweise, nicht mit allen 🟡; `nein` = Nein, noch keine Verträge 🔴; `keine_dienstleister` = Keine externen Dienstleister 🟢 |
| **HelpText** | Beispiele: Google Workspace, Microsoft 365, IONOS, AWS, Mailchimp, Zoom, Stripe. |
| **Rechtsgrundlage** | Art. 28 DSGVO |
| **InfoCard Titel** | Was ist ein Auftragsverarbeitungsvertrag (AVV)? |
| **InfoCard Inhalt** | Ein AVV regelt, wie externe Dienstleister mit Ihren Kundendaten umgehen müssen. Pflicht bei ALLEN Dienstleistern mit Zugriff auf personenbezogene Daten! Beispiele: Cloud, E-Mail, Zahlungsdienstleister, Webhosting. |
| **Verweise** | [AVV-Muster Bitkom](https://www.bitkom.org/Themen/Datenschutz-Sicherheit/Datenschutz/Auftragsverarbeitung.html); [Checkliste AVV-Pflicht](https://www.datenschutz.org/auftragsverarbeitung/) |

---

## 3. EU-KI-Akt (KI-VO 2024/1689)

### 3.1 kiTyp

| Feld | Inhalt |
|------|--------|
| **Frage** | Welche Art von KI-System nutzen Sie? |
| **Typ** | select |
| **Optionen** | `keine` = Keine KI-Systeme; `chatgpt` = ChatGPT / Copilot / Claude (Standard-Tools); `intern_lowrisk` = Interne KI für einfache Aufgaben; `personalwesen` = KI im Personalwesen; `kundenbewertung` = KI für Kundenbewertung (Kreditscoring); `kritische_infrastruktur` = KI in kritischer Infrastruktur; `eigene_modelle` = Eigene KI-Modelle entwickelt |
| **HelpText** | Hilft, die richtige Risikokategorie und Schulungspflicht zu bestimmen. |
| **Bedingung** | useCase === "ki_system" \|\| "intern" |
| **InfoCard Titel** | KI-Risikokategorien im EU-KI-Akt |
| **InfoCard Inhalt** | Minimales Risiko: ChatGPT, Copilot (Transparenzpflicht). Hochrisiko: KI im Personalwesen, Kreditscoring, Gesundheitswesen, Strafverfolgung. Verboten: Social Scoring, biometrische Echtzeit-Überwachung. |
| **Verweise** | [KI-Risikokategorien Bundesnetzagentur](https://www.bundesnetzagentur.de/DE/Beschlusskammern/Beschlusskammer1/KI/start.html); [EU AI Act Volltext](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R1689) |

### 3.2 kiKompetenz

| Feld | Inhalt |
|------|--------|
| **Frage (guided)** | Wurden alle Mitarbeiter, die mit KI arbeiten, geschult (technisch, rechtlich, ethisch)? |
| **Frage (expert)** | Haben Sie KI-Kompetenz-Schulungen für Mitarbeiter gemäß EU-KI-Akt durchgeführt? |
| **Typ** | radio |
| **Optionen** | `ja` = Ja, alle geschult 🟢; `teilweise` = Teilweise, läuft noch 🟡; `nein` = Nein, noch nicht 🔴 |
| **HelpText** | Schulung muss technische, rechtliche UND ethische Aspekte abdecken. Jährliche Auffrischung erforderlich! |
| **Rechtsgrundlage** | EU-KI-Akt (EU 2024/1689), Art. 4 |
| **Deadline** | 02.02.2025 |
| **Bedingung** | useCase === "ki_system" \|\| "intern" |
| **InfoCard Titel** | KI-Kompetenz-Schulung ab 02.02.2025 PFLICHT! |
| **InfoCard Inhalt** | Ab 2. Februar 2025 müssen ALLE Mitarbeiter, die mit KI arbeiten, geschult sein. Inhalte: Technisch, Rechtlich (DSGVO, EU-KI-Akt), Ethisch (Bias, Diskriminierung). Umfang nach Risiko: ChatGPT-Nutzer → 2–4h; Entwickler/Hochrisiko → 2–3 Tage. |
| **Verweise** | [KI-Kompetenz Leitfaden Bundesnetzagentur](https://www.bundesnetzagentur.de/DE/Beschlusskammern/Beschlusskammer1/KI/KI-Kompetenz.html); [IHK KI-Schulung](https://www.ihk.de/rhein-neckar/ausbildung-weiterbildung/weiterbildung-channel/eu-ai-act-artikel-4-6434562) |

---

## 4. BFSG (Barrierefreiheit)

### 4.1 bfsgDigitalProdukt

| Feld | Inhalt |
|------|--------|
| **Frage** | Bieten Sie digitale Produkte oder Dienstleistungen an (Software, Apps, Webshops)? |
| **Typ** | radio |
| **Optionen** | `ja` = Ja; `nein` = Nein |
| **HelpText** | Wichtig: Die Kleinstunternehmen-Ausnahme gilt NICHT für digitale Produkte! |
| **Warning** | BFSG-Ausnahme gilt NICHT für Software/Apps – auch Kleinstunternehmen sind betroffen! |
| **InfoCard Titel** | BFSG: Barrierefreiheit für digitale Produkte |
| **InfoCard Inhalt** | BFSG gilt ab 28.06.2025 für ALLE digitalen Produkte – unabhängig von Unternehmensgröße! Betroffen: Software, Apps, Webshops, E-Books, Online-Banking. |
| **Verweise** | [BFSG-Infos IHK](https://www.ihk.de/rhein-neckar/recht/barrierefreiheitsstaerkungsgesetz-bfsg-5209948); [WCAG 2.2 Checkliste](https://www.w3.org/WAI/WCAG22/quickref/) |

### 4.2 bfsg (WCAG 2.2 AA)

| Feld | Inhalt |
|------|--------|
| **Frage (guided)** | Ist Ihre Software/App/Website für Menschen mit Behinderungen nutzbar (z.B. Tastatur-Navigation, Screen-Reader)? |
| **Frage (expert)** | Erfüllt Ihr digitales Produkt die Anforderungen der Barrierefreiheit gemäß BFSG (WCAG 2.2 AA)? |
| **Typ** | radio |
| **Optionen** | `ja` = Ja, WCAG 2.2 AA erfüllt 🟢; `teilweise` = Teilweise, in Arbeit 🟡; `nein` = Nein, noch nicht 🔴; `weiss_nicht` = Weiß nicht / nicht geprüft 🟡 |
| **HelpText** | Beispiele: Kontrastverhältnisse, Tastatur-Navigation, Alt-Texte, Untertitel. |
| **Rechtsgrundlage** | BFSG, WCAG 2.2 AA |
| **Deadline** | 28.06.2025 |
| **Bedingung** | bfsgDigitalProdukt === "ja" |
| **InfoCard Titel** | WCAG 2.2 AA – Was bedeutet das? |
| **InfoCard Inhalt** | WCAG = Web Content Accessibility Guidelines. Level AA = Standard für Barrierefreiheit. Kriterien: Wahrnehmbar, Bedienbar, Verständlich, Robust. |
| **Verweise** | [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/); [WAVE-Test](https://wave.webaim.org/) |

---

## 5. NIS2, GoBD, Mitarbeiter

### 5.1 nis2

| Feld | Inhalt |
|------|--------|
| **Frage (guided)** | Sind Sie in kritischen Sektoren tätig (Energie, Gesundheit, Verkehr, Finanzwesen) oder wichtiges Unternehmen mit >50 MA und >10 M€ Umsatz? |
| **Frage (expert)** | Sind Sie verpflichtet, Sicherheitsvorfälle gemäß NIS2 zu melden? |
| **Typ** | radio |
| **Optionen** | `ja` = Ja, NIS2-pflichtig 🟡; `nein` = Nein, nicht betroffen 🟢; `weiss_nicht` = Weiß nicht / unsicher 🟡 |
| **HelpText** | NIS2-Meldepflichten: 24h (Frühwarnung), 72h (Hauptmeldung), 30d (Abschlussmeldung). |
| **Warning** | Sanktionen: Bis 20 Mio € ODER 4 % Jahresumsatz + persönliche Haftung der Geschäftsführung! |
| **Rechtsgrundlage** | NIS2 (EU 2022/2555) |
| **InfoCard Titel** | NIS2: Neue Cybersicherheitspflichten |
| **InfoCard Inhalt** | NIS2 betrifft: Kritische Sektoren ODER wichtige Unternehmen (>50 MA, >10 M€ Umsatz). Pflichten: 24h/72h/30d Meldung, Risikomanagement, Lieferkettenprüfung. |
| **Verweise** | [NIS2-Selbsttest BSI](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/NIS2/nis2_node.html); [NIS2-Umsetzungsgesetz](https://www.bmi.bund.de/DE/themen/it-und-digitalpolitik/nis2/nis2-node.html) |

### 5.2 gobd

| Feld | Inhalt |
|------|--------|
| **Frage (guided)** | Archivieren Sie Rechnungen, Belege und steuerrelevante E-Mails ordnungsgemäß für 8 Jahre (digital oder Papier)? |
| **Frage (expert)** | Erfüllen Sie die Aufbewahrungsfristen gemäß GoBD (8 Jahre für Buchungsbelege ab 01.01.2025)? |
| **Typ** | radio |
| **Optionen** | `ja` = Ja, GoBD-konform 🟢; `teilweise` = Teilweise, noch Lücken 🟡; `nein` = Nein, nicht konform 🔴; `weiss_nicht` = Weiß nicht 🟡 |
| **HelpText** | Ab 01.01.2025 gilt für Buchungsbelege eine Frist von 8 Jahren (vorher 10). |
| **Warning** | Neue Regelung ab 2025: 8 Jahre (statt 10) für Buchungsbelege! |
| **Rechtsgrundlage** | GoBD (BMF 14.07.2025), HGB § 257, AO § 147 |
| **InfoCard Titel** | GoBD: Ordnungsgemäße Aufbewahrung |
| **InfoCard Inhalt** | GoBD = Grundsätze zur ordnungsmäßigen Führung und Aufbewahrung. Ab 2025: 8 Jahre Buchungsbelege, 10 Jahre Handelsbücher. Digital oder Papier. Unveränderbarkeit, Nachvollziehbarkeit, Verfügbarkeit! |
| **Verweise** | [GoBD-Checkliste BMF](https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2019-11-28-GoBD.html); [E-Rechnung ab 2025](https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Steuern/e-rechnung.html) |

### 5.3 mitarbeiterDatenschutz

| Feld | Inhalt |
|------|--------|
| **Frage (guided)** | Wurden Ihre Mitarbeiter über die Datenverarbeitung informiert (was wird wie verarbeitet, welche Rechte haben sie)? |
| **Frage (expert)** | Haben Sie eine Datenschutzerklärung für Mitarbeiter gemäß Art. 13/14 DSGVO erstellt? |
| **Typ** | radio |
| **Optionen** | `ja` = Ja, vorhanden 🟢; `nein` = Nein 🔴 |
| **HelpText** | Mitarbeiter müssen VOR Nutzung informiert werden: Welche Daten, Zweck, Empfänger, Rechte. |
| **Rechtsgrundlage** | Art. 13/14 DSGVO |

### 5.4 mitarbeiterBetriebsvereinbarung

| Feld | Inhalt |
|------|--------|
| **Frage** | Haben Sie eine Betriebsvereinbarung (bei Überwachungsbezug)? |
| **Typ** | radio |
| **Optionen** | `ja` = Ja 🟢; `nein` = Nein 🔴; `nicht_erforderlich` = Nicht erforderlich 🟢 |
| **HelpText** | Erforderlich bei: Logging, Monitoring, automatisierten Entscheidungen über Mitarbeiter. |
| **Rechtsgrundlage** | BetrVG § 87 Abs. 1 Nr. 6 |

### 5.5 Kontakt (name, email, firma)

| Feld | Inhalt |
|------|--------|
| **Frage** | Ihr Name / E-Mail / Firma oder Organisation (optional) |
| **Typ** | text, email, text |
| **HelpText** | Für personalisierten Report / Report-Download. Wird nicht gespeichert. / Optional. |

---

## 6. Zuordnung Antwort → Ampel (für Bericht & Angebotsbewertung)

| Thema | Grün | Gelb | Rot |
|-------|------|------|-----|
| VVT | ja | teilweise | nein |
| DSFA | ja, nicht_erforderlich | nein, weiss_nicht | (bei KI/Kontext: nein → gelb/rot je nach Begründung) |
| AVV | ja, keine_dienstleister | teilweise | nein |
| KI-Kompetenz | ja | teilweise | nein |
| BFSG | ja | teilweise, weiss_nicht | nein |
| NIS2 | nein (nicht betroffen) | ja, weiss_nicht | – |
| GoBD | ja | teilweise, weiss_nicht | nein |
| Mitarbeiter Datenschutz | ja | – | nein |
| Mitarbeiter BV | ja, nicht_erforderlich | – | nein |

---

## 7. Alle Verweise (konsolidiert, copy-paste)

| Thema | URL |
|-------|-----|
| Art. 30 DSGVO (VVT) | https://www.datenschutz-grundverordnung.eu/grundverordnung/art-30-ds-gvo/ |
| VVT-Muster LDI NRW | https://www.ldi.nrw.de/datenschutz/verwaltung/verarbeitungsverzeichnis-nach-artikel-30-ds-gvo |
| DSFA LDI NRW | https://www.ldi.nrw.de/datenschutz/datenschutz-folgenabschaetzung |
| SDM | https://www.datenschutzzentrum.de/sdm/ |
| AVV Bitkom | https://www.bitkom.org/Themen/Datenschutz-Sicherheit/Datenschutz/Auftragsverarbeitung.html |
| EU AI Act | https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R1689 |
| KI-Kompetenz BNetzA | https://www.bundesnetzagentur.de/DE/Beschlusskammern/Beschlusskammer1/KI/KI-Kompetenz.html |
| WCAG 2.2 | https://www.w3.org/WAI/WCAG22/quickref/ |
| WAVE-Test | https://wave.webaim.org/ |
| NIS2 BSI | https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/NIS2/nis2_node.html |
| GoBD BMF | https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2019-11-28-GoBD.html |

---
*Vollständiges Skript für Erhebung, Bericht und Angebotsbewertung. Bei Abweichungen vom Live-Formular hat das Formular Vorrang; dieses Dokument dient als Referenz für Berichtskonzept, Quality Gate und ROI/Gewinn-Logik.*
