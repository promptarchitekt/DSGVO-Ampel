"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Data & Types
import { questions } from "./data/questions";
import { calculateAmpel, getTopTodos } from "./utils/ampelLogic";
import { generatePDF } from "./utils/pdfGenerator";
import { AmpelResult, Todo } from "./types";

// Components
import { QuestionCard } from "./components/QuestionCard";
import { EmailGate } from "./components/EmailGate";
import { ResultsPage } from "./components/ResultsPage";

export default function DsgvoAmpel() {
  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [emailFormData, setEmailFormData] = useState({
    email: "",
    companyName: "",
    agreeToPrivacy: false,
  });

  // Filter questions based on conditions
  const filteredQuestions = questions.filter((q) => {
    if (!q.condition) return true;
    return q.condition(formData);
  });

  // Safety check: if currentStep exceeds filtered questions length (e.g. strict condition change)
  useEffect(() => {
    if (currentStep >= filteredQuestions.length && filteredQuestions.length > 0) {
      setCurrentStep(filteredQuestions.length - 1);
    }
  }, [formData, currentStep, filteredQuestions.length]);

  const currentQuestion = filteredQuestions[currentStep];
  const progress = ((currentStep + 1) / filteredQuestions.length) * 100;

  // Handlers
  const handleOptionSelect = (value: any) => {
    if (!currentQuestion) return;
    setFormData((prev: any) => ({ ...prev, [currentQuestion.id]: value }));

    // Auto-advance for radio buttons (UX improvement)
    if (currentQuestion.type === "radio") {
      setTimeout(() => {
         handleNext(); 
      }, 250); // Short delay for visual feedback
    }
  };

  const handleNext = () => {
    if (currentStep < filteredQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowEmailGate(true);
    }
  };

  const handleBack = useCallback(() => {
    if (showEmailGate) {
      setShowEmailGate(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [showEmailGate, currentStep]);

  const handleEmailSubmit = async (data: { email: string; newsletter: boolean }) => {
    setIsGeneratingPDF(true);
    // Simulate API call
    setTimeout(() => {
        setEmailCaptured(true);
        setIsGeneratingPDF(false);
        setShowEmailGate(false);
        setShowResults(true);
    }, 1500);
  };

  const handleGeneratePDF = () => {
      const ampel = calculateAmpel(formData);
      const todos = getTopTodos(formData);
      // Merge Email Data if available
      const pdfFormData = { ...formData, ...emailFormData }; 
      generatePDF(ampel, todos, pdfFormData);
  };

  const handleRestart = () => {
      setFormData({});
      setCurrentStep(0);
      setShowResults(false);
      setShowEmailGate(false);
      setEmailCaptured(false);
  }

  // Keyboard Navigation
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (showResults || showEmailGate) return;
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") return;

      if (event.key === "ArrowLeft") handleBack();
      // ArrowRight removed to prevent skipping without selection
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentStep, showResults, showEmailGate, handleBack]);

  // --- RENDER ---

  if (showResults) {
      const ampel = calculateAmpel(formData);
      const todos = getTopTodos(formData);
      return (
          <div className="h-[100dvh] w-full bg-[#0b1219] overflow-y-auto">
             <ResultsPage 
               ampel={ampel} 
               todos={todos} 
               onDownloadPdf={handleGeneratePDF}
               onRestart={handleRestart}
             />
          </div>
      );
  }

  return (
    <div className="h-[100dvh] flex flex-col bg-[#0b1219] text-white selection:bg-indigo-500/30 overflow-hidden">
      
      {/* Header / Progress - Fixed Top */}
      <header className="shrink-0 pt-6 pb-4 px-6 max-w-2xl mx-auto w-full z-20 bg-[#0b1219]/95 backdrop-blur-sm">
        <div className="flex justify-between items-end mb-2">
           <div>
             <h1 className="text-sm font-bold tracking-widest text-[#00faff] uppercase">
                DSGVO & KI Compliance
             </h1>
             <p className="text-xs text-white/50 mt-1">
                Quickcheck 2026
             </p>
           </div>
           <span className="text-xs font-mono text-white/50">
               {Math.round(progress)}%
           </span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
                className="h-full bg-[#00faff] shadow-[0_0_10px_rgba(0,250,255,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "circOut" }}
            />
        </div>
      </header>

      {/* Main Content Area - Scrollable Overlay */}
      <main className="flex-1 w-full max-w-2xl mx-auto relative overflow-y-auto overflow-x-hidden p-4 md:p-6 pb-32 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="min-h-full flex flex-col justify-start pt-2 md:pt-4">
            <AnimatePresence mode="wait">
                {showEmailGate ? (
                    <motion.div
                        key="email-gate"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full"
                    >
                        <div className="pa-card !h-auto !overflow-visible p-8 bg-[#12151b] border border-white/10 shadow-2xl">
                        <EmailGate onSubmit={handleEmailSubmit} isLoading={isGeneratingPDF} />
                        <button onClick={handleBack} className="mt-6 text-sm text-white/40 hover:text-white block mx-auto py-2 transition-colors">
                            Zurück zur Überprüfung
                        </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key={currentQuestion?.id || "loading"}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full"
                    >
                        {currentQuestion && (
                            <div className="pa-card !h-auto !overflow-visible p-6 md:p-10 min-h-[450px] flex flex-col gap-6 bg-[#12151b] border border-white/10 shadow-2xl relative">
                                <QuestionCard 
                                    question={currentQuestion}
                                    value={formData[currentQuestion.id]}
                                    onChange={handleOptionSelect}
                                />

                                <div className="mt-auto pt-8 flex justify-between items-center border-t border-white/5">
                                    <button
                                        onClick={handleBack}
                                        disabled={currentStep === 0}
                                        className={`
                                            pa-btn pa-btn-secondary text-sm px-6
                                            ${currentStep === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}
                                        `}
                                    >
                                        Zurück
                                    </button>

                                    <button
                                        onClick={handleNext}
                                        disabled={!formData[currentQuestion.id] && currentQuestion.type !== 'multiselect'} 
                                        className="pa-btn pa-btn-primary px-8"
                                    >
                                        {currentStep === filteredQuestions.length - 1 ? "Auswertung" : "Weiter"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </main>
      
      {/* Footer - Fixed Bottom */}
      <footer className="shrink-0 py-4 text-center text-[10px] text-white/20 uppercase tracking-widest bg-[#0b1219] z-20">
         <a href="#" className="hover:text-white/50 transition-colors mx-2">Impressum</a> • 
         <a href="#" className="hover:text-white/50 transition-colors mx-2">Datenschutz</a>
      </footer>

    </div>
  );
}
