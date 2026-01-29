/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { EXTERNAL_LINKS } from "../config/links";

export type QuestionOption = {
  value: string;
  label: string;
  icon?: any;
  color?: string;
  // Trigger build
};

export type Question = {
  id: string;
  category: string;
  title: string;
  type: "radio" | "select" | "multiselect";
  options: QuestionOption[];
  helpText?: string;
  condition?: (formData: any) => boolean;
  rechtsgrundlage?: string;
  deadline?: string;
  warning?: string;
  infoCard?: {
    title: string;
    content: string;
    links?: { text: string; url: string }[];
  };
};

export const questions: Question[] = [
  {
    id: "rolle",
    category: "Basis",
    title: "In welcher Rolle agieren Sie hauptsächlich?",
    type: "radio",
    options: [
      {
        value: "verantwortlicher",
        label: "Verantwortlicher (Unternehmen, Selbstständiger)",
        icon: CheckCircle,
        color: "text-blue-600",
      },
      {
        value: "auftragsverarbeiter",
        label: "Auftragsverarbeiter (Dienstleister für andere)",
        icon: CheckCircle,
        color: "text-purple-600",
      },
      {
        value: "beides",
        label: "Beides",
        icon: AlertCircle,
        color: "text-yellow-600",
      },
    ],
    helpText: "Verantwortlicher entscheidet über Zweck & Mittel (z.B. Online-Shop). AV verarbeitet nur im Auftrag (z.B. Cloud-Hoster).",
  },
  {
    id: "vvt",
    category: "Doku",
    title: "Haben Sie ein aktuelles Verzeichnis von Verarbeitungstätigkeiten (VVT)?",
    type: "radio",
    options: [
      {
        value: "ja",
        label: "Ja, vollständig & aktuell",
        icon: CheckCircle,
        color: "text-green-600",
      },
      {
        value: "alt",
        label: "Ja, aber veraltet",
        icon: AlertCircle,
        color: "text-yellow-600",
      },
      {
        value: "nein",
        label: "Nein, nicht vorhanden",
        icon: XCircle,
        color: "text-red-600",
      },
      {
        value: "unsicher",
        label: "Weiß nicht / Unsicher",
        icon: AlertCircle,
        color: "text-yellow-600",
      },
    ],
    helpText: "Pflicht für fast alle Unternehmen! Muss alle Prozesse enthalten (HR, Vertrieb, Marketing...).",
    rechtsgrundlage: "Art. 30 DSGVO",
    infoCard: {
      title: "📋 VVT - Das Herzstück der Compliance",
      content:
        "Das Verzeichnis von Verarbeitungstätigkeiten (VVT) ist die Basis für Datenschutz. Es muss enthalten: Zwecke der Verarbeitung, Datenkategorien, Empfänger, Fristen für Löschung, technische Maßnahmen. Fehlt es, drohen Bußgelder!",
      links: [
        {
          text: "Muster für VVT (Bitkom)",
          url: EXTERNAL_LINKS.vvt.muster,
        },
      ],
    },
  },
  {
    id: "avv",
    category: "Dienstleister",
    title: "Haben Sie mit allen externen Dienstleistern (Cloud, Hoster, Tools) einen AV-Vertrag geschlossen?",
    type: "radio",
    options: [
      {
        value: "ja",
        label: "Ja, mit allen Dienstleistern",
        icon: CheckCircle,
        color: "text-green-600",
      },
      {
        value: "teilweise",
        label: "Teilweise, nicht mit allen",
        icon: AlertCircle,
        color: "text-yellow-600",
      },
      {
        value: "nein",
        label: "Nein, noch keine Verträge",
        icon: XCircle,
        color: "text-red-600",
      },
      {
        value: "keine_dienstleister",
        label: "Keine externen Dienstleister",
        icon: CheckCircle,
        color: "text-green-600",
      },
    ],
    helpText: "z.B. Google Workspace, Microsoft 365, Mailchimp, Stripe",
    rechtsgrundlage: "Art. 28 DSGVO",
    infoCard: {
      title: "📄 Was ist ein Auftragsverarbeitungsvertrag (AVV)?",
      content:
        "Ein AVV regelt, wie externe Dienstleister mit Ihren Kundendaten umgehen müssen. Pflicht bei ALLEN Dienstleistern, die Zugriff auf personenbezogene Daten haben! Beispiele: Cloud-Provider (Google, Microsoft, AWS), E-Mail-Dienste (Mailchimp), Zahlungsdienstleister (Stripe, PayPal), Webhosting (IONOS, Hetzner).",
      links: [
        {
          text: "AVV-Mustervertrag (Bitkom)",
          url: EXTERNAL_LINKS.avv.muster,
        },
        {
          text: "Checkliste: AVV-Pflicht prüfen",
          url: EXTERNAL_LINKS.avv.checkliste,
        },
      ],
    },
  },
  {
    id: "useCase",
    category: "KI-Nutzung",
    title: "Setzen Sie Künstliche Intelligenz (KI) in Ihrem Unternehmen ein?",
    type: "radio",
    options: [
      {
        value: "nein",
        label: "Nein, keine KI",
        icon: CheckCircle,
        color: "text-gray-600",
      },
      {
        value: "intern",
        label: "Ja, nur intern (z.B. ChatGPT für Texte)",
        icon: CheckCircle,
        color: "text-blue-600",
      },
      {
        value: "ki_system",
        label: "Ja, in eigenen Produkten/Services",
        icon: AlertCircle,
        color: "text-purple-600",
      },
    ],
    helpText: "Relevanz für EU AI Act: Interne Nutzung vs. KI-Systemanbieter.",
  },
  {
    id: "kiTyp",
    category: "EU-KI-Akt",
    title: "Welche Art von KI-System nutzen Sie?",
    type: "select",
    options: [
      { value: "keine", label: "Keine KI-Systeme" },
      {
        value: "chatgpt",
        label: "ChatGPT / Copilot / Claude (Standard-Tools)",
      },
      {
        value: "intern_lowrisk",
        label: "Interne KI für einfache Aufgaben (z.B. Textgenerierung)",
      },
      {
        value: "personalwesen",
        label: "KI im Personalwesen (Bewerbungsauswahl, Leistungsbewertung)",
      },
      {
        value: "kundenbewertung",
        label: "KI für Kundenbewertung (Kreditscoring, Risikobewertung)",
      },
      {
        value: "kritische_infrastruktur",
        label:
          "KI in kritischer Infrastruktur (Gesundheit, Energie, Verkehr)",
      },
      { value: "eigene_modelle", label: "Eigene KI-Modelle entwickelt" },
    ],
    helpText: "Wir bestimmen damit die Risikokategorie.",
    condition: (data) =>
      data.useCase === "ki_system" || data.useCase === "intern",
    infoCard: {
      title: "🤖 KI-Risikokategorien im EU-KI-Akt",
      content:
        "Minimales Risiko: ChatGPT, Copilot (Transparenzpflicht). Hochrisiko: KI im Personalwesen, Kreditscoring, Gesundheitswesen, Strafverfolgung. Verboten: Social Scoring, biometrische Echtzeit-Überwachung.",
      links: [
        {
          text: "KI-Risikokategorien (Bundesnetzagentur)",
          url: EXTERNAL_LINKS.ki.risikokategorien,
        },
        {
          text: "EU AI Act Volltext",
          url: EXTERNAL_LINKS.ki.euAct,
        },
      ],
    },
  },
  {
    id: "kiKompetenz",
    category: "EU-KI-Akt - Schulung",
    title:
      "Wurden alle Mitarbeiter, die mit KI arbeiten, geschult (technisch, rechtlich, ethisch)?",
    type: "radio",
    options: [
      {
        value: "ja",
        label: "Ja, alle geschult",
        icon: CheckCircle,
        color: "text-green-600",
      },
      {
        value: "teilweise",
        label: "Teilweise, läuft noch",
        icon: AlertCircle,
        color: "text-yellow-600",
      },
      {
        value: "nein",
        label: "Nein, noch nicht",
        icon: XCircle,
        color: "text-red-600",
      },
    ],
    helpText: "Pflicht ab 02.02.2025 – Details siehe unten.",
    rechtsgrundlage: "EU-KI-Akt (EU 2024/1689), Art. 4",
    deadline: "02.02.2025",
    condition: (data) =>
      data.useCase === "ki_system" || data.useCase === "intern",
    infoCard: {
      title: "🎓 KI-Kompetenz-Schulung ab 02.02.2025 PFLICHT!",
      content:
        "Ab 2. Februar 2025 müssen ALLE Mitarbeiter, die mit KI arbeiten, geschult sein. Inhalte: Technisch (Funktionsweise, Grenzen), Rechtlich (DSGVO, EU-KI-Akt), Ethisch (Bias, Diskriminierung). Umfang richtet sich nach Risiko: ChatGPT-Nutzer → Basis-Schulung (2-4h), Entwickler/Hochrisiko → Intensive Schulung (2-3 Tage).",
      links: [
        {
          text: "KI-Kompetenz Leitfaden (Bundesnetzagentur)",
          url: EXTERNAL_LINKS.ki.kompetenz,
        },
        {
          text: "Kostenlose KI-Schulung (IHK)",
          url: EXTERNAL_LINKS.ki.schulungIhk,
        },
      ],
    },
  },
  {
    id: "bfsgDigitalProdukt",
    category: "BFSG",
    title:
      "Bieten Sie digitale Produkte oder Dienstleistungen an (Software, Apps, Webshops)?",
    type: "radio",
    options: [
      { value: "ja", label: "Ja", icon: CheckCircle, color: "text-blue-600" },
      { value: "nein", label: "Nein", icon: XCircle, color: "text-gray-600" },
    ],
    helpText: "Software/Apps sind IMMER betroffen!",
    warning:
      "⚠️ BFSG-Ausnahme gilt NICHT für Software/Apps - auch Kleinstunternehmen sind betroffen!",
    infoCard: {
      title: "♿ BFSG: Barrierefreiheit für digitale Produkte",
      content:
        "BFSG gilt ab 28.06.2025 für ALLE digitalen Produkte - unabhängig von Unternehmensgröße! Betroffen: Software, Apps, Webshops, E-Books, Online-Banking. Nicht betroffen: Reine Informationswebsites von Kleinstunternehmen.",
      links: [
        {
          text: "BFSG-Infos (IHK)",
          url: EXTERNAL_LINKS.bfsg.infosIhk,
        },
        {
          text: "WCAG 2.2 Checkliste",
          url: EXTERNAL_LINKS.bfsg.wcagChecklist,
        },
      ],
    },
  },
  {
    id: "bfsg",
    category: "BFSG - Barrierefreiheit",
    title:
      "Ist Ihre Software/App/Website für Menschen mit Behinderungen nutzbar (z.B. Tastatur-Navigation, Screen-Reader-kompatibel)?",
    type: "radio",
    options: [
      {
        value: "ja",
        label: "Ja, WCAG 2.2 AA erfüllt",
        icon: CheckCircle,
        color: "text-green-600",
      },
      {
        value: "teilweise",
        label: "Teilweise, in Arbeit",
        icon: AlertCircle,
        color: "text-yellow-600",
      },
      {
        value: "nein",
        label: "Nein, noch nicht",
        icon: XCircle,
        color: "text-red-600",
      },
      {
        value: "weiss_nicht",
        label: "Weiß nicht / unsicher",
        icon: AlertCircle,
        color: "text-yellow-600",
      },
    ],
    helpText:
      "Beispiele: Kontrastverhältnisse, Tastatur-Navigation, Alt-Texte für Bilder, Untertitel für Videos.",
    rechtsgrundlage: "BFSG, WCAG 2.2 AA",
    deadline: "28.06.2025",
    condition: (data) => data.bfsgDigitalProdukt === "ja",
    infoCard: {
      title: "📱 WCAG 2.2 AA - Was bedeutet das?",
      content:
        "WCAG = Web Content Accessibility Guidelines. Level AA = Standard für Barrierefreiheit. Hauptkriterien: Wahrnehmbar (Kontrast min. 4,5:1, Alt-Texte), Bedienbar (Tastatur-Navigation), Verständlich (klare Sprache), Robust (funktioniert mit Hilfstechnologien).",
      links: [
        {
          text: "WCAG 2.2 Quick Reference",
          url: EXTERNAL_LINKS.bfsg.wcagChecklist,
        },
        { text: "Kostenloser WCAG-Test", url: EXTERNAL_LINKS.bfsg.wcagTest },
      ],
    },
  },
  {
    id: "nis2",
    category: "NIS2",
    title:
      "Sind Sie in kritischen Sektoren tätig (Energie, Gesundheit, Verkehr, Finanzwesen) oder wichtiges Unternehmen mit >50 MA und >10M€ Umsatz?",
    type: "radio",
    options: [
      {
        value: "ja",
        label: "Ja, NIS2-pflichtig",
        icon: AlertCircle,
        color: "text-red-600",
      },
      {
        value: "nein",
        label: "Nein, nicht betroffen",
        icon: CheckCircle,
        color: "text-green-600",
      },
      {
        value: "weiss_nicht",
        label: "Weiß nicht / unsicher",
        icon: AlertCircle,
        color: "text-yellow-600",
      },
    ],
    helpText:
      "NIS2-Meldepflichten: 24h (Frühwarnung), 72h (Hauptmeldung), 30d (Abschlussmeldung).",
    rechtsgrundlage: "NIS2 (EU 2022/2555)",
    warning:
      "Sanktionen: Bis 20 Mio € ODER 4% Jahresumsatz + persönliche Haftung der Geschäftsführung!",
    infoCard: {
      title: "🚨 NIS2: Neue Cybersicherheitspflichten",
      content:
        "NIS2 betrifft: Kritische Sektoren (Energie, Gesundheit, Verkehr, Wasser, Finanzwesen, digitale Infrastruktur) ODER wichtige Unternehmen (>50 MA, >10M€ Umsatz). Pflichten: 24h Frühwarnung, 72h Hauptmeldung, 30d Abschlussmeldung, Risikomanagement, Lieferkettenprüfung.",
      links: [
        {
          text: "NIS2-Selbsttest (BSI)",
          url: EXTERNAL_LINKS.nis2.selbsttest,
        },
        {
          text: "NIS2-Umsetzungsgesetz (Entwurf)",
          url: EXTERNAL_LINKS.nis2.gesetz,
        },
      ],
    },
  },
  {
    id: "gobd",
    category: "GoBD",
    title:
      "Archivieren Sie Rechnungen, Belege und steuerrelevante E-Mails ordnungsgemäß für 8 Jahre (digital oder Papier)?",
    type: "radio",
    options: [
      {
        value: "ja",
        label: "Ja, GoBD-konform",
        icon: CheckCircle,
        color: "text-green-600",
      },
      {
        value: "teilweise",
        label: "Teilweise, noch Lücken",
        icon: AlertCircle,
        color: "text-yellow-600",
      },
      {
        value: "nein",
        label: "Nein, nicht konform",
        icon: XCircle,
        color: "text-red-600",
      },
      {
        value: "weiss_nicht",
        label: "Weiß nicht / unsicher",
        icon: AlertCircle,
        color: "text-yellow-600",
      },
    ],
    helpText:
      "Ab 01.01.2025 gilt für Buchungsbelege eine Frist von 8 Jahren (vorher 10 Jahre).",
    rechtsgrundlage: "GoBD (BMF 14.07.2025), HGB § 257, AO § 147",
    warning: "Neue Regelung ab 2025: 8 Jahre (statt 10) für Buchungsbelege!",
    infoCard: {
      title: "📦 GoBD: Ordnungsgemäße Aufbewahrung",
      content:
        "GoBD = Grundsätze zur ordnungsmäßigen Führung und Aufbewahrung von Büchern. Ab 2025: 8 Jahre für Buchungsbelege (Rechnungen, Belege), 10 Jahre für Handelsbücher. Digital ODER Papier erlaubt. Wichtig: Unveränderbarkeit, Nachvollziehbarkeit, Verfügbarkeit!",
      links: [
        {
          text: "GoBD-Checkliste (BMF)",
          url: EXTERNAL_LINKS.gobd.checkliste,
        },
        {
          text: "E-Rechnung ab 2025 Pflicht",
          url: EXTERNAL_LINKS.gobd.eRechnung,
        },
      ],
    },
  },
  {
    id: "mitarbeiterDatenschutz",
    category: "Mitarbeiter",
    title:
      "Wurden Ihre Mitarbeiter über die Datenverarbeitung informiert (was wird wie verarbeitet, welche Rechte haben sie)?",
    type: "radio",
    options: [
      {
        value: "ja",
        label: "Ja, vorhanden",
        icon: CheckCircle,
        color: "text-green-600",
      },
      { value: "nein", label: "Nein", icon: XCircle, color: "text-red-600" },
    ],
    helpText:
      "Mitarbeiter müssen VOR Nutzung informiert werden: Welche Daten, Zweck, Empfänger, Rechte.",
    rechtsgrundlage: "Art. 13/14 DSGVO",
  },
  {
    id: "mitarbeiterBetriebsvereinbarung",
    category: "Mitarbeiter",
    title: "Haben Sie eine Betriebsvereinbarung (bei Überwachungsbezug)?",
    type: "radio",
    options: [
      {
        value: "ja",
        label: "Ja",
        icon: CheckCircle,
        color: "text-green-600",
      },
      { value: "nein", label: "Nein", icon: XCircle, color: "text-red-600" },
      {
        value: "kein_betriebsrat",
        label: "Kein Betriebsrat vorhanden",
        icon: CheckCircle,
        color: "text-gray-600",
      },
    ],
    condition: (data) => data.useCase !== "nein" && data.rolle === "verantwortlicher",
    helpText: "Bei Videoüberwachung, GPS-Tracking oder KI-Leistungsüberwachung Pflicht!",
    rechtsgrundlage: "BetrVG § 87 Abs. 1 Nr. 6",
  },
  {
    id: "websiteCookie",
    category: "Website",
    title:
      "Haben Sie einen Cookie-Banner (Consent Tool) auf Ihrer Website, der Cookies erst NACH Einwilligung lädt?",
    type: "radio",
    options: [
      {
        value: "ja",
        label: "Ja, korrekt eingerichtet",
        icon: CheckCircle,
        color: "text-green-600",
      },
      {
        value: "nein",
        label: "Nein / Lädt sofort",
        icon: XCircle,
        color: "text-red-600",
      },
      {
        value: "keine_cookies",
        label: "Nutze keine Cookies/Tracking",
        icon: CheckCircle,
        color: "text-green-600",
      },
    ],
    helpText: "Nur 'technisch notwendige' Cookies dürfen ohne Einwilligung gesetzt werden.",
    rechtsgrundlage: "TTDSG § 25, DSGVO Art. 6 (1) a",
  },
  {
    id: "websiteImpressum",
    category: "Website",
    title: "Ist Ihr Impressum und Ihre Datenschutzerklärung aktuell und von jeder Seite mit 1 Klick erreichbar?",
    type: "radio",
    options: [
      {
        value: "ja",
        label: "Ja",
        icon: CheckCircle,
        color: "text-green-600",
      },
      { value: "nein", label: "Nein", icon: XCircle, color: "text-red-600" },
    ],
    helpText: "Muss 'leicht erkennbar, unmittelbar erreichbar und ständig verfügbar' sein.",
    rechtsgrundlage: "DDG § 5, DSGVO Art. 13",
  },
];
