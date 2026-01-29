"use client";

import { CheckCircle, AlertCircle, XCircle, FileText, ExternalLink, Download, RefreshCw } from "lucide-react";
import { AmpelResult, Todo, AmpelBereich } from "../types";

interface ResultsPageProps {
  ampel: AmpelResult;
  todos: Todo[];
  onDownloadPdf: () => void;
  onRestart: () => void;
}

const areas = [
  { key: "dsgvo", label: "DSGVO" },
  { key: "euKiAkt", label: "EU-KI-Akt" },
  { key: "bfsg", label: "BFSG (Barrierefreiheit)" },
  { key: "nis2", label: "NIS2 (Meldepflichten)" },
  { key: "gobd", label: "GoBD (Aufbewahrung)" },
  { key: "mitarbeiter", label: "Mitarbeiter-Dokumentation" },
];

export function ResultsPage({ ampel, todos, onDownloadPdf, onRestart }: ResultsPageProps) {
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "green": return <CheckCircle className="w-6 h-6 text-emerald-400" />;
      case "yellow": return <AlertCircle className="w-6 h-6 text-amber-400" />;
      case "red": return <XCircle className="w-6 h-6 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "green": return "bg-emerald-500";
      case "yellow": return "bg-amber-500";
      case "red": return "bg-red-500";
      default: return "bg-slate-600";
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-4 pb-24 animate-in fade-in duration-500">
      <div className="w-full max-w-4xl">
        <div className="pa-card !h-auto !overflow-visible p-6 md:p-10 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white mb-2">Ihr Compliance-Status</h2>
            <p className="text-white/60">Basierend auf Ihren Angaben</p>
          </div>

          {/* Gesamt-Status Cards */}
          <div className="bg-[#0b0d10]/50 rounded-xl border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white mb-2">Gesamtergebnis</h3>
              <p className="text-lg text-white/80 font-medium">
                {ampel.gesamt === "green" && "Vollständig compliant ✅"}
                {ampel.gesamt === "yellow" && "Teilweise compliant - Nachbesserung nötig ⚠️"}
                {ampel.gesamt === "red" && "Kritische Lücken - Handeln erforderlich ❌"}
              </p>
            </div>
            
            <div className={`w-20 h-20 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0b0d10] shadow-xl ${getStatusColorClass(ampel.gesamt)} bg-opacity-20`}>
               {getStatusIcon(ampel.gesamt)}
            </div>
          </div>

          {/* Bereiche Accordion / Liste */}
          <div className="grid gap-4 md:grid-cols-2">
            {areas.map(({ key, label }) => {
              const bereich = ampel[key] as AmpelBereich;
              if (!bereich) return null; // Should not happen

              return (
                <div key={key} className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors ${
                  bereich.status === 'red' ? 'bg-red-500/5 border-red-500/20' : 
                  bereich.status === 'yellow' ? 'bg-amber-500/5 border-amber-500/20' : 
                  'bg-emerald-500/5 border-emerald-500/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 font-semibold text-white">
                      {getStatusIcon(bereich.status)}
                      <span>{label}</span>
                    </div>
                  </div>
                  
                  {bereich.issues.length > 0 && (
                    <div className="pl-9 space-y-2">
                       {bereich.issues.map((issue, idx) => (
                        <p key={idx} className="text-sm text-white/70 leading-relaxed">• {issue}</p>
                       ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Top Todos */}
          {todos.length > 0 && (
              <div className="bg-[#0b0d10]/50 rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  Prioritäre Handlungsempfehlungen
                </h3>
                <div className="space-y-6">
                  {todos.map((todo, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <span className={`font-bold text-xl ${todo.priority === "red" ? "text-red-400" : "text-amber-400"}`}>
                        {index + 1}.
                      </span>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-white text-lg">{todo.title}</h4>
                        <p className="text-sm text-white/70 leading-relaxed">{todo.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 pt-1">
                          <span className="bg-white/5 px-2 py-1 rounded">Deadline: {todo.deadline}</span>
                          {todo.link && (
                            <a href={todo.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                              <ExternalLink className="w-3 h-3" /> Mehr Infos
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
            <button
              onClick={onDownloadPdf}
              className="btn btn-primary flex-1 py-4 text-base"
            >
              <Download className="w-5 h-5" />
              PDF-Report herunterladen
            </button>
            <button
              onClick={onRestart}
              className="btn btn-secondary flex-1 py-4 text-base"
            >
              <RefreshCw className="w-5 h-5" />
              Neu starten
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
