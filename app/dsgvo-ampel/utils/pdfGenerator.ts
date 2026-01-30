/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { jsPDF } from "jspdf";
import { AmpelResult, Todo, AmpelBereich } from "../types";
import { AI_POLICY_TEMPLATE, CTA_TEXTS } from "../data/pdfContent";

const CI_COLORS = {
  primary: "#4f46e5", // Indigo 600
  secondary: "#6366f1", // Indigo 500
  bg: "#1e293b", // Slate 800 (for logic context, not PDF bg)
  text: "#0f172a", // Slate 900
  lightText: "#64748b", // Slate 500
  red: "#ef4444",
  yellow: "#eab308",
  green: "#22c55e",
};

export const generatePDF = (ampel: AmpelResult, todos: Todo[], formData: any) => {
    const doc = new jsPDF();
    let yPos = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;

    // --- Helper Functions ---
    const checkPageBreak = (heightNeeded: number) => {
      if (yPos + heightNeeded > 280) {
        doc.addPage();
        yPos = 20;
        return true;
      }
      return false;
    };

    const drawHeader = (title: string) => {
        doc.setFillColor(CI_COLORS.primary);
        doc.rect(0, 0, pageWidth, 5, "F"); // Top strip
        
        doc.setFontSize(10);
        doc.setTextColor(CI_COLORS.lightText);
        doc.text("DSGVO & AI Compliance Report", margin, 15);
        yPos = 25;
    };

    // --- Page 1: Cover / Executive Summary ---
    doc.setFillColor(CI_COLORS.primary);
    doc.rect(0, 0, pageWidth, 5, "F");

    doc.setFontSize(24);
    doc.setTextColor(CI_COLORS.text);
    doc.setFont(undefined, 'bold');
    doc.text('Compliance QuickCheck', margin, 35);
    
    doc.setFontSize(11);
    doc.setTextColor(CI_COLORS.lightText);
    const dateStr = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    doc.text(`Erstellt am: ${dateStr}`, margin, 42);

    if (formData.name || formData.firma) {
      doc.text(`Für: ${formData.firma || formData.name}`, margin, 48);
    }
    
    // Status Badge
    yPos = 70;
    const gesamtColor = ampel.gesamt === "green" ? CI_COLORS.green : ampel.gesamt === "yellow" ? CI_COLORS.yellow : CI_COLORS.red;
    doc.setFillColor(gesamtColor);
    doc.roundedRect(margin, yPos, maxWidth, 30, 3, 3, "F");
    
    doc.setFontSize(16);
    doc.setTextColor("#ffffff");
    doc.setFont(undefined, 'bold');
    const titleText = ampel.gesamt === "green" ? "STATUS: SICHER (GRÜN)" : ampel.gesamt === "yellow" ? "STATUS: HANDLUNGSBEDARF (GELB)" : "STATUS: KRITISCH (ROT)";
    doc.text(titleText, margin + 10, yPos + 12);
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const subText = ampel.gesamt === "green" ? "Ihr Unternehmen erfüllt die geprüften Basis-Anforderungen." 
                    : "Es wurden Lücken gefunden, die Bußgeldrisiken darstellen.";
    doc.text(subText, margin + 10, yPos + 22);

    yPos += 45;

    // --- Top Priorities List ---
    if (todos.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(CI_COLORS.primary);
        doc.setFont(undefined, 'bold');
        doc.text("Dringendste Maßnahmen:", margin, yPos);
        yPos += 10;

        todos.slice(0, 3).forEach((todo, i) => {
            doc.setFontSize(11);
            doc.setTextColor(CI_COLORS.text);
            doc.setFont(undefined, 'bold');
            doc.text(`${i + 1}. ${todo.title}`, margin, yPos);
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            const lines = doc.splitTextToSize(todo.description, maxWidth - 10);
            doc.text(lines, margin + 5, yPos + 5);
            
            yPos += 15 + (lines.length * 4);
        });
    }

    // --- CTA Upgrade Box (First Page) ---
    if (ampel.gesamt !== "green") {
        yPos += 10;
        doc.setDrawColor(CI_COLORS.primary);
        doc.setLineWidth(0.5);
        doc.roundedRect(margin, yPos, maxWidth, 35, 2, 2, "S");
        
        doc.setFontSize(11);
        doc.setTextColor(CI_COLORS.primary);
        doc.setFont(undefined, 'bold');
        doc.textWithLink(CTA_TEXTS.upgrade.title, margin + 5, yPos + 8, { url: CTA_TEXTS.upgrade.link });
        
        doc.setFontSize(10);
        doc.setTextColor(CI_COLORS.text);
        doc.setFont(undefined, 'normal');
        doc.text(CTA_TEXTS.upgrade.text, margin + 5, yPos + 15);
        doc.setTextColor(CI_COLORS.secondary);
        doc.textWithLink(`→ ${CTA_TEXTS.upgrade.button}`, margin + 5, yPos + 25, { url: CTA_TEXTS.upgrade.link });
        
        yPos += 45;
    }

    // --- Page 2 Details ---
    doc.addPage();
    drawHeader("Detail-Analyse");
    
    // Iterate Categories
    const categories = [
      { key: "dsgvo", label: "DSGVO (Verfahren & Verträge)" },
      { key: "euKiAkt", label: "EU AI Act (Künstliche Intelligenz)" },
      { key: "bfsg", label: "BFSG (Barrierefreiheit)" },
      { key: "nis2", label: "NIS2 (Cybersicherheit)" },
      { key: "gobd", label: "GoBD (Archivierung)" },
      { key: "mitarbeiter", label: "Mitarbeiter-Datenschutz" },
    ];

    categories.forEach(({ key, label }) => {
        checkPageBreak(50);
        
        const data = ampel[key] as AmpelBereich;
        const color = data.status === "green" ? CI_COLORS.green : data.status === "yellow" ? CI_COLORS.yellow : CI_COLORS.red;
        
        // Header Icon Style
        doc.setFillColor(color);
        doc.circle(margin + 2, yPos - 2, 3, "F");
        
        doc.setFontSize(12);
        doc.setTextColor(CI_COLORS.text);
        doc.setFont(undefined, 'bold');
        doc.text(label, margin + 10, yPos);
        yPos += 8;

        if (data.issues.length === 0) {
            doc.setFontSize(10);
            doc.setFont(undefined, 'italic');
            doc.setTextColor(CI_COLORS.lightText);
            doc.text("Keine Mängel festgestellt.", margin + 10, yPos);
            yPos += 10;
        } else {
            data.issues.forEach(issue => {
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal');
                doc.setTextColor(CI_COLORS.red);
                doc.text(`• ${issue}`, margin + 10, yPos);
                yPos += 6;
            });
            
            data.details.forEach(detail => {
                const lines = doc.splitTextToSize(detail, maxWidth - 15);
                doc.setTextColor(CI_COLORS.text);
                doc.text(lines, margin + 15, yPos);
                yPos += (lines.length * 5) + 2;
            });
            yPos += 5;
        }
        yPos += 5;
    });

    // --- AI Policy Injection (Value Add) ---
    // If AI status is not green, append the "Bonus Policy" page
    if ((ampel.euKiAkt as AmpelBereich).status !== "green") {
        doc.addPage();
        drawHeader("Bonus: KI-Policy");

        // Intro Box
        doc.setFillColor("#eff6ff"); // Light blue
        doc.rect(margin, 30, maxWidth, 25, "F");
        
        doc.setFontSize(11);
        doc.setTextColor(CI_COLORS.primary);
        doc.setFont(undefined, 'bold');
        doc.text(CTA_TEXTS.ai_special.title, margin + 5, 40);
        
        doc.setFontSize(10);
        doc.setTextColor(CI_COLORS.text);
        doc.setFont(undefined, 'normal');
        const introLines = doc.splitTextToSize(CTA_TEXTS.ai_special.text, maxWidth - 10);
        doc.text(introLines, margin + 5, 47);

        yPos = 65;

        // The Policy Text
        doc.setFont("courier", "normal"); // Monospace for "Code/Template" feel
        doc.setFontSize(9);
        doc.setTextColor("#334155");
        
        const policyLines = doc.splitTextToSize(AI_POLICY_TEMPLATE, maxWidth);
        doc.text(policyLines, margin, yPos);
    }

    // --- Footer with Consulting CTA ---
    const totalPages = (doc.internal as any).getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        
        // Bottom Line
        doc.setDrawColor("#e2e8f0");
        doc.line(margin, 280, pageWidth - margin, 280);

        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(CI_COLORS.lightText);
        doc.text("Keine Rechtsberatung. Erstellt mit DSGVO-Ampel.", margin, 285);
        
        // Page Number
        doc.text(`Seite ${i} von ${totalPages}`, pageWidth - margin - 20, 285);

        // Subtle Link
        doc.setTextColor(CI_COLORS.primary);
        doc.textWithLink("Hilfe benötigt? Jetzt Termin buchen", pageWidth / 2 - 20, 285, { url: CTA_TEXTS.consulting.link });
    }

    const fileName = `DSGVO-Report-${dateStr.replace(/\./g, '-')}.pdf`;
    doc.save(fileName);
};

