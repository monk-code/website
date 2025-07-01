# MONKCODE Meta Tags Implementation Guide

Complete HTML meta tags and favicon implementation for the MONKCODE website.

## Complete HTML Head Section

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>MONKCODE - We Code with Rhythm</title>
  <meta name="title" content="MONKCODE - We Code with Rhythm">
  <meta name="description" content="Professional software development with the discipline of a monk and the rhythm of jazz">
  <meta name="author" content="MONKCODE">
  <meta name="keywords" content="software development, web development, MONKCODE, professional coding">
  
  <!-- Favicon Setup -->
  <link rel="icon" type="image/svg+xml" href="/assets/logos/favicon/favicon.svg">
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/logos/favicon/favicon-96x96.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/logos/favicon/apple-touch-icon.png">
  <link rel="manifest" href="/assets/logos/favicon/site.webmanifest">
  
  <!-- Theme Color -->
  <meta name="theme-color" content="#FFDE0A" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://monkcode.dev/">
  <meta property="og:title" content="MONKCODE - We Code with Rhythm">
  <meta property="og:description" content="Professional software development with the discipline of a monk and the rhythm of jazz">
  <meta property="og:image" content="https://monkcode.dev/assets/images/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="MONKCODE">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://monkcode.dev/">
  <meta property="twitter:title" content="MONKCODE - We Code with Rhythm">
  <meta property="twitter:description" content="Professional software development with the discipline of a monk and the rhythm of jazz">
  <meta property="twitter:image" content="https://monkcode.dev/assets/images/twitter-card.png">
  
  <!-- Additional PWA Meta Tags -->
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="MONKCODE">
  <meta name="application-name" content="MONKCODE">
  <meta name="msapplication-TileColor" content="#FFDE0A">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://monkcode.dev/">
</head>
```

## Dark Mode Implementation

### CSS for Theme-Aware Elements

```css
/* Root color variables */
:root {
  /* Light mode (default) */
  --color-primary: #FFDE0A;
  --color-background: #F5F5F5;
  --color-text: #121212;
  --color-text-secondary: #888888;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode */
    --color-primary: #FFDE0A;
    --color-background: #121212;
    --color-text: #F5F5F5;
    --color-text-secondary: #888888;
  }
}

/* Logo switching for dark mode */
.site-logo {
  content: url('/assets/logos/svg/logo-horizontal.svg');
}

@media (prefers-color-scheme: dark) {
  .site-logo {
    content: url('/assets/logos/png/monochrome-white/logo-horizontal-2x.png');
  }
}
```

### JavaScript Theme Detection

```javascript
// Detect and apply theme preference
const detectTheme = () => {
  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
};

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);

// Initial detection
detectTheme();
```

## Responsive Favicon Implementation

### For Maximum Browser Compatibility

```html
<!-- Comprehensive favicon setup -->
<link rel="icon" type="image/x-icon" href="/assets/logos/favicon/favicon.ico">
<link rel="icon" type="image/svg+xml" href="/assets/logos/favicon/favicon.svg">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/logos/favicon/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logos/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/assets/logos/favicon/favicon-96x96.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/logos/favicon/apple-touch-icon.png">
<link rel="manifest" href="/assets/logos/favicon/site.webmanifest">
```

## Loading State Implementation

```html
<!-- Preload critical assets -->
<link rel="preload" href="/assets/logos/svg/logo-loading.svg" as="image">

<!-- Loading overlay -->
<div id="loading-overlay" class="loading-overlay">
  <img src="/assets/logos/svg/logo-loading.svg" alt="Loading..." class="loading-logo">
</div>
```

```css
/* Loading overlay styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.3s ease-out;
}

.loading-overlay.hide {
  opacity: 0;
  pointer-events: none;
}

.loading-logo {
  width: 120px;
  height: 120px;
}
```

## SEO Best Practices

### Structured Data (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MONKCODE",
  "alternateName": "MONKCODE - We Code with Rhythm",
  "url": "https://monkcode.dev",
  "logo": "https://monkcode.dev/assets/logos/svg/logo-stacked.svg",
  "description": "Professional software development with the discipline of a monk and the rhythm of jazz",
  "sameAs": [
    "https://github.com/monkcode",
    "https://twitter.com/monkcode",
    "https://linkedin.com/company/monkcode"
  ]
}
</script>
```

### Robots Meta Tag

```html
<!-- Allow search engines to index -->
<meta name="robots" content="index, follow">
<meta name="googlebot" content="index, follow">
```

## Performance Optimization

### Preconnect to External Domains

```html
<!-- If using Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- If using analytics -->
<link rel="dns-prefetch" href="https://www.google-analytics.com">
```

### Resource Hints

```html
<!-- Preload critical resources -->
<link rel="preload" href="/assets/logos/svg/logo-horizontal.svg" as="image">
<link rel="preload" href="/assets/fonts/montserrat-bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>
```

## Testing Checklist

- [ ] Favicon appears in browser tab
- [ ] Favicon switches colors in dark mode
- [ ] Apple touch icon works on iOS devices
- [ ] PWA installs correctly on Android
- [ ] OpenGraph preview looks correct when sharing on social media
- [ ] Twitter card displays properly
- [ ] Theme color adapts to system preference
- [ ] Loading animation displays smoothly
- [ ] All meta tags validate with SEO tools

## Tools for Testing

1. **Favicon Testing**: https://realfavicongenerator.net/favicon_checker
2. **OpenGraph Testing**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Testing**: https://cards-dev.twitter.com/validator
4. **PWA Testing**: Chrome DevTools > Application > Manifest
5. **SEO Testing**: Google's Rich Results Test