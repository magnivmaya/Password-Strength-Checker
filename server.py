#!/usr/bin/env python3
"""
Simple HTTP Server for Password Strength Checker
Run this script to make your website accessible on your local network.
"""

import http.server
import socketserver
import socket
import webbrowser
from pathlib import Path

# Configuration
PORT = 8000
HOST = '0.0.0.0'  # Makes it accessible on local network

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom request handler with better error messages"""
    
    def end_headers(self):
        # Add CORS headers to allow access from other devices
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        """Custom log format"""
        print(f"[{self.log_date_time_string()}] {format % args}")

def get_local_ip():
    """Get the local IP address of this machine"""
    try:
        # Connect to a remote address to determine local IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def main():
    """Start the HTTP server"""
    # Change to the script's directory
    script_dir = Path(__file__).parent
    import os
    os.chdir(script_dir)
    
    # Create server
    with socketserver.TCPServer((HOST, PORT), MyHTTPRequestHandler) as httpd:
        local_ip = get_local_ip()
        
        print("=" * 60)
        print("🔐 Password Strength Checker - Local Server")
        print("=" * 60)
        print(f"\n✅ Server is running!")
        print(f"\n📍 Access your website from:")
        print(f"   • This computer:     http://localhost:{PORT}")
        print(f"   • This computer:     http://127.0.0.1:{PORT}")
        print(f"   • Local network:     http://{local_ip}:{PORT}")
        print(f"\n📱 Share this link with devices on your network:")
        print(f"   http://{local_ip}:{PORT}")
        print(f"\n⚠️  Make sure devices are on the same Wi-Fi network!")
        print(f"\n🛑 Press Ctrl+C to stop the server")
        print("=" * 60)
        print("\nOpening browser...")
        
        # Open browser automatically
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except:
            pass
        
        print("\nServer is running. Waiting for connections...\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped by user")
            print("Thank you for using Password Strength Checker!")

if __name__ == "__main__":
    main()

