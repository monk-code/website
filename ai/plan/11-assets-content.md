# Step 11: Assets & Content

## Goal
Replace all placeholder content with real assets and finalize the website content for production.

## Prerequisites
- Completed Step 10: Full website structure ready
- All components built and integrated

## Assets Checklist

### 1. Logo Files

#### Required Files:
```
public/
├── logo-icon.svg          # Circular "m" logo
├── logo-full.svg          # Full "monkcode" wordmark
├── favicon.ico           # Browser favicon
├── favicon-16x16.png     # 16px favicon
├── favicon-32x32.png     # 32px favicon
├── apple-touch-icon.png  # 180x180 Apple devices
└── android-chrome-*.png  # Android icons
```

#### Creating Logo Files:
```bash
# If you have a high-res logo, generate favicons:
# Using an online tool like https://favicon.io or https://realfavicongenerator.net

# Or use ImageMagick locally:
convert logo-icon.svg -resize 16x16 favicon-16x16.png
convert logo-icon.svg -resize 32x32 favicon-32x32.png
convert logo-icon.svg -resize 180x180 apple-touch-icon.png
```

### 2. Portrait Image

#### Requirements:
- Filename: `portrait.webp`
- Dimensions: 600x700px (or similar aspect ratio)
- Format: WebP for best performance
- Fallback: Also create `portrait.jpg` for older browsers

#### Image Optimization:
```bash
# Convert and optimize portrait
# Using cwebp (WebP converter)
cwebp -q 80 portrait.jpg -o portrait.webp

# Or use an online tool like squoosh.app
```

### 3. Project Screenshots

#### For Each Project:
```
public/images/
├── project-ecommerce.webp     # 600x400px
├── project-analytics.webp     # 600x400px
├── project-healthcare.webp    # 600x400px
├── project-components.webp    # 600x400px
├── project-banking.webp       # 600x400px
└── project-landing.webp       # 600x400px
```

#### Screenshot Best Practices:
1. **Consistent Size**: All 600x400px
2. **Clean Shots**: No browser chrome
3. **Key Features**: Show main functionality
4. **High Quality**: Sharp, clear images
5. **Dark Friendly**: Works on dark background

### 4. Open Graph Image

#### `public/og-image.png`
- Dimensions: 1200x630px
- Content: Your name, tagline, and visual branding
- Used for social media previews

### 5. Update Project Data

#### `src/data/projects.js`
Update with real project information:

```javascript
export const projects = [
  {
    id: 1,
    title: 'Your Actual Project Name',
    description: 'Real description of what you built',
    imageUrl: '/images/project-actual-name.webp',
    techStack: ['Actual', 'Tech', 'Used'],
    category: 'web-app',
    featured: true,
    liveUrl: 'https://actual-project-url.com',
    repoUrl: 'https://github.com/your-username/repo',
    year: 2024
  },
  // ... more real projects
];
```

### 6. Content Updates

#### Update Personal Information:

**File Locations to Update:**

1. **`src/components/Hero.astro`**
   - Update headline if needed
   - Verify sub-headline accuracy
   - Update stats (years experience, projects)

2. **`src/components/About.astro`**
   - Review philosophy text
   - Update skills list with your actual skills
   - Verify all technical expertise

3. **`src/components/Contact.astro`**
   - Confirm email address
   - Update GitHub URL
   - Update LinkedIn URL
   - Add calendar link if using

4. **`src/components/SEO.astro`**
   - Update default title
   - Update default description
   - Add keywords relevant to you

5. **`public/site.webmanifest`**
   - Update name and short_name
   - Verify icon paths

### 7. Analytics & Monitoring (Optional)

#### Add Google Analytics:
```html
<!-- In Layout.astro, before </body> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Or Plausible Analytics (Privacy-friendly):
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### 8. Performance Optimization

#### Image Optimization Checklist:
- [ ] All images in WebP format
- [ ] Proper dimensions (no oversized images)
- [ ] Lazy loading enabled on ProjectCards
- [ ] Alt text for all images
- [ ] Compressed file sizes

#### Font Optimization:
```html
<!-- Preload critical fonts in Layout.astro -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap" as="style">
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" as="style">
```

### 9. Final Content Review

#### SEO Checklist:
- [ ] Page titles unique and descriptive
- [ ] Meta descriptions compelling
- [ ] All images have alt text
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Schema markup (optional)

#### Copy Review:
- [ ] No spelling errors
- [ ] Consistent tone of voice
- [ ] Clear call-to-actions
- [ ] Contact information accurate
- [ ] Links all working

### 10. Legal/Privacy (Optional)

#### Add Privacy Policy Link:
```astro
<!-- In Footer.astro -->
<a href="/privacy" class="text-xs text-text-secondary hover:text-primary">
  Privacy Policy
</a>
```

#### Simple Privacy Policy Template:
```astro
<!-- src/pages/privacy.astro -->
---
import Layout from '@layouts/Layout.astro';
---

<Layout title="Privacy Policy | monkcode">
  <section class="py-20">
    <div class="container mx-auto px-4 max-w-3xl">
      <h1 class="text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
      <div class="prose prose-invert">
        <!-- Your privacy policy content -->
      </div>
    </div>
  </section>
</Layout>
```

## Asset Creation Tools

### Free Tools:
1. **Logos**: Figma, Inkscape
2. **Screenshots**: Browser DevTools
3. **Image Optimization**: Squoosh.app
4. **Favicons**: Favicon.io
5. **OG Images**: Canva, Figma

### Command Line Tools:
```bash
# Install image optimization tools
npm install -g imagemin-cli imagemin-webp

# Batch convert images to WebP
imagemin images/*.jpg --plugin=webp --out-dir=images/
```

## Content Migration Script

Create a simple script to help migrate content:

```javascript
// scripts/update-content.js
const fs = require('fs');

// Update projects
const projects = [
  // Your real project data
];

fs.writeFileSync(
  './src/data/projects.js',
  `export const projects = ${JSON.stringify(projects, null, 2)};`
);

console.log('✅ Content updated successfully');
```

## Pre-Launch Checklist

- [ ] All placeholder images replaced
- [ ] Real project data added
- [ ] Contact information verified
- [ ] Links tested and working
- [ ] Forms connected (if using)
- [ ] Analytics configured
- [ ] SEO meta tags updated
- [ ] Performance optimized
- [ ] Cross-browser tested
- [ ] Mobile responsive verified

## Next Step
→ [Step 12: Testing & Deployment](./12-testing-deployment.md) - Test everything and deploy to production.