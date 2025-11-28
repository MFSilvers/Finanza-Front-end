# Script di Avvio Rapido - Finanze App
# Esegui questo script per avviare rapidamente l'applicazione

Write-Host "🚀 Avvio Finanze App..." -ForegroundColor Cyan
Write-Host ""

# Verifica prerequisiti
Write-Host "📋 Verifica prerequisiti..." -ForegroundColor Yellow

# Verifica PHP
try {
    $phpVersion = php -v 2>&1 | Select-String -Pattern "PHP (\d+\.\d+)" | ForEach-Object { $_.Matches.Groups[1].Value }
    if ($phpVersion) {
        Write-Host "✅ PHP $phpVersion trovato" -ForegroundColor Green
    } else {
        Write-Host "❌ PHP non trovato!" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ PHP non trovato! Installa PHP 8+ per continuare." -ForegroundColor Red
    exit 1
}

# Verifica Node.js
try {
    $nodeVersion = node -v 2>&1
    if ($nodeVersion) {
        Write-Host "✅ Node.js $nodeVersion trovato" -ForegroundColor Green
    } else {
        Write-Host "❌ Node.js non trovato!" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Node.js non trovato! Installa Node.js per continuare." -ForegroundColor Red
    exit 1
}

# Verifica pnpm
try {
    $pnpmVersion = pnpm -v 2>&1
    if ($pnpmVersion) {
        Write-Host "✅ pnpm $pnpmVersion trovato" -ForegroundColor Green
    } else {
        Write-Host "⚠️  pnpm non trovato. Installazione in corso..." -ForegroundColor Yellow
        npm install -g pnpm
        Write-Host "✅ pnpm installato" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  pnpm non trovato. Installazione in corso..." -ForegroundColor Yellow
    npm install -g pnpm
}

Write-Host ""
Write-Host "📦 Verifica dipendenze frontend..." -ForegroundColor Yellow

# Verifica se node_modules esiste
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "⚠️  Dipendenze frontend non trovate. Installazione in corso..." -ForegroundColor Yellow
    Set-Location frontend
    pnpm install
    Set-Location ..
    Write-Host "✅ Dipendenze installate" -ForegroundColor Green
} else {
    Write-Host "✅ Dipendenze frontend già installate" -ForegroundColor Green
}

Write-Host ""
Write-Host "⚠️  IMPORTANTE: Assicurati di aver completato questi passaggi:" -ForegroundColor Yellow
Write-Host "   1. MySQL deve essere in esecuzione" -ForegroundColor White
Write-Host "   2. Database 'finanze_app' deve essere creato (esegui database/schema.sql)" -ForegroundColor White
Write-Host "   3. Credenziali database configurate in backend/config/database.php" -ForegroundColor White
Write-Host ""

$response = Read-Host "Vuoi continuare con l'avvio? (S/N)"
if ($response -ne "S" -and $response -ne "s") {
    Write-Host "Avvio annullato." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🔥 Avvio server..." -ForegroundColor Cyan
Write-Host ""

# Funzione per avviare il backend
function Start-Backend {
    Write-Host "📡 Avvio Backend su http://localhost:8000..." -ForegroundColor Cyan
    Set-Location backend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "php -S localhost:8000"
    Set-Location ..
    Start-Sleep -Seconds 2
}

# Funzione per avviare il frontend
function Start-Frontend {
    Write-Host "🎨 Avvio Frontend su http://localhost:5173..." -ForegroundColor Cyan
    Set-Location frontend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "pnpm dev"
    Set-Location ..
    Start-Sleep -Seconds 3
}

# Avvia backend e frontend
Start-Backend
Start-Frontend

Write-Host ""
Write-Host "✅ Server avviati!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend API: http://localhost:8000/api" -ForegroundColor White
Write-Host ""
Write-Host "👤 Credenziali Demo:" -ForegroundColor Cyan
Write-Host "   Email: demo@finanze.app" -ForegroundColor White
Write-Host "   Password: demo123" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Per fermare i server, chiudi le finestre PowerShell aperte." -ForegroundColor Yellow
Write-Host ""
Write-Host "🎉 Buon lavoro!" -ForegroundColor Green

