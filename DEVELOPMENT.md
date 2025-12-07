# Development Guide

This guide provides detailed information for developers working on this portfolio project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Development Setup](#development-setup)
- [Project Architecture](#project-architecture)
- [Development Tools](#development-tools)
- [Local Development Server](#local-development-server)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Prerequisites

### Required

- **Web Browser**: Modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Text Editor/IDE**: VS Code (recommended), Sublime Text, Atom, or any code editor
- **Git**: Version control system

### Recommended

- **Browser DevTools**: For debugging and testing
- **Local Web Server**: For proper testing (Python, Node.js, or VS Code Live Server)
- **Image Editor**: For optimizing images (GIMP, Photoshop, or online tools)

## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mnxtr/mnxtr.github.io.git
cd mnxtr.github.io
```

### 2. Set Up Your Editor

#### VS Code (Recommended)

Install these extensions:
- **Live Server**: For live reload during development
- **HTML CSS Support**: Enhanced HTML/CSS IntelliSense
- **Tailwind CSS IntelliSense**: Autocomplete for Tailwind classes
- **Prettier**: Code formatter
- **ESLint**: JavaScript linting

#### Configuration Files

Create `.vscode/settings.json` if it doesn't exist:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.associations": {
    "*.html": "html"
  },
  "liveServer.settings.port": 5500,
  "liveServer.settings.donotShowInfoMsg": true
}
```

### 3. Verify Setup

Open `index.html` in your browser to ensure everything works correctly.

## Project Architecture

### File Structure

```
mnxtr.github.io/
├── index.html          # Landing page
├── about.html          # About page
├── project.html        # Projects showcase
├── contact.html        # Contact form
├── styles.css          # Custom styles (currently minimal)
├── img/                # Image assets
├── .vscode/            # VS Code configuration
├── .github/            # GitHub configuration
└── README.md           # Main documentation
```

### Page Structure

Each HTML page follows this structure:

1. **DOCTYPE and HTML Tag**: HTML5 doctype and language attribute
2. **Head Section**: Meta tags, title, external resources (TailwindCSS)
3. **Body**: Contains header (navigation), main content, social links, and footer
4. **Scripts**: Inline JavaScript for interactivity

### Key Components

#### Navigation Header
- Sticky navigation bar
- Links to all pages
- Responsive menu (visible on all screen sizes)

#### Main Content
- Page-specific content
- Responsive containers
- Dark theme with gradients

#### Footer
- Copyright information
- Social media links
- Consistent across all pages

## Development Tools

### TailwindCSS

This project uses TailwindCSS via CDN. No build process required.

**Custom Configuration:**
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        darkBg: '#1E293B',
        darkText: '#CBD5E1',
        accent: '#0EA5E9'
      }
    }
  }
}
```

**Common Utility Classes Used:**
- Layout: `flex`, `grid`, `container`
- Spacing: `p-*`, `m-*`, `space-*`
- Colors: `bg-*`, `text-*`
- Effects: `hover:*`, `transition-*`

### Browser DevTools

Use DevTools for:
- **Elements**: Inspect and modify HTML/CSS
- **Console**: Debug JavaScript
- **Network**: Check resource loading
- **Responsive Design Mode**: Test different screen sizes

## Local Development Server

### Option 1: Python (Recommended for simplicity)

```bash
# Python 3
python -m http.server 8000

# Python 2 (if Python 3 not available)
python -m SimpleHTTPServer 8000
```

Visit: `http://localhost:8000`

### Option 2: VS Code Live Server

1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically with live reload

### Option 3: Node.js http-server

```bash
# Install globally
npm install -g http-server

# Run in project directory
http-server

# Or use npx (no installation needed)
npx http-server
```

Visit: `http://localhost:8080`

### Option 4: PHP Built-in Server

```bash
php -S localhost:8000
```

Visit: `http://localhost:8000`

## Making Changes

### Adding New Pages

1. **Create HTML file**: Use existing pages as templates
2. **Add navigation link**: Update header in all existing pages
3. **Maintain consistency**: Keep the same header, footer, and styling
4. **Test thoroughly**: Check on multiple browsers and screen sizes

Example page template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Mohammad Mansib Nawaz</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3B82F6',
                        darkBg: '#1E293B',
                        darkText: '#CBD5E1',
                        accent: '#0EA5E9'
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gradient-to-b from-darkBg via-gray-900 to-blue-900 text-darkText min-h-screen flex flex-col">
    <!-- Navigation -->
    <header class="p-4 sm:p-6 bg-darkBg bg-opacity-90 backdrop-blur-sm sticky top-0 z-10">
        <nav class="flex justify-end space-x-6 text-white">
            <a href="index.html" class="hover:text-primary transition-colors duration-300">Home</a>
            <a href="project.html" class="hover:text-primary transition-colors duration-300">Project</a>
            <a href="about.html" class="hover:text-primary transition-colors duration-300">About Me</a>
            <a href="contact.html" class="hover:text-primary transition-colors duration-300">Contact</a>
        </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-grow flex flex-col items-center justify-center text-center p-6">
        <!-- Your content here -->
    </main>

    <!-- Footer -->
    <footer class="p-6 text-center text-gray-400 bg-darkBg bg-opacity-80">
        <p>&copy; 2025 <span class="text-primary">Mohammad Mansib Nawaz</span>. All rights reserved.</p>
    </footer>
</body>
</html>
```

### Updating Content

#### Text Content
- Directly edit HTML files
- Maintain semantic HTML structure
- Keep accessibility in mind (alt texts, ARIA labels)

#### Images
1. **Add images** to the `img/` directory
2. **Optimize images** before adding (compress, resize)
3. **Use descriptive filenames**: `project-name-screenshot.jpg`
4. **Update HTML**: Add image with proper alt text
5. **Recommended sizes**:
   - Avatar: 256x256px or larger (square)
   - Project images: 800x600px or similar aspect ratio

#### Styling
- Prefer TailwindCSS utility classes
- Add custom CSS to `styles.css` only if necessary
- Keep the dark theme consistent

### Adding Interactive Features

JavaScript is included inline in HTML files. For new features:

1. **Keep it simple**: Minimal JavaScript for best performance
2. **Use vanilla JS**: No framework dependencies
3. **Add comments**: Explain complex logic
4. **Test thoroughly**: Ensure cross-browser compatibility

Example: Typewriter effect in `index.html`

```javascript
const text = "Specializing in secure API development and backend solutions";
let index = 0;
function typeWriter() {
    if (index < text.length) {
        document.getElementById("typewriter").textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
    }
}
window.onload = typeWriter;
```

## Testing

### Manual Testing Checklist

#### Functionality
- [ ] All links work correctly
- [ ] Navigation menu works on all pages
- [ ] Forms validate properly (if applicable)
- [ ] Interactive elements respond to user actions
- [ ] External links open in new tabs

#### Responsiveness
- [ ] Test on mobile (320px, 375px, 414px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1280px, 1920px)
- [ ] Test landscape and portrait orientations
- [ ] No horizontal scrolling on any screen size

#### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

#### Performance
- [ ] Page loads quickly (< 3 seconds)
- [ ] Images are optimized
- [ ] No console errors
- [ ] Smooth animations and transitions

#### Accessibility
- [ ] All images have alt text
- [ ] Color contrast is sufficient
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Semantic HTML used

### Using Browser DevTools

#### Responsive Design Testing
1. Open DevTools (F12 or Ctrl+Shift+I / Cmd+Option+I)
2. Click device toolbar icon (or Ctrl+Shift+M / Cmd+Shift+M)
3. Test different device presets
4. Check both portrait and landscape

#### Performance Testing
1. Open DevTools → Lighthouse tab
2. Run audit for Performance, Accessibility, Best Practices, SEO
3. Address any issues found

#### Console Debugging
- Check for JavaScript errors
- Use `console.log()` for debugging
- Monitor network requests

## Troubleshooting

### Common Issues

#### Issue: TailwindCSS classes not working

**Solution:**
- Verify TailwindCSS CDN is loading (check Network tab)
- Check for typos in class names
- Ensure custom config is properly defined

#### Issue: Images not displaying

**Solution:**
- Check file path (case-sensitive on some systems)
- Verify image exists in `img/` directory
- Check image file format is supported (JPG, PNG, GIF, SVG)
- Clear browser cache

#### Issue: Links not working

**Solution:**
- Verify file names match link hrefs
- Check for typos in URLs
- Ensure files exist in the correct location
- Use relative paths, not absolute

#### Issue: Responsive design issues

**Solution:**
- Add viewport meta tag to `<head>`
- Use Tailwind responsive prefixes (sm:, md:, lg:, xl:)
- Test on actual devices, not just DevTools
- Check for fixed widths that should be responsive

#### Issue: JavaScript not running

**Solution:**
- Check browser console for errors
- Verify script tags are correctly placed
- Ensure DOM is loaded before running scripts
- Check for syntax errors

### Getting Help

If you encounter issues:
1. Check existing GitHub issues
2. Review this documentation
3. Check browser console for errors
4. Create a new issue with details
5. Contact via email for urgent matters

## Best Practices

### Code Quality

- **Write semantic HTML**: Use appropriate tags (`<header>`, `<nav>`, `<main>`, `<footer>`)
- **Keep it simple**: Don't over-engineer simple features
- **Comment your code**: Explain why, not what
- **Be consistent**: Follow existing code style
- **DRY principle**: Don't Repeat Yourself

### Performance

- **Optimize images**: Compress and resize before adding
- **Minimize dependencies**: Only use what you need
- **Lazy load images**: For better initial load time (if needed)
- **Minify files**: For production (if adding custom CSS/JS files)

### Accessibility

- **Alt text**: Describe images meaningfully
- **Color contrast**: Maintain WCAG AA standards
- **Keyboard navigation**: Ensure all features are keyboard accessible
- **ARIA labels**: Use when needed for screen readers
- **Focus states**: Make focus indicators visible

### Security

- **External links**: Use `rel="noopener noreferrer"` for `target="_blank"`
- **Form validation**: Always validate on both client and server side
- **No sensitive data**: Don't commit API keys or passwords
- **HTTPS**: Ensure site uses HTTPS (GitHub Pages provides this)

### Version Control

- **Commit often**: Small, focused commits
- **Write good messages**: Clear, descriptive commit messages
- **Branch strategy**: Use feature branches for new work
- **Test before commit**: Ensure changes work before committing

### Documentation

- **Update docs**: Keep documentation in sync with code
- **Comment complex code**: Help future developers (including yourself)
- **README updates**: Update README when adding features
- **Changelog**: Consider maintaining a changelog for significant changes

## Resources

### Learning Resources

- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [HTML5 Tutorial](https://www.w3schools.com/html/)
- [JavaScript Guide](https://javascript.info/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

### Tools

- [Can I Use](https://caniuse.com/) - Browser compatibility
- [TinyPNG](https://tinypng.com/) - Image optimization
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing
- [WAVE](https://wave.webaim.org/) - Accessibility testing

---

Happy coding! If you have questions or suggestions for improving this guide, please open an issue or submit a pull request.
