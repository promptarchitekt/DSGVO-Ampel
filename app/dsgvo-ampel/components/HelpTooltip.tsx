"use client";

import { useState, useRef, useEffect } from "react";
import { HelpCircle, X } from "lucide-react";

interface HelpTooltipProps {
  text: string;
}

export function HelpTooltip({ text }: HelpTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-flex items-center ml-2" ref={tooltipRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`text-white/40 hover:text-white transition-colors p-1 rounded-full ${isOpen ? "text-white bg-white/10" : ""}`}
        aria-label={isOpen ? "Hilfe schließen" : "Hilfe anzeigen"}
        aria-expanded={isOpen}
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isOpen && (
        <div 
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 w-64 md:w-80 bg-[#1e293b] border border-white/10 rounded-lg shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-200"
          role="tooltip"
        >
          <div className="flex justify-between items-start gap-2 mb-2">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">
              Erklärung
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white"
              aria-label="Schließen"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            {text}
          </p>
          
          {/* Kleines Dreieck unten */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-[#1e293b]" />
        </div>
      )}
    </div>
  );
}
