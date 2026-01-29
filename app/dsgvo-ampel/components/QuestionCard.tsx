"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question, QuestionOption } from "../data/questions";
import { HelpTooltip } from "./HelpTooltip";
import { ChevronDown, Check, Info, ExternalLink } from "lucide-react";
import { InfoModal } from "./InfoModal";

interface QuestionCardProps {
  question: Question;
  value: any;
  onChange: (val: any) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-indigo-400 font-medium uppercase tracking-wider">
            <span>{question.category}</span>
            {question.rechtsgrundlage && (
                <>
                <span className="text-white/20">•</span>
                <span className="text-white/40 text-xs">
                    {question.rechtsgrundlage}
                </span>
                </>
            )}
            </div>
            
            {question.infoCard && (
                <button 
                    onClick={() => setIsInfoOpen(true)}
                    className="pa-social-icon"
                    aria-label="Hintergrundinformationen anzeigen"
                >
                    <span className="font-bold font-serif italic text-lg leading-none">i</span>
                </button>
            )}
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold text-white leading-tight pr-8">
          {question.title}
          {question.helpText && <HelpTooltip text={question.helpText} />}
        </h2>
      </div>

      <div className="space-y-3">
        {question.type === "select" ? (
          <div className="relative">
            <select
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className="w-full appearance-none bg-[#1e293b] border-2 border-white/10 text-white rounded-xl p-4 pr-12 text-lg focus:border-indigo-500 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="" disabled>
                Bitte wählen...
              </option>
              {question.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        ) : (
          <div className="grid gap-3">
            {question.options.map((option) => {
              const isSelected = value === option.value;
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  onClick={() => onChange(option.value)}
                  className={`
                    relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group flex items-start gap-4
                    ${
                      isSelected
                        ? "bg-indigo-500/10 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                        : "bg-[#1e293b]/80 border-white/10 hover:border-white/30 hover:bg-[#253045] hover:shadow-lg hover:shadow-indigo-500/5"
                    }
                  `}
                >
                  <div
                    className={`
                    mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                    ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-white/20 group-hover:border-white/40"
                    }
                  `}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <span
                      className={`block font-medium text-lg mb-0.5 ${
                        isSelected ? "text-white" : "text-white/80"
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>

                  {Icon && isSelected && (
                     <Icon className={`w-5 h-5 ${option.color || "text-indigo-400"}`} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title={question.infoCard?.title || "Hintergrundinformationen"}
        content={question.infoCard?.content || ""}
        links={question.infoCard?.links}
      />
    </div>
  );
}
