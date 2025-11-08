# Running Your Website on Local Network

This guide shows you how to run your Password Strength Checker on your local network so other devices can access it.

## Quick Start 

### Option 1: Using Visual Studio (Recommended)

1. **Open Visual Studio**
2. **Open your project folder**: `Password-Strength-Checker`
3. **Open `server.py`** in Visual Studio
4. **Run the script**:
   - Press `F5` to run with debugging, OR 
   - Right-click on `server.py` → "Run Python File in Terminal"
   - Or use the terminal: `python server.py`

5. **The server will start** and show you:
   - Local access: `http://localhost:8000`
   - Network access: `http://YOUR_IP:8000`

6. **Share the network link** with devices on the same Wi-Fi network!

### Option 2: Using Command Line

1. Open PowerShell or Terminal in your project folder
2. Run:
   ```powershell
   python server.py
   ```
   or
   ```powershell
   python3 server.py
   ```

## Accessing from Other Devices

### On the Same Wi-Fi Network:

1. **Find your computer's IP address** (shown when server starts)
2. **On another device** (phone, tablet, another computer):
   - Open a web browser
   - Go to: `http://YOUR_IP:8000`
   - Example: `http://192.168.1.100:8000`

### Troubleshooting

**Can't access from other devices?**
- ✅ Make sure all devices are on the **same Wi-Fi network**
- ✅ Check Windows Firewall - it may block the connection
- ✅ Try disabling firewall temporarily to test
- ✅ Make sure Python is installed

**Windows Firewall Fix:**
1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Add Python or allow port 8000

**Port already in use?**
- Change `PORT = 8000` to another number (like 8080, 3000, etc.) in `server.py`

## Stopping the Server

Press `Ctrl+C` in the terminal/Visual Studio to stop the server.

## Moving to GitHub Later

This server script is just for local testing. When you're ready to deploy to GitHub:

1. **The server.py file is NOT needed** for GitHub Pages
2. **Just push your HTML, CSS, JS files** to GitHub
3. **Enable GitHub Pages** (see `DEPLOY_TO_GITHUB_PAGES.md`)
4. **Your site will be live** at: `https://magnivmaya.github.io/Password-Strength-Checker/`

The server script won't interfere with GitHub Pages deployment - it's just for local development!

## Notes

- ✅ No files are modified - this is just a simple web server
- ✅ Safe to use - only serves files, doesn't change anything
- ✅ Works with your existing code - no changes needed
- ✅ Easy to stop - just press Ctrl+C

Enjoy sharing your Password Strength Checker! 🎉

