/* eslint-disable @typescript-eslint/no-explicit-any */
import { AmpelResult, Todo, AmpelBereich } from "../types";
import { EXTERNAL_LINKS } from "../config/links";

export const calculateAmpel = (formData: any): AmpelResult => {
    const results: any = {
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

    if (formData.kiRichtlinie === "nein") {
      results.euKiAkt.status = "red";
      results.euKiAkt.issues.push("KI-Richtlinie fehlt");
      results.euKiAkt.details.push(
        "Mitarbeiter benötigen schriftliche Regeln (Policy) zur KI-Nutzung, um Haftungsrisiken zu vermeiden."
      );
    }

    if (formData.kiDatenInput === "ja") {
      results.euKiAkt.status = "red";
      results.euKiAkt.issues.push("Datenabfluss-Risiko");
      results.euKiAkt.details.push(
        "Eingabe von Personendaten in 'offene' KI-Tools ist meist ein DSGVO-Verstoß! Verbot oder Enterprise-Lösung nötig."
      );
    } else if (formData.kiDatenInput === "unsicher") {
        results.euKiAkt.status = results.euKiAkt.status === "red" ? "red" : "yellow";
        results.euKiAkt.issues.push("Input-Verhalten prüfen");
        results.euKiAkt.details.push("Prüfen Sie dringend, welche Daten Ihre Mitarbeiter in KI-Tools eingeben.");
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
    const allStatuses = Object.values(results).map((r: any) => r.status);
    const redCount = allStatuses.filter((s) => s === "red").length;
    const yellowCount = allStatuses.filter((s) => s === "yellow").length;

    let gesamtStatus: "green" | "yellow" | "red" = "green";
    if (redCount >= 2) gesamtStatus = "red";
    else if (redCount === 1 || yellowCount >= 1) gesamtStatus = "yellow";
    
    // Type casting because we built it dynamically
    return { ...results, gesamt: gesamtStatus } as AmpelResult;
};

export const getTopTodos = (formData: any): Todo[] => {
    const todos: Todo[] = [];

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

    if (formData.kiRichtlinie === "nein") {
        todos.push({
            priority: "red",
            title: "KI-Richtlinie (Policy) erstellen",
            description: "Schriftliche Anweisung für Mitarbeiter zur sicheren KI-Nutzung",
            deadline: "Sofort",
        });
    }

    if (formData.kiDatenInput === "ja" || formData.kiDatenInput === "unsicher") {
        todos.push({
            priority: "red",
            title: "KI-Dateneingabe regeln (DLP)",
            description: "Verbot der Eingabe personenbezogener Daten in offene KI-Tools durchsetzen",
            deadline: "Sofort",
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
        link: EXTERNAL_LINKS.mitarbeiter.infos,
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
