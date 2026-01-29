import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNav } from "../components/TopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DSGVO Ampel & KI Kompetenztest",
  description:
    "Guided compliance tools for DSGVO readiness and AI Act skill checks.",
  metadataBase: new URL("https://dsgvo-ampel.promptarchitekt.de"),
  openGraph: {
    title: "DSGVO Ampel & KI Kompetenztest",
    description:
      "Guided compliance tools for DSGVO readiness and AI Act skill checks.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.className} text-[var(--pa-foreground)]`}>
        <div className="h-screen grid grid-rows-[auto_1fr_auto] overflow-hidden bg-[#0b0d10]">
          <header className="border-b border-white/10 bg-[#12151b]/90 backdrop-blur z-10">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="font-semibold text-lg text-white">
                DSGVO & KI-Compliance
              </Link>
              <TopNav />
            </div>
          </header>
          <main className="overflow-hidden bg-[#0b0d10]" style={{
            background: 'radial-gradient(circle at top, rgba(0, 250, 255, 0.12), transparent 45%), #0b0d10'
          }}>{children}</main>
          <footer className="border-t border-white/10 bg-[#12151b] text-sm text-white/50">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Compliance Studio</p>
              <div className="flex gap-6">
                <Link className="hover:text-[var(--pa-cyan)]" href="/impressum">
                  Impressum
                </Link>
                <Link className="hover:text-[var(--pa-cyan)]" href="/datenschutz">
                  Datenschutz
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
