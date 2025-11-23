# 🚀 Deployment Guide for Habit Tracker

## The Problem
The files created in Figma Make need to be uploaded to your GitHub repository for Vercel to build them.

## ✅ Solution: Download & Upload to GitHub

### Step 1: Access Your GitHub Repository
Go to: https://github.com/Anji-04/habittracker1

### Step 2: Verify Current Structure
Your GitHub repo should have this **exact structure**:

```
habittracker1/
├── index.html                    ✅ Must exist at ROOT
├── package.json                  ✅ Must exist at ROOT  
├── vite.config.ts               ✅ Must exist at ROOT
├── tsconfig.json                ✅ Must exist at ROOT
├── tsconfig.node.json           ✅ Must exist at ROOT
├── public/
│   ├── manifest.json
│   └── service-worker.js
└── src/                         ✅ MUST HAVE THIS FOLDER
    ├── main.tsx                 ✅ Entry point - CRITICAL
    ├── App.tsx                  ✅ Move from root to src/
    ├── components/              ✅ Move to src/components/
    │   ├── HabitStats.tsx
    │   ├── InstallPrompt.tsx
    │   ├── ManageHabits.tsx
    │   ├── figma/
    │   │   └── ImageWithFallback.tsx
    │   └── ui/
    │       └── (all UI components)
    ├── lib/
    │   └── quotes.ts
    └── styles/
        └── globals.css
```

### Step 3: Upload Files to GitHub

#### Option A: Using GitHub Web Interface (Easiest)

1. **Go to your repo**: https://github.com/Anji-04/habittracker1

2. **Create `/src` folder**:
   - Click "Add file" → "Create new file"
   - Type `src/main.tsx` in the filename box
   - Copy the content from `/src/main.tsx` below
   - Commit the file

3. **Upload these files one by one** (click "Add file" → "Upload files"):
   
   **Root files** (upload to root):
   - `index.html`
   - `package.json`
   - `vite.config.ts`
   - `tsconfig.json`
   - `tsconfig.node.json`

4. **Move components to src**:
   - Create `src/components/` folder
   - Upload all component files from `/components/` to `/src/components/`
   - Same for `src/lib/` and `src/styles/`

5. **Delete old App.tsx from root** (if exists)

#### Option B: Download & Re-upload Everything (Recommended)

1. **In Figma Make**: There should be a download button somewhere in the interface to download all files as a ZIP
2. **Extract the ZIP** on your computer
3. **Reorganize files** according to the structure above
4. **Delete everything in your GitHub repo**
5. **Upload the reorganized files**

### Step 4: Verify on GitHub
Check that these files exist at these exact paths:
- ✅ `/index.html`
- ✅ `/package.json`
- ✅ `/src/main.tsx`
- ✅ `/src/App.tsx`
- ✅ `/src/components/HabitStats.tsx`

### Step 5: Deploy on Vercel
Once files are on GitHub:
1. Go to your Vercel dashboard
2. Vercel will **automatically detect the push** and start building
3. Wait 2-3 minutes
4. Your app should be live! 🎉

---

## 📋 File Contents to Copy

### `/src/main.tsx`
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### `/index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Track your daily habits and build consistency" />
    <meta name="theme-color" content="#8b5cf6" />
    <link rel="manifest" href="/manifest.json" />
    <title>Daily Habit Tracker</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `/package.json`
```json
{
  "name": "habit-tracker",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.344.0",
    "date-fns": "^2.30.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "react-day-picker": "^8.10.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.5.3",
    "vite": "^6.3.5"
  }
}
```

---

## 🆘 Still Having Issues?

If you see the same error after uploading:

1. **Check that `/src/main.tsx` exists** in your GitHub repo
2. **Check that `/index.html` is at the root** (not in a folder)
3. **Check that all imports in App.tsx** use `./components/` (with the dot)
4. Try **clearing the Vercel build cache** and redeploying

## 📱 After Successful Deploy

Once deployed, your app URL will be something like:
- `https://habittracker1.vercel.app`

Open it on your phone and install it as a PWA!
