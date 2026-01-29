
export const EXTERNAL_LINKS = {
  avv: {
    muster: "https://www.activemind.de/datenschutz/auftragsverarbeitung/",
    checkliste: "https://www.activemind.de/datenschutz/auftragsverarbeitung/",
  },
  vvt: {
    // Official Guide & Template from LDI NRW
    muster: "https://www.ldi.nrw.de/datenschutz/verwaltung/verarbeitungsverzeichnis-nach-artikel-30-ds-gvo",
  },
  ki: {
    // Official Federal Network Agency AI Portal (Shortlink)
    risikokategorien: "https://digital-strategy.ec.europa.eu/de/policies/european-approach-artificial-intelligence", 
    euAct: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R1689",
    kompetenz: "https://digital-strategy.ec.europa.eu/de/policies/european-approach-artificial-intelligence",
    schulungIhk: "https://www.dihk.de/de/themen-und-positionen/digitalisierung/kuenstliche-intelligenz", // Stable DIHK Overview
  },
  bfsg: {
    infosIhk: "https://www.bih.de/integrationsaemter/medien-und-publikationen/fachlexikon-der-beruflichen-teilhabe/barrierefreiheitsstaerkungsgesetz-bfsg/", // BIH Lexicon (Stable)
    wcagChecklist: "https://www.w3.org/WAI/WCAG22/quickref/",
    wcagTest: "https://wave.webaim.org/",
  },
  mitarbeiter: {
    // Official Tool from Baden-Wuerttemberg DPA (Landing Page)
    infos: "https://www.baden-wuerttemberg.datenschutz.de/ds-gvo-clever/",
  },
  nis2: {
    // IHK Munich NIS2 Hub (Bot-friendly & Stable)
    selbsttest: "https://www.ihk-muenchen.de/de/Service/Recht-und-Steuern/Digitalisierung/nis2-richtlinie/",
    gesetz: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32022L2555", // EU Lex (Always stable)
  },
  gobd: {
    // GoBD Checklist from IHK Munich (Very stable)
    checkliste: "https://www.ihk-muenchen.de/de/Service/Recht-und-Steuern/Steuerrecht/Buchf%C3%BChrung-Bilanzierung/GoBD/", 
    eRechnung: "https://www.e-rechnung-bund.de/",
  },
} as const;
