'use client';

import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  HelpCircle,
  Info,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const DSGVOAmpelFormular = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [guidedMode, setGuidedMode] = useState(true);
  const [formData, setFormData] = useState({
    mitarbeiterAnzahl: null,
    useCase: "",
    vvt: null,
    dsfa: null,
    avv: null,
    kiRisikoklasse: null,
    kiKompetenz: null,
    bfsg: null,
    bfsgDigitalProdukt: null,
    nis2: null,
    gobd: null,
    mitarbeiterDatenschutz: null,
    mitarbeiterBetriebsvereinbarung: null,
    mitarbeiterKiSchulung: null,
    mitarbeiterNutzungsrichtlinie: null,
    name: "",
    email: "",
    firma: "",
  });

  const InfoCard = ({ title, children, links }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="mb-4 border border-blue-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 bg-blue-50 hover:bg-blue-100 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-900">{title}</span>
          </div>
          <ChevronRight
            className={`w-5 h-5 text-blue-600 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>
        {isExpanded && (
          <div className="p-4 bg-white">
            <div className="text-sm text-slate-700 mb-3">{children}</div>
            {links && links.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-600 uppercase">
                  Weiterführende Links:
                </p>
                {links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {link.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const questions = [
    {
      id: "mitarbeiterAnzahl",
      category: "Unternehmen",
      title: "Wie viele Mitarbeiter beschäftigt Ihr Unternehmen?",
      type: "select",
      options: [
        { value: "<10", label: "Weniger als 10 Mitarbeiter" },
        { value: "10-49", label: "10-49 Mitarbeiter" },
        { value: "50-249", label: "50-249 Mitarbeiter" },
        { value: "250+", label: "250 oder mehr Mitarbeiter" },
      ],
      helpText:
        "Diese Information hilft uns, gesetzliche Ausnahmeregelungen zu prüfen.",
      infoCard: {
        title: "Warum fragen wir das?",
        content:
          "Unternehmen mit weniger als 250 Mitarbeitern haben bei bestimmten Pflichten Ausnahmen. ABER: Diese Ausnahmen gelten NICHT bei digitalen Produkten oder regelmäßiger Datenverarbeitung!",
        links: [
          {
            text: "Artikel 30 Abs. 5 DSGVO",
            url: "https://www.datenschutz-grundverordnung.eu/grundverordnung/art-30-ds-gvo/",
          },
        ],
      },
    },
    {
      id: "useCase",
      category: "Anwendungsfall",
      title: "Welcher Anwendungsfall beschreibt Ihre Situation am besten?",
      type: "select",
      options: [
        {
          value: "ki_system",
          label: "KI-System im Unternehmen (z.B. ChatGPT, Copilot)",
        },
        {
          value: "verwaltung",
          label: "Digitale Verwaltungsleistung (z.B. Portal, Chatbot)",
        },
        { value: "ecommerce", label: "E-Commerce / Online-Shop" },
        { value: "intern", label: "Interne Prozesse" },
        { value: "sonstiges", label: "Sonstiges" },
      ],
      helpText:
        "Diese Auswahl passt die folgenden Fragen optimal an Ihre Situation an.",
    },
    {
      id: "vvt",
      category: "DSGVO - Dokumentation",
      title: guidedMode
        ? "Dokumentieren Sie systematisch, welche Kundendaten Sie erheben, wo Sie diese speichern und wofür Sie diese nutzen?"
        : "Haben Sie ein vollständiges Verzeichnis der Verarbeitungstätigkeiten gemäß Art. 30 DSGVO?",
      guidedTitle:
        "Dokumentieren Sie systematisch, welche Kundendaten Sie erheben, wo Sie diese speichern und wofür Sie diese nutzen?",
      expertTitle:
        "Haben Sie ein vollständiges Verzeichnis der Verarbeitungstätigkeiten gemäß Art. 30 DSGVO?",
      type: "radio",
      options: [
        {
          value: "ja",
          label: "Ja, vollständig dokumentiert",
          icon: CheckCircle,
          color: "text-green-600",
        },
        {
          value: "teilweise",
          label: "Teilweise, noch Lücken vorhanden",
          icon: AlertCircle,
          color: "text-yellow-600",
        },
        {
          value: "nein",
          label: "Nein, noch nicht systematisch",
          icon: XCircle,
          color: "text-red-600",
        },
      ],
      helpText: guidedMode
        ? "Beispiele: Liste aller Systeme (CRM, E-Mail, Cloud), welche Daten dort gespeichert werden, wie lange Sie diese aufbewahren."
        : "Das VVT ist Pflicht für alle Verantwortlichen und dokumentiert alle Datenverarbeitungen im Unternehmen.",
      rechtsgrundlage: "Art. 30 DSGVO",
      infoCard: {
        title: "📋 Was ist ein Verzeichnis der Verarbeitungstätigkeiten (VVT)?",
        content:
          "Ein VVT ist eine Übersicht ALLER Prozesse, bei denen personenbezogene Daten verarbeitet werden. Beispiele: Kundenverwaltung, E-Mail-Marketing, Bewerbermanagement, Gehaltsabrechnung. Für jeden Prozess müssen Sie dokumentieren: WELCHE Daten, WOZU, WO gespeichert, WIE LANGE aufbewahrt.",
        links: [
          {
            text: "Offizielle VVT-Mustervorlage (LDI NRW)",
            url: "https://www.ldi.nrw.de/datenschutz/verwaltung/verarbeitungsverzeichnis-nach-artikel-30-ds-gvo",
          },
          {
            text: "Video-Anleitung: VVT in 10 Minuten",
            url: "https://www.youtube.com/watch?v=example",
          },
          {
            text: "Kostenlose Excel-Vorlage",
            url: "https://emodeon.de/kostenlose-vorlage-fuer-das-verzeichnis-von-verarbeitungstaetigkeiten-vvt/",
          },
        ],
      },
    },
    {
      id: "dsfa",
      category: "DSGVO - Risikobewertung",
      title: guidedMode
        ? "Nutzen Sie KI oder andere Systeme, die automatisch Entscheidungen über Personen treffen (z.B. Kreditvergabe, Bewerbungsauswahl)?"
        : "Wurde eine Datenschutz-Folgenabschätzung (DSFA) gemäß Art. 35 DSGVO durchgeführt?",
      guidedTitle:
        "Nutzen Sie KI oder andere Systeme, die automatisch Entscheidungen über Personen treffen?",
      expertTitle:
        "Wurde eine Datenschutz-Folgenabschätzung (DSFA) gemäß Art. 35 DSGVO durchgeführt?",
      type: "radio",
      options: [
        {
          value: "ja",
          label: "Ja, DSFA wurde durchgeführt",
          icon: CheckCircle,
          color: "text-green-600",
        },
        {
          value: "nein",
          label: "Nein, aber geplant",
          icon: XCircle,
          color: "text-yellow-600",
        },
        {
          value: "nicht_erforderlich",
          label: "Nicht erforderlich (kein Hochrisiko)",
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
      helpText: guidedMode
        ? "DSFA ist erforderlich bei: KI-Systemen mit personenbezogenen Daten, Videoüberwachung, Profiling, Gesundheitsdaten, großflächiger Datenerhebung."
        : "DSFA ist erforderlich bei hohem Risiko für Betroffene (z.B. Profiling, automatisierte Entscheidungen, KI-Systeme).",
      rechtsgrundlage: "Art. 35 DSGVO",
      warning: guidedMode
        ? "⚠️ Bei KI-Systemen mit personenbezogenen Daten ist eine DSFA fast immer erforderlich!"
        : null,
      infoCard: {
        title: "🔍 Was ist eine Datenschutz-Folgenabschätzung (DSFA)?",
        content:
          "Eine DSFA prüft, ob eine Datenverarbeitung ein hohes Risiko für Personen darstellt. Sie ist Pflicht bei: Automatisierten Entscheidungen (KI), Profiling, Videoüberwachung, Verarbeitung besonderer Datenkategorien (Gesundheit, Religion, etc.). Die DSFA beschreibt: Zweck, Risiken, Schutzmaßnahmen.",
        links: [
          {
            text: "DSFA-Prüfliste (LDI NRW)",
            url: "https://www.ldi.nrw.de/datenschutz/datenschutz-folgenabschaetzung",
          },
          {
            text: "Standard-Datenschutzmodell (SDM)",
            url: "https://www.datenschutzzentrum.de/sdm/",
          },
        ],
      },
    },
    {
      id: "avv",
      category: "DSGVO - Auftragsverarbeitung",
      title: guidedMode
        ? "Nutzen Sie externe Dienstleister für Cloud-Speicherung, E-Mail-Versand oder Webhosting? Falls ja: Haben Sie mit ALLEN Verträge abgeschlossen?"
        : "Haben Sie mit allen Auftragsverarbeitern (z.B. Cloud-Anbieter, Hosting) einen AVV gemäß Art. 28 DSGVO abgeschlossen?",
      guidedTitle:
        "Nutzen Sie externe Dienstleister? Falls ja: Haben Sie mit ALLEN Verträge abgeschlossen?",
      expertTitle:
        "Haben Sie mit allen Auftragsverarbeitern einen AVV gemäß Art. 28 DSGVO abgeschlossen?",
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
      helpText:
        "Beispiele: Google Workspace, Microsoft 365, IONOS, AWS, Mailchimp, Zoom, Stripe.",
      rechtsgrundlage: "Art. 28 DSGVO",
      infoCard: {
        title: "📄 Was ist ein Auftragsverarbeitungsvertrag (AVV)?",
        content:
          "Ein AVV regelt, wie externe Dienstleister mit Ihren Kundendaten umgehen müssen. Pflicht bei ALLEN Dienstleistern, die Zugriff auf personenbezogene Daten haben! Beispiele: Cloud-Provider (Google, Microsoft, AWS), E-Mail-Dienste (Mailchimp), Zahlungsdienstleister (Stripe, PayPal), Webhosting (IONOS, Hetzner).",
        links: [
          {
            text: "AVV-Mustervertrag (Bitkom)",
            url: "https://www.bitkom.org/Themen/Datenschutz-Sicherheit/Datenschutz/Auftragsverarbeitung.html",
          },
          {
            text: "Checkliste: AVV-Pflicht prüfen",
            url: "https://www.datenschutz.org/auftragsverarbeitung/",
          },
        ],
      },
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
      helpText:
        "Dies hilft uns, die richtige Risikokategorie und Schulungspflicht zu bestimmen.",
      condition: (data) =>
        data.useCase === "ki_system" || data.useCase === "intern",
      infoCard: {
        title: "🤖 KI-Risikokategorien im EU-KI-Akt",
        content:
          "Minimales Risiko: ChatGPT, Copilot (Transparenzpflicht). Hochrisiko: KI im Personalwesen, Kreditscoring, Gesundheitswesen, Strafverfolgung. Verboten: Social Scoring, biometrische Echtzeit-Überwachung.",
        links: [
          {
            text: "KI-Risikokategorien (Bundesnetzagentur)",
            url: "https://www.bundesnetzagentur.de/DE/Beschlusskammern/Beschlusskammer1/KI/start.html",
          },
          {
            text: "EU AI Act Volltext",
            url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R1689",
          },
        ],
      },
    },
    {
      id: "kiKompetenz",
      category: "EU-KI-Akt - Schulung",
      title: guidedMode
        ? "Wurden alle Mitarbeiter, die mit KI arbeiten, geschult (technisch, rechtlich, ethisch)?"
        : "Haben Sie KI-Kompetenz-Schulungen für Mitarbeiter gemäß EU-KI-Akt durchgeführt?",
      guidedTitle: "Wurden alle Mitarbeiter, die mit KI arbeiten, geschult?",
      expertTitle:
        "Haben Sie KI-Kompetenz-Schulungen gemäß Art. 4 EU-KI-Akt durchgeführt?",
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
      helpText:
        "Schulung muss technische, rechtliche UND ethische Aspekte abdecken. Jährliche Auffrischung erforderlich!",
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
            url: "https://www.bundesnetzagentur.de/DE/Beschlusskammern/Beschlusskammer1/KI/KI-Kompetenz.html",
          },
          {
            text: "Kostenlose KI-Schulung (IHK)",
            url: "https://www.ihk.de/rhein-neckar/ausbildung-weiterbildung/weiterbildung-channel/eu-ai-act-artikel-4-6434562",
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
      helpText:
        "Wichtig: Die Kleinstunternehmen-Ausnahme gilt NICHT für digitale Produkte!",
      warning:
        "⚠️ BFSG-Ausnahme gilt NICHT für Software/Apps - auch Kleinstunternehmen sind betroffen!",
      infoCard: {
        title: "♿ BFSG: Barrierefreiheit für digitale Produkte",
        content:
          "BFSG gilt ab 28.06.2025 für ALLE digitalen Produkte - unabhängig von Unternehmensgröße! Betroffen: Software, Apps, Webshops, E-Books, Online-Banking. Nicht betroffen: Reine Informationswebsites von Kleinstunternehmen.",
        links: [
          {
            text: "BFSG-Infos (IHK)",
            url: "https://www.ihk.de/rhein-neckar/recht/barrierefreiheitsstaerkungsgesetz-bfsg-5209948",
          },
          {
            text: "WCAG 2.2 Checkliste",
            url: "https://www.w3.org/WAI/WCAG22/quickref/",
          },
        ],
      },
    },
    {
      id: "bfsg",
      category: "BFSG - Barrierefreiheit",
      title: guidedMode
        ? "Ist Ihre Software/App/Website für Menschen mit Behinderungen nutzbar (z.B. Tastatur-Navigation, Screen-Reader-kompatibel)?"
        : "Erfüllt Ihr digitales Produkt die Anforderungen der Barrierefreiheit gemäß BFSG (WCAG 2.2 AA)?",
      guidedTitle:
        "Ist Ihre Software/App/Website für Menschen mit Behinderungen nutzbar?",
      expertTitle: "Erfüllt Ihr digitales Produkt WCAG 2.2 AA?",
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
          label: "Weiß nicht / nicht geprüft",
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
            url: "https://www.w3.org/WAI/WCAG22/quickref/",
          },
          { text: "Kostenloser WCAG-Test", url: "https://wave.webaim.org/" },
        ],
      },
    },
    {
      id: "nis2",
      category: "NIS2",
      title: guidedMode
        ? "Sind Sie in kritischen Sektoren tätig (Energie, Gesundheit, Verkehr, Finanzwesen) oder wichtiges Unternehmen mit >50 MA und >10M€ Umsatz?"
        : "Sind Sie verpflichtet, Sicherheitsvorfälle gemäß NIS2 zu melden?",
      guidedTitle:
        "Sind Sie in kritischen Sektoren tätig oder wichtiges Unternehmen?",
      expertTitle: "NIS2-Meldepflicht: Sind Sie verpflichtet?",
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
            url: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/NIS2/nis2_node.html",
          },
          {
            text: "NIS2-Umsetzungsgesetz (Entwurf)",
            url: "https://www.bmi.bund.de/DE/themen/it-und-digitalpolitik/nis2/nis2-node.html",
          },
        ],
      },
    },
    {
      id: "gobd",
      category: "GoBD",
      title: guidedMode
        ? "Archivieren Sie Rechnungen, Belege und steuerrelevante E-Mails ordnungsgemäß für 8 Jahre (digital oder Papier)?"
        : "Erfüllen Sie die Aufbewahrungsfristen gemäß GoBD (8 Jahre für Buchungsbelege ab 01.01.2025)?",
      guidedTitle:
        "Archivieren Sie Rechnungen & Belege ordnungsgemäß für 8 Jahre?",
      expertTitle: "GoBD-konforme Aufbewahrung (8 Jahre ab 2025)?",
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
            url: "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2019-11-28-GoBD.html",
          },
          {
            text: "E-Rechnung ab 2025 Pflicht",
            url: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Steuern/e-rechnung.html",
          },
        ],
      },
    },
    {
      id: "mitarbeiterDatenschutz",
      category: "Mitarbeiter",
      title: guidedMode
        ? "Wurden Ihre Mitarbeiter über die Datenverarbeitung informiert (was wird wie verarbeitet, welche Rechte haben sie)?"
        : "Haben Sie eine Datenschutzerklärung für Mitarbeiter gemäß Art. 13/14 DSGVO erstellt?",
      guidedTitle: "Wurden Mitarbeiter über Datenverarbeitung informiert?",
      expertTitle: "Datenschutzerklärung für Mitarbeiter vorhanden?",
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
          value: "nicht_erforderlich",
          label: "Nicht erforderlich",
          icon: CheckCircle,
          color: "text-green-600",
        },
      ],
      helpText:
        "Erforderlich bei: Logging, Monitoring, automatisierten Entscheidungen über Mitarbeiter.",
      rechtsgrundlage: "BetrVG § 87 Abs. 1 Nr. 6",
    },
    {
      id: "name",
      category: "Kontakt",
      title: "Ihr Name (optional)",
      type: "text",
      helpText: "Für einen personalisierten Report",
    },
    {
      id: "email",
      category: "Kontakt",
      title: "Ihre E-Mail-Adresse (optional)",
      type: "email",
      helpText: "Für den Report-Download. Wird nicht gespeichert.",
    },
    {
      id: "firma",
      category: "Kontakt",
      title: "Ihre Firma oder Organisation (optional)",
      type: "text",
      helpText: "Optional",
    },
  ];

  const getFilteredQuestions = () => {
    return questions.filter((q) => {
      if (!q.condition) return true;
      return q.condition(formData);
    });
  };

  const filteredQuestions = getFilteredQuestions();
  const progress = ((currentStep + 1) / filteredQuestions.length) * 100;

  const calculateAmpel = () => {
    const results = {
      dsgvo: { status: "green", issues: [], details: [] },
      euKiAkt: { status: "green", issues: [], details: [] },
      bfsg: { status: "green", issues: [], details: [] },
      nis2: { status: "green", issues: [], details: [] },
      gobd: { status: "green", issues: [], details: [] },
      mitarbeiter: { status: "green", issues: [], details: [] },
    };

    // DSGVO
    if (formData.vvt === "nein") {
      results.dsgvo.status = "red";
      results.dsgvo.issues.push("VVT fehlt");
      results.dsgvo.details.push(
        "Verzeichnis der Verarbeitungstätigkeiten ist Pflicht für alle Unternehmen, die personenbezogene Daten verarbeiten."
      );
    } else if (formData.vvt === "teilweise") {
      results.dsgvo.status = results.dsgvo.status === "red" ? "red" : "yellow";
      results.dsgvo.issues.push("VVT unvollständig");
      results.dsgvo.details.push(
        "VVT muss ALLE Verarbeitungstätigkeiten dokumentieren. Lücken schließen!"
      );
    }

    if (formData.avv === "nein" || formData.avv === "teilweise") {
      results.dsgvo.status = results.dsgvo.status === "red" ? "red" : "yellow";
      results.dsgvo.issues.push(
        formData.avv === "nein" ? "AVV fehlt" : "AVV unvollständig"
      );
      results.dsgvo.details.push(
        "Auftragsverarbeitungsverträge mit ALLEN externen Dienstleistern abschließen."
      );
    }

    if (formData.dsfa === "nein" || formData.dsfa === "weiss_nicht") {
      results.dsgvo.status = results.dsgvo.status === "red" ? "red" : "yellow";
      results.dsgvo.issues.push("DSFA prüfen");
      results.dsgvo.details.push(
        "Bei KI-Systemen und automatisierten Entscheidungen ist eine DSFA oft erforderlich."
      );
    }

    // EU-KI-Akt
    if (formData.kiKompetenz === "nein") {
      results.euKiAkt.status = "red";
      results.euKiAkt.issues.push("KI-Schulung fehlt");
      results.euKiAkt.details.push(
        "Ab 02.02.2025 Pflicht: Alle Mitarbeiter, die mit KI arbeiten, müssen geschult sein!"
      );
    } else if (formData.kiKompetenz === "teilweise") {
      results.euKiAkt.status = "yellow";
      results.euKiAkt.issues.push("KI-Schulung unvollständig");
      results.euKiAkt.details.push(
        "Alle betroffenen Mitarbeiter schulen und jährlich auffrischen."
      );
    }

    // BFSG
    if (formData.bfsgDigitalProdukt === "ja") {
      if (formData.bfsg === "nein") {
        results.bfsg.status = "red";
        results.bfsg.issues.push("Barrierefreiheit fehlt");
        results.bfsg.details.push(
          "WCAG 2.2 AA ist Pflicht für digitale Produkte - auch für Kleinstunternehmen!"
        );
      } else if (
        formData.bfsg === "weiss_nicht" ||
        formData.bfsg === "teilweise"
      ) {
        results.bfsg.status = "yellow";
        results.bfsg.issues.push("Barrierefreiheit prüfen");
        results.bfsg.details.push(
          "WCAG 2.2 AA-Test durchführen und Lücken schließen bis 28.06.2025."
        );
      }
    }

    // NIS2
    if (formData.nis2 === "weiss_nicht") {
      results.nis2.status = "yellow";
      results.nis2.issues.push("NIS2-Relevanz prüfen");
      results.nis2.details.push(
        "Prüfen Sie, ob Sie unter NIS2 fallen (kritische Sektoren, >50 MA, >10M€)."
      );
    } else if (formData.nis2 === "ja") {
      results.nis2.status = "yellow";
      results.nis2.issues.push("NIS2-Maßnahmen umsetzen");
      results.nis2.details.push(
        "Meldeprozesse (24h/72h/30d), Risikomanagement und Lieferkettenprüfung einrichten."
      );
    }

    // GoBD
    if (formData.gobd === "nein") {
      results.gobd.status = "red";
      results.gobd.issues.push("Aufbewahrung fehlt");
      results.gobd.details.push(
        "GoBD-konforme Archivierung (8 Jahre) ist Pflicht!"
      );
    } else if (
      formData.gobd === "weiss_nicht" ||
      formData.gobd === "teilweise"
    ) {
      results.gobd.status = "yellow";
      results.gobd.issues.push("Aufbewahrung prüfen");
      results.gobd.details.push(
        "Prüfen Sie, ob alle Belege ordnungsgemäß archiviert werden (8 Jahre ab 2025)."
      );
    }

    // Mitarbeiter
    if (formData.mitarbeiterDatenschutz === "nein") {
      results.mitarbeiter.status = "red";
      results.mitarbeiter.issues.push("Datenschutz-Info fehlt");
      results.mitarbeiter.details.push(
        "Mitarbeiter müssen VOR Nutzung über Datenverarbeitung informiert werden."
      );
    }

    // Gesamt-Status
    const allStatuses = Object.values(results).map((r) => r.status);
    const redCount = allStatuses.filter((s) => s === "red").length;
    const yellowCount = allStatuses.filter((s) => s === "yellow").length;

    let gesamtStatus = "green";
    if (redCount >= 2) gesamtStatus = "red";
    else if (redCount === 1 || yellowCount >= 1) gesamtStatus = "yellow";

    return { ...results, gesamt: gesamtStatus };
  };

  const getTopTodos = () => {
    const todos = [];

    // DSGVO
    if (formData.vvt === "nein") {
      todos.push({
        priority: "red",
        title: "VVT erstellen (Art. 30 DSGVO)",
        description: "Dokumentieren Sie ALLE Datenverarbeitungen systematisch",
        deadline: "Sofort",
        link: "https://www.ldi.nrw.de/datenschutz/verwaltung/verarbeitungsverzeichnis-nach-artikel-30-ds-gvo",
      });
    }
    if (formData.avv !== "ja" && formData.avv !== "keine_dienstleister") {
      todos.push({
        priority: "red",
        title: "AVV abschließen (Art. 28 DSGVO)",
        description: "Verträge mit ALLEN externen Dienstleistern",
        deadline: "Sofort",
        link: "https://www.bitkom.org/Themen/Datenschutz-Sicherheit/Datenschutz/Auftragsverarbeitung.html",
      });
    }

    // EU-KI-Akt
    if (formData.kiKompetenz === "nein") {
      todos.push({
        priority: "red",
        title: "KI-Kompetenz-Schulung durchführen (Art. 4 EU-KI-Akt)",
        description: "Alle Mitarbeiter schulen: technisch, rechtlich, ethisch",
        deadline: "Bis 02.02.2025",
        link: "https://www.bundesnetzagentur.de/DE/Beschlusskammern/Beschlusskammer1/KI/KI-Kompetenz.html",
      });
    }

    // BFSG
    if (formData.bfsgDigitalProdukt === "ja" && formData.bfsg === "nein") {
      todos.push({
        priority: "red",
        title: "WCAG 2.2 AA umsetzen (BFSG)",
        description: "Barrierefreiheit für digitale Produkte ist Pflicht!",
        deadline: "Bis 28.06.2025",
        link: "https://www.w3.org/WAI/WCAG22/quickref/",
      });
    }

    // Mitarbeiter
    if (formData.mitarbeiterDatenschutz === "nein") {
      todos.push({
        priority: "red",
        title: "Datenschutzerklärung für Mitarbeiter (Art. 13/14 DSGVO)",
        description: "Mitarbeiter VOR Nutzung informieren",
        deadline: "Sofort",
        link: "https://www.datenschutz.org/informationspflichten-mitarbeiter/",
      });
    }

    // Sortiere nach Priorität
    return todos
      .sort((a, b) => {
        const priorityOrder = { red: 0, yellow: 1, green: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .slice(0, 5);
  };

  const handleNext = () => {
    if (currentStep < filteredQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (value) => {
    const currentQuestion = filteredQuestions[currentStep];
    setFormData({ ...formData, [currentQuestion.id]: value });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "green":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "yellow":
        return <AlertCircle className="w-6 h-6 text-yellow-600" />;
      case "red":
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return null;
    }
  };

  if (showResults) {
    const ampel = calculateAmpel();
    const todos = getTopTodos();

    return (
      <div className="min-h-screen bg-[var(--pa-bg)] p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Ihr Compliance-Status
              </h1>
              <p className="text-slate-600">Basierend auf Ihren Angaben</p>
            </div>

            {/* Gesamt-Status */}
            <div className="mb-8 pa-card">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Gesamt-Status
                  </h2>
                  <p className="text-slate-600">
                    {ampel.gesamt === "green" && "Vollständig compliant ✅"}
                    {ampel.gesamt === "yellow" &&
                      "Teilweise compliant - Nachbesserung nötig ⚠️"}
                    {ampel.gesamt === "red" &&
                      "Kritische Lücken - sofortige Maßnahmen ❌"}
                  </p>
                </div>
                <div
                  className={`w-16 h-16 rounded-full ${getStatusColor(
                    ampel.gesamt
                  )} flex items-center justify-center`}
                >
                  {getStatusIcon(ampel.gesamt)}
                </div>
              </div>
            </div>

            {/* Bereiche */}
            <div className="space-y-4 mb-8">
              {[
                { key: "dsgvo", label: "DSGVO" },
                { key: "euKiAkt", label: "EU-KI-Akt" },
                { key: "bfsg", label: "BFSG (Barrierefreiheit)" },
                { key: "nis2", label: "NIS2 (Meldepflichten)" },
                { key: "gobd", label: "GoBD (Aufbewahrung)" },
                { key: "mitarbeiter", label: "Mitarbeiter-Dokumentation" },
              ].map(({ key, label }) => (
                <div key={key} className="p-4 pa-card">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(ampel[key].status)}
                      <h3 className="font-semibold text-slate-900">{label}</h3>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        ampel[key].status
                      )}`}
                    />
                  </div>
                  {ampel[key].issues.length > 0 && (
                    <div className="ml-8 space-y-1">
                      {ampel[key].issues.map((issue, idx) => (
                        <p key={idx} className="text-sm text-slate-600">
                          • {issue}
                        </p>
                      ))}
                      {ampel[key].details.map((detail, idx) => (
                        <p key={idx} className="text-xs text-slate-500 italic">
                          {detail}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Top-Todos */}
            {todos.length > 0 && (
              <div className="mb-8 pa-card">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  Prioritäre Handlungsempfehlungen
                </h2>
                <ol className="space-y-4">
                  {todos.map((todo, index) => (
                    <li key={index} className="flex gap-3">
                      <span
                        className={`font-bold ${
                          todo.priority === "red"
                            ? "text-red-600"
                            : "text-yellow-600"
                        } min-w-[24px]`}
                      >
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 mb-1">
                          {todo.title}
                        </p>
                        <p className="text-sm text-slate-600 mb-1">
                          {todo.priority === "red" ? "🔴" : "🟡"}{" "}
                          {todo.description}
                        </p>
                        <p className="text-xs text-slate-500 mb-2">
                          ⏰ Deadline: {todo.deadline}
                        </p>
                        {todo.link && (
                          <a
                            href={todo.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Mehr erfahren
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => window.print()}
                className="pa-btn pa-btn-primary flex-1"
              >
                <Download className="w-5 h-5" />
                PDF-Report herunterladen
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(0);
                }}
                className="pa-btn pa-btn-secondary flex-1"
              >
                Neu starten
              </button>
            </div>

            {/* Upsell */}
            <div className="mt-8 pa-card">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Vollständige Compliance-Analyse gewünscht?
              </h3>
              <p className="text-slate-700 mb-4">
                Erhalten Sie Rechtsgrundlagen-Dokumente, prüffähiges VVT,
                DSFA-Vorprüfung und 30-Tage-Maßnahmenplan.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Starter</p>
                  <p className="text-2xl font-bold text-slate-900 mb-2">
                    €2.900
                  </p>
                  <a
                    href="https://promptarchitekt.de/starter"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Jetzt buchen →
                  </a>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Pro</p>
                  <p className="text-2xl font-bold text-slate-900 mb-2">
                    €8.900
                  </p>
                  <a
                    href="https://promptarchitekt.de/pro"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Jetzt buchen →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentStep];
  const currentValue = formData[currentQuestion.id];

  return (
    <div className="min-h-screen bg-[var(--pa-bg)] p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            DSGVO-Compliance Quickcheck
          </h1>
          <p className="text-slate-300 mb-4">Kontext.KI × PromptArchitekt</p>

          {/* Mode Toggle */}
          {currentStep === 0 && (
            <div className="inline-flex bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setGuidedMode(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  guidedMode
                    ? "bg-cyan-500 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Geführter Modus
              </button>
              <button
                onClick={() => setGuidedMode(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  !guidedMode
                    ? "bg-cyan-500 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Experten-Modus
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>
              Frage {currentStep + 1} von {filteredQuestions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-[var(--accent-cyan)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          {/* Category Badge */}
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            {currentQuestion.category}
          </div>

          {/* Question Title */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {guidedMode
              ? currentQuestion.guidedTitle || currentQuestion.title
              : currentQuestion.expertTitle || currentQuestion.title}
          </h2>

          {/* Info Card */}
          {currentQuestion.infoCard && (
            <InfoCard
              title={currentQuestion.infoCard.title}
              links={currentQuestion.infoCard.links}
            >
              {currentQuestion.infoCard.content}
            </InfoCard>
          )}

          {/* Question Input */}
          <div className="mb-6">
            {currentQuestion.type === "select" && (
              <select
                value={currentValue || ""}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full p-4 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              >
                <option value="">Bitte wählen...</option>
                {currentQuestion.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {currentQuestion.type === "radio" && (
              <div className="space-y-3">
                {currentQuestion.options.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleChange(opt.value)}
                      className={`w-full p-4 border-2 rounded-lg text-left transition-all flex items-center gap-3 ${
                        currentValue === opt.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {Icon && <Icon className={`w-5 h-5 ${opt.color}`} />}
                      <span className="font-medium text-slate-900">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {(currentQuestion.type === "text" ||
              currentQuestion.type === "email") && (
              <input
                type={currentQuestion.type}
                value={currentValue || ""}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full p-4 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                placeholder={currentQuestion.helpText}
              />
            )}
          </div>

          {/* Help Text */}
          {currentQuestion.helpText && (
            <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-700">
                  {currentQuestion.helpText}
                </p>
                {currentQuestion.rechtsgrundlage && (
                  <p className="text-xs text-slate-600 mt-1 font-mono">
                    📜 {currentQuestion.rechtsgrundlage}
                  </p>
                )}
                {currentQuestion.deadline && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">
                    ⏰ Deadline: {currentQuestion.deadline}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Warning */}
          {currentQuestion.warning && (
            <div className="flex gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800 font-medium">
                {currentQuestion.warning}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="pa-btn pa-btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Zurück
          </button>

          <button
            onClick={handleNext}
            disabled={!currentValue}
            className="pa-btn pa-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === filteredQuestions.length - 1
              ? "Ergebnis anzeigen"
              : "Weiter"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-400 text-sm">
          <p>
            Dieser Quickcheck dient als erste Einschätzung. Keine
            Rechtsberatung.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DSGVOAmpelFormular;
