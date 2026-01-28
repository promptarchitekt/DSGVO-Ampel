# Start DSGVO Ampel + KI-Kompetenztest lokal
# Usage: ./start-dsgvo-ampel.ps1

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  DSGVO Ampel & KI Kompetenztest - Dev" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  URL: http://localhost:3000" -ForegroundColor Green
Write-Host "  Server läuft in einem separaten Fenster." -ForegroundColor Yellow
Write-Host ""

$projectRoot = $PSScriptRoot
Set-Location $projectRoot

if (!(Test-Path "node_modules")) {
    Write-Host "  Installing dependencies (npm install)..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Dev-Server in neuem Terminalfenster starten
Write-Host "  Starte Entwicklungsserver (npm run dev)..." -ForegroundColor Green
$devCommand = "Set-Location `"$projectRoot`"; npm run dev"
Start-Process pwsh -ArgumentList "-NoLogo", "-Command", $devCommand | Out-Null

# Kurz warten und Browser öffnen
Start-Sleep -Seconds 4
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "  Browser geöffnet. Zum Beenden Server-Fenster schließen." -ForegroundColor Yellow
Write-Host ""

Read-Host "Enter drücken, um dieses Fenster zu schließen"

