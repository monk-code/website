# Step 12: Testing & Deployment

## Goal
Thoroughly test the website across devices and browsers, then deploy to production using Vercel or Netlify.

## Prerequisites
- Completed Step 11: All assets and content ready
- Website fully built and functional locally
- GitHub repository created (optional but recommended)

## Testing Phase

### 1. Local Testing Checklist

#### Functionality Tests:
- [ ] All navigation links work correctly
- [ ] Smooth scrolling between sections
- [ ] Mobile menu opens/closes properly
- [ ] Back to top button appears and works
- [ ] Project filtering works (if implemented)
- [ ] Contact links open correctly
- [ ] Form submission works (if implemented)
- [ ] 404 page displays for invalid URLs

#### Visual Tests:
- [ ] No layout breaks at any screen size
- [ ] Images load properly
- [ ] Fonts display correctly
- [ ] Animations are smooth
- [ ] Hover effects work as expected
- [ ] Colors match design system
- [ ] No horizontal scroll issues

#### Performance Tests:
```bash
# Build and preview production version
npm run build
npm run preview

# Check build size
du -sh dist/
```

### 2. Cross-Browser Testing

Test on these browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

#### Browser Testing Tools:
- BrowserStack (free for open source)
- LambdaTest
- Local devices/emulators

### 3. Responsive Testing

#### Breakpoints to Test:
- [ ] Mobile: 320px, 375px, 414px
- [ ] Tablet: 768px, 820px
- [ ] Desktop: 1024px, 1280px, 1440px
- [ ] Large: 1920px, 2560px

#### Chrome DevTools Device Emulation:
```
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test each device preset
4. Test responsive mode with drag
```

### 4. Performance Audit

#### Lighthouse Audit:
```bash
# Run Lighthouse in Chrome DevTools
1. Open DevTools → Lighthouse tab
2. Select all categories
3. Run audit on production build
4. Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 90+
   - SEO: 95+
```

#### Performance Optimizations:
```javascript
// In astro.config.mjs, add compression
import compress from 'astro-compress';

export default defineConfig({
  integrations: [
    vue(),
    tailwind(),
    compress() // Add this
  ]
});
```

### 5. Accessibility Testing

#### Tools:
- [ ] axe DevTools extension
- [ ] WAVE (WebAIM)
- [ ] Keyboard navigation test
- [ ] Screen reader test (NVDA/JAWS)

#### Key Checks:
- [ ] All interactive elements keyboard accessible
- [ ] Proper focus indicators
- [ ] Alt text for all images
- [ ] Proper heading hierarchy
- [ ] Color contrast ratios pass
- [ ] ARIA labels where needed

### 6. SEO Testing

#### Tools:
- [ ] Google PageSpeed Insights
- [ ] GTmetrix
- [ ] SEO Meta Inspector extension

#### Checklist:
- [ ] Unique title tags
- [ ] Meta descriptions
- [ ] Open Graph tags
- [ ] Canonical URLs
- [ ] Sitemap (if needed)
- [ ] Robots.txt

## Deployment Options

### Option 1: Vercel (Recommended)

#### 1. Install Vercel CLI:
```bash
npm i -g vercel
```

#### 2. Deploy:
```bash
# In project root
vercel

# Follow prompts:
# - Link to existing project or create new
# - Confirm settings
# - Deploy
```

#### 3. Configure Domain:
```bash
# Add custom domain
vercel domains add yourdomain.com
```

#### 4. Environment Variables (if needed):
```bash
vercel env add VARIABLE_NAME
```

### Option 2: Netlify

#### 1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

#### 2. Deploy:
```bash
# Build first
npm run build

# Deploy to Netlify
netlify deploy

# For production
netlify deploy --prod
```

#### 3. Alternative: Drag & Drop
1. Build project: `npm run build`
2. Visit app.netlify.com
3. Drag `dist` folder to deploy

### Option 3: GitHub Pages

#### 1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

#### 2. Add deploy script to package.json:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

#### 3. Configure astro.config.mjs:
```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/repository-name', // Only if not using custom domain
});
```

#### 4. Deploy:
```bash
npm run deploy
```

## Post-Deployment Checklist

### 1. Verify Deployment:
- [ ] Site loads at production URL
- [ ] HTTPS working
- [ ] All pages accessible
- [ ] Assets loading properly
- [ ] No console errors

### 2. DNS Configuration (Custom Domain):
```
# A Records for root domain
A @ 76.76.21.21

# CNAME for www
CNAME www cname.vercel-dns.com
```

### 3. Performance Monitoring:
- [ ] Set up Vercel Analytics
- [ ] Configure Google Analytics
- [ ] Add uptime monitoring (UptimeRobot)

### 4. Security Headers:
```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 5. Backup Strategy:
- [ ] GitHub repository up to date
- [ ] Local backup of assets
- [ ] Document deployment process

## Continuous Deployment

### GitHub Actions (Automatic Deployment):

#### `.github/workflows/deploy.yml`
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
```

## Maintenance Plan

### Regular Tasks:
1. **Weekly**: Check for broken links
2. **Monthly**: Update dependencies
3. **Quarterly**: Review and update content
4. **Yearly**: Major design refresh consideration

### Update Commands:
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update Astro
npm install astro@latest

# Audit for vulnerabilities
npm audit fix
```

## Troubleshooting Common Issues

### Build Failures:
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Image Loading Issues:
- Check file paths (case sensitive)
- Verify WebP fallbacks
- Check CDN/caching

### Performance Issues:
- Reduce image sizes
- Lazy load more aggressively
- Check for render-blocking resources

### 404 on Routes:
- Check build output
- Verify routing configuration
- Check deployment settings

## Success Metrics

Track these after launch:
- [ ] Page load time < 3s
- [ ] Lighthouse scores > 90
- [ ] Zero console errors
- [ ] Mobile usability 100%
- [ ] Uptime > 99.9%

## Celebration! 🎉

Your monkcode portfolio is now live! Remember to:
1. Share on social media
2. Add to your resume
3. Keep content updated
4. Monitor analytics
5. Iterate based on feedback

## Next Steps

1. **Content**: Regular blog posts or case studies
2. **Features**: Add testimonials or client logos
3. **Optimization**: A/B test CTAs
4. **Expansion**: Multi-language support
5. **Integration**: Add CMS for easier updates

Congratulations on launching your portfolio! 🚀