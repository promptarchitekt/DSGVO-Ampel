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
    setEmailFormData(prev => ({ ...prev, email: data.email }));
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
          <div className="h-full w-full bg-[#05090e] overflow-hidden relative">
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
    <div className="h-full flex flex-col bg-[#05090e] text-white selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* Header / Progress - Fixed Top relative to Main */}
      <header className="shrink-0 pt-8 pb-4 px-6 max-w-2xl mx-auto w-full z-20 bg-[#05090e]/95 backdrop-blur-sm">
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
      <main className="flex-1 w-full max-w-2xl mx-auto relative overflow-y-auto overflow-x-hidden p-4 md:p-6 pb-28 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="min-h-full flex flex-col justify-start pt-4 md:pt-10">
            <AnimatePresence mode="wait">
                {showEmailGate ? (
                    <motion.div
                        key="email-gate"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full"
                    >
                        <div className="pa-card !h-auto !overflow-visible p-8 bg-[#0b1219] border border-white/10 shadow-2xl">
                        <EmailGate onSubmit={handleEmailSubmit} isLoading={isGeneratingPDF} />
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
                            <div className="pa-card !h-auto !overflow-visible p-6 md:p-10 min-h-[300px] flex flex-col gap-6 bg-[#0b1219] boundary border border-white/10 shadow-2xl relative">
                                <QuestionCard 
                                    question={currentQuestion}
                                    value={formData[currentQuestion.id]}
                                    onChange={handleOptionSelect}
                                />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </main>
      
      {/* Navigation Buttons - Stacked above Global Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#05090e]/95 backdrop-blur-md border-t border-white/5 p-4">
          <div className="max-w-2xl mx-auto w-full flex justify-between items-center px-2">
              {!showEmailGate && !showResults && (
                <>
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className={`
                            px-6 py-3 rounded-full bg-[#161b22] border border-white/10 text-white font-medium transition-colors hover:border-white/30 hover:bg-white/5 disabled:opacity-0
                        `}
                    >
                        Zurück
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!formData[currentQuestion? currentQuestion.id : ''] && currentQuestion?.type !== 'multiselect'} 
                        className="px-6 py-3 rounded-full bg-[#161b22] border border-white/10 text-white font-medium transition-colors hover:border-white/30 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {filteredQuestions && currentStep === filteredQuestions.length - 1 ? "Auswertung" : "Weiter"}
                    </button>
                </>
              )}
              
             {showEmailGate && (
                 <button onClick={handleBack} className="w-full text-center text-sm text-white/40 hover:text-white transition-colors">
                     Zurück zur Überprüfung
                 </button>
             )}
          </div>
      </div>

    </div>
  );
}
