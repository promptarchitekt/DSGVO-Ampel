# Start DSGVO Ampel + KI-Kompetenztest lokal
# Usage: ./start-dsgvo-ampel.ps1

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  DSGVO Ampel & KI Kompetenztest - Dev" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  URL: http://localhost:3000" -ForegroundColor Green
Write-Host "  Host: localhost (PowerShell, kein CMD)" -ForegroundColor Green
Write-Host ""

$projectRoot = $PSScriptRoot
Set-Location $projectRoot

# Sicherstellen, dass keine alte Dev-Instanz den Port blockiert
$port = 3000
Write-Host "  Prüfe, ob Port $port bereits belegt ist..." -ForegroundColor Yellow
try {
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connections) {
        Write-Host "  Port $port ist belegt. Beende zugehörige Prozesse..." -ForegroundColor Yellow
        $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique
        foreach ($pid in $pids) {
            try {
                $proc = Get-Process -Id $pid -ErrorAction Stop
                Write-Host ("    Stoppe Prozess {0} (PID {1})" -f $proc.ProcessName, $pid) -ForegroundColor Yellow
                Stop-Process -Id $pid -Force -ErrorAction Stop
            }
            catch {
                Write-Host ("    Konnte Prozess mit PID {0} nicht beenden: {1}" -f $pid, $_.Exception.Message) -ForegroundColor Red
            }
        }
    }
    else {
        Write-Host "  Port $port ist frei." -ForegroundColor Green
    }
}
catch {
    Write-Host "  Hinweis: Konnte Port-Prüfung nicht ausführen. Führe trotzdem Start fort." -ForegroundColor DarkYellow
}

if (!(Test-Path "node_modules")) {
    Write-Host "  Installing dependencies (npm install)..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Dev-Server in neuem PowerShell-Fenster starten (kein CMD)
Write-Host "  Starte Entwicklungsserver (npm run dev) in separatem PowerShell-Fenster..." -ForegroundColor Green
$devCommand = "Set-Location `"$projectRoot`"; npm run dev"
Start-Process pwsh -ArgumentList "-NoLogo", "-Command", $devCommand | Out-Null

# Kurz warten und Health-Check ausführen
Start-Sleep -Seconds 6
Write-Host "  Prüfe, ob http://localhost:3000 erreichbar ist..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 400) {
        Write-Host "  Dev-Server antwortet mit Status $($response.StatusCode)." -ForegroundColor Green
        Start-Process "http://localhost:3000"
        Write-Host ""
        Write-Host "  Browser geöffnet. Zum Beenden Server-Fenster schließen." -ForegroundColor Yellow
    }
    else {
        Write-Host "  Server antwortet mit Status $($response.StatusCode). Bitte Logs im Dev-Fenster prüfen." -ForegroundColor Red
    }
}
catch {
    Write-Host "  Konnte http://localhost:3000 nicht erreichen. Bitte Dev-Fenster und Logs prüfen." -ForegroundColor Red
}

Write-Host ""
Read-Host "Enter drücken, um dieses Fenster zu schließen"

