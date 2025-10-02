@echo off
title Earth Saver Development Server

echo.
echo 🚀 Starting Earth Saver Development Server...
echo.

REM Change to the project root directory (parent of config folder)
cd /d "%~dp0\.."

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH!
    echo    Please install Python 3.x and try again.
    echo    Download from: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Check if server.py exists
if not exist "config\server.py" (
    echo ❌ server.py not found!
    echo    Make sure you're running this from the project directory.
    pause
    exit /b 1
)

REM Run the server
python config\server.py

REM Keep window open if there was an error
if errorlevel 1 (
    echo.
    echo ⚠️  Server stopped with an error.
    pause
)