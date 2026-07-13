# Website Deployment Checklist

Use this checklist before deploying your website to ensure everything is configured correctly.

## Pre-Deployment Checklist

### Content Updates
- [ ] Update GitHub repository URLs in `index.html` (search for `your-username`)
- [ ] Update email address in Contact section
- [ ] Update social media links (GitHub, LinkedIn)
- [ ] Verify all paper PDFs are in `assets/papers/`
- [ ] Verify all images are in `assets/images/`
- [ ] Check that all internal links work (test locally)

### Optional Customizations
- [ ] Add Gradio demo iframe URL (if available)
- [ ] Add arXiv link when paper is published
- [ ] Add dataset download/access link
- [ ] Add Android APK download link (if available)
- [ ] Customize color scheme in `css/style.css` (if desired)
- [ ] Add Google Analytics tracking code (optional)

### Testing
- [ ] Test website locally (`python -m http.server 8000`)
- [ ] Test on desktop browser (Chrome, Firefox, Safari)
- [ ] Test on mobile device or browser DevTools mobile view
- [ ] Test all navigation links
- [ ] Test all download buttons
- [ ] Test citation copy functionality
- [ ] Test all tabs (Results, Demo sections)
- [ ] Verify images load correctly
- [ ] Check that PDFs download correctly
- [ ] Test "Back to Top" button
- [ ] Test mobile menu (hamburger menu)

### Performance & Accessibility
- [ ] Compress images if needed (see README for instructions)
- [ ] Check website loads in under 3 seconds
- [ ] Test keyboard navigation (Tab key through elements)
- [ ] Verify alt text on all images
- [ ] Check color contrast for readability

## GitHub Pages Deployment

### Step 1: Create Repository
```bash
cd /home/mnx/bd-traffic-signs
git init
git add website/
git commit -m "Add research website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/bd-traffic-signs.git
git push -u origin main
```

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch

### Step 2: Enable GitHub Pages
1. Go to repository Settings > Pages
2. Source: Deploy from branch
3. Branch: `main`
4. Folder: Select `/website` (or move contents to root)
5. Click Save

- [ ] GitHub Pages enabled
- [ ] Build completed (check Actions tab)
- [ ] Website accessible at `https://YOUR-USERNAME.github.io/bd-traffic-signs/`

### Step 3: Verify Deployment
- [ ] Visit your GitHub Pages URL
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] PDFs download correctly
- [ ] All links work
- [ ] Mobile view works

## Netlify Deployment (Alternative)

### Drag & Drop Method
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag `website` folder onto page
3. Copy the generated URL

- [ ] Deployed to Netlify
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled (automatic)

### Git Integration Method
1. Push code to GitHub first
2. On Netlify: New site from Git
3. Select repository
4. Build settings:
   - Build command: (leave empty)
   - Publish directory: `website`
5. Deploy

- [ ] Connected to Git repository
- [ ] Auto-deploy enabled
- [ ] Deploy successful

## Post-Deployment

### Verification
- [ ] Visit live URL and test all features
- [ ] Share with 2-3 people for feedback
- [ ] Test on different devices/browsers
- [ ] Check Google Search Console (optional, after a few days)

### Optional Enhancements
- [ ] Set up custom domain
- [ ] Configure SSL certificate (automatic on Netlify)
- [ ] Add to search engines (submit sitemap)
- [ ] Share on social media
- [ ] Add to your CV/portfolio
- [ ] Include in research paper as supplementary link

### Maintenance
- [ ] Update content when paper is published on arXiv
- [ ] Add demo link when available
- [ ] Update with any new results
- [ ] Monitor analytics (if enabled)
- [ ] Respond to GitHub issues/feedback

## Quick Fixes for Common Issues

### Issue: 404 errors for images
**Fix:** Check file paths are relative (no leading `/`)
```html
<!-- Correct -->
<img src="assets/images/figure.png">

<!-- Wrong -->
<img src="/assets/images/figure.png">
```

### Issue: CSS not loading
**Fix:** Clear browser cache or check path
```html
<link rel="stylesheet" href="css/style.css">
```

### Issue: Mobile menu not working
**Fix:** Ensure JavaScript loads correctly
```html
<script src="js/main.js"></script>
```

### Issue: Large file sizes
**Fix:** Compress images and PDFs
```bash
# Compress images
convert input.png -quality 85 output.png

# Compress PDFs
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf
```

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Netlify Documentation](https://docs.netlify.com/)
- [Web Performance Best Practices](https://web.dev/performance/)
- [Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

## Need Help?

- Check `README.md` in the website folder
- Open an issue on GitHub
- Contact: your.email@example.com

---

**Date Completed:** __________  
**Deployed URL:** __________  
**Notes:** __________
