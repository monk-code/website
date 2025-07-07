---
description: Verify UI changes in browser with screenshots
allowed-tools: 
  - mcp__playwright__browser_navigate
  - mcp__playwright__browser_take_screenshot
  - mcp__playwright__browser_click
  - mcp__playwright__browser_snapshot
  - mcp__playwright__browser_resize
  - mcp__playwright__browser_wait_for
  - mcp__playwright__browser_console_messages
  - Bash
---

## UI Verification Process

This command verifies UI changes by taking screenshots in both light and dark modes.

### Steps:

1. **Check/Start UI Server**:
   ```bash
   lsof -i :4322 || pnpm dev:ui
   ```
   Wait a moment for the server to start if it wasn't already running.

2. **Navigate to Page**:
   Navigate to the page you want to verify. Use `$ARGUMENTS` to specify a path.
   - Default (no args): Homepage
   - With args: `/project:verify-ui /about` goes to /about page

3. **Screenshot Light Mode**:
   Take a screenshot of the current (light) state.

4. **Toggle Theme**:
   Click the theme toggle button to switch to dark mode.

5. **Wait for Animation**:
   Wait 0.5 seconds for theme transition to complete.

6. **Screenshot Dark Mode**:
   Take a screenshot of the dark mode state.

7. **Show Results**:
   Display both screenshots to verify visual correctness.

### Usage Examples:
- `/project:verify-ui` - Verify homepage
- `/project:verify-ui /about` - Verify about page
- `/project:verify-ui /projects` - Verify projects page

### Tips:
- Port 4322 is dedicated for AI verification (keeps human dev port 4321 free)
- Screenshots are saved with timestamps in `ai-workspace/screenshots/`
- Reuse the same browser tab for multiple verifications
- The dev server stays running between verifications (HMR handles updates)