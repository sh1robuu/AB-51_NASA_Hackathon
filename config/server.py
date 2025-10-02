#!/usr/bin/env python3
"""
Earth Saver Game Development Server
Automatically starts HTTP server and opens browser for debugging
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time
from pathlib import Path

# Configuration
DEFAULT_PORT = 8000
FALLBACK_PORTS = [8001, 8002, 8003, 8080, 3000]
GAME_URL_PATH = "/"  # Opens to index.html which has the splash screen

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Enhanced HTTP request handler with better logging and error handling"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def log_message(self, format, *args):
        """Override to provide colored console output"""
        timestamp = time.strftime('%H:%M:%S')
        message = format % args
        
        # Color coding for different request types
        if 'GET' in message:
            color = '\033[92m'  # Green
        elif 'POST' in message:
            color = '\033[94m'  # Blue
        elif '404' in message:
            color = '\033[91m'  # Red
        else:
            color = '\033[0m'   # Default
            
        print(f"{color}[{timestamp}] {message}\033[0m")
    
    def end_headers(self):
        """Add CORS headers for development"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def find_available_port(start_port=DEFAULT_PORT):
    """Find an available port starting from the default port"""
    import socket
    
    ports_to_try = [start_port] + FALLBACK_PORTS
    
    for port in ports_to_try:
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
                return port
        except socket.error:
            continue
    
    # If all predefined ports are busy, try to find any available port
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('localhost', 0))
        return s.getsockname()[1]

def open_browser_delayed(url, delay=2):
    """Open browser after a short delay to ensure server is ready"""
    def delayed_open():
        time.sleep(delay)
        print(f"\n🌍 Opening Earth Saver in your browser...")
        print(f"   URL: {url}")
        try:
            webbrowser.open(url)
        except Exception as e:
            print(f"   ⚠️  Could not auto-open browser: {e}")
            print(f"   📖 Please manually open: {url}")
    
    thread = threading.Thread(target=delayed_open, daemon=True)
    thread.start()

def print_startup_info(port, project_dir):
    """Print colorful startup information"""
    print("\n" + "="*60)
    print("🚀 \033[92mEarth Saver Development Server\033[0m 🌍")
    print("="*60)
    print(f"📁 Project Directory: \033[94m{project_dir}\033[0m")
    print(f"🌐 Server URL: \033[92mhttp://localhost:{port}\033[0m")
    print(f"🎮 Game URL: \033[92mhttp://localhost:{port}{GAME_URL_PATH}\033[0m")
    print("="*60)
    print("📋 Available Pages:")
    print("   • \033[93m/\033[0m                 - Splash screen (auto-redirects)")
    print("   • \033[93m/landing.html\033[0m     - Landing page for new users")
    print("   • \033[93m/homepage.html\033[0m    - User dashboard (requires login)")
    print("   • \033[93m/game.html\033[0m        - Quiz game (requires login)")
    print("="*60)
    print("💡 Development Tips:")
    print("   • Press \033[91mCtrl+C\033[0m to stop the server")
    print("   • Refresh browser to see code changes")
    print("   • Check browser console for JavaScript errors")
    print("   • Use browser dev tools for debugging")
    print("="*60)

def print_file_status():
    """Check and display status of important game files"""
    important_files = [
        'index.html',
        'src/landing.html', 
        'src/homepage.html',
        'src/game.html',
        'assets/css/pixel-styles.css',
        'assets/css/game-styles.css',
        'scripts/auth.js',
        'scripts/script.js',
        'scripts/questions.js'
    ]
    
    print("📁 File Status Check:")
    for file in important_files:
        if os.path.exists(file):
            size = os.path.getsize(file)
            print(f"   ✅ {file:<20} ({size:,} bytes)")
        else:
            print(f"   ❌ {file:<20} (missing)")
    print()

def main():
    """Main server function"""
    # Change to project root directory (parent of config folder)
    script_dir = Path(__file__).parent.parent.absolute()
    os.chdir(script_dir)
    
    print("\n🎮 \033[92mEarth Saver Game Server Starting...\033[0m")
    
    # Check if we're in the right directory
    if not os.path.exists('index.html'):
        print("\n❌ \033[91mError: index.html not found!\033[0m")
        print("   Make sure you're running this script from the project directory.")
        print(f"   Current directory: {os.getcwd()}")
        sys.exit(1)
    
    # Display file status
    print_file_status()
    
    # Find available port
    try:
        port = find_available_port()
    except Exception as e:
        print(f"❌ \033[91mError finding available port: {e}\033[0m")
        sys.exit(1)
    
    # Print startup information
    print_startup_info(port, script_dir)
    
    # Create server
    try:
        with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
            server_url = f"http://localhost:{port}{GAME_URL_PATH}"
            
            print(f"\n🚀 Server started successfully!")
            print(f"🌐 Serving at: \033[92m{server_url}\033[0m")
            
            # Open browser automatically
            open_browser_delayed(server_url)
            
            print(f"\n📡 Server is ready! Listening for requests...")
            print(f"   (Server logs will appear below)\n")
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\n\n🛑 \033[93mServer stopped by user (Ctrl+C)\033[0m")
        print("👋 Thanks for saving the Earth! 🌍")
    except PermissionError:
        print(f"\n❌ \033[91mPermission denied on port {port}\033[0m")
        print("   Try running as administrator or use a different port")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ \033[91mServer error: {e}\033[0m")
        sys.exit(1)

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n💥 \033[91mUnexpected error: {e}\033[0m")
        print("   Please check your Python installation and try again.")
        sys.exit(1)
