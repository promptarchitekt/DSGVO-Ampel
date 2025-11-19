import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white/80 backdrop-blur border-b border-slate-200">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="font-semibold text-lg text-slate-900">
                Compliance Studio
              </Link>
              <nav className="flex gap-4 text-sm font-medium text-slate-600">
                <Link
                  className="hover:text-blue-600 transition-colors"
                  href="/dsgvo-ampel"
                >
                  DSGVO Ampel
                </Link>
                <Link
                  className="hover:text-blue-600 transition-colors"
                  href="/ki-kompetenztest"
                >
                  KI Kompetenztest
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-white text-sm text-slate-500">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Compliance Studio</p>
              <div className="flex gap-6">
                <Link className="hover:text-blue-600" href="/impressum">
                  Impressum
                </Link>
                <Link className="hover:text-blue-600" href="/datenschutz">
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
