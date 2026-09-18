@echo off
setlocal
title MediShare Decentralized Healthcare Launcher

echo ======================================================================
echo  Starting MediShare Decentralized Healthcare & Verification Hub
echo ======================================================================
echo.

set "ROOT_DIR=%~dp0"

echo [1/3] Launching MediShare Frontend (Vite on http://localhost:5173)...
start "1 - MediShare Frontend (Vite)" cmd /k "cd /d "%ROOT_DIR%frontend" && npm run dev"

echo [2/3] Launching Hardhat Local Blockchain Node (Port 8545)...
start "2 - Hardhat Blockchain Node" cmd /k "cd /d "%ROOT_DIR%backend" && npx hardhat node"

echo.
echo Waiting 4 seconds for Hardhat Node to initialize before deploying smart contracts...
timeout /t 4 /nobreak >nul

echo [3/3] Deploying MediShare Smart Contract and Starting Express Backend (Port 5000)...
start "3 - MediShare Express API" cmd /k "cd /d "%ROOT_DIR%backend" && npx hardhat run scripts/deploy.js --network localhost && npm run start"

echo.
echo ======================================================================
echo  MediShare services are running in their dedicated terminal windows:
echo.
echo   1. Frontend App:         http://localhost:5173
echo   2. Hardhat EVM Node:     http://127.0.0.1:8545
echo   3. MediShare Express API: http://localhost:5000
echo ======================================================================
echo.
pause
