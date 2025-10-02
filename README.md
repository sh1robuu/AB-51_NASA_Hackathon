# 🌍 Earth Saver - Pixel Art Environmental Quiz Game

A professionally organized, retro pixel art web-based quiz game where players answer environmental questions to save our planet! Complete with user accounts, achievements, leaderboards, and beautiful 8-bit style graphics.

## 🚀 Quick Start

### Option 1: Double-click to start (Windows)
```
📁 Double-click: config/start-server.bat
```

### Option 2: Command line
```bash
python config/server.py
```

### Option 3: VS Code
```
Ctrl+Shift+P → "Tasks: Run Build Task" → "Start Development Server"
```

The server will automatically:
- 🔍 Find an available port (8000, 8001, etc.)
- 🌐 Start the HTTP server
- 🚀 Open your browser to the game
- 📊 Show file status and development tips

## 📁 Project Structure

```
earth-saver-game/
├── index.html                    # Entry point with splash screen
├── 📂 src/                       # Source files (HTML pages)
│   ├── landing.html              # Landing page for new visitors  
│   ├── homepage.html             # User dashboard after login
│   └── game.html                 # Main quiz game interface
├── 📂 assets/                    # Static assets
│   ├── css/                      # Stylesheets
│   │   ├── pixel-styles.css      # Main pixel art CSS framework
│   │   ├── game-styles.css       # Game-specific pixel art styles
│   │   └── styles.css            # Legacy styles (backup)
│   └── images/                   # Images and media files
├── 📂 scripts/                   # JavaScript files
│   ├── auth.js                   # Authentication & user management
│   ├── script.js                 # Game logic and mechanics
│   └── questions.js              # Environmental questions database
├── 📂 config/                    # Development tools & configuration
│   ├── server.py                 # Development server with auto-browser
│   └── start-server.bat          # Windows batch file launcher
├── 📂 docs/                      # Documentation
│   └── README.md                 # Detailed project documentation
├── 📂 .vscode/                   # VS Code workspace configuration
│   └── tasks.json                # Development tasks
└── 📂 .github/                   # GitHub configuration
    └── copilot-instructions.md   # AI assistant instructions
```

## 🎮 Game Features

- **🎨 Pixel Art Style**: Complete retro 8-bit aesthetic
- **🏠 Landing Page**: Beautiful introduction with animated Earth
- **🔐 User System**: Registration, login, and persistent data
- **🏆 Dashboard**: Personal stats, achievements, and leaderboards  
- **🌍 Interactive Quiz**: Environmental questions with Earth health meter
- **📊 Progress Tracking**: Scores, streaks, and achievement system
- **📱 Responsive**: Works on desktop, tablet, and mobile

## 💻 Development

### File Organization Benefits
- **🔍 Easy Navigation**: Logical folder structure
- **🛠️ Clean Separation**: HTML, CSS, JS, and configs in dedicated folders
- **📦 Professional Layout**: Industry-standard project organization
- **🔧 Easy Debugging**: Development tools centralized in config/
- **📚 Clear Documentation**: All docs in dedicated folder

### Available Scripts
- **Development Server**: `python config/server.py`
- **Quick Launch**: Double-click `config/start-server.bat`
- **VS Code Task**: Ctrl+Shift+P → Run Build Task

### Development Tips
- 🔄 **Auto-reload**: Refresh browser to see changes
- 🧪 **Console**: Check browser dev tools for errors  
- 🎯 **Debugging**: All source maps and files organized clearly
- 📝 **Logs**: Server provides colored, detailed request logging

## 🌟 Technical Stack

- **HTML5**: Semantic structure organized in src/
- **CSS3**: Pixel art framework in assets/css/  
- **Vanilla JavaScript**: Game logic and auth in scripts/
- **Local Storage**: Persistent user data and progress
- **Python HTTP Server**: Development server with auto-browser
- **VS Code Integration**: Tasks and workspace configuration

## 📖 Documentation

Full documentation is available in the `docs/` folder:
- **README.md**: Detailed project information
- **File Structure**: Complete breakdown of organization
- **Development Guide**: Setup and contribution guidelines

## 🎯 Getting Started

1. **Clone/Download** the project
2. **Navigate** to the project folder
3. **Run** `python config/server.py` or double-click `config/start-server.bat`
4. **Play** and start saving the Earth! 🌍

---

**Ready to save the Earth with organized, professional code? Launch the server and start your eco-adventure! 🚀🌱**