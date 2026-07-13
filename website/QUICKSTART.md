# 🚀 Quick Start Guide

## Get Your Website Online in 5 Minutes!

### Prerequisites
- Git installed on your computer
- GitHub account (free)
- Text editor (VS Code, Sublime, etc.)

---

## Step 1: Update Your Information (2 minutes)

Open `index.html` in a text editor and update these placeholders:

### 1.1 GitHub Username
Search for: `your-username`  
Replace with: your actual GitHub username (appears in ~5 places)

### 1.2 Email Address
Search for: `your.email@example.com`  
Replace with: your actual email address

### 1.3 Social Media Links (Optional)
Find the Contact section and update:
```html
<a href="https://github.com/YOUR-USERNAME">
<a href="https://linkedin.com/in/YOUR-PROFILE">
```

---

## Step 2: Test Locally (1 minute)

Open terminal/command prompt and run:

```bash
cd /home/mnx/bd-traffic-signs/website
python -m http.server 8000
```

Open browser to: `http://localhost:8000`

**Check:**
- ✅ Website loads
- ✅ Images display
- ✅ Navigation works
- ✅ Mobile menu works (resize browser)

Press `Ctrl+C` to stop the server.

---

## Step 3: Deploy to GitHub Pages (2 minutes)

### 3.1 Create Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click **"+"** → **"New repository"**
3. Name: `bd-traffic-signs`
4. Make it **Public**
5. Click **"Create repository"**

### 3.2 Push Your Code

```bash
# Navigate to your project
cd /home/mnx/bd-traffic-signs

# Initialize git (if not already done)
git init
git add website/
git commit -m "Initial commit: Research website"

# Connect to GitHub (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/bd-traffic-signs.git
git branch -M main
git push -u origin main
```

### 3.3 Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll to **Pages** (left sidebar)
4. Under "Source":
   - Branch: `main`
   - Folder: `/website` (select from dropdown)
5. Click **Save**

**Wait 2-3 minutes** for deployment.

---

## Step 4: Visit Your Live Website! 🎉

Your website is now live at:
```
https://YOUR-USERNAME.github.io/bd-traffic-signs/
```

---

## What's Next?

### Optional Enhancements

#### Add Gradio Demo
If you deploy your `app.py` to HuggingFace Spaces:

1. Create Space at [huggingface.co/spaces](https://huggingface.co/spaces)
2. Upload `app.py` and model files
3. Get your Space URL (e.g., `https://yourname-bdtraffic.hf.space`)
4. In `index.html`, find the `demo-placeholder` div and replace with:
   ```html
   <iframe 
       src="YOUR-HUGGINGFACE-SPACE-URL" 
       frameborder="0" 
       width="100%" 
       height="600px"
   ></iframe>
   ```

#### Add Custom Domain

1. Buy a domain (e.g., `bdtrafficsigns.com`)
2. Create `CNAME` file in website folder:
   ```
   bdtrafficsigns.com
   ```
3. Configure DNS at your domain registrar:
   ```
   Type: CNAME
   Name: www
   Value: YOUR-USERNAME.github.io
   ```
4. In GitHub Settings > Pages, add custom domain

#### Add Google Analytics

1. Get tracking ID from [analytics.google.com](https://analytics.google.com)
2. Add to `index.html` before `</head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA-ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA-ID');
   </script>
   ```

---

## Troubleshooting

### Website shows 404 error
- Wait 5 minutes after enabling GitHub Pages
- Check that `/website` folder is selected in Settings > Pages
- Verify files are committed and pushed

### Images not loading
- Check paths in HTML are correct: `assets/images/...`
- No leading slash: `src="assets/..."` not `src="/assets/..."`
- Clear browser cache (Ctrl+Shift+R)

### CSS not working
- Check file paths in `<link>` tags
- Clear browser cache
- Look for typos in filenames

### Mobile menu not working
- Ensure `js/main.js` is loading
- Check browser console (F12) for errors
- Verify JavaScript is enabled

---

## Need Help?

1. **Check Documentation:**
   - `README.md` - Full documentation
   - `DEPLOYMENT_CHECKLIST.md` - Complete checklist
   - `test_website.sh` - Run tests

2. **Run Test Script:**
   ```bash
   ./website/test_website.sh
   ```

3. **Contact:**
   - Create issue on GitHub
   - Email: your.email@example.com

---

## Success! 🎉

Your research website is now online and accessible to anyone!

**Share your work:**
- Add URL to your CV/resume
- Include in your research paper
- Share on LinkedIn/Twitter
- Add to your email signature

**Example:**
```
Mohammad Mansib Newaz
NSU | CSE 499B Project
🌐 https://YOUR-USERNAME.github.io/bd-traffic-signs/
```

---

**Estimated Total Time: 5 minutes**  
**Difficulty: Beginner-friendly**  
**Cost: $0 (completely free)**

Good luck with your research! 🚀
