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
  metadataBase: new URL("https://example.com"),
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
      <body className={`${inter.className} bg-[var(--pa-bg)] text-[var(--pa-foreground)]`}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-white/10 bg-[#0B1219]/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="font-semibold text-lg text-[var(--pa-foreground)]">
                Compliance Studio
              </Link>
              <TopNav />
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/10 bg-[#0B1219] text-sm text-[var(--pa-muted)]">
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
