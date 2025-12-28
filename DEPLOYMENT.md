# Deployment Guide

## For Vercel Deployment (Current Setup)

The app is configured for Vercel deployment with:
- `homepage: "/"` in package.json
- `vercel.json` with SPA routing configuration
- `public/_redirects` file for fallback routing

### Deploy to Vercel:
1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the React app and deploy

## For GitHub Pages Deployment

If you want to deploy to GitHub Pages instead:

1. **Update package.json:**
   ```json
   "homepage": "/Movies-land"
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   npm run deploy
   ```

3. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to Pages section
   - Select `gh-pages` branch as source

**Note:** You cannot use both Vercel and GitHub Pages with the same homepage configuration. Choose one deployment method.


