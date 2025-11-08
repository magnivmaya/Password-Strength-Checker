# Git Setup and Update Instructions

## Initial Setup (One-time)

### Option 1: Using the Batch Script (Easiest)
1. Double-click `setup-git.bat` in your project folder
2. Follow any prompts for GitHub authentication
3. Done!

### Option 2: Manual Setup via Command Line
Open PowerShell or Command Prompt in your project folder and run:

```bash
# Initialize Git (if not already done)
git init

# Add remote repository
git remote add origin git@github.com:magnivmaya/Password-Strength-Checker.git

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Updating Your Repository from Visual Studio

### Method 1: Using Visual Studio's Built-in Git Tools (Recommended)

1. **Open your project in Visual Studio**
   - File → Open → Folder (or Open Project)
   - Navigate to your Password-Strength-Checker folder

2. **Make your changes** to your files (HTML, CSS, JS, etc.)

3. **Commit your changes:**
   - Look at the bottom-right corner of Visual Studio for the Git icon
   - Click on it, or go to: **View → Git Changes** (or press `Ctrl+0, G`)
   - You'll see a list of changed files
   - Type a commit message (e.g., "Updated password strength algorithm")
   - Click **Commit All** or **Commit Staged**

4. **Push to GitHub:**
   - After committing, click the **Push** button (up arrow icon)
   - Or use the dropdown next to the commit button and select **Commit All and Push**

### Method 2: Using Visual Studio's Team Explorer

1. **Open Team Explorer:**
   - View → Team Explorer (or press `Ctrl+\, Ctrl+M`)

2. **Navigate to Changes:**
   - Click on **Changes** in the Team Explorer panel

3. **Stage and Commit:**
   - You'll see your modified files
   - Enter a commit message
   - Click **Commit All**

4. **Sync/Push:**
   - Go to **Sync** in Team Explorer
   - Click **Push** to upload your changes

### Method 3: Using Command Line in Visual Studio

1. **Open Terminal in Visual Studio:**
   - View → Terminal (or press `Ctrl+` `)

2. **Run these commands:**
   ```bash
   git add .
   git commit -m "Your commit message here"
   git push
   ```

---

## Quick Update Workflow (After Initial Setup)

Every time you make changes:

1. **Make your code changes** in Visual Studio
2. **Commit** (using any method above)
3. **Push** to GitHub

That's it! Your changes are now on GitHub.

---

## Troubleshooting

### If you get "remote origin already exists" error:
```bash
git remote remove origin
git remote add origin git@github.com:magnivmaya/Password-Strength-Checker.git
```

### If you get authentication errors:
- Make sure you have SSH keys set up with GitHub, OR
- Use HTTPS instead: `git remote set-url origin https://github.com/magnivmaya/Password-Strength-Checker.git`

### If you need to pull changes first:
```bash
git pull origin main
```

### To see your commit history:
```bash
git log
```

---

## Visual Studio Git Shortcuts

- `Ctrl+0, G` - Open Git Changes window
- `Ctrl+` ` - Open Terminal
- `Ctrl+\, Ctrl+M` - Open Team Explorer

---

## Tips

- **Commit often**: Make small, frequent commits rather than large ones
- **Write clear commit messages**: Describe what you changed and why
- **Pull before pushing**: If working on multiple computers, pull changes first
- **Use branches**: For larger features, create a branch first, then merge to main

---

## Common Git Commands Reference

```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your message"

# Push to GitHub
git push

# Pull from GitHub
git pull

# See what changed
git diff

# View commit history
git log --oneline
```

