# UI/UX Development Process Guide

This document provides detailed methodologies for UI/UX development work, expanding on the non-negotiable rules in CLAUDE.md.

## Core Principles

1. **Verify Everything** - Never assume a change worked
2. **Debug First, Fix Second** - Understand the problem before implementing solutions
3. **One Change at a Time** - Make incremental, verifiable progress
4. **Document as You Go** - Record what works and what doesn't

## Systematic Debugging Process

### 1. Initial Investigation

Before making ANY changes:

```bash
# 1. Check if dev server is running and rebuilding
# Look for rebuild messages in terminal when saving files

# 2. Hard refresh the browser
# Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows/Linux)

# 3. Open browser dev tools
# Right-click → Inspect → Elements tab
```

### 2. CSS Debugging Checklist

- [ ] **Check Computed Styles**
  - Select element in inspector
  - Look at "Computed" tab to see actual applied styles
  - Check which CSS rules are being overridden (crossed out)
  
- [ ] **Verify CSS Variables**
  - In console: `getComputedStyle(document.documentElement).getPropertyValue('--color-card-bg')`
  - Check both light and dark mode values
  
- [ ] **Check CSS File Loading**
  - Network tab → Filter by CSS
  - Verify CSS files are loading and not cached
  - Look for 404 errors
  
- [ ] **Test Theme Switching**
  - `document.documentElement.setAttribute('data-theme', 'dark')`
  - `document.documentElement.setAttribute('data-theme', 'light')`
  - Verify CSS variables update

### 3. Common CSS Issues & Solutions

#### Issue: Changes Not Reflected
1. **Cache Issues**
   ```bash
   # Clear build cache
   rm -rf .astro/ dist/ node_modules/.vite/
   
   # Restart dev server
   npm run dev
   ```

2. **CSS Specificity**
   - Check if other rules are overriding your changes
   - Use browser inspector to see specificity
   - Avoid !important unless absolutely necessary

3. **Build Pipeline Issues**
   - Check if using correct CSS syntax for the framework
   - Verify preprocessor/PostCSS is working
   - Look for build errors in terminal

#### Issue: Dark Mode Not Working
1. **Check Theme Application**
   ```javascript
   // In browser console
   document.documentElement.getAttribute('data-theme') // Should return 'dark' or 'light'
   ```

2. **Verify CSS Variables**
   - Ensure variables are defined for both themes
   - Check variable inheritance and overrides
   - Use computed styles to see actual values

## Framework-Specific Guidelines

### Tailwind CSS v4 + Astro

1. **Understanding @theme Directive**
   - New in v4: `@theme` defines design tokens
   - These become CSS custom properties
   - May not generate utility classes automatically

2. **Debugging Tailwind Classes**
   ```bash
   # Check if class exists in generated CSS
   # In browser dev tools, search CSS files for the class name
   ```

3. **When Utilities Don't Work**
   - Use CSS custom properties directly
   - Check Tailwind config and build process
   - Verify version compatibility

### Vue + Scoped Styles

1. **Scoped vs Global**
   - Scoped styles only affect current component
   - Use `:global()` for global selectors
   - Check data-v-* attributes in DOM

2. **Style Priority**
   - Inline styles > Scoped styles > Global styles
   - Later-defined styles override earlier ones
   - Check component load order

## Testing Workflows

### Visual Testing with Playwright

```javascript
// 1. Navigate to page
await page.goto('http://localhost:4321')

// 2. Take light mode screenshot
await page.screenshot({ path: 'light-mode.png', fullPage: true })

// 3. Switch to dark mode
await page.evaluate(() => {
  document.documentElement.setAttribute('data-theme', 'dark')
})

// 4. Wait for transition
await page.waitForTimeout(500)

// 5. Take dark mode screenshot
await page.screenshot({ path: 'dark-mode.png', fullPage: true })

// 6. Compare visually
```

### Manual Testing Checklist

- [ ] Light mode appearance
- [ ] Dark mode appearance  
- [ ] Theme transition smoothness
- [ ] Hover states
- [ ] Focus states
- [ ] Responsive behavior
- [ ] Cross-browser compatibility

## Common Pitfalls

1. **Making Multiple Changes at Once**
   - Hard to identify what fixed/broke things
   - Always make one change and verify

2. **Not Checking Computed Styles**
   - What you write isn't always what gets applied
   - Always verify in browser inspector

3. **Assuming Framework Features Work**
   - Alpha/beta features may have bugs
   - Test framework features in isolation first

4. **Not Clearing Caches**
   - Browsers cache aggressively
   - Build tools have caches too
   - When in doubt, clear everything

## Documentation Template

When debugging UI issues, document:

```markdown
## Issue: [Description]

### Symptoms
- What you see vs what you expect

### Investigation
- What you checked in dev tools
- CSS rules that are/aren't applying
- Console errors (if any)

### Root Cause
- Why it's happening

### Solution
- What actually fixed it
- Why this solution works

### Verification
- Screenshots before/after
- How you tested the fix
```

## Incremental Development Process

1. **Make Plan**
   - Identify smallest possible change
   - Predict what should happen

2. **Make Change**
   - Edit ONE thing
   - Save file

3. **Verify Change**
   - Refresh browser
   - Check dev tools
   - Take screenshot if visual

4. **Document Result**
   - Did it work as expected?
   - If not, why?

5. **Commit if Working**
   - Git commit working state
   - Can always revert if needed

6. **Repeat**

## Emergency Procedures

When completely stuck:

1. **Reset Everything**
   ```bash
   # Stop dev server
   # Clear all caches
   rm -rf .astro/ dist/ node_modules/.vite/ .turbo/
   
   # Clear browser cache for localhost
   
   # Restart fresh
   npm install
   npm run dev
   ```

2. **Create Minimal Test Case**
   - New HTML file with just the problem element
   - Add CSS directly to verify it works
   - Gradually add complexity

3. **Check Framework Issues**
   - Search GitHub issues
   - Check version compatibility
   - Try downgrading if using alpha/beta

## Lessons Learned Log

### CSS Not Updating (Date: Current)
- **Issue**: Changes to CSS files not reflected in browser
- **Cause**: [To be determined through investigation]
- **Solution**: [To be documented after fix]
- **Prevention**: Always verify changes in browser before claiming "fixed"

[Add new lessons as they're learned]