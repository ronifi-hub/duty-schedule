# How to Connect Cursor to Figma and GitHub (Step-by-Step)

This guide is written for non-developers. Do the steps in order.

---

## Part 1: Restart Cursor (do this first)

1. **Quit Cursor completely**
   - On Mac: click **Cursor** in the menu bar → **Quit Cursor** (or press **Cmd+Q**).
   - Don’t just close the window; make sure Cursor is not running (no Cursor icon in the menu bar).
2. **Open Cursor again** and open your project (the `curser` folder).
3. Cursor will now see the new Figma and GitHub connections we added.

---

## Part 2: Connect Cursor to Figma (designs → code) — always connected

**What this does:** Lets Cursor read your Figma designs so it can help you turn them into code (e.g. HTML/CSS). We use Figma’s **remote** connection so it stays connected — you do **not** need to keep the Figma app open.

### Step 1: Connect Figma once (then it stays connected)

1. **Restart Cursor** (Part 1) so it loads the Figma remote server.
2. In Cursor, open **Settings** (**Cmd+,**).
3. Search for **MCP** (or go to **Features** → **MCP**).
4. Find **figma** in the list of MCP servers.
5. Click **Connect** (or **Authenticate** / **Sign in**).
6. Your browser will open — **log in to Figma** if asked and **allow** Cursor to access your Figma account.
7. When you see a success message, you’re done. Figma is now **always connected** to Cursor. You don’t need to open the Figma app or turn on Dev Mode each time.

### Step 2: Use it in Cursor

- Any time you’re in Cursor:
  - Copy a **Figma link** (e.g. right‑click a frame in Figma → “Copy link to selection”, or copy from the browser).
  - Paste the link in Cursor chat and ask e.g. “Implement this design as HTML” or “Create a React component from this.”
- Cursor will use your Figma designs to generate or adjust code. No plugin and no need to have Figma open.

### If you prefer the desktop-app method (optional)

If you want to use the **Figma desktop app** and “Enable desktop MCP server” in Dev Mode instead, that’s possible too — but then Figma is only connected while the app is open with that option on. The **remote** connection above is the one that stays on all the time.

---

## Part 3: Connect Cursor to GitHub (your code on the web)

**What this does:** Lets Cursor work with your code that’s stored on GitHub (create repos, push code, see issues, etc.) from inside Cursor.

### Step 1: Create a GitHub account (if you don’t have one)

1. Go to [https://github.com](https://github.com).
2. Click **Sign up** and create an account (email + password).

### Step 2: Create a “Personal Access Token” (this is like a password for Cursor)

1. **Sign in** to GitHub in your browser.
2. Click your **profile picture** (top-right) → **Settings**.
3. In the left sidebar, scroll down to **Developer settings** → click it.
4. Click **Personal access tokens** → **Tokens (classic)**.
5. Click **Generate new token** → **Generate new token (classic)**.
6. Give it a name, e.g. **“Cursor”**.
7. Choose how long it lasts (e.g. **90 days** or **No expiration** — your choice).
8. Under **Scopes**, tick **repo** (this gives Cursor access to your repositories).
9. Scroll down and click **Generate token**.
10. **Copy the token** (it looks like `ghp_xxxxxxxxxxxx`) and paste it somewhere safe (e.g. Notes).  
    **Important:** GitHub will only show it once. If you lose it, you’ll need to create a new token.

### Step 3: Put the token into Cursor

**Option A – Using Cursor’s MCP settings (recommended)**

1. In Cursor, open **Settings**:
   - Mac: **Cursor** menu → **Settings**, or press **Cmd+,**.
2. In the search box at the top, type **MCP**.
3. Open the **MCP** or **Features → MCP** section.
4. Find the **github** server in the list.
5. There should be a place to add **environment variables** or **Environment**.
6. Add:
   - **Name:** `GITHUB_PERSONAL_ACCESS_TOKEN`
   - **Value:** paste your token (the `ghp_...` you copied).
7. Save/close settings and **restart Cursor** (Part 1 again).

**Option B – Using a file Cursor can read (alternative)**

If you can’t find the MCP environment in Cursor:

1. Open **Terminal** (search “Terminal” in Spotlight with **Cmd+Space**).
2. Type this (replace `YOUR_TOKEN_HERE` with your real token):
   ```bash
   echo 'export GITHUB_PERSONAL_ACCESS_TOKEN="YOUR_TOKEN_HERE"' >> ~/.zshrc
   ```
3. Press Enter.
4. **Quit Cursor completely** and open it again **from Terminal** so it sees the token:
   - In Terminal type: `cursor /Users/ronifi/curser` and press Enter  
   (or open Cursor normally if you usually start it from the Dock).

### Step 4: Sign in to GitHub inside Cursor (optional but useful)

1. In Cursor: **Cursor** menu → **Settings** → **Cursor Settings** (or **Account**).
2. Look for **Sign in** or **Account** and choose **Sign in with GitHub**.
3. A browser window will open; approve so Cursor can use your GitHub account.

This helps Cursor know who you are for Git (version control) and GitHub.

---

## Quick checklist

- [ ] Restart Cursor (Part 1).
- [ ] **Figma:** Figma desktop app installed, Dev Mode MCP server turned on when you want to use it.
- [ ] **GitHub:** Token created on GitHub, token added in Cursor MCP (or in `~/.zshrc`), Cursor restarted.
- [ ] **GitHub (optional):** Signed in with GitHub in Cursor Settings.

---

## If something doesn’t work

- **Figma:** Make sure Figma **desktop app** is open and the MCP/Dev Mode server is enabled. The free Figma plan may not have this; you may need a paid plan.
- **GitHub:** Make sure the token was copied with no extra spaces, and that you restarted Cursor after adding it.
- You can always come back to this file (`CURSOR_FIGMA_GITHUB_SETUP.md`) and follow the steps again.
