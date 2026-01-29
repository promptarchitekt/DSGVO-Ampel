/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { jsPDF } from "jspdf";
import { AmpelResult, Todo, AmpelBereich } from "../types";

export const generatePDF = (ampel: AmpelResult, todos: Todo[], formData: any) => {
    const doc = new jsPDF();
    let yPos = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;

    // Header
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

    // Executive Summary
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
    
    const { gesamt: _gesamt, ...ampelBereiche } = ampel;
    // Type assertion or check needed since ampelBereiche values can be string (for 'gesamt') or AmpelBereich
    const bereicheValues = Object.values(ampelBereiche).filter(val => typeof val !== 'string') as AmpelBereich[];
    
    const redCount = bereicheValues.filter((r) => r.status === "red").length;
    const yellowCount = bereicheValues.filter((r) => r.status === "yellow").length;
    
    const summaryLines = doc.splitTextToSize(
      `${gesamtStatusText}. ${redCount > 0 ? `${redCount} kritische Bereiche` : ''} ${yellowCount > 0 ? `${yellowCount} Bereiche mit Handlungsbedarf` : ''}. ${todos.length > 0 ? `Top-Priorität: ${todos[0].title}` : 'Alle Bereiche sind compliant.'}`,
      maxWidth
    );
    doc.text(summaryLines, margin, yPos);
    yPos += summaryLines.length * 5 + 5;

    // Ampel-Übersicht
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Compliance-Status nach Bereichen', margin, yPos);
    yPos += 8;

    const bereicheMeta = [
      { key: "dsgvo", label: "DSGVO" },
      { key: "euKiAkt", label: "EU-KI-Akt" },
      { key: "bfsg", label: "BFSG (Barrierefreiheit)" },
      { key: "nis2", label: "NIS2 (Meldepflichten)" },
      { key: "gobd", label: "GoBD (Aufbewahrung)" },
      { key: "mitarbeiter", label: "Mitarbeiter-Dokumentation" },
    ];

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    bereicheMeta.forEach(({ key, label }) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      const bereich = ampel[key] as AmpelBereich;
      if (!bereich) return;

      const status = bereich.status;
      const statusSymbol = status === "green" ? "✓" : status === "yellow" ? "⚠" : "✗";
      const statusText = status === "green" ? "Grün" : status === "yellow" ? "Gelb" : "Rot";
      
      doc.text(`${statusSymbol} ${label}: ${statusText}`, margin, yPos);
      yPos += 5;
      
      if (bereich.issues.length > 0) {
        bereich.issues.forEach((issue) => {
          const issueLines = doc.splitTextToSize(`  • ${issue}`, maxWidth - 10);
          doc.text(issueLines, margin + 5, yPos);
          yPos += issueLines.length * 4;
        });
        yPos += 2;
      }
    });

    // Top-Todos
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

    // Footer
    const totalPages = (doc.internal as any).getNumberOfPages(); // getNumberOfPages exists but typed poorly sometimes
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

    // Download
    const fileName = `DSGVO-Compliance-Report-${dateStr.replace(/\./g, '-')}.pdf`;
    doc.save(fileName);
};
