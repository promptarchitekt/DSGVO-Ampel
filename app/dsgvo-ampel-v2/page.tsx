'use client';

import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";

const DSGVOAmpelFormularV2 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
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

  // Fragen-Definition (aus V1 übernommen, später in Config auslagern)
  const questions = [
    {
      id: "mitarbeiterAnzahl",
      category: "Unternehmen",
      block: "context",
      title: "Wie viele Mitarbeiter beschäftigt Ihr Unternehmen?",
      type: "radio",
      options: [
        { value: "<10", label: "Weniger als 10 Mitarbeiter" },
        { value: "10-49", label: "10-49 Mitarbeiter" },
        { value: "50-249", label: "50-249 Mitarbeiter" },
        { value: "250+", label: "250 oder mehr Mitarbeiter" },
      ],
      helpText:
        "Diese Information hilft uns, gesetzliche Ausnahmeregelungen zu prüfen.",
    },
    {
      id: "useCase",
      category: "Anwendungsfall",
      block: "context",
      title: "Welcher Anwendungsfall beschreibt Ihre Situation am besten?",
      type: "radio",
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
      block: "dsgvo",
      title:
        "Dokumentieren Sie systematisch, welche personenbezogenen Daten Sie verarbeiten, wo Sie diese speichern und wofür Sie diese nutzen (Verzeichnis der Verarbeitungstätigkeiten nach Art. 30 DSGVO)?",
      type: "radio",
      options: [
        {
          value: "ja",
          label: "Ja, vollständig dokumentiert",
          icon: CheckCircle,
        },
        {
          value: "teilweise",
          label: "Teilweise, noch Lücken vorhanden",
          icon: AlertCircle,
        },
        {
          value: "nein",
          label: "Nein, noch nicht systematisch",
          icon: XCircle,
        },
      ],
      helpText:
        "Beispiele: Liste aller Systeme (CRM, E-Mail, Cloud), welche Daten dort gespeichert werden, wie lange Sie diese aufbewahren.",
      rechtsgrundlage: "Art. 30 DSGVO",
    },
    {
      id: "dsfa",
      category: "DSGVO - Risikobewertung",
      block: "dsgvo",
      title:
        "Nutzen Sie KI oder andere Systeme, die automatisch Entscheidungen über Personen treffen (z.B. Kreditvergabe, Bewerbungsauswahl)?",
      type: "radio",
      options: [
        {
          value: "ja",
          label: "Ja, DSFA wurde durchgeführt",
          icon: CheckCircle,
        },
        {
          value: "nein",
          label: "Nein, aber geplant",
          icon: XCircle,
        },
        {
          value: "nicht_erforderlich",
          label: "Nicht erforderlich (kein Hochrisiko)",
          icon: CheckCircle,
        },
        {
          value: "weiss_nicht",
          label: "Weiß nicht / unsicher",
          icon: AlertCircle,
        },
      ],
      helpText:
        "DSFA ist erforderlich bei: KI-Systemen mit personenbezogenen Daten, Videoüberwachung, Profiling, Gesundheitsdaten, großflächiger Datenerhebung.",
      rechtsgrundlage: "Art. 35 DSGVO",
      warning:
        "⚠️ Bei KI-Systemen mit personenbezogenen Daten ist eine DSFA fast immer erforderlich!",
    },
    {
      id: "avv",
      category: "DSGVO - Auftragsverarbeitung",
      block: "dsgvo",
      title:
        "Nutzen Sie externe Dienstleister für Cloud-Speicherung, E-Mail-Versand oder Webhosting? Falls ja: Haben Sie mit ALLEN einen Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO abgeschlossen?",
      type: "radio",
      options: [
        {
          value: "ja",
          label: "Ja, mit allen Dienstleistern",
          icon: CheckCircle,
        },
        {
          value: "teilweise",
          label: "Teilweise, nicht mit allen",
          icon: AlertCircle,
        },
        {
          value: "nein",
          label: "Nein, noch keine Verträge",
          icon: XCircle,
        },
        {
          value: "keine_dienstleister",
          label: "Keine externen Dienstleister",
          icon: CheckCircle,
        },
      ],
      helpText:
        "Beispiele: Google Workspace, Microsoft 365, IONOS, AWS, Mailchimp, Zoom, Stripe.",
      rechtsgrundlage: "Art. 28 DSGVO",
    },
    {
      id: "kiTyp",
      category: "EU-KI-Akt",
      block: "ki",
      title: "Welche Art von KI-System nutzen Sie?",
      type: "radio",
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
    },
    {
      id: "kiKompetenz",
      category: "EU-KI-Akt - Schulung",
      block: "ki",
      title:
        "Wurden alle Mitarbeiter, die mit KI arbeiten, geschult (technisch, rechtlich, ethisch)?",
      type: "radio",
      options: [
        {
          value: "ja",
          label: "Ja, alle geschult",
          icon: CheckCircle,
        },
        {
          value: "teilweise",
          label: "Teilweise, läuft noch",
          icon: AlertCircle,
        },
        {
          value: "nein",
          label: "Nein, noch nicht",
          icon: XCircle,
        },
      ],
      helpText:
        "Schulung muss technische, rechtliche UND ethische Aspekte abdecken. Jährliche Auffrischung erforderlich!",
      rechtsgrundlage: "EU-KI-Akt (EU 2024/1689), Art. 4",
      deadline: "02.02.2025",
      condition: (data) =>
        data.useCase === "ki_system" || data.useCase === "intern",
    },
    {
      id: "bfsgDigitalProdukt",
      category: "BFSG",
      block: "bfsg",
      title:
        "Bieten Sie digitale Produkte oder Dienstleistungen an (Software, Apps, Webshops)?",
      type: "radio",
      options: [
        { value: "ja", label: "Ja", icon: CheckCircle },
        { value: "nein", label: "Nein", icon: XCircle },
      ],
      helpText:
        "Wichtig: Die Kleinstunternehmen-Ausnahme gilt NICHT für digitale Produkte!",
      warning:
        "⚠️ BFSG-Ausnahme gilt NICHT für Software/Apps - auch Kleinstunternehmen sind betroffen!",
    },
    {
      id: "bfsg",
      category: "BFSG - Barrierefreiheit",
      block: "bfsg",
      title:
        "Ist Ihre Software/App/Website für Menschen mit Behinderungen nutzbar (z.B. Tastatur-Navigation, Screen-Reader-kompatibel)?",
      type: "radio",
      options: [
        {
          value: "ja",
          label: "Ja, WCAG 2.2 AA erfüllt",
          icon: CheckCircle,
        },
        {
          value: "teilweise",
          label: "Teilweise, in Arbeit",
          icon: AlertCircle,
        },
        {
          value: "nein",
          label: "Nein, noch nicht",
          icon: XCircle,
        },
        {
          value: "weiss_nicht",
          label: "Weiß nicht / nicht geprüft",
          icon: AlertCircle,
        },
      ],
      helpText:
        "Beispiele: Kontrastverhältnisse, Tastatur-Navigation, Alt-Texte für Bilder, Untertitel für Videos.",
      rechtsgrundlage: "BFSG, WCAG 2.2 AA",
      deadline: "28.06.2025",
      condition: (data) => data.bfsgDigitalProdukt === "ja",
    },
    {
      id: "nis2",
      category: "NIS2",
      block: "nis2",
      title:
        "Sind Sie in kritischen Sektoren tätig (Energie, Gesundheit, Verkehr, Finanzwesen) oder wichtiges Unternehmen mit >50 MA und >10M€ Umsatz?",
      type: "radio",
      options: [
        {
          value: "ja",
          label: "Ja, NIS2-pflichtig",
          icon: AlertCircle,
        },
        {
          value: "nein",
          label: "Nein, nicht betroffen",
          icon: CheckCircle,
        },
        {
          value: "weiss_nicht",
          label: "Weiß nicht / unsicher",
          icon: AlertCircle,
        },
      ],
      helpText:
        "NIS2-Meldepflichten: 24h (Frühwarnung), 72h (Hauptmeldung), 30d (Abschlussmeldung).",
      rechtsgrundlage: "NIS2 (EU 2022/2555)",
      warning:
        "Sanktionen: Bis 20 Mio € ODER 4% Jahresumsatz + persönliche Haftung der Geschäftsführung!",
    },
    {
      id: "gobd",
      category: "GoBD",
      block: "gobd",
      title:
        "Archivieren Sie Rechnungen, Belege und steuerrelevante E-Mails ordnungsgemäß für 8 Jahre (digital oder Papier)?",
      type: "radio",
      options: [
        {
          value: "ja",
          label: "Ja, GoBD-konform",
          icon: CheckCircle,
        },
        {
          value: "teilweise",
          label: "Teilweise, noch Lücken",
          icon: AlertCircle,
        },
        {
          value: "nein",
          label: "Nein, nicht konform",
          icon: XCircle,
        },
        {
          value: "weiss_nicht",
          label: "Weiß nicht / unsicher",
          icon: AlertCircle,
        },
      ],
      helpText:
        "Ab 01.01.2025 gilt für Buchungsbelege eine Frist von 8 Jahren (vorher 10 Jahre).",
      rechtsgrundlage: "GoBD (BMF 14.07.2025), HGB § 257, AO § 147",
      warning: "Neue Regelung ab 2025: 8 Jahre (statt 10) für Buchungsbelege!",
    },
    {
      id: "mitarbeiterDatenschutz",
      category: "Mitarbeiter",
      block: "mitarbeiter",
      title:
        "Wurden Ihre Mitarbeiter über die Datenverarbeitung informiert (was wird wie verarbeitet, welche Rechte haben sie)?",
      type: "radio",
      options: [
        {
          value: "ja",
          label: "Ja, vorhanden",
          icon: CheckCircle,
        },
        { value: "nein", label: "Nein", icon: XCircle },
      ],
      helpText:
        "Mitarbeiter müssen VOR Nutzung informiert werden: Welche Daten, Zweck, Empfänger, Rechte.",
      rechtsgrundlage: "Art. 13/14 DSGVO",
    },
    {
      id: "mitarbeiterBetriebsvereinbarung",
      category: "Mitarbeiter",
      block: "mitarbeiter",
      title: "Haben Sie eine Betriebsvereinbarung (bei Überwachungsbezug)?",
      type: "radio",
      options: [
        {
          value: "ja",
          label: "Ja",
          icon: CheckCircle,
        },
        { value: "nein", label: "Nein", icon: XCircle },
        {
          value: "nicht_erforderlich",
          label: "Nicht erforderlich",
          icon: CheckCircle,
        },
      ],
      helpText:
        "Erforderlich bei: Logging, Monitoring, automatisierten Entscheidungen über Mitarbeiter.",
      rechtsgrundlage: "BetrVG § 87 Abs. 1 Nr. 6",
    },
    {
      id: "name",
      category: "Kontakt",
      block: "kontakt",
      title: "Ihr Name (optional)",
      type: "text",
      helpText: "Für einen personalisierten Report",
    },
    {
      id: "email",
      category: "Kontakt",
      block: "kontakt",
      title: "Ihre E-Mail-Adresse (optional)",
      type: "email",
      helpText: "Für den Report-Download. Wird nicht gespeichert.",
    },
    {
      id: "firma",
      category: "Kontakt",
      block: "kontakt",
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

  const currentQuestion = filteredQuestions[currentStep];
  const currentValue = currentQuestion ? formData[currentQuestion.id] : null;
  const isOptionalQuestion =
    currentQuestion &&
    (currentQuestion.id === "name" ||
      currentQuestion.id === "email" ||
      currentQuestion.id === "firma");

  // Ampel-Berechnung (aus V1 übernommen)
  const calculateAmpel = () => {
    const results = {
      dsgvo: { status: "green", issues: [], details: [] },
      euKiAkt: { status: "green", issues: [], details: [] },
      bfsg: { status: "green", issues: [], details: [] },
      nis2: { status: "green", issues: [], details: [] },
      gobd: { status: "green", issues: [], details: [] },
      mitarbeiter: { status: "green", issues: [], details: [] },
    };

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

    if (formData.mitarbeiterDatenschutz === "nein") {
      results.mitarbeiter.status = "red";
      results.mitarbeiter.issues.push("Datenschutz-Info fehlt");
      results.mitarbeiter.details.push(
        "Mitarbeiter müssen VOR Nutzung über Datenverarbeitung informiert werden."
      );
    }

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

    if (formData.kiKompetenz === "nein") {
      todos.push({
        priority: "red",
        title: "KI-Kompetenz-Schulung durchführen (Art. 4 EU-KI-Akt)",
        description: "Alle Mitarbeiter schulen: technisch, rechtlich, ethisch",
        deadline: "Bis 02.02.2025",
        link: "https://www.bundesnetzagentur.de/DE/Beschlusskammern/Beschlusskammer1/KI/KI-Kompetenz.html",
      });
    }

    if (formData.bfsgDigitalProdukt === "ja" && formData.bfsg === "nein") {
      todos.push({
        priority: "red",
        title: "WCAG 2.2 AA umsetzen (BFSG)",
        description: "Barrierefreiheit für digitale Produkte ist Pflicht!",
        deadline: "Bis 28.06.2025",
        link: "https://www.w3.org/WAI/WCAG22/quickref/",
      });
    }

    if (formData.mitarbeiterDatenschutz === "nein") {
      todos.push({
        priority: "red",
        title: "Datenschutzerklärung für Mitarbeiter (Art. 13/14 DSGVO)",
        description: "Mitarbeiter VOR Nutzung informieren",
        deadline: "Sofort",
        link: "https://www.datenschutz.org/informationspflichten-mitarbeiter/",
      });
    }

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
    const q = filteredQuestions[currentStep];
    if (!q) return;
    setFormData({ ...formData, [q.id]: value });
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

  const generatePDF = () => {
    const ampel = calculateAmpel();
    const todos = getTopTodos();
    const doc = new jsPDF();
    let yPos = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;

    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('DSGVO Compliance QuickCheck', margin, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    const dateStr = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    doc.text(`Erstellt am: ${dateStr}`, margin, yPos);
    yPos += 8;
    
    if (formData.name || formData.firma) {
      doc.setFontSize(10);
      doc.text(`Für: ${formData.firma || formData.name || 'Nicht angegeben'}`, margin, yPos);
      yPos += 6;
    }
    yPos += 5;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Executive Summary', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const gesamtStatusText = 
      ampel.gesamt === "green" ? "Vollständig compliant" :
      ampel.gesamt === "yellow" ? "Teilweise compliant - Nachbesserung nötig" :
      "Kritische Lücken - sofortige Maßnahmen erforderlich";
    
    type AmpelBereich = { status: string; issues: string[]; details: string[] };
    const redCount = Object.entries(ampel)
      .filter(([key]) => key !== "gesamt")
      .filter(([, value]) => (value as AmpelBereich).status === "red").length;
    const yellowCount = Object.entries(ampel)
      .filter(([key]) => key !== "gesamt")
      .filter(([, value]) => (value as AmpelBereich).status === "yellow").length;
    
    const summaryLines = doc.splitTextToSize(
      `${gesamtStatusText}. ${redCount > 0 ? `${redCount} kritische Bereiche` : ''} ${yellowCount > 0 ? `${yellowCount} Bereiche mit Handlungsbedarf` : ''}. ${todos.length > 0 ? `Top-Priorität: ${todos[0].title}` : 'Alle Bereiche sind compliant.'}`,
      maxWidth
    );
    doc.text(summaryLines, margin, yPos);
    yPos += summaryLines.length * 5 + 5;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Compliance-Status nach Bereichen', margin, yPos);
    yPos += 8;

    const bereiche = [
      { key: "dsgvo", label: "DSGVO" },
      { key: "euKiAkt", label: "EU-KI-Akt" },
      { key: "bfsg", label: "BFSG (Barrierefreiheit)" },
      { key: "nis2", label: "NIS2 (Meldepflichten)" },
      { key: "gobd", label: "GoBD (Aufbewahrung)" },
      { key: "mitarbeiter", label: "Mitarbeiter-Dokumentation" },
    ];

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    bereiche.forEach(({ key, label }) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      const status = ampel[key].status;
      const statusSymbol = status === "green" ? "✓" : status === "yellow" ? "⚠" : "✗";
      const statusText = status === "green" ? "Grün" : status === "yellow" ? "Gelb" : "Rot";
      
      doc.text(`${statusSymbol} ${label}: ${statusText}`, margin, yPos);
      yPos += 5;
      
      if (ampel[key].issues.length > 0) {
        ampel[key].issues.forEach((issue) => {
          const issueLines = doc.splitTextToSize(`  • ${issue}`, maxWidth - 10);
          doc.text(issueLines, margin + 5, yPos);
          yPos += issueLines.length * 4;
        });
        yPos += 2;
      }
    });

    if (todos.length > 0) {
      if (yPos > 220) {
        doc.addPage();
        yPos = 20;
      }
      
      yPos += 5;
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Prioritäre Handlungsempfehlungen', margin, yPos);
      yPos += 8;

      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      
      todos.forEach((todo, index) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFont(undefined, 'bold');
        doc.text(`${index + 1}. ${todo.title}`, margin, yPos);
        yPos += 5;
        
        doc.setFont(undefined, 'normal');
        const descLines = doc.splitTextToSize(todo.description, maxWidth);
        doc.text(descLines, margin + 5, yPos);
        yPos += descLines.length * 4;
        
        doc.setFontSize(9);
        doc.text(`Deadline: ${todo.deadline}`, margin + 5, yPos);
        yPos += 6;
      });
    }

    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont(undefined, 'italic');
      doc.text(
        'Dieser Quickcheck dient als erste Einschätzung. Keine Rechtsberatung.',
        margin,
        doc.internal.pageSize.getHeight() - 10
      );
      doc.text(
        `Seite ${i} von ${totalPages}`,
        pageWidth - margin - 20,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    const fileName = `DSGVO-Compliance-Report-${dateStr.replace(/\./g, '-')}.pdf`;
    doc.save(fileName);
  };

  // Keyboard-Navigation: ArrowLeft/Right + Enter (nur wenn Option gewählt)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (showResults) return;
      
      const target = event.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.tagName === "TEXTAREA");

      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (!(!currentValue && !isOptionalQuestion)) {
          if (currentStep < filteredQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
          } else {
            setShowResults(true);
          }
        }
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (currentStep > 0) {
          setCurrentStep(currentStep - 1);
        }
      } else if (event.key === "Enter" && !isInput) {
        event.preventDefault();
        // Enter nur wenn Option gewählt ODER optional
        if (!(!currentValue && !isOptionalQuestion)) {
          if (currentStep < filteredQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
          } else {
            setShowResults(true);
          }
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showResults, currentValue, isOptionalQuestion, currentStep, filteredQuestions.length]);

  if (showResults) {
    const ampel = calculateAmpel();
    const todos = getTopTodos();

    return (
      <div className="h-full w-full overflow-y-auto p-6">
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-[#12151b] rounded-2xl border border-white/10 p-10">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Ihr Compliance-Status
            </h2>
            <p className="text-white/60 mb-6">Basierend auf Ihren Angaben</p>

            <div className="mb-8 bg-[#0b0d10] rounded-lg border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Gesamt-Status
                  </h2>
                  <p className="text-white/70">
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

            <div className="space-y-4 mb-8">
              {[
                { key: "dsgvo", label: "DSGVO" },
                { key: "euKiAkt", label: "EU-KI-Akt" },
                { key: "bfsg", label: "BFSG (Barrierefreiheit)" },
                { key: "nis2", label: "NIS2 (Meldepflichten)" },
                { key: "gobd", label: "GoBD (Aufbewahrung)" },
                { key: "mitarbeiter", label: "Mitarbeiter-Dokumentation" },
              ].map(({ key, label }) => (
                <div key={key} className="p-4 bg-[#0b0d10] rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(ampel[key].status)}
                      <h3 className="font-semibold text-white">{label}</h3>
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
                        <p key={idx} className="text-sm text-white/70">
                          • {issue}
                        </p>
                      ))}
                      {ampel[key].details.map((detail, idx) => (
                        <p key={idx} className="text-xs text-white/50 italic">
                          {detail}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {todos.length > 0 && (
              <div className="mb-8 bg-[#0b0d10] rounded-lg border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-white/70" />
                  Prioritäre Handlungsempfehlungen
                </h2>
                <ol className="space-y-4">
                  {todos.map((todo, index) => (
                    <li key={index} className="flex gap-3">
                      <span
                        className={`font-bold ${
                          todo.priority === "red"
                            ? "text-red-400"
                            : "text-yellow-400"
                        } min-w-[24px]`}
                      >
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-white mb-1">
                          {todo.title}
                        </p>
                        <p className="text-sm text-white/70 mb-1">
                          {todo.priority === "red" ? "🔴" : "🟡"}{" "}
                          {todo.description}
                        </p>
                        <p className="text-xs text-white/50 mb-2">
                          ⏰ Deadline: {todo.deadline}
                        </p>
                        {todo.link && (
                          <a
                            href={todo.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
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

            <div className="flex gap-4">
              <button
                onClick={generatePDF}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-white/10 text-white text-sm font-medium transition hover:border-white/30 flex-1"
              >
                <Download className="w-5 h-5" />
                PDF-Report herunterladen
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(0);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-white/10 text-white text-sm font-medium transition hover:border-white/30 flex-1"
              >
                Neu starten
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Single-Card-Wizard Layout (V2) - Komplett fixes Grid ohne Bewegung
  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr_auto] gap-6 p-6 max-w-5xl mx-auto overflow-hidden">
      {/* Header: Fixer Titel + Progress (ändert sich NICHT pro Frage) */}
      <header className="flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50">
              DSGVO‑Ampel · Quickcheck
            </span>
            <h1 className="text-2xl font-semibold text-white leading-tight mt-1">
              Kurze Befragung zur Datenschutz‑ & KI‑Compliance
            </h1>
          </div>
          <div className="text-right text-xs text-white/50">
            <div>
              Frage {currentStep + 1} von {filteredQuestions.length}
            </div>
            <div className="mt-1">← / → oder Enter</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#0b0d10] rounded-full h-2 border border-white/10">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Body: Card mit FESTER Position - scrollt nur intern */}
      <section className="bg-[#12151b] rounded-2xl border border-white/10 p-10 overflow-y-auto min-h-0 h-full">
        {/* Kategorie + Frage-Überschrift */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-white/40">
            {currentQuestion.category}
          </span>
          <h2 className="text-xl font-semibold text-white leading-snug mt-1">
            {currentQuestion.title}
          </h2>
        </div>

        {currentQuestion.type === "radio" && (
          <div className="space-y-3">
            {currentQuestion.options.map((opt) => {
              const Icon = opt.icon;
              const selected = currentValue === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleChange(opt.value)}
                  className={`w-full p-4 border rounded-lg text-left transition-all flex items-center gap-3 ${
                    selected
                      ? "border-white/30 bg-white/5"
                      : "border-white/10 hover:border-white/20 bg-[#0b0d10]"
                  }`}
                >
                  {Icon && (
                    <Icon
                      className={`w-5 h-5 ${
                        selected ? "text-white" : "text-white/60"
                      }`}
                    />
                  )}
                  <span className={`font-medium ${
                    selected ? "text-white" : "text-white/70"
                  }`}>
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
            className="w-full bg-[#0b0d10] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-white/30 text-white"
            placeholder={currentQuestion.helpText}
          />
        )}

        {/* Kurz-Hilfe */}
        {currentQuestion.helpText && (
          <p className="mt-4 text-sm text-white/60 leading-relaxed">
            {currentQuestion.helpText}
          </p>
        )}

        {/* Warnung/Deadline falls vorhanden */}
        {currentQuestion.warning && (
          <div className="mt-4 rounded-lg border border-white/20 bg-white/5 p-3">
            <p className="text-xs text-white/70">{currentQuestion.warning}</p>
          </div>
        )}
        {currentQuestion.deadline && (
          <div className="mt-4 rounded-lg border border-white/20 bg-white/5 p-3">
            <p className="text-xs text-white/70">
              ⏰ Deadline: {currentQuestion.deadline}
            </p>
          </div>
        )}
      </section>

      {/* Footer: Navigation (fix unten) */}
      <footer className="flex items-center justify-between gap-4 flex-shrink-0">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-white/10 text-white text-sm font-medium transition hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Zurück
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!currentValue && !isOptionalQuestion}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-white/10 text-white text-sm font-medium transition hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === filteredQuestions.length - 1
                ? "Ergebnis anzeigen"
                : "Weiter"}
              <ChevronRight className="w-5 h-5" />
            </button>
      </footer>
    </div>
  );
};

export default DSGVOAmpelFormularV2;
