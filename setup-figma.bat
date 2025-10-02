@echo off
REM Earth Saver - Quick Figma Setup
REM Runs the Figma integration setup script

echo ============================================
echo 🎨 Earth Saver - Figma Integration Setup
echo ============================================
echo.

REM Check if we're in the right directory
if not exist "index.html" (
    echo ❌ Error: Please run this from the project root directory
    echo    Make sure you can see index.html in the current folder
    pause
    exit /b 1
)

echo 🚀 Setting up Figma integration...
echo.

REM Run the setup script
python config\figma-quick-setup.py

echo.
echo ============================================
echo ✅ Setup Complete!
echo ============================================
echo.
echo 📋 What's Next:
echo    1. Design your homepage in Figma
echo    2. Export assets to: assets\images\figma\
echo    3. Copy CSS from Figma Dev Mode
echo    4. Paste CSS into: assets\css\figma\homepage-design.css
echo    5. Read full guide: assets\figma-integration-guide.md
echo.
echo 💡 Need help? Check the integration guide!
echo.
pause