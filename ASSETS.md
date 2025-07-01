# MONKCODE Assets Documentation

This document provides a comprehensive overview of all visual assets in the MONKCODE website project, their locations, and usage guidelines.

## Asset Structure Overview

```
assets/
├── images/           # Profile and content images
│   └── me.png       # Personal profile illustration
└── logos/           # Complete brand logo system
    ├── favicon/     # Web favicon and PWA icons
    ├── png/         # Raster logo variations
    │   ├── color/   # Full-color versions
    │   ├── monochrome-black/  # Black versions
    │   └── monochrome-white/  # White versions
    └── svg/         # Vector logo files
```

## 1. Profile Image

### me.png
- **Location**: `assets/images/me.png`
- **Description**: An illustrated portrait featuring a person in monk's robes holding a book, set against gothic architecture
- **Style**: Medieval illustration aesthetic aligning with the "monk" theme
- **Usage**:
  - About section hero image
  - Team/profile pages
  - Social media profiles where appropriate
- **Recommended display size**: 400x400px minimum for detail visibility

## 2. Logo System

### Brand Colors (per BRANDING.md)
- **Monk Yellow**: `#FFDE0A` (Primary accent)
- **Code Black**: `#121212` (Primary dark)
- **Silent White**: `#F5F5F5` (Light backgrounds)
- **Rhythm Grey**: `#888888` (Secondary text)

### SVG Logos (Scalable Vector Graphics)

All SVG logos are located in `assets/logos/svg/`:

1. **logomark.svg**
   - Standalone "M" icon
   - Use for: Favicons, app icons, small spaces
   - Minimum size: 24px width

2. **logo-horizontal.svg**
   - Horizontal layout with text
   - Use for: Navigation bars, document headers
   - Ideal for wide, constrained spaces

3. **logo-stacked.svg**
   - Vertical stacked layout
   - Use for: Hero sections, centered layouts
   - Default/primary logo variant

4. **logo-stacked-tagline.svg**
   - Stacked layout with tagline
   - Use for: Marketing materials, landing pages
   - When brand message reinforcement is needed

### PNG Logos (Raster Images)

Located in `assets/logos/png/`, organized by color scheme:

#### Color Versions (`png/color/`)
Full-color logos with Monk Yellow background and Code Black mark:
- **Horizontal variants**: rounded, square backgrounds
- **Logomark variants**: circle, rounded, square backgrounds
- **Stacked variants**: square background, with/without tagline
- **Resolutions**: 1x, 2x, 3x for each variant

#### Monochrome Black (`png/monochrome-black/`)
All-black versions for use on light backgrounds:
- **Variants**: horizontal, logomark, stacked, stacked-tagline
- **Resolutions**: 1x, 2x, 3x for each variant

#### Monochrome White (`png/monochrome-white/`)
All-white versions for use on dark backgrounds:
- **Variants**: horizontal, logomark, stacked, stacked-tagline
- **Resolutions**: 1x, 2x, 3x for each variant

### Logo Usage Guidelines

1. **Clear Space**: Maintain minimum clear space equal to half the logomark height
2. **Minimum Size**: Never display smaller than 24px width
3. **Background Contrast**: Ensure sufficient contrast for visibility
4. **Proportions**: Always scale proportionally, never stretch or distort

## 3. Favicon System

Located in `assets/logos/favicon/`:

### Core Favicon Files
- **favicon.ico**: Legacy browser support (16x16, 32x32, 48x48)
- **favicon.svg**: Modern scalable favicon
- **favicon-96x96.png**: High-resolution favicon
- **apple-touch-icon.png**: iOS home screen icon (180x180)

### Progressive Web App (PWA) Icons
- **web-app-manifest-192x192.png**: Android home screen icon
- **web-app-manifest-512x512.png**: Splash screen icon
- **site.webmanifest**: PWA configuration file

## 4. Implementation Examples

### HTML Favicon Setup
```html
<!-- Place in <head> section -->
<link rel="icon" type="image/svg+xml" href="/assets/logos/favicon/favicon.svg">
<link rel="icon" type="image/png" sizes="96x96" href="/assets/logos/favicon/favicon-96x96.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/logos/favicon/apple-touch-icon.png">
<link rel="manifest" href="/assets/logos/favicon/site.webmanifest">
```

### Responsive Logo Usage
```html
<!-- Header logo with responsive images -->
<picture class="site-logo">
  <source media="(max-width: 768px)" 
          srcset="/assets/logos/png/color/logomark-square-1x.png 1x,
                  /assets/logos/png/color/logomark-square-2x.png 2x,
                  /assets/logos/png/color/logomark-square-3x.png 3x">
  <img src="/assets/logos/svg/logo-horizontal.svg" 
       alt="MONKCODE - We Code with Rhythm">
</picture>
```

### CSS Logo Implementation
```css
/* Logo with proper spacing */
.site-logo {
  display: inline-block;
  /* Minimum clear space (half logomark height) */
  padding: calc(var(--logo-height) * 0.5);
  min-width: 24px; /* Minimum size requirement */
}

/* Dark mode logo swap */
@media (prefers-color-scheme: dark) {
  .site-logo img {
    content: url('/assets/logos/png/monochrome-white/logo-horizontal-2x.png');
  }
}
```

## 5. Asset Optimization Notes

- **SVG files**: Already optimized, use for maximum scalability
- **PNG files**: Multiple resolutions provided for retina displays
- **File naming**: Consistent naming convention for easy identification
- **Color accuracy**: All assets use exact brand colors from BRANDING.md

## 6. Missing Assets / Recommendations

Currently, the asset library is comprehensive for basic web implementation. Consider adding:
- Social media optimized images (OpenGraph, Twitter cards)
- Loading/spinner animations matching brand aesthetic
- Error state illustrations
- Additional team member portraits if needed

## Related Documentation

- See `BRANDING.md` for complete brand guidelines
- Review `ai/plan/11-assets-content.md` for implementation planning
- Check `site.webmanifest` for PWA configuration