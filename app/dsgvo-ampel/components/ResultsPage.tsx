"use client";

import { CheckCircle, AlertCircle, XCircle, FileText, ExternalLink, Download, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "Status", id: "status" },
    { title: "Details", id: "details" },
    { title: "Handlungsbedarf", id: "todos" },
    { title: "Nächste Schritte", id: "offer" }
  ];

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "green": return <CheckCircle className="w-8 h-8 md:w-16 md:h-16 text-emerald-400" />;
      case "yellow": return <AlertCircle className="w-8 h-8 md:w-16 md:h-16 text-amber-400" />;
      case "red": return <XCircle className="w-8 h-8 md:w-16 md:h-16 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green": return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
      case "yellow": return "text-amber-400 border-amber-500/30 bg-amber-500/10";
      case "red": return "text-red-500 border-red-500/30 bg-red-500/10";
      default: return "text-slate-400";
    }
  };

  return (
    <div className="h-full flex flex-col items-center relative overflow-hidden bg-[#05090e]">
      
      {/* ProgressBar/Indicators - Fixed Top */}
      <div className="absolute top-8 md:top-12 flex gap-3 z-20">
         {slides.map((_, idx) => (
             <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-12 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'w-2 bg-white/10'}`} />
         ))}
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-32 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col items-center">
        <AnimatePresence mode="wait">
            <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-5xl flex flex-col items-center justify-start pt-24 min-h-full"
            >
          
          {/* SLIDE 1: HERO RESULT */}
          {currentSlide === 0 && (
            <div className="text-center space-y-8">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10">
                <span className="text-sm font-medium tracking-widest uppercase text-white/60">Analyse Abgeschlossen</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Ihr Compliance-Status</h2>
              
              <div className={`
                 p-10 rounded-3xl border-2 backdrop-blur-xl 
                 flex flex-col items-center gap-6 max-w-2xl mx-auto
                 shadow-[0_0_50px_rgba(0,0,0,0.5)]
                 ${getStatusColor(ampel.gesamt)}
              `}>
                 <div className="p-4 bg-white/5 rounded-full ring-1 ring-white/10">
                   {getStatusIcon(ampel.gesamt)}
                 </div>
                 <div className="space-y-4">
                   <div className="text-3xl font-bold">
                      {ampel.gesamt === "green" && "Vollständig compliant"}
                      {ampel.gesamt === "yellow" && "Teilweise compliant"}
                      {ampel.gesamt === "red" && "Handlungsbedarf"}
                   </div>
                   <p className="text-lg opacity-80 max-w-lg leading-relaxed">
                      {ampel.gesamt === "green" && "Exzellent. Alle geprüften Bereiche erfüllen die Anforderungen."}
                      {ampel.gesamt === "yellow" && "Sie sind auf dem richtigen Weg, aber es fehlen wichtige Details."}
                      {ampel.gesamt === "red" && "Kritische Lücken in der Dokumentation oder Umsetzung gefunden."}
                   </p>
                 </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: DETAIL GRID */}
          {currentSlide === 1 && (
            <div className="space-y-8 w-full">
              <div className="text-center">
                 <h2 className="text-3xl font-bold text-white mb-2">Detail-Analyse</h2>
                 <p className="text-white/60">Wo genau liegen die Stärken und Schwächen?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {areas.map(({ key, label }) => {
                  const bereich = ampel[key] as AmpelBereich;
                  if (!bereich) return null;
                  
                  // Helper for card styling based on status
                  const getCardStyle = (s: string) => {
                    switch(s) {
                        case 'green': return 'bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40';
                        case 'yellow': return 'bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40';
                        case 'red':    return 'bg-red-500/10 border-red-500/20 hover:border-red-500/40';
                        default:       return 'bg-white/5 border-white/10';
                    }
                  };

                  const isOk = bereich.status === 'green';

                  return (
                    <div key={key} className={`
                      p-5 rounded-2xl border transition-all duration-300
                      ${getCardStyle(bereich.status)}
                    `}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-white/90">{label}</span>
                        {getStatusIcon(bereich.status)}
                      </div>
                      {bereich.issues.length > 0 ? (
                        <ul className="space-y-2">
                           {bereich.issues.map((issue, idx) => (
                            <li key={idx} className="text-xs text-white/60 flex items-start gap-2">
                              <span className="block w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                              {issue}
                            </li>
                           ))}
                        </ul>
                      ) : <p className="text-xs text-emerald-400/60 opacity-80">Keine Lücken erkannt.</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SLIDE 3: ACTION PLAN */}
          {currentSlide === 2 && (
            <div className="space-y-8 w-full max-w-2xl">
               <div className="text-center">
                 <h2 className="text-3xl font-bold text-white mb-2">Prioritäten-Liste</h2>
                 <p className="text-white/60">Arbeiten Sie diese Punkte zuerst ab.</p>
               </div>
               
               <div className="space-y-4">
                 {todos.length === 0 ? (
                    <div className="text-center p-12 bg-white/5 rounded-2xl border border-white/5">
                        <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white">Alles erledigt!</h3>
                        <p className="text-white/60">Sie haben keine offenen Punkte.</p>
                    </div>
                 ) : (
                    todos.map((todo, index) => (
                       <div key={index} className="flex gap-4 p-5 rounded-xl bg-white/5 border border-white/10 items-start hover:bg-white/10 transition-colors">
                         <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 font-bold text-sm text-white/80 shrink-0">
                            {index + 1}
                         </div>
                         <div className="space-y-1">
                            <h4 className="font-semibold text-lg text-white">{todo.title}</h4>
                            <p className="text-white/70 text-sm">{todo.description}</p>
                            <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-white/5 border border-white/5 text-white/40">
                               Deadline: {todo.deadline}
                            </span>
                         </div>
                       </div>
                    ))
                 )}
               </div>
            </div>
          )}

          {/* SLIDE 4: OFFER & DOWNLOAD */}
          {currentSlide === 3 && (
            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
                {/* Left: The Offer */}
                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-8 space-y-6 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-3 bg-indigo-500 text-white text-xs font-bold rounded-bl-xl uppercase tracking-wider">
                      Empfehlung
                   </div>
                   
                   <div className="space-y-2">
                       <h3 className="text-2xl font-bold text-white">Professionelle Unterstützung?</h3>
                       <p className="text-white/70">DSGVO & KI-Compliance ist komplex. Lassen Sie uns die restlichen Lücken gemeinsam schließen.</p>
                   </div>
                   
                   <ul className="space-y-3">
                      {["Persönliches Experten-Audit", "Rechtssichere Vorlagen (AVV, VVT)", "Mitarbeiter-Schulung inklusive"].map(item => (
                          <li key={item} className="flex items-center gap-3 text-white/80">
                              <CheckCircle className="w-5 h-5 text-indigo-400" />
                              {item}
                          </li>
                      ))}
                   </ul>

                   <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/25">
                       Kostenloses Erstgespräch vereinbaren
                   </button>
                   <p className="text-center text-xs text-white/40">Unverbindlich & 15 Min. Quick-Check</p>
                </div>

                {/* Right: The Download */}
                <div className="space-y-8 text-center md:text-left">
                    <div className="space-y-4">
                       <h3 className="text-3xl font-bold text-white">Ihr Ergebnis sichern</h3>
                       <p className="text-white/60 leading-relaxed">
                          Laden Sie jetzt den vollständigen PDF-Report herunter. Er dient als Nachweis Ihrer aktuellen Bemühungen (Rechenschaftspflicht).
                       </p>
                    </div>

                    <div className="space-y-4">
                       <button
                          onClick={onDownloadPdf}
                          className="w-full py-4 bg-white text-black hover:bg-white/90 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-transform hover:-translate-y-1"
                        >
                          <Download className="w-5 h-5" />
                          PDF-Report herunterladen
                        </button>
                        
                        <button
                          onClick={onRestart}
                          className="w-full py-4 bg-transparent border border-white/10 hover:bg-white/5 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Neu starten
                        </button>
                    </div>
                </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
      </div>

      {/* Navigation Buttons - Stacked above Global Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#05090e]/95 backdrop-blur-md border-t border-white/5 p-4">
          <div className="max-w-2xl mx-auto w-full flex justify-between items-center px-2">
                 <button 
                    onClick={prevSlide} 
                    disabled={currentSlide === 0}
                    className="px-6 py-3 rounded-full bg-[#161b22] border border-white/10 text-white font-medium transition-colors hover:border-white/30 hover:bg-white/5 disabled:opacity-0"
                 >
                   Zurück
                 </button>
                 
                 {currentSlide < slides.length - 1 ? (
                     <button 
                        onClick={nextSlide} 
                        className="px-6 py-3 rounded-full bg-[#161b22] border border-white/10 text-white font-medium transition-colors hover:border-white/30 hover:bg-white/5"
                     >
                       Weiter
                     </button>
                 ) : (
                     <div className="w-[100px]" />
                 )}
                 {currentSlide === slides.length - 1 && <div className="w-8" />}
          </div>
      </div>

    </div>
  );
}
