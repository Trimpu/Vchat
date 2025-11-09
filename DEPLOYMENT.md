# Vchat - Deployment Guide

## 🚀 Deploy to GitHub Pages

### Step 1: Push to GitHub

If you haven't already, initialize git and push your code:

```bash
git init
git add .
git commit -m "Initial commit: Vchat AI assistant"
git branch -M main
git remote add origin https://github.com/Trimpu/Vchat.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - Source: Select **GitHub Actions**
5. The workflow will automatically deploy your site

### Step 3: Access Your Site

After deployment (usually 1-2 minutes), your site will be available at:
```
https://trimpu.github.io/Vchat/
```

## 🔧 Manual Deployment (Alternative)

If you prefer manual deployment without GitHub Actions:

1. Go to **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: Select **Deploy from a branch**
   - Branch: Select **main** and **/ (root)**
3. Click **Save**
4. Wait for deployment to complete

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter your domain (e.g., `vchat.yourdomain.com`)
3. Add a CNAME record in your DNS settings pointing to: `trimpu.github.io`
4. Wait for DNS propagation (can take up to 48 hours)

## 🔒 HTTPS

GitHub Pages automatically provides HTTPS. Make sure "Enforce HTTPS" is checked in your Pages settings.

## 📱 Testing

After deployment, test all features:
- ✅ Sign in with Puter
- ✅ Send chat messages
- ✅ Generate images
- ✅ Create new chats
- ✅ Chat history saves/loads
- ✅ Mobile responsiveness

## 🐛 Troubleshooting

### Site not loading?
- Check GitHub Actions tab for deployment status
- Ensure index.html is in the root directory
- Wait a few minutes for deployment to complete

### Puter.js not working?
- Check browser console for errors
- Ensure you're using HTTPS (required by Puter)
- Verify Puter.js script is loading correctly

### Chat history not saving?
- Make sure you're signed in with Puter
- Check browser console for KV store errors
- Try clearing browser cache and signing in again

## 📊 Analytics (Optional)

To add Google Analytics or other tracking:

1. Get your tracking ID
2. Add the tracking script to `index.html` in the `<head>` section
3. Commit and push changes

## 🔄 Updates

To update your deployed site:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

The GitHub Action will automatically redeploy your site.

---

**Need help?** Open an issue on GitHub!
