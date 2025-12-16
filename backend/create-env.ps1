# Script para crear archivo .env desde template
# Ejecutar: .\create-env.ps1

$templateFile = "env.template"
$envFile = ".env"

if (Test-Path $envFile) {
    Write-Host "⚠ El archivo .env ya existe." -ForegroundColor Yellow
    $overwrite = Read-Host "¿Deseas sobrescribirlo? (s/n)"
    if ($overwrite -ne "s") {
        Write-Host "Operación cancelada." -ForegroundColor Red
        exit
    }
}

if (Test-Path $templateFile) {
    Copy-Item $templateFile $envFile
    Write-Host "✅ Archivo .env creado exitosamente desde $templateFile" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 IMPORTANTE: Edita el archivo .env y configura:" -ForegroundColor Yellow
    Write-Host "   - Credenciales de PostgreSQL" -ForegroundColor Yellow
    Write-Host "   - JWT_SECRET (cambia por uno seguro)" -ForegroundColor Yellow
    Write-Host "   - OPENAI_API_KEY (si vas a usar IA)" -ForegroundColor Yellow
} else {
    Write-Host "❌ Error: No se encontró el archivo $templateFile" -ForegroundColor Red
    exit 1
}

