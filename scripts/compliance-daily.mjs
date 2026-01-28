#!/usr/bin/env node

// Minimal compliance validation runner (MVP)
// - Reads audit-docs/compliance-automation.config.json
// - Checks docStandard (Zweck + ---) for audit-docs/*.md
// - Checks HTTP(S) links reachability
// - Writes a simple A–F style report to audit-docs/validations/YYYY-MM-DD.md

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, "..");
const AUDIT_DOCS_DIR = path.join(PROJECT_ROOT, "audit-docs");
const CONFIG_PATH = path.join(AUDIT_DOCS_DIR, "compliance-automation.config.json");
const VALIDATIONS_DIR = path.join(AUDIT_DOCS_DIR, "validations");

function loadConfig() {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("[compliance-daily] Failed to read config at", CONFIG_PATH);
    console.error(err);
    process.exit(1);
  }
}

function listMarkdownFiles(dir) {
  const result = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip validations and change-log (outputs)
      if (
        entry.name === "validations" ||
        entry.name === "change-log"
      ) {
        continue;
      }
      result.push(...listMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      result.push(fullPath);
    }
  }
  return result;
}

function checkDocStandard(filePath, content) {
  const rel = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, "/");
  const lines = content.split(/\r?\n/);
  let hasTitle = false;
  let hasZweck = false;
  let hasSeparator = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!hasTitle && line.startsWith("# ")) {
      hasTitle = true;
    }
    if (!hasZweck && line.startsWith("**Zweck**")) {
      hasZweck = true;
    }
    if (!hasSeparator && line === "---") {
      hasSeparator = true;
    }
    if (hasTitle && hasZweck && hasSeparator) break;
  }

  const issues = [];
  if (!hasTitle) issues.push("missing H1 title");
  if (!hasZweck) issues.push("missing **Zweck**");
  if (!hasSeparator) issues.push("missing --- separator");

  return { rel, ok: issues.length === 0, issues };
}

function extractLinks(content) {
  const regex = /https?:\/\/[^\s)]+/g;
  const links = new Set();
  let match;
  while ((match = regex.exec(content)) !== null) {
    links.add(match[0]);
  }
  return Array.from(links);
}

async function checkLinks(links) {
  const results = [];
  for (const url of links) {
    let status = null;
    let ok = false;
    let error = null;
    try {
      const res = await fetch(url, { method: "HEAD" });
      status = res.status;
      ok = status >= 200 && status < 400;
      // Some servers might not support HEAD; fallback to GET if HEAD fails hard
      if (!ok && (status === 405 || status === 501)) {
        const resGet = await fetch(url, { method: "GET" });
        status = resGet.status;
        ok = status >= 200 && status < 400;
      }
    } catch (e) {
      error = String(e);
    }
    results.push({ url, ok, status, error });
  }
  return results;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function todayString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

async function main() {
  console.log("[compliance-daily] Starting minimal validation run...");
  const config = loadConfig();

  const checkDocStandardEnabled = config.checks?.docStandard !== false;
  const checkLinksEnabled = config.checks?.links !== false;

  const mdFiles = listMarkdownFiles(AUDIT_DOCS_DIR);
  console.log(`[compliance-daily] Found ${mdFiles.length} markdown files in audit-docs.`);

  const docStandardFindings = [];
  const allLinks = new Set();

  for (const filePath of mdFiles) {
    const content = fs.readFileSync(filePath, "utf8");

    if (checkDocStandardEnabled) {
      const res = checkDocStandard(filePath, content);
      if (!res.ok) {
        docStandardFindings.push(res);
      }
    }

    if (checkLinksEnabled) {
      const links = extractLinks(content);
      for (const l of links) allLinks.add(l);
    }
  }

  let linkFindings = [];
  if (checkLinksEnabled && allLinks.size > 0) {
    console.log(`[compliance-daily] Checking ${allLinks.size} unique links...`);
    linkFindings = await checkLinks(Array.from(allLinks));
  }

  // Build report
  ensureDir(VALIDATIONS_DIR);
  const dateStr = todayString();
  const reportPath = path.join(VALIDATIONS_DIR, `${dateStr}.md`);

  const totalFiles = mdFiles.length;
  const totalDocStandardIssues = docStandardFindings.length;
  const totalLinks = allLinks.size;
  const brokenLinks = linkFindings.filter((l) => !l.ok);

  const lines = [];
  lines.push(`# Compliance-Validierungsreport (MVP) – ${dateStr}`);
  lines.push("");
  lines.push("**Zweck**: Minimaler täglicher Prüfbericht für `audit-docs` (Dokumentenstandard, Links).");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## A) Einordnung");
  lines.push("");
  lines.push("- Bereich: `audit-docs`");
  lines.push(`- Geprüfte Dateien (.md): ${totalFiles}`);
  lines.push(`- Aktivierte Checks: docStandard=${checkDocStandardEnabled}, links=${checkLinksEnabled}`);
  lines.push("");
  lines.push("## B) Fakten");
  lines.push("");
  lines.push(`- Dokumentenstandard-Verstöße: ${totalDocStandardIssues}`);
  lines.push(`- Gefundene Links (einzigartig): ${totalLinks}`);
  lines.push(`- Problematische Links: ${brokenLinks.length}`);
  lines.push("");
  if (totalDocStandardIssues > 0) {
    lines.push("### Details Dokumentenstandard-Verstöße");
    lines.push("");
    for (const f of docStandardFindings) {
      lines.push(`- ${f.rel}: ${f.issues.join(", ")}`);
    }
    lines.push("");
  }
  if (brokenLinks.length > 0) {
    lines.push("### Details problematische Links");
    lines.push("");
    for (const l of brokenLinks) {
      lines.push(`- ${l.url} (Status: ${l.status ?? "n/a"}, Fehler: ${l.error ?? "–"})`);
    }
    lines.push("");
  }

  lines.push("## C) Plausibilitätscheck");
  lines.push("");
  lines.push("- Normen-Konfiguration (Config.norms): " + JSON.stringify(config.norms ?? []));
  lines.push("- Grundannahme: Alle relevanten fachlichen Dokumente liegen in `audit-docs/`.");
  lines.push("");

  lines.push("## D) Empfehlung");
  lines.push("");
  if (totalDocStandardIssues === 0 && brokenLinks.length === 0) {
    lines.push("- Aktuell keine unmittelbaren Handlungsbedarfe aus diesem MVP-Lauf.");
  } else {
    if (totalDocStandardIssues > 0) {
      lines.push("- Dokumentenstandard-Verstöße in den oben genannten Dateien beheben (Zweck/--- ergänzen).");
    }
    if (brokenLinks.length > 0) {
      lines.push("- Problematische Links prüfen und ggf. korrigieren oder entfernen.");
    }
  }
  lines.push("");

  lines.push("## E) Unsicherheiten");
  lines.push("");
  lines.push("- Diese MVP-Version prüft noch keine Gesetzeslage/Primärquellen.");
  lines.push("- Externe Links können temporär fehlschlagen (z. B. 5xx), ohne dass dies ein echtes Compliance-Problem ist.");
  lines.push("");

  lines.push("## F) Quellen");
  lines.push("");
  lines.push("- Interne Quelle: `audit-docs/*.md` in diesem Repository.");
  if (allLinks.size > 0) {
    lines.push("- Externe Links (geprüft):");
    for (const l of allLinks) {
      lines.push(`  - ${l}`);
    }
  } else {
    lines.push("- Keine externen Links gefunden.");
  }
  lines.push("");

  fs.writeFileSync(reportPath, lines.join("\n"), "utf8");
  console.log("[compliance-daily] Report written to", path.relative(PROJECT_ROOT, reportPath));

  // latest-divergence (MVP: einfach Kopie des Reports)
  const latestPath = path.join(VALIDATIONS_DIR, "latest-divergence.md");
  fs.writeFileSync(latestPath, lines.join("\n"), "utf8");
  console.log("[compliance-daily] Latest divergence written to", path.relative(PROJECT_ROOT, latestPath));

  console.log("[compliance-daily] Done.");
}

main().catch((err) => {
  console.error("[compliance-daily] Unhandled error:", err);
  process.exit(1);
});

