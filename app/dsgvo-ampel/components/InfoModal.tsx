"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { useEffect } from "react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  links?: { text: string; url: string }[];
}

export function InfoModal({ isOpen, onClose, title, content, links }: InfoModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="pa-card w-full max-w-lg max-h-[80vh] overflow-y-auto !h-auto !bg-[#12151b] border border-[#00faff]/30 shadow-[0_0_50px_rgba(0,250,255,0.15)] relative flex flex-col gap-4 p-6 md:p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="text-white/80 space-y-4 leading-relaxed text-sm md:text-base">
                <p>{content}</p>
              </div>

              {/* Links */}
              {links && links.length > 0 && (
                <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wider text-white/40 font-semibold">Weiterführende Links</span>
                  {links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#00faff] hover:text-[#00faff]/80 transition-colors text-sm font-medium w-fit group"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      {link.text}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
