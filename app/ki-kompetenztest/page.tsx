'use client';

import { useState } from 'react';
import { Award, CheckCircle, XCircle, Lock, Trophy, Brain, Zap, Target, Home, BookOpen, ExternalLink, AlertCircle } from 'lucide-react';

const KIKompetenzTest = () => {
  const [view, setView] = useState('menu'); // 'menu', 'question', 'levelComplete', 'learn'
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [levelScores, setLevelScores] = useState({ 1: [], 2: [], 3: [] });
  const [completedLevels, setCompletedLevels] = useState([]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const questions = {
    1: [
      {
        question: "Ihr Team möchte einen Chatbot für die Bürger-Hotline einsetzen. Nach EU AI Act: Was müsst ihr mindestens tun?",
        options: [
          "Nichts Besonderes - Chatbots sind unkritisch",
          "Nutzer darüber informieren, dass sie mit einer KI sprechen",
          "Eine vollständige Sicherheitsprüfung durchführen",
          "Das System ist verboten"
        ],
        correct: 1,
        explanation: "Chatbots fallen unter 'begrenztes Risiko' mit Transparenzpflicht. Nutzer müssen klar erkennen können, dass sie mit einer KI interagieren - nicht mit einem Menschen. Das schützt vor Täuschung und ermöglicht informierte Entscheidungen.",
        tip: "💡 Transparenz ist ein Grundprinzip: Menschen haben das Recht zu wissen, wann sie mit KI interagieren."
      },
      {
        question: "Eure Firma nutzt seit Jahren ein System, das Bewerbungen automatisch vorsortiert. Was ist ab August 2026 neu?",
        options: [
          "Solche Systeme sind jetzt komplett verboten",
          "Es gelten strenge Dokumentations- und Prüfpflichten",
          "Nur große Konzerne müssen sich darum kümmern",
          "Nichts - Bestandssysteme sind ausgenommen"
        ],
        correct: 1,
        explanation: "KI-Systeme im HR-Bereich gelten als 'Hochrisiko', weil sie Lebenschancen beeinflussen. Ab August 2026 braucht ihr: technische Dokumentation, Risikoanalyse, Qualitätsmanagement und regelmäßige Tests auf Fairness. Keine Ausnahme für Altsysteme!",
        tip: "⚖️ HR-KI ist Hochrisiko: Jobs und Karrieren stehen auf dem Spiel."
      },
      {
        question: "Ein KI-System zur Mitarbeiter-Überwachung soll messen, wie produktiv jeder ist. EU AI Act sagt dazu:",
        options: [
          "Erlaubt, wenn Betriebsrat zustimmt",
          "Erlaubt mit Transparenzpflicht",
          "Hochrisiko - strenge Auflagen nötig",
          "Komplett verboten"
        ],
        correct: 2,
        explanation: "Überwachung und Bewertung von Arbeitnehmern ist Hochrisiko-KI. Erlaubt unter strengen Bedingungen: Risikomanagement, Transparenz, menschliche Aufsicht, Grundrechte-Prüfung. Aber Achtung: Manipulation oder unterschwellige Beeinflussung wäre verboten!",
        tip: "👁️ Mitarbeiter haben besondere Schutzrechte - auch vor KI."
      },
      {
        question: "Welches dieser KI-Systeme ist ab Februar 2025 verboten?",
        options: [
          "Social Scoring - Bürger nach Verhalten bewerten",
          "Spam-Filter für E-Mails",
          "Navigationssysteme mit KI",
          "Übersetzungs-Tools"
        ],
        correct: 0,
        explanation: "Social Scoring (wie in China) ist 'unannehmbares Risiko' und seit Februar 2025 verboten. Es verletzt Grundrechte und Menschenwürde. Auch verboten: unterschwellige Manipulation, Ausnutzung von Schwächen verletzlicher Gruppen.",
        tip: "🚫 Unannehmbares Risiko = absolutes Verbot. Keine Diskussion."
      },
      {
        question: "Ihr nutzt ChatGPT in der Verwaltung. Was muss ab sofort dokumentiert werden?",
        options: [
          "Gar nichts - ist ja nur ein Tool",
          "Nur wenn sensible Daten verarbeitet werden",
          "Welche Mitarbeiter geschult wurden",
          "Jede einzelne Anfrage"
        ],
        correct: 2,
        explanation: "Seit Februar 2025 gilt: Mitarbeiter müssen im Umgang mit genutzten KI-Systemen geschult sein - und das muss dokumentiert werden. Nicht jede Anfrage, aber wer wann geschult wurde. Das zeigt Sorgfaltspflicht und schützt bei Haftungsfragen.",
        tip: "📚 Schulung + Dokumentation = eure Absicherung bei Problemen."
      },
      {
        question: "Ein Startup bietet euch ein 'KI-Tool zur Kreditwürdigkeitsprüfung' an. Welche Frage ist am wichtigsten?",
        options: [
          "Ist das Tool DSGVO-konform?",
          "Wie wurde es auf Bias getestet?",
          "Was kostet die Lizenz?",
          "Gibt es eine kostenlose Testversion?"
        ],
        correct: 1,
        explanation: "Kreditwürdigkeit = Hochrisiko-KI! Bias kann Menschen systematisch benachteiligen (z.B. nach Geschlecht, Alter, Herkunft). Ihr müsst wissen: Welche Daten? Wie getestet? Welche Fehlerrate bei verschiedenen Gruppen? Sonst drohen Diskriminierung UND Strafen bis 6% Jahresumsatz.",
        tip: "⚠️ Bei Hochrisiko-KI immer nach Bias-Tests fragen!"
      },
      {
        question: "Was bedeutet 'Hochrisiko-KI' konkret für euch als Betreiber?",
        options: [
          "Ihr dürft sie nicht nutzen",
          "Ihr braucht eine spezielle Lizenz",
          "Ihr müsst Risikomanagement betreiben und Tests durchführen",
          "Nur der Anbieter ist verantwortlich"
        ],
        correct: 2,
        explanation: "Als Betreiber von Hochrisiko-KI seid IHR verantwortlich für: Einhaltung der Vorgaben, angemessene menschliche Aufsicht, Überwachung der Funktion, Meldung von schweren Vorfällen. Der Anbieter liefert das System, aber ihr setzt es ein - also tragt ihr Mitverantwortung!",
        tip: "🤝 Verantwortung wird geteilt: Anbieter UND Betreiber."
      },
      {
        question: "Ein Bürger fragt: 'Hat eine KI über meinen Antrag entschieden?' Eure Pflicht:",
        options: [
          "Muss nicht beantwortet werden",
          "Nur beantworten, wenn ein Anwalt fragt",
          "Klar und verständlich erklären + Widerspruchsrecht nennen",
          "An den IT-Support verweisen"
        ],
        correct: 2,
        explanation: "Transparenzpflicht! Bei Hochrisiko-KI haben Betroffene das Recht auf klare Information: Wurde KI eingesetzt? Wie funktioniert sie? Wie kann ich widersprechen? Antwort muss verständlich sein - keine Fachsprache. Das stärkt Vertrauen und ist rechtlich vorgeschrieben.",
        tip: "🗣️ Verständliche Kommunikation schafft Vertrauen."
      }
    ],
    2: [
      {
        question: "Eure Bewerbungs-KI lehnt auffällig oft Frauen über 40 ab. Welcher Bias-Typ liegt hier am wahrscheinlichsten vor?",
        options: [
          "Historical Bias - früher wurden weniger Frauen eingestellt",
          "Algorithmic Bias - der Algorithmus ist fehlerhaft",
          "User Interaction Bias - falsche Nutzung",
          "Measurement Bias - falsche Metriken"
        ],
        correct: 0,
        explanation: "Historical Bias: Die KI wurde mit historischen Daten trainiert, als Frauen (besonders ältere) seltener eingestellt wurden. Sie reproduziert vergangene Diskriminierung. Lösung: Diversere Trainingsdaten, Fairness-Tests, regelmäßige Audits. Genau wie bei Amazon passiert - die mussten ihr System einstampfen!",
        tip: "🕰️ Vergangenheit prägt KI - aber muss nicht die Zukunft bestimmen."
      },
      {
        question: "Eine Gesundheits-KI diagnostiziert Hautkrebs. Bei dunkler Haut ist die Fehlerrate 3x höher. Welcher Bias ist das?",
        options: [
          "Representation Bias",
          "Confirmation Bias",
          "Aggregation Bias",
          "Population Bias"
        ],
        correct: 0,
        explanation: "Representation Bias: Die Trainingsdaten enthielten hauptsächlich Bilder heller Haut. Dunkle Hauttöne waren unterrepräsentiert. Ergebnis: Lebensgefährliche Fehldiagnosen bei People of Color. Echtes Problem in der Medizin! Lösung: Diverse, repräsentative Datensätze sammeln.",
        tip: "👥 Trainingsdaten müssen die echte Vielfalt widerspiegeln."
      },
      {
        question: "Ihr testet eine Recruiting-KI nur mit IT-Bewerbungen, nutzt sie dann für alle Bereiche. Was ist das Hauptproblem?",
        options: [
          "Kein Problem - KI ist universell",
          "Evaluation Bias - falsche Testdaten",
          "Deployment Bias - falsche Einsatzumgebung",
          "Beide: Evaluation UND Deployment Bias"
        ],
        correct: 3,
        explanation: "Doppeltes Problem! Evaluation Bias: Tests mit unpassenden Daten (nur IT). Deployment Bias: Einsatz in falschem Kontext (alle Abteilungen). Eine IT-Recruiting-KI weiß nichts über gute Pflegekräfte oder Handwerker. Sie wird versagen und diskriminieren. Jedes System braucht passende Tests UND passenden Einsatz!",
        tip: "🎯 Der Kontext zählt: Nicht jede KI passt überall."
      },
      {
        question: "Eure Kredit-KI lehnt systematisch Menschen aus bestimmten Stadtteilen ab. Wie ist das rechtlich einzuordnen?",
        options: [
          "Legal, solange es statistisch begründbar ist",
          "Diskriminierung - verstößt gegen Gleichbehandlung",
          "Nur problematisch bei geschützten Merkmalen",
          "In Ordnung, wenn transparent kommuniziert"
        ],
        correct: 1,
        explanation: "Klare Diskriminierung! Auch wenn 'Stadtteil' kein geschütztes Merkmal ist, ist es oft ein Proxy für Herkunft/Einkommen. Das verstößt gegen Gleichbehandlungsgrundsätze UND den AI Act. Ihr haftet als Betreiber! Moderne Fairness-Tests müssen auch solche indirekten Diskriminierungen aufdecken.",
        tip: "⚖️ Indirekte Diskriminierung ist genauso verboten wie direkte."
      },
      {
        question: "Ein Übersetzungs-Tool macht aus 'The doctor' → 'Der Arzt' und aus 'The nurse' → 'Die Krankenschwester'. Was zeigt das?",
        options: [
          "Korrekte Statistik - ist doch meistens so",
          "Gender Bias - Stereotypen werden verstärkt",
          "Kein Problem - nur Sprache",
          "Cultural Bias"
        ],
        correct: 1,
        explanation: "Gender Bias: Die KI reproduziert Geschlechterstereotypen aus den Trainingsdaten. 'Doctor' wird männlich, 'Nurse' weiblich - unabhängig vom Kontext. Das verfestigt Vorurteile und kann reale Auswirkungen haben (z.B. bei Stellenanzeigen). Moderne KI sollte Kontext nutzen oder neutral bleiben.",
        tip: "👨‍⚕️👩‍⚕️ Berufe haben kein Geschlecht - KI sollte das auch wissen."
      },
      {
        question: "Eure Gesichtserkennungs-KI für den Zutritt funktioniert bei Frauen schlechter. Was ist die beste erste Maßnahme?",
        options: [
          "Schwellenwert herabsetzen (akzeptiert mehr Fehler)",
          "Trainingsdaten auf Geschlechterverteilung prüfen",
          "Nur für Männer einsetzen",
          "System ist fehlerhaft - Anbieter kontaktieren"
        ],
        correct: 1,
        explanation: "Erst verstehen, dann handeln! Wahrscheinlich Representation Bias in den Trainingsdaten (zu wenig Frauengesichter). Prüfen: Datenverteilung, Fehlerraten pro Gruppe, Testszenarien. Dann: Nachfordern diverserer Daten vom Anbieter ODER System nicht einsetzen. Schwellenwert senken versteckt nur das Problem!",
        tip: "🔍 Problem verstehen kommt vor schneller Lösung."
      },
      {
        question: "KI für Sozialleistungen empfiehlt seltener Weiterbildungen für Ältere. Was ist die richtige Reaktion?",
        options: [
          "Akzeptieren - statistisch begründet",
          "Sofort stoppen und überprüfen lassen",
          "Diskret korrigieren, nicht kommunizieren",
          "Nur nutzen, wenn Mitarbeiter final entscheiden"
        ],
        correct: 1,
        explanation: "Altersdiskriminierung! Sofort Pause und externe Prüfung. Das ist Hochrisiko-KI + potenzielle Grundrechtsverletzung. Ihr braucht: Bias-Audit, Fairness-Tests, evtl. Nachschulung des Modells. 'Menschliche Aufsicht' allein reicht nicht - wenn Menschen der KI blind vertrauen (Automation Bias), wird trotzdem diskriminiert. Transparenz ist Pflicht!",
        tip: "🛑 Bei Diskriminierungsrisiko: Stopp vor Analyse."
      },
      {
        question: "Welches Szenario ist KEIN Hochrisiko nach EU AI Act?",
        options: [
          "KI bewertet Lehramts-Prüfungen",
          "KI sortiert Eingangsrechnungen nach Priorität",
          "KI entscheidet über Wohnungszuteilung",
          "KI analysiert Mitarbeiter-Leistung"
        ],
        correct: 1,
        explanation: "Rechnungs-Priorisierung = geringes/minimales Risiko! Die anderen drei sind Hochrisiko: Bildung (Prüfungen), Zugang zu Grundleistungen (Wohnung), HR (Mitarbeiter-Bewertung). Diese beeinflussen Lebenschancen und Grundrechte massiv. Rechnungen sortieren? Keine Auswirkung auf Menschen. Kontext ist alles!",
        tip: "📊 Hochrisiko = Auswirkung auf Grundrechte oder Lebenschancen."
      },
      {
        question: "Predictive-Policing-KI sagt für bestimmte Bezirke höhere Kriminalität voraus. Was ist kritisch zu bedenken?",
        options: [
          "Zeigt nur Fakten - Daten lügen nicht",
          "Könnte Self-Fulfilling Prophecy sein (mehr Polizei → mehr Funde)",
          "Ist verboten - sofort abschalten",
          "Legal, aber ethisch fragwürdig"
        ],
        correct: 1,
        explanation: "Feedback Loop Problem! Mehr Polizei in einem Bezirk → mehr Kontrollen → mehr registrierte Delikte → KI sagt 'mehr Kriminalität' voraus → noch mehr Polizei. Das ist ein sich selbst verstärkender Kreislauf, kein objektives Bild. Plus: Oft steckt Historical Bias drin (vergangene diskriminierende Polizeiarbeit). Predictive Policing ist hochumstritten!",
        tip: "🔄 KI kann Probleme nicht nur zeigen, sondern auch verstärken."
      },
      {
        question: "Was gehört zur 'menschlichen Aufsicht' bei Hochrisiko-KI im Kern?",
        options: [
          "Ein Mensch muss das System bedienen",
          "Regelmäßige Updates einspielen",
          "Verstehen, eingreifen und überstimmen können",
          "Monatliche Berichte lesen"
        ],
        correct: 2,
        explanation: "Echte Aufsicht bedeutet: System verstehen, Ergebnisse kritisch prüfen können, bei Problemen eingreifen, KI-Entscheidung überstimmen können. Nur 'durchwinken' reicht nicht - das ist Automation Bias! Menschen müssen geschult sein und die Kompetenz haben, die KI zu hinterfragen.",
        tip: "👤 Menschliche Aufsicht = kompetent hinterfragen können."
      }
    ],
    3: [
      {
        question: "Eure Bewerbungs-KI benachteiligt Frauen UND Ältere gleichzeitig stärker als einzeln. Wie nennt man dieses Phänomen?",
        options: [
          "Doppel-Bias",
          "Intersektionaler Bias",
          "Aggregation Bias",
          "Compounding Bias"
        ],
        correct: 1,
        explanation: "Intersektionaler Bias: Mehrere Diskriminierungsdimensionen verstärken sich gegenseitig. Ältere Frauen werden STÄRKER benachteiligt als die Summe von 'älter' + 'weiblich'. Real bei Amazon passiert. Lösung: Fairness-Tests müssen intersektionale Gruppen separat analysieren, nicht nur einzelne Merkmale. Extrem wichtig, wird oft übersehen!",
        tip: "🔀 Diskriminierung addiert sich nicht - sie multipliziert sich."
      },
      {
        question: "Wann ist eine Grundrechte-Folgenabschätzung verpflichtend?",
        options: [
          "Bei jeder KI-Nutzung",
          "Bei Hochrisiko-KI, die Grundrechte berührt",
          "Nur bei biometrischer Erkennung",
          "Nur für Behörden, nicht für Unternehmen"
        ],
        correct: 1,
        explanation: "Hochrisiko-KI mit Grundrechtsbezug braucht Impact Assessment: Welche Grundrechte betroffen? Wie stark? Welche Schutzmaßnahmen? Beispiele: HR-Systeme (Gleichbehandlung), Social Scoring (Menschenwürde), Gesundheits-KI (Diskriminierungsschutz). Gilt für Behörden UND Unternehmen. Dokumentationspflicht!",
        tip: "📋 Impact Assessments sind eure Versicherung bei Problemen."
      },
      {
        question: "Ihr seid 'Betreiber', der Anbieter liefert ein Update. Nach Problemen: Wer haftet primär?",
        options: [
          "Nur der Anbieter",
          "Nur ihr als Betreiber",
          "Beide - je nach Art des Problems",
          "Niemand - Updates sind Kulanz"
        ],
        correct: 2,
        explanation: "Geteilte Haftung! Anbieter haftet für: Systemfehler, falsche Dokumentation, nicht gemeldete Risiken. Betreiber haftet für: Falsche Nutzung, fehlende Aufsicht, ignorierte Warnungen. Nach Update: Ihr müsst prüfen, ob System noch zweckgemäß funktioniert. Blind installieren = volles Risiko bei euch!",
        tip: "⚖️ Haftung teilen = Verantwortung teilen = Kommunikation wichtig."
      },
      {
        question: "KI lehnt Kredit ab mit Begründung: 'Algorithmus-Score zu niedrig'. Ist das rechtlich ausreichend?",
        options: [
          "Ja - Geschäftsgeheimnis geschützt",
          "Nein - konkrete, verständliche Gründe nötig",
          "Kommt auf den Kreditbetrag an",
          "Ja, wenn Datenschutzerklärung verlinkt ist"
        ],
        correct: 1,
        explanation: "'Score zu niedrig' ist KEINE ausreichende Begründung! Betroffene haben Recht auf verständliche Erklärung: Welche Faktoren? Warum abgelehnt? Wie verbessern? Das gilt auch, wenn der Algorithmus komplex ist. 'Explainable AI' ist keine Kür, sondern Pflicht bei Hochrisiko-Entscheidungen. Geschäftsgeheimnisse schützen nicht vor Transparenzpflicht!",
        tip: "💬 'Black Box' ist keine Ausrede - Erklärungen sind Pflicht."
      },
      {
        question: "Sachbearbeiter folgen KI-Empfehlungen zu 95%. Was ist die beste Gegenmaßnahme für Automation Bias?",
        options: [
          "Ist gut - zeigt Vertrauen in das System",
          "Random Audits + Schulung zu kritischem Hinterfragen",
          "KI-Konfidenz-Level niedriger anzeigen",
          "Mehr Fälle pro Tag zur besseren Auslastung"
        ],
        correct: 1,
        explanation: "95% Zustimmung ist Warnsignal für Automation Bias - Menschen vertrauen der KI blind! Gegenmaßnahmen: Regelmäßige Stichproben wo Menschen aktiv hinterfragen mussten, Schulungen zu Bias-Erkennung, Fälle zeigen wo KI falsch lag, Kultur des kritischen Denkens fördern. NICHT: Mehr Zeitdruck (verstärkt Bias)!",
        tip: "🤖 Zu viel Vertrauen in KI ist genauso gefährlich wie zu wenig."
      },
      {
        question: "Wer muss die technische Dokumentation bei zugekaufter Hochrisiko-KI erstellen?",
        options: [
          "Anbieter erstellt, Betreiber nutzt sie",
          "Betreiber erstellt alles selbst",
          "Beide erstellen separate Dokumentationen",
          "Nur bei selbst entwickelter KI nötig"
        ],
        correct: 0,
        explanation: "Anbieter muss technische Dokumentation liefern (wie trainiert? Welche Daten? Risiken? Testresultate?). Betreiber muss sie NUTZEN: Verstehen, umsetzen, ggf. ergänzen (Einsatzkontext, Aufsichtsmaßnahmen). Bei zugekaufter KI: Dokumentation einfordern! Ist sie mangelhaft/fehlt → System nicht einsetzen oder nur auf eigenes Risiko.",
        tip: "📚 Dokumentation ist eure Gebrauchsanweisung - ohne geht's nicht."
      },
      {
        question: "Eure HR-KI hat 3 Monate lang diskriminiert. Besteht eine Meldepflicht?",
        options: [
          "Nein - interne Angelegenheit",
          "Nur wenn Betroffene sich beschweren",
          "Ja - an zuständige Aufsichtsbehörde",
          "Nur wenn über 100 Personen betroffen"
        ],
        correct: 2,
        explanation: "Schwere Vorfälle MÜSSEN gemeldet werden - an nationale Aufsichtsbehörde (in DE: Bundesnetzagentur). 'Schwer' = Grundrechte verletzt, systemischer Fehler, erhebliche Anzahl Betroffener. Nicht melden = zusätzliche Strafe! Proaktiv melden zeigt Verantwortung, kann Strafen mildern. Verstecken macht alles schlimmer.",
        tip: "📞 Transparenz bei Problemen ist Pflicht, nicht optional."
      },
      {
        question: "Was ist der Hauptvorteil einer KI-Sandbox für KMUs?",
        options: [
          "KI darf ohne Einschränkungen getestet werden",
          "Keine Strafen bei Verstößen während des Tests",
          "Kostenlose KI-Entwicklung durch Behörden",
          "Automatische Zertifizierung nach Testphase"
        ],
        correct: 1,
        explanation: "Sandboxes = geschützter Testrahmen unter Behördenaufsicht. KMUs können innovative KI testen OHNE Strafen zu riskieren, wenn sie sich an den Plan halten und kooperieren. ABER: Keine Haftungsbefreiung für Schäden an Dritten! Auch kein Freifahrtschein - Tests müssen sinnvoll sein. Gibt's in DE bei der Bundesnetzagentur.",
        tip: "🏖️ Sandbox = sicher experimentieren, nicht Freibrief zum Chaos."
      },
      {
        question: "Bei KI-Einkauf sagt der Anbieter: 'Bias-Tests sind zu komplex für uns.' Wie bewerten Sie das?",
        options: [
          "Akzeptabel - sind wirklich komplex",
          "K.O.-Kriterium bei Hochrisiko-KI",
          "Nur bei großen Anbietern erwartbar",
          "Kann intern nachgeholt werden"
        ],
        correct: 1,
        explanation: "Red Flag! Wenn ein Anbieter keine Bias-Tests macht/kann, ist das bei Hochrisiko-KI ein K.O.-Kriterium. Ihr haftet mit, wenn ihr es trotzdem einsetzt. Auch problematisch: 'Ständiges Training' ohne Kontrolle (Drift-Risiko), 'keine Transparenz' (verstößt gegen AI Act). Fordert konkrete Nachweise: Test-Reports, Fehlerraten pro Gruppe, Auditierungsmöglichkeiten.",
        tip: "🚩 Bei Hochrisiko-KI gibt es keinen Rabatt auf Sicherheit."
      },
      {
        question: "Was ist langfristig der wichtigste Erfolgsfaktor für verantwortungsvolle KI-Nutzung?",
        options: [
          "Teuerste und modernste KI kaufen",
          "Kontinuierliche Schulung + kritische Prüfkultur etablieren",
          "Alle Entscheidungen dokumentieren",
          "Externe Berater für jede Entscheidung"
        ],
        correct: 1,
        explanation: "Die beste KI hilft nichts ohne kompetente Menschen! Kontinuierliche Schulung (KI entwickelt sich weiter), kritische Grundhaltung (Automation Bias vermeiden), interdisziplinäre Teams (Tech + Ethik + Recht + Fachbereich). Dokumentation ist wichtig, aber ohne Verständnis wertlos. Kein Tool ersetzt menschliches Urteilsvermögen - das ist die Kernaussage des AI Act!",
        tip: "🎯 Menschen bleiben der wichtigste Faktor - heute und morgen."
      }
    ]
  };

  const learningContent = {
    euAiAct: {
      title: "EU AI Act Grundlagen",
      sections: [
        {
          title: "Die 4 Risikoklassen",
          content: [
            { risk: "Unannehmbares Risiko", color: "text-rose-400", desc: "Komplett verboten (z.B. Social Scoring, Manipulation)" },
            { risk: "Hochrisiko", color: "text-orange-400", desc: "Strenge Auflagen (z.B. HR, Kreditvergabe, Gesundheit)" },
            { risk: "Begrenztes Risiko", color: "text-amber-400", desc: "Transparenzpflicht (z.B. Chatbots, generative KI)" },
            { risk: "Minimales Risiko", color: "text-emerald-400", desc: "Kaum Pflichten (z.B. Spam-Filter, Empfehlungssysteme)" }
          ]
        },
        {
          title: "Wichtige Fristen",
          content: [
            { date: "Februar 2025", desc: "Verbotene KI-Systeme müssen eingestellt werden" },
            { date: "Februar 2025", desc: "Schulungspflicht für Mitarbeiter (mit Dokumentation)" },
            { date: "August 2025", desc: "Pflichten für General Purpose AI (GPAI) Anbieter" },
            { date: "August 2026", desc: "Volle Umsetzung aller Hochrisiko-Anforderungen" }
          ]
        }
      ]
    },
    biasTypes: {
      title: "KI-Bias verstehen",
      sections: [
        {
          title: "Die wichtigsten Bias-Typen",
          content: [
            { type: "Historical Bias", desc: "KI reproduziert vergangene Diskriminierung aus Trainingsdaten", example: "Amazon Recruiting-KI bevorzugte Männer" },
            { type: "Representation Bias", desc: "Bestimmte Gruppen sind in Trainingsdaten unterrepräsentiert", example: "Hautkrebs-KI versagt bei dunkler Haut" },
            { type: "Evaluation Bias", desc: "Getestet wird mit falschen/unpassenden Daten", example: "IT-Recruiting-KI nicht für Pflege getestet" },
            { type: "Deployment Bias", desc: "System wird in falschem Kontext eingesetzt", example: "KI für Kontext A in Kontext B genutzt" },
            { type: "Automation Bias", desc: "Menschen vertrauen KI blind und hinterfragen nicht", example: "95% der KI-Vorschläge werden übernommen" },
            { type: "Intersektionaler Bias", desc: "Mehrere Diskriminierungen verstärken sich gegenseitig", example: "Ältere Frauen doppelt benachteiligt" }
          ]
        }
      ]
    },
    responsibilities: {
      title: "Rollen & Verantwortung",
      sections: [
        {
          title: "Anbieter vs. Betreiber",
          content: [
            { role: "Anbieter", duties: "Entwickelt/liefert das System, erstellt technische Dokumentation, führt Risikotests durch, meldet schwere Vorfälle" },
            { role: "Betreiber", duties: "Nutzt das System, stellt menschliche Aufsicht sicher, dokumentiert Schulungen, meldet Probleme" },
            { role: "Beide", duties: "Tragen gemeinsam Verantwortung für sichere und faire KI-Nutzung" }
          ]
        }
      ]
    },
    resources: {
      title: "Weiterführende Links",
      links: [
        { title: "Offizieller EU AI Act Text", url: "https://artificialintelligenceact.eu/de/", desc: "Vollständiger Gesetzestext und Updates" },
        { title: "Bundesnetzagentur - KI Service-Desk", url: "https://www.bundesnetzagentur.de/", desc: "Deutsche Aufsichtsbehörde mit Tools und Beratung" },
        { title: "EU Kommission - AI Office", url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", desc: "Zentrale Anlaufstelle für KI-Fragen" },
        { title: "KMU-Leitfaden zum AI Act", url: "https://artificialintelligenceact.eu/de/small-businesses-guide-to-the-ai-act/", desc: "Speziell für kleine und mittlere Unternehmen" },
        { title: "Bias in AI - Ressourcen", url: "https://www.ibm.com/de-de/think/topics/ai-bias", desc: "Vertiefende Informationen zu KI-Verzerrungen" }
      ]
    }
  };

  const levelInfo = {
    1: {
      title: "Level 1: Grundlagen",
      icon: Brain,
      gradient: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-500",
      description: "Basics des EU AI Act und erste Schritte"
    },
    2: {
      title: "Level 2: Praxis",
      icon: Zap,
      gradient: "from-amber-500 to-orange-600",
      bg: "bg-amber-500",
      description: "Bias erkennen und Tools richtig einordnen"
    },
    3: {
      title: "Level 3: Expertise",
      icon: Target,
      gradient: "from-rose-500 to-pink-600",
      bg: "bg-rose-500",
      description: "Compliance und komplexe Szenarien meistern"
    }
  };

  const handleAnswer = (answerIndex) => {
    if (showExplanation) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = answerIndex === questions[currentLevel][currentQuestion].correct;
    const newScores = [...levelScores[currentLevel], isCorrect];
    setLevelScores({ ...levelScores, [currentLevel]: newScores });
  };

  const handleNext = () => {
    if (currentQuestion < questions[currentLevel].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const score = levelScores[currentLevel].filter(s => s).length;
      const total = questions[currentLevel].length;
      const percentage = (score / total) * 100;

      if (percentage >= 70 && !completedLevels.includes(currentLevel)) {
        setCompletedLevels([...completedLevels, currentLevel]);
      }

      setView('levelComplete');
    }
  };

  const startLevel = (level) => {
    setCurrentLevel(level);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setView('question');
  };

  const restartLevel = () => {
    setLevelScores({ ...levelScores, [currentLevel]: [] });
    startLevel(currentLevel);
  };

  const goToMenu = () => {
    setView('menu');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const isLevelUnlocked = (level) => {
    if (level === 1) return true;
    return completedLevels.includes(level - 1);
  };

  const getLevelScore = (level) => {
    const scores = levelScores[level];
    if (scores.length === 0) return null;
    const correct = scores.filter(s => s).length;
    return { correct, total: scores.length, percentage: Math.round((correct / scores.length) * 100) };
  };

  // Learning Area View
  if (view === 'learn') {
    return (
      <div className="min-h-screen bg-[var(--pa-bg)] p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={goToMenu}
                className="p-2 hover:bg-slate-700 rounded-lg transition"
              >
                <Home className="w-6 h-6 text-slate-300" />
              </button>
              <h1 className="text-3xl font-bold text-white">Wissensbereich</h1>
            </div>
          </div>

          {/* EU AI Act */}
          <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 mb-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
              <Brain className="w-8 h-8" />
              {learningContent.euAiAct.title}
            </h2>

            {learningContent.euAiAct.sections.map((section, idx) => (
              <div key={idx} className="mb-6 last:mb-0">
                <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                <div className="space-y-3">
                  {section.content.map((item, i) => (
                    <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                      {item.risk ? (
                        <>
                          <div className={`font-bold mb-1 ${item.color}`}>{item.risk}</div>
                          <div className="text-slate-300 text-sm">{item.desc}</div>
                        </>
                      ) : (
                        <>
                          <div className="font-bold text-amber-400 mb-1">{item.date}</div>
                          <div className="text-slate-300 text-sm">{item.desc}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bias Types */}
          <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 mb-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8" />
              {learningContent.biasTypes.title}
            </h2>

            <div className="space-y-4">
              {learningContent.biasTypes.sections[0].content.map((item, i) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-5">
                  <div className="font-bold text-amber-300 mb-2">{item.type}</div>
                  <div className="text-slate-300 mb-2">{item.desc}</div>
                  <div className="text-slate-400 text-sm italic">Beispiel: {item.example}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 mb-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-rose-400 mb-6 flex items-center gap-3">
              <Target className="w-8 h-8" />
              {learningContent.responsibilities.title}
            </h2>

            <div className="space-y-4">
              {learningContent.responsibilities.sections[0].content.map((item, i) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-5">
                  <div className="font-bold text-rose-300 mb-2">{item.role}</div>
                  <div className="text-slate-300">{item.duties}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              {learningContent.resources.title}
            </h2>

            <div className="space-y-3">
              {learningContent.resources.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-700/50 rounded-lg p-5 hover:bg-slate-700 transition group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-blue-300 mb-1 group-hover:text-blue-200 flex items-center gap-2">
                        {link.title}
                        <ExternalLink className="w-4 h-4" />
                      </div>
                      <div className="text-slate-400 text-sm">{link.desc}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Level Complete View
  if (view === 'levelComplete') {
    const levelScore = getLevelScore(currentLevel);
    const passed = levelScore && levelScore.percentage >= 70;

    return (
      <div className="min-h-screen bg-[var(--pa-bg)] p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            {passed ? (
              <Trophy className="w-24 h-24 text-amber-500 mx-auto mb-6 animate-bounce" />
            ) : (
              <Award className="w-24 h-24 text-slate-400 mx-auto mb-6" />
            )}

            <h2 className="text-4xl font-bold mb-3 text-slate-800">
              {passed ? "Level geschafft! 🎉" : "Noch nicht ganz..."}
            </h2>

            <div
              className="text-7xl font-bold mb-6"
              style={{ color: passed ? '#10b981' : '#f59e0b' }}
            >
              {levelScore.percentage}%
            </div>

            <p className="text-xl text-slate-600 mb-8">
              {levelScore.correct} von {levelScore.total} Fragen richtig
            </p>

            {passed ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5 mb-8">
                <p className="text-emerald-900 font-medium text-lg">
                  Starke Leistung! Du hast ein solides Verständnis bewiesen.
                  {currentLevel < 3 && " Das nächste Level ist jetzt freigeschaltet!"}
                </p>
              </div>
            ) : (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 mb-8">
                <p className="text-amber-900 font-medium text-lg">
                  Für 70% fehlt noch ein bisschen. Schau dir den Wissensbereich an oder versuch’s nochmal!
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={restartLevel}
                className="px-8 py-4 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition font-semibold shadow-lg"
              >
                Level wiederholen
              </button>

              {passed && currentLevel < 3 && isLevelUnlocked(currentLevel + 1) && (
                <button
                  onClick={() => startLevel(currentLevel + 1)}
                  className="pa-btn pa-btn-primary"
                >
                  Nächstes Level →
                </button>
              )}

              <button
                onClick={goToMenu}
                className="pa-btn pa-btn-secondary"
              >
                Zur Übersicht
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Menu View
  if (view === 'menu') {
    return (
      <div className="min-h-screen bg-[var(--pa-bg)] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.25em] uppercase text-slate-400 mb-3">
              Lernen
            </p>
            <h1 className="text-5xl font-bold mb-3 text-[var(--pa-foreground)]">
              KI-Kompetenztest&nbsp;
              <span className="text-[var(--accent-cyan)]">EU AI Act</span>
            </h1>
            <p className="text-slate-300 text-lg">Spielerisch lernen, sicher anwenden</p>
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map(level => {
              const unlocked = isLevelUnlocked(level);
              const completed = completedLevels.includes(level);
              const score = getLevelScore(level);
              const Icon = levelInfo[level].icon;

              return (
                <div
                  key={level}
                  className={`bg-slate-800 rounded-2xl shadow-2xl p-6 border-2 transition-all ${
                    unlocked
                      ? 'border-slate-600 cursor-pointer hover:border-slate-400 hover:shadow-emerald-500/20'
                      : 'border-slate-700 opacity-60'
                  }`}
                  onClick={() => unlocked && startLevel(level)}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl border border-[var(--accent-cyan)] flex items-center justify-center bg-[rgba(0,250,255,0.08)]">
                      {unlocked ? (
                        <Icon className="w-8 h-8 text-[var(--accent-cyan)]" />
                      ) : (
                        <Lock className="w-8 h-8 text-[var(--accent-cyan)]" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-white">{levelInfo[level].title}</h3>
                      <p className="text-slate-300 mb-2">{levelInfo[level].description}</p>
                      <p className="text-slate-400 text-sm">
                        {questions[level].length} Fragen
                      </p>
                    </div>

                    <div className="text-right min-w-[120px]">
                      {completed && (
                        <div className="flex items-center gap-2 text-emerald-400 mb-2 justify-end">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-semibold text-lg">Geschafft!</span>
                        </div>
                      )}
                      {score && (
                        <div className="text-3xl font-bold" style={{
                          color: score.percentage >= 70 ? '#10b981' : '#f59e0b'
                        }}>
                          {score.percentage}%
                        </div>
                      )}
                      {!unlocked && (
                        <div className="text-slate-500 text-sm">
                          Vorheriges Level abschließen
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pa-card">
            <button
              type="button"
              onClick={() => setShowHowItWorks((v) => !v)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="flex items-center gap-2 font-semibold text-[var(--accent-cyan)]">
                <Zap className="w-4 h-4" />
                So funktioniert’s
              </span>
              <span className="text-slate-400 text-sm">
                {showHowItWorks ? "Details ausblenden" : "Details anzeigen"}
              </span>
            </button>
            {showHowItWorks && (
              <ul className="mt-4 text-slate-300 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">✓</span>
                  <span>Single-Choice Fragen – nur EINE Antwort ist korrekt</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">✓</span>
                  <span>Sofortige, verständliche Erklärungen nach jeder Antwort</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">✓</span>
                  <span>Mindestens 70% richtig → nächstes Level freischalten</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl">✓</span>
                  <span>Wissensbereich mit allen Infos zum Nachschlagen</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Question View
  const currentQ = questions[currentLevel][currentQuestion];
  const LevelIcon = levelInfo[currentLevel].icon;

  return (
    <div className="min-h-screen bg-[var(--pa-bg)] p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between bg-slate-800 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
            <button
              onClick={goToMenu}
              className="p-2 hover:bg-slate-700 rounded-lg transition"
              title="Zurück zur Übersicht"
              >
                <Home className="w-5 h-5 text-slate-300" />
              </button>
            <div className="w-10 h-10 rounded-lg border border-[var(--accent-cyan)] flex items-center justify-center bg-[rgba(0,250,255,0.08)]">
              <LevelIcon className="w-6 h-6 text-[var(--accent-cyan)]" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">{levelInfo[currentLevel].title}</h2>
              <p className="text-sm text-slate-400">
                Frage {currentQuestion + 1} von {questions[currentLevel].length}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-slate-400">Richtig</div>
            <div className="font-bold text-2xl text-emerald-400">
              {levelScores[currentLevel].filter(s => s).length}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6 bg-slate-800 rounded-full h-3 shadow-inner">
          <div
            className="bg-[var(--accent-cyan)] h-3 rounded-full transition-all shadow-lg"
            style={{ width: `${((currentQuestion + 1) / questions[currentLevel].length) * 100}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <span className="text-blue-200 text-sm font-medium">Wähle die BESTE Antwort (nur eine ist korrekt)</span>
          </div>

          <h3 className="text-2xl font-bold mb-8 text-white leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-4 mb-6">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQ.correct;
              const showResult = showExplanation;

              let bgColor = 'bg-slate-700 hover:bg-slate-600';
              let borderColor = 'border-slate-600';
              let textColor = 'text-slate-200';

              if (showResult) {
                if (isCorrect) {
                  bgColor = 'bg-emerald-900/50';
                  borderColor = 'border-emerald-500';
                  textColor = 'text-emerald-100';
                } else if (isSelected && !isCorrect) {
                  bgColor = 'bg-rose-900/50';
                  borderColor = 'border-rose-500';
                  textColor = 'text-rose-100';
                }
              } else if (isSelected) {
                bgColor = 'bg-blue-900/50';
                borderColor = 'border-blue-500';
                textColor = 'text-blue-100';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all ${bgColor} ${borderColor} ${textColor} ${
                    !showExplanation ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default'
                  } shadow-lg`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      showResult && isCorrect ? 'border-emerald-400 bg-emerald-500' :
                      showResult && isSelected && !isCorrect ? 'border-rose-400 bg-rose-500' :
                      isSelected ? 'border-blue-400 bg-blue-500' : 'border-slate-500'
                    }`}>
                      {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-white" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
                    </div>
                    <span className="flex-1 text-lg">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-8 space-y-5 animate-fadeIn">
              <div className={`p-6 rounded-xl border-2 ${
                selectedAnswer === currentQ.correct
                  ? 'bg-emerald-900/30 border-emerald-500'
                  : 'bg-amber-900/30 border-amber-500'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">
                    {selectedAnswer === currentQ.correct ? '✓' : '→'}
                  </div>
                  <div>
                    <p className={`font-bold mb-3 text-xl ${
                      selectedAnswer === currentQ.correct ? 'text-emerald-300' : 'text-amber-300'
                    }`}>
                      {selectedAnswer === currentQ.correct ? 'Richtig!' : 'Nicht ganz...'}
                    </p>
                    <p className={`leading-relaxed ${
                      selectedAnswer === currentQ.correct ? 'text-emerald-100' : 'text-amber-100'
                    }`}>
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/30 border-2 border-blue-500 p-5 rounded-xl">
                <p className="text-blue-100 leading-relaxed">{currentQ.tip}</p>
              </div>

              <button
                onClick={handleNext}
                className={`w-full py-5 bg-gradient-to-r ${levelInfo[currentLevel].gradient} text-white rounded-xl hover:shadow-2xl transition-all font-bold text-lg shadow-lg`}
              >
                {currentQuestion < questions[currentLevel].length - 1 ? 'Nächste Frage →' : 'Level abschließen'}
              </button>
            </div>
          )}
        </div>

        {/* Score indicator */}
        {levelScores[currentLevel].length > 0 && (
          <div className="mt-6 text-center bg-slate-800 rounded-lg p-4 shadow-lg">
            <div className="text-slate-300">
              Aktuell richtig: <span className="font-bold text-emerald-400">{levelScores[currentLevel].filter(s => s).length}</span> von {levelScores[currentLevel].length}
              {' '}({Math.round((levelScores[currentLevel].filter(s => s).length / levelScores[currentLevel].length) * 100)}%)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KIKompetenzTest;
