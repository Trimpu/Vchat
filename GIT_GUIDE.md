# Git Deployment Guide

## Initial Setup (First Time Only)

```bash
# 1. Initialize git (if not done)
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: Vchat AI assistant with glassmorphism UI"

# 4. Create main branch
git branch -M main

# 5. Add remote repository
git remote add origin https://github.com/Trimpu/Vchat.git

# 6. Push to GitHub
git push -u origin main
```

## Enable GitHub Pages

### Option 1: GitHub Actions (Recommended)

1. Go to: https://github.com/Trimpu/Vchat/settings/pages
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. The `.github/workflows/deploy.yml` will handle deployment automatically
4. Wait 1-2 minutes for deployment
5. Visit: https://trimpu.github.io/Vchat/

### Option 2: Branch Deployment

1. Go to: https://github.com/Trimpu/Vchat/settings/pages
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** 
   - Folder: **/ (root)**
3. Click **Save**
4. Visit: https://trimpu.github.io/Vchat/

## Future Updates

```bash
# 1. Make your changes to files

# 2. Check what changed
git status

# 3. Add changes
git add .

# 4. Commit with descriptive message
git commit -m "Add: description of your changes"

# 5. Push to GitHub
git push

# Site will auto-update if using GitHub Actions!
```

## Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# Undo last commit (keeps changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- filename

# View remote URL
git remote -v

# Pull latest changes
git pull origin main

# Create and switch to new branch
git checkout -b feature/new-feature

# Merge branch to main
git checkout main
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
```

## Common Issues

### Push rejected?
```bash
# Pull first, then push
git pull origin main --rebase
git push origin main
```

### Merge conflicts?
```bash
# Edit conflicting files
# Then:
git add .
git commit -m "Resolve merge conflicts"
git push
```

### Wrong commit message?
```bash
# Fix last commit message
git commit --amend -m "New message"
git push --force
```

## Repository Setup Checklist

- [ ] Repository created on GitHub
- [ ] Local repo initialized
- [ ] Files committed
- [ ] Remote added
- [ ] Pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Site accessible online
- [ ] HTTPS working

## Security Best Practices

- ✅ Never commit `.env` files
- ✅ No API keys in code (Puter handles this)
- ✅ Use `.gitignore` for sensitive files
- ✅ Enable branch protection on main
- ✅ Require PR reviews for important repos

## Workflow for Teams

1. **Create Issue** - Describe feature/bug
2. **Create Branch** - `git checkout -b feature/xyz`
3. **Make Changes** - Code the feature
4. **Commit Often** - Small, focused commits
5. **Push Branch** - `git push origin feature/xyz`
6. **Open PR** - Request review
7. **Review & Merge** - Collaborate and merge
8. **Delete Branch** - Clean up

## GitHub Actions Status

Check deployment status:
- Actions tab: https://github.com/Trimpu/Vchat/actions
- Green checkmark = Success ✅
- Red X = Failed ❌

## Custom Domain (Optional)

1. Buy domain (e.g., vchat.yourdomain.com)
2. Add CNAME record pointing to: `trimpu.github.io`
3. In GitHub Pages settings, add custom domain
4. Wait for DNS propagation (up to 48 hours)
5. Enable "Enforce HTTPS"

---

**Quick Start:**
```bash
git init
git add .
git commit -m "Initial commit: Vchat AI assistant"
git branch -M main
git remote add origin https://github.com/Trimpu/Vchat.git
git push -u origin main
```

Then enable GitHub Pages in repository settings! 🚀
