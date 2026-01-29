"use client";

import { useState } from "react";
import { Loader2, ArrowRight, Lock, CheckCircle2 } from "lucide-react";

interface EmailGateProps {
  onSubmit: (data: { email: string; newsletter: boolean }) => void;
  isLoading: boolean;
}

export function EmailGate({ onSubmit, isLoading }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
    setError("");
    onSubmit({ email, newsletter });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mb-4">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-semibold text-white">
          Analyse abgeschlossen
        </h2>
        <p className="text-white/60">
          Geben Sie Ihre E-Mail ein, um Ihre Auswertung und die Handlungsempfehlungen sofort freizuschalten.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-white/80">
            E-Mail-Adresse
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ihre.email@firma.de"
            className={`
              w-full bg-[#1e293b] border-2 text-white rounded-xl p-3 outline-none transition-colors
              ${
                error
                  ? "border-red-500 focus:border-red-500"
                  : "border-white/10 focus:border-indigo-500"
              }
            `}
            disabled={isLoading}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-white/5">
          <div className="relative flex items-center">
            <input
              id="newsletter"
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-white/20 bg-[#1e293b] checked:border-indigo-500 checked:bg-indigo-500 transition-all"
            />
            <CheckCircle2 className="pointer-events-none absolute h-3.5 w-3.5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
          <label htmlFor="newsletter" className="text-sm text-white/60 cursor-pointer select-none leading-tight pt-0.5">
            Ich möchte auch Tipps & Updates zur DSGVO-Compliance erhalten (jederzeit abbestellbar).
          </label>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Wird generiert...</span>
            </>
          ) : (
            <>
              <span>Ergebnis anzeigen</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-white/30">
          Wir behandeln Ihre Daten vertraulich gemäß unserer Datenschutzerklärung.
        </p>
      </form>
    </div>
  );
}
