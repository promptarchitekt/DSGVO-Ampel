export const AI_POLICY_TEMPLATE = `
MUSTER-RICHTLINIE: NUTZUNG VON KI-SYSTEMEN (AI ACCEPTABLE USE POLICY)
-----------------------------------------------------------------------------------------
WICHTIG: Dies ist ein Muster als "Erste Hilfe". Passen Sie es an Ihr Unternehmen an.

1. GRUNDSATZ
Der Einsatz von KI-Tools (z.B. ChatGPT, Claude, DeepL) ist grundsätzlich gestattet, 
sofern er die Arbeitseffizienz steigert und keine Sicherheitsrisiken erzeugt.

2. VERBOTENE DATEN (ROT)
Folgende Daten dürfen NIEMALS in öffentliche KI-Modelle eingegeben werden:
- Personenbezogene Daten (Namen, Adressen, Mitarbeiter-Infos)
- Geschäftsgeheimnisse, Strategiepapiere, Passwörter
- Kundendaten oder rechtlich geschützte Inhalte

3. KENNZEICHNUNGSPFLICHT (TRANS PARENZ)
KI-generierte Ergebnisse (Texte, Bilder, Code) müssen als solche gekennzeichnet werden, 
bevor sie intern oder extern weitergegeben werden.
Grundsatz: "Human in the Loop" – Ergebnisse immer prüfen.

4. ZUGELASSENE TOOLS
(Hier Liste der erlaubten Tools einfügen, z.B. ChatGPT Enterprise, Copilot for M365)
Die Nutzung anderer, nicht freigegebener Tools ("Schatten-IT") ist untersagt.

5. HAFTUNG
Der Nutzer, der das KI-Tool bedient, bleibt für das Ergebnis verantwortlich. 
KI ist ein Werkzeug, kein Autor.

Datum, Unterschrift Geschäftsleitung
-----------------------------------------------------------------------------------------
`;

export const CTA_TEXTS = {
  upgrade: {
    title: "💡 TIPP: Professionelle Lösung nutzen",
    text: "Sparen Sie Zeit mit geprüften Vorlagen statt eigener Recherche:",
    items: [
      "• Fertiges VVT-Muster (Excel/Word)",
      "• AVV-Vertragsvorlagen",
      "• Mitarbeiter-Verpflichtungserklärung"
    ],
    link: "https://ihr-link.de/vorlagen",
    button: "Zum Vorlagen-Paket (€149)"
  },
  consulting: {
    title: "🆘 Hilfe benötigt?",
    text: "Kritische Lücken im Datenschutz können teuer werden. Lassen Sie uns sprechen:",
    link: "https://calendly.com/ihr-link",
    button: "Kostenloses Erstgespräch buchen"
  },
  ai_special: {
    title: "🎁 IHR BONUS: KI-Policy inklusive",
    text: "Da Sie im Bereich KI noch Lücken haben, schenken wir Ihnen auf der letzten Seite dieses Reports eine 'Erste-Hilfe-Policy' zur direkten Nutzung."
  }
};
