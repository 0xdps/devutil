# Technical Architecture Documentation

> **DevUtil.xyz** - A comprehensive guide to the application's architecture, routing, SEO implementation, and page loading mechanisms.

## 📚 Table of Contents

1. [React App Architecture](#react-app-architecture)
2. [SEO Implementation Flow](#seo-implementation-flow)
3. [Page Loading Flow](#page-loading-flow)
4. [404 Error Handling](#404-error-handling)
5. [Pre-rendering System](#pre-rendering-system)
6. [GitHub Pages Deployment](#github-pages-deployment)
7. [State Management](#state-management)
8. [Build Process](#build-process)

---

## 🏗️ React App Architecture

### Application Structure

```
src/
├── main.tsx                 # Entry point (handles hydration)
├── App.tsx                  # Root component with routing
├── components/
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Header.tsx          # Top navigation
│   ├── Sidebar.tsx         # Left sidebar navigation
│   ├── SEO.tsx             # SEO component (meta tags)
│   └── Modal.tsx           # Reusable modals
├── pages/                   # Route components (16 tools)
│   ├── Home.tsx
│   ├── DataTransform.tsx
│   ├── NotFound.tsx        # 404 page
│   └── ...
├── config/
│   └── seoConfig.ts        # SEO metadata for all tools
└── utils/
    └── helpers.ts          # Utility functions
```

### Component Hierarchy

```
<Router>
  └── <Layout>
      ├── <Header />
      ├── <Sidebar />
      └── <Routes>
          ├── <Home />
          ├── <DataTransform />
          ├── <JWTDecoder />
          └── <NotFound /> (catch-all)
```

### Key Technologies

- **React 18.3.1**: UI library with concurrent features
- **TypeScript 5.5.4**: Type safety
- **Vite 5.x**: Build tool and dev server
- **React Router 6.26.2**: Client-side routing
- **React Helmet Async 2.0.5**: Dynamic meta tag management
- **Tailwind CSS 3.4.11**: Utility-first styling

---

## 🔍 SEO Implementation Flow

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│ Tool Page Component (e.g., JWTDecoder.tsx)                  │
├─────────────────────────────────────────────────────────────┤
│ import SEO from '../components/SEO'                         │
│ import { toolsMetadata } from '../config/seoConfig'         │
│                                                             │
│ const meta = toolsMetadata.jwtDecoder                       │
│                                                             │
│ return (                                                    │
│   <>                                                        │
│     <SEO                                                    │
│       title={meta.title}                                    │
│       description={meta.description}                        │
│       keywords={meta.keywords}                              │
│       canonical={meta.canonical}                            │
│       toolName={meta.toolName}                              │
│       toolDescription={meta.toolDescription}                │
│       toolUrl={meta.canonical}                              │
│     />                                                      │
│     {/* Tool UI */}                                         │
│   </>                                                       │
│ )                                                           │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ SEO Component (components/SEO.tsx)                          │
├─────────────────────────────────────────────────────────────┤
│ Uses react-helmet-async to inject into <head>:              │
│                                                             │
│ 1. Basic Meta Tags                                          │
│    • <title>                                                │
│    • <meta name="description">                              │
│    • <meta name="keywords">                                 │
│    • <link rel="canonical">                                 │
│                                                             │
│ 2. Open Graph Tags (Facebook)                               │
│    • og:type, og:url, og:title, og:description, og:image    │
│                                                             │
│ 3. Twitter Card Tags                                        │
│    • twitter:card, twitter:title, twitter:description       │
│                                                             │
│ 4. Robots Meta                                              │
│    • robots: "index, follow" (or "noindex, follow" for 404) │
│                                                             │
│ 5. Structured Data (JSON-LD)                                │
│    • WebApplication schema                                  │
│    • SoftwareApplication schema (per tool)                  │
│    • BreadcrumbList schema                                  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Pre-rendering (scripts/prerender.mjs)                       │
├─────────────────────────────────────────────────────────────┤
│ At build time:                                              │
│ 1. Puppeteer launches headless browser                      │
│ 2. Visits each route (16 tools)                             │
│ 3. Waits for React to render                                │
│ 4. Waits for SEO component to update <head>                 │
│ 5. Captures full HTML with baked-in meta tags               │
│ 6. Saves to dist/[route]/index.html                         │
└─────────────────────────────────────────────────────────────┘
```

### SEO Metadata Configuration

**File**: `src/config/seoConfig.ts`

```typescript
export const toolsMetadata = {
  jwtDecoder: {
    title: "JWT Decoder | Decode & Inspect JSON Web Tokens | Free Tool",
    description: "Decode and inspect JWT tokens online. View header, payload...",
    keywords: ["jwt decoder", "json web token", "jwt debugger", ...],
    canonical: "/jwt-decoder",
    toolName: "JWT Decoder",
    toolDescription: "Decode and inspect JWT tokens",
  },
  // ... 15 more tools
}
```

### How SEO Works

1. **Client-Side Rendering (CSR)**:

   - React loads → Component mounts → SEO component updates `<head>`
   - Works for Google/Bing (execute JavaScript)
   - **Problem**: Social media bots don't execute JS

2. **Pre-rendering Solution**:
   - Build script generates static HTML with full meta tags
   - Search engines see complete page instantly
   - Social media bots get proper preview data
   - After HTML loads, React hydrates and makes interactive

---

## 📄 Page Loading Flow

### Development Mode (localhost:3000)

```
1. User navigates to /jwt-decoder
                ↓
2. Vite dev server serves index.html
                ↓
3. Browser loads React bundle
                ↓
4. main.tsx executes:
   - Checks if pre-rendered (dev = no)
   - ReactDOM.createRoot() + render()
                ↓
5. App.tsx renders:
   - <Router> initializes
   - React Router matches route: /jwt-decoder
   - Renders <JWTDecoder /> component
                ↓
6. JWTDecoder.tsx renders:
   - SEO component updates <head> tags
   - Component UI renders
   - User sees the page (~500ms total)
```

### Production Mode (GitHub Pages)

#### First-Time Visit or Crawler

```
1. User/Bot visits: https://devutil.xyz/jwt-decoder
                ↓
2. GitHub Pages serves: /jwt-decoder/index.html (pre-rendered)
                ↓
3. Browser receives HTML with:
   ✅ Complete <head> with all meta tags
   ✅ Pre-rendered content in <div id="root">
   ✅ React bundle <script> tag
                ↓
4. User sees content immediately (~100-300ms)
                ↓
5. React bundle loads:
   - main.tsx detects pre-rendered content
   - ReactDOM.hydrateRoot() attaches to existing HTML
   - Makes page interactive
                ↓
6. Page is now fully interactive SPA
   - Subsequent navigation = instant (no page reload)
   - React Router handles all routing
```

#### Subsequent Navigation (SPA Mode)

```
1. User clicks link to /hash-verify
                ↓
2. React Router intercepts click
                ↓
3. React Router updates URL (no reload)
                ↓
4. HashVerify component renders:
   - SEO component updates <head>
   - Component UI renders
                ↓
5. User sees new page instantly (~50ms)
   - No server request
   - No page reload
   - Smooth transition
```

### Hydration Process

**File**: `src/main.tsx`

```typescript
const rootElement = document.getElementById("root")!;

// Check if the app was pre-rendered
if (rootElement.hasChildNodes()) {
  // Hydrate: Attach React to existing HTML
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
} else {
  // Normal render: Create new HTML
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
}
```

**Why Hydration?**

- Pre-rendered HTML shows instantly
- React attaches event listeners to existing DOM
- No visual flash or re-render
- Best of both worlds: fast initial load + rich interactivity

---

## 🚫 404 Error Handling

### Complete 404 Flow

```
┌─────────────────────────────────────────────────────────────┐
│ User Types: https://devutil.xyz/invalid-page                │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ GitHub Pages Server                                         │
│ • Looks for: /invalid-page/index.html                       │
│ • Not found!                                                │
│ • Returns: /404.html (HTTP 404 status)                      │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Browser Receives: public/404.html                           │
│                                                             │
│ <script>                                                    │
│   // SPA redirect script                                    │
│   // Converts: /invalid-page                                │
│   // To: /?/invalid-page                                    │
│   window.location.replace('/?/invalid-page')                │
│ </script>                                                   │
│                                                             │
│ Time: ~1ms (instant redirect)                               │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ URL Now: https://devutil.xyz/?/invalid-page                 │
│ GitHub Pages serves: /index.html                            │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ index.html Loads                                            │
│                                                             │
│ <script>                                                    │
│   // URL restore script                                     │
│   // Sees: /?/invalid-page                                  │
│   // Converts back to: /invalid-page                        │
│   // Updates browser history (no reload)                    │
│   history.replaceState(null, null, '/invalid-page')         │
│ </script>                                                   │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ React App Loads                                             │
│ • main.tsx: Hydration check                                 │
│ • App.tsx: Router initializes                               │
│ • Current URL: /invalid-page                                │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ React Router (App.tsx)                                      │
│                                                             │
│ <Routes>                                                    │
│   <Route path="/" element={<Home />} />                     │
│   <Route path="/data-transform" element={...} />            │
│   {/* ... other routes ... */}                              │
│   <Route path="*" element={<NotFound />} /> ← MATCH!        │
│ </Routes>                                                   │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ NotFound Component Renders                                  │
│                                                             │
│ • URL displays: /invalid-page (preserved)                   │
│ • SEO meta tags:                                            │
│   - title: "404 - Page Not Found | devutil.xyz"             │
│   - robots: "noindex, follow"                               │
│   - canonical: "https://devutil.xyz/"                       │
│                                                             │
│ • UI shows:                                                 │
│   - Animated "404" with bounce effect                       │
│   - Friendly error message                                  │
│   - "Go Home" and "Go Back" buttons                         │
│   - 6 popular tools for quick navigation                    │
│                                                             │
│ Total time: ~1-2 seconds                                    │
└─────────────────────────────────────────────────────────────┘
```

### 404 SEO Configuration

**File**: `src/pages/NotFound.tsx`

```typescript
<SEO
  title="404 - Page Not Found | devutil.xyz"
  description="The page you're looking for doesn't exist. Explore our collection..."
  canonical="https://devutil.xyz/"
  noindex={true} // Tells search engines: Don't index this page
/>
```

**Why `noindex, follow`?**

- ❌ **noindex**: Don't show this 404 page in search results
- ✅ **follow**: DO follow links to valid pages (popular tools section)

### 404 in Development vs Production

| Aspect          | Development               | Production                      |
| --------------- | ------------------------- | ------------------------------- |
| **Server**      | Vite dev server           | GitHub Pages                    |
| **Trigger**     | React Router wildcard     | Server returns 404.html         |
| **Redirect**    | Not needed                | Yes (via 404.html script)       |
| **Component**   | NotFound renders directly | NotFound after redirect + route |
| **HTTP Status** | 200 (SPA)                 | 404 (initial), then 200         |

---

## 🎨 Pre-rendering System

### Overview

Pre-rendering generates static HTML files at build time, giving each tool page:

- Complete `<head>` with SEO meta tags
- Pre-rendered content
- Instant visibility to crawlers
- Fast initial page load

### How It Works

**File**: `scripts/prerender.mjs`

```javascript
const routes = [
  "/",
  "/data-transform",
  "/encoding",
  "/jwt-decoder",
  // ... all 16 tools
];

async function prerender() {
  const browser = await puppeteer.launch();

  for (const route of routes) {
    const page = await browser.newPage();

    // Visit the page on local preview server
    await page.goto(`http://localhost:4173${route}`, {
      waitUntil: "networkidle0",
    });

    // Wait for React Helmet to update meta tags
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get the fully rendered HTML
    const html = await page.content();

    // Save to dist/[route]/index.html
    const outputPath =
      route === "/" ? "dist/index.html" : `dist${route}/index.html`;

    await fs.writeFile(outputPath, html);
  }
}
```

### Build Process with Pre-rendering

**File**: `package.json`

```json
{
  "scripts": {
    "build": "tsc && vite build",
    "postbuild": "bash scripts/postbuild.sh"
  }
}
```

**File**: `scripts/postbuild.sh`

```bash
#!/bin/bash

# 1. Start preview server in background
npm run preview &
PREVIEW_PID=$!

# 2. Wait for server to start
sleep 5

# 3. Run pre-rendering
node scripts/prerender.mjs

# 4. Kill preview server
kill $PREVIEW_PID
```

### Build Output

```
dist/
├── index.html                      # Pre-rendered homepage
├── assets/
│   ├── index-[hash].js            # React bundle
│   └── index-[hash].css           # Styles
├── data-transform/
│   └── index.html                  # Pre-rendered with tool-specific SEO
├── jwt-decoder/
│   └── index.html                  # Pre-rendered with tool-specific SEO
├── hash-verify/
│   └── index.html                  # Pre-rendered with tool-specific SEO
└── ... (16 total pre-rendered pages)
```

### Benefits

1. **SEO**: Search engines see complete HTML instantly
2. **Social Media**: Bots get proper Open Graph tags
3. **Performance**: Users see content before JS loads
4. **Reliability**: Works even if JS fails to load
5. **Best of Both Worlds**: Static HTML + SPA interactivity

---

## 🚀 GitHub Pages Deployment

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Developer pushes to 'trunk' branch                          │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ GitHub Actions Workflow (.github/workflows/deploy.yml)      │
├─────────────────────────────────────────────────────────────┤
│ jobs:                                                       │
│   build:                                                    │
│     - Checkout code                                         │
│     - Setup Node.js 18                                      │
│     - npm ci                                                │
│     - npm run build (includes pre-rendering)                │
│     - Upload dist/ as artifact                              │
│                                                             │
│   deploy:                                                   │
│     - Download artifact                                     │
│     - Deploy to GitHub Pages                                │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ GitHub Pages Server                                         │
│ • Serves files from dist/                                   │
│ • Custom domain: devutil.xyz (via CNAME)                    │
│ • HTTPS enabled automatically                               │
│ • CDN cached globally                                       │
└─────────────────────────────────────────────────────────────┘
```

### Important Files

**`public/CNAME`**

```
devutil.xyz
```

**`vercel.json`** (alternative deployment)

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**`netlify.toml`** (alternative deployment)

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Routing Strategy

GitHub Pages doesn't natively support SPA routing, so we use:

1. **404.html redirect**: Catches invalid routes, redirects to `/?/path`
2. **index.html restore**: Converts `/?/path` back to `/path`
3. **React Router**: Handles all routing client-side

This ensures:

- ✅ Direct URL access works
- ✅ Page refreshes work
- ✅ Browser back/forward works
- ✅ Proper HTTP 404 status on invalid pages

---

## 🔄 State Management

### Current Approach: Local Component State

Each tool manages its own state using React hooks:

```typescript
// Example: DataTransform.tsx
const [input, setInput] = useState("");
const [output, setOutput] = useState("");
const [inputFormat, setInputFormat] = useState<DataFormat>("json");
const [outputFormat, setOutputFormat] = useState<DataFormat>("csv");
```

### localStorage Persistence

Some tools persist user preferences:

```typescript
// Save indent preference
useEffect(() => {
  localStorage.setItem("json-indent-spaces", JSON.stringify(indentSpaces));
}, [indentSpaces]);

// Load on mount
const [indentSpaces, setIndentSpaces] = useState(() => {
  const saved = localStorage.getItem("json-indent-spaces");
  return saved ? JSON.parse(saved) : 2;
});
```

### Why No Global State?

- ✅ Tools are independent (no shared data)
- ✅ Simpler architecture
- ✅ Better code splitting
- ✅ Easier to understand and maintain

### Future Considerations

If global state is needed (e.g., favorites, history):

- **React Context**: For theme, user preferences
- **Zustand**: Lightweight state management
- **localStorage**: Persist user data client-side

---

## 🔧 Build Process

### Complete Build Pipeline

```
1. npm run build
         ↓
2. tsc (TypeScript Compiler)
   • Checks types
   • Reports errors
   • No output (just validation)
         ↓
3. vite build
   • Bundles JavaScript
   • Processes CSS (Tailwind)
   • Optimizes images
   • Generates dist/ folder
         ↓
4. postbuild script (scripts/postbuild.sh)
         ↓
5. npm run preview (background)
   • Starts local server on port 4173
   • Serves dist/ folder
         ↓
6. node scripts/prerender.mjs
   • Launches Puppeteer
   • Visits all 16 tool routes
   • Captures rendered HTML
   • Saves to dist/[route]/index.html
         ↓
7. Kill preview server
         ↓
8. Build complete! ✅
```

### Build Output Analysis

```
dist/
├── index.html                   3.59 kB (homepage)
├── 404.html                     1.39 kB (copied from public/)
├── CNAME                        11 B    (domain config)
├── robots.txt                   221 B   (SEO crawl rules)
├── sitemap.xml                  3.95 kB (all URLs)
├── assets/
│   ├── index-[hash].js         611 kB  (React bundle)
│   └── index-[hash].css         33 kB  (Tailwind styles)
└── [tool-routes]/
    └── index.html               ~22 kB each (pre-rendered)
```

### Optimization Strategies

1. **Code Splitting** (potential future improvement):

   ```typescript
   const JWTDecoder = lazy(() => import("./pages/JWTDecoder"));
   ```

2. **Bundle Analysis**:

   ```bash
   npm run build
   # Check dist/assets/ file sizes
   ```

3. **Manual Chunks** (vite.config.ts):
   ```typescript
   build: {
     rollupOptions: {
       output: {
         manualChunks: {
           'vendor': ['react', 'react-dom', 'react-router-dom'],
           'crypto': ['crypto-js'],
           'utils': ['marked', 'papaparse', 'js-yaml']
         }
       }
     }
   }
   ```

---

## 📝 Key Takeaways

### For Development

1. **Run dev server**: `npm run dev`
2. **All routing works** in dev (Vite handles it)
3. **Hot reload** on file changes
4. **No pre-rendering** in dev (faster)

### For Production

1. **Build**: `npm run build` (includes pre-rendering)
2. **Preview**: `npm run preview` (test production build)
3. **Deploy**: Push to trunk → GitHub Actions deploys automatically
4. **All pages pre-rendered** with full SEO

### SEO Best Practices

1. ✅ **Unique titles** for each tool (50-60 characters)
2. ✅ **Meta descriptions** (150-160 characters)
3. ✅ **Keywords** relevant to each tool
4. ✅ **Canonical URLs** to prevent duplicates
5. ✅ **Open Graph** tags for social media
6. ✅ **Structured data** for rich snippets
7. ✅ **404 pages** with `noindex, follow`

### Performance Tips

1. ✅ Pre-rendering = instant first paint
2. ✅ Hydration = no visual flash
3. ✅ Client-side routing = instant navigation
4. ✅ Tailwind CSS = optimized styles
5. ✅ Vite = fast builds and HMR

---

## 🔗 Related Files

- **Main Entry**: `src/main.tsx`
- **Root Component**: `src/App.tsx`
- **SEO Component**: `src/components/SEO.tsx`
- **SEO Config**: `src/config/seoConfig.ts`
- **404 Page**: `src/pages/NotFound.tsx`
- **Pre-render Script**: `scripts/prerender.mjs`
- **Build Script**: `scripts/postbuild.sh`
- **GitHub Actions**: `.github/workflows/deploy.yml`
- **SPA 404 Handler**: `public/404.html`
- **Homepage**: `index.html`

---

## 📚 External Resources

- [React Router Docs](https://reactrouter.com/)
- [React Helmet Async](https://github.com/staylor/react-helmet-async)
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Pages SPA Guide](https://github.com/rafgraph/spa-github-pages)
- [Google SEO Guidelines](https://developers.google.com/search/docs)
- [Schema.org Structured Data](https://schema.org/)

---

**Last Updated**: October 23, 2025  
**Version**: 1.0  
**Maintained by**: DevUtil Team
