# Connect GitHub to Cursor — short steps

Do these in order.

---

## Step 1: Create a token on GitHub

1. Open **[github.com](https://github.com)** in your browser and **sign in**.
2. Click your **profile picture** (top-right) → **Settings**.
3. In the left sidebar, scroll down and click **Developer settings**.
4. Click **Personal access tokens** → **Tokens (classic)**.
5. Click **Generate new token** → **Generate new token (classic)**.
6. **Note:** e.g. `Cursor`.
7. **Expiration:** e.g. 90 days or No expiration.
8. Under **Scopes**, tick **repo** (full control of private repositories).
9. Scroll down and click **Generate token**.
10. **Copy the token** (it looks like `ghp_xxxxxxxxxxxxxxxxxxxx`).  
    Save it in Notes or somewhere safe — GitHub shows it only once.

---

## Step 2: Add the token in Cursor

1. In **Cursor**, press **Cmd+,** to open Settings.
2. In the search box at the top, type **MCP**.
3. Open the **MCP** section (or **Features** → **MCP**).
4. Find **github** in the list of servers.
5. Click it to expand. Look for **Environment** or **Environment variables**.
6. Add one variable:
   - **Name:** `GITHUB_PERSONAL_ACCESS_TOKEN`
   - **Value:** paste your token (the `ghp_...` you copied).
7. Close Settings.

---

## Step 3: Restart Cursor

1. **Quit Cursor** completely (Cursor menu → Quit Cursor, or **Cmd+Q**).
2. Open **Cursor** again and open your project.

GitHub is now connected. You can ask Cursor to push code, create repos, or work with issues/PRs.

---

## If you see "Error - Show Output" on GitHub

1. **Click "Show Output"** (the grey link under the error). A panel will open with the real error message. Often it says the token is missing or invalid.
2. **Click the pencil (Edit) icon** next to the github entry. Make sure **Environment** has:
   - **Name:** `GITHUB_PERSONAL_ACCESS_TOKEN`
   - **Value:** your real token (starts with `ghp_...`), with no extra spaces.
3. **Save** and **restart Cursor** (Cmd+Q, then open again).
4. If it still fails: check on GitHub that the token wasn’t revoked (Settings → Developer settings → Personal access tokens) and that it has **repo** scope.

---

## Optional: Sign in with GitHub in Cursor (for Git in the sidebar)

1. **Cursor** menu → **Settings** → **Cursor Settings** (or **Account**).
2. Click **Sign in with GitHub** and approve in the browser.

This links your GitHub account for normal Git (commits, push, pull) in the Source Control panel.
