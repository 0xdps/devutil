# DevUtil - Development Guide

> Comprehensive guide for developing and extending DevUtil

## 📊 Project Overview

**Status**: 80% Complete (16/20 tools implemented)

**Tech Stack:**

- React 18.3.1 + TypeScript 5.5.4
- Vite 5.x (Build tool with HMR)
- Tailwind CSS 3.4.11 (Styling)
- React Router DOM 6.26.2 (Routing)
- react-helmet-async 2.0.5 (SEO)

**Key Dependencies:**

- `crypto-js` - Cryptographic functions
- `uuid` - UUID generation
- `marked` - Markdown parsing
- `papaparse` - CSV parsing
- `js-yaml` - YAML parsing
- `fast-xml-parser` - XML parsing
- `qrcode` - QR code generation
- `cronstrue` - Cron expression parsing
- `fuse.js` - Fuzzy search
- `react-hot-toast` - Toast notifications

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/devendrapratap02/devutil.git
cd devutil

# Install dependencies
npm install

# Start development server (with HMR)
npm run dev
# App runs at http://localhost:5173

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

# Run tests
npm test
```

## 📂 Project Structure

```
devutil/
├── public/                     # Static assets
│   ├── robots.txt             # Search engine crawler rules
│   └── sitemap.xml            # SEO sitemap
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.tsx        # Top navigation bar
│   │   ├── Sidebar.tsx       # Left sidebar with search
│   │   └── SEO.tsx           # SEO meta tags component
│   ├── config/               # Configuration files
│   │   └── seoConfig.ts      # SEO metadata for all pages
│   ├── pages/                # Page components (one per tool)
│   │   ├── Home.tsx          # ✅ Landing page
│   │   ├── DataTransform.tsx # ✅ JSON/CSV/YAML/TOML/XML converter
│   │   ├── Encoding.tsx      # ✅ Base64/URL encoding tools
│   │   ├── TextUtilities.tsx # ✅ Text manipulation
│   │   ├── GeneratorToolkit.tsx # ✅ UUID/Random/Lorem generator
│   │   ├── HashVerify.tsx    # ✅ Hash/HMAC generator
│   │   ├── JWTDecoder.tsx    # ✅ JWT token decoder
│   │   ├── CodeFormatter.tsx # ✅ Code beautifier
│   │   ├── RegexTester.tsx   # ✅ Regex pattern tester
│   │   ├── ColorPicker.tsx   # ✅ Color converter
│   │   ├── URLTools.tsx      # ✅ URL parser/encoder
│   │   ├── QRCodeGenerator.tsx # ✅ QR code generator
│   │   ├── TimestampTools.tsx # ✅ Timestamp converter
│   │   ├── MarkdownPreviewer.tsx # ✅ Markdown editor
│   │   ├── HTMLPlayground.tsx # ✅ HTML/CSS/JS playground
│   │   ├── JavaScriptRunner.tsx # ✅ JS code executor
│   │   ├── JSONTools.tsx     # 🚧 Coming soon
│   │   ├── CodeDiff.tsx      # 🚧 Coming soon
│   │   ├── SEOGenerator.tsx  # 🚧 Coming soon
│   │   ├── RegexPlayground.tsx # 🚧 Coming soon
│   │   └── ComingSoon.tsx    # Template for upcoming tools
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Shared types
│   ├── utils/                # Helper functions
│   │   └── helpers.ts        # Common utilities
│   ├── App.tsx               # Main app with routing
│   ├── main.tsx              # Entry point
│   ├── App.css               # Component styles
│   └── index.css             # Global styles + Tailwind
├── index.html                # HTML template with base meta tags
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Project documentation
├── CONTRIBUTING.md           # Contribution guidelines
├── DEVELOPMENT.md            # This file
└── SEO_IMPLEMENTATION.md     # SEO documentation
```

Legend:

- ✅ = Fully implemented and functional
- 🚧 = Placeholder/Coming soon

## 🛠️ Adding a New Tool

### Complete Step-by-Step Guide

#### 1. Create the Page Component

Create a new file in `src/pages/`, e.g., `src/pages/YourTool.tsx`:

```tsx
import { useState } from "react";
import toast from "react-hot-toast";
import SEO from "../components/SEO";
import { toolsMetadata } from "../config/seoConfig";

export default function YourTool() {
  // Get SEO metadata
  const meta = toolsMetadata.yourTool;

  // State management
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // Main tool logic
  const processInput = () => {
    try {
      // Your processing logic here
      const result = yourProcessingFunction(input);
      setOutput(result);
      toast.success("Processed successfully!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // Copy to clipboard helper
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  return (
    <>
      {/* SEO Component - REQUIRED for all pages */}
      <SEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        canonical={meta.canonical}
        toolName={meta.toolName}
        toolDescription={meta.toolDescription}
        toolUrl={meta.canonical}
      />

      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Tool Name
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Brief description of what your tool does
          </p>
        </div>

        {/* Tool Content */}
        <div className="space-y-6">
          {/* Input Section */}
          <div>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your input here..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={processInput}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => setInput("")}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Output Section */}
          {output && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-medium text-gray-900 dark:text-white">
                  Output
                </label>
                <button
                  onClick={copyToClipboard}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  📋 Copy
                </button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-900 dark:text-white">
                  {output}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
```

#### 2. Add SEO Metadata

Edit `src/config/seoConfig.ts` and add your tool's metadata:

```typescript
export const toolsMetadata: Record<string, ToolMeta> = {
  // ... existing tools ...

  yourTool: {
    title: "Your Tool Name | What It Does | DevUtil",
    description:
      "Clear description of your tool in 150-160 characters. Explain benefits and use cases.",
    keywords: [
      "your tool",
      "primary keyword",
      "secondary keyword",
      "online tool",
      "free tool",
    ],
    canonical: "/your-tool",
    toolName: "Your Tool Name",
    toolDescription: "One-sentence description of what the tool does.",
  },
};
```

#### 3. Add Route in App.tsx

Edit `src/App.tsx` to add the route:

```tsx
// Import your component
import YourTool from "./pages/YourTool";

// In the Routes section, add:
<Route path="/your-tool" element={<YourTool />} />;
```

**Example:**

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/data-transform" element={<DataTransform />} />
  {/* ... other routes ... */}
  <Route path="/your-tool" element={<YourTool />} />
</Routes>
```

#### 4. Add to Sidebar Navigation

Edit `src/components/Sidebar.tsx` to add your tool to the appropriate category:

```tsx
const toolCategories = [
  {
    category: "Your Category", // e.g., 'Code Tools', 'Security'
    items: [
      // ... existing items ...
      {
        name: "Your Tool Name",
        path: "/your-tool",
        icon: "🔧", // Choose an appropriate emoji
      },
    ],
  },
  // ... other categories ...
];
```

**Icon Selection Guide:**

- Data/Transform: 🔄, 📊, 🔀
- Encoding: 🔐, 🔒, 🔓
- Text: 📝, ✏️, 📄
- Code: 💻, ⚡, 🛠️
- Web: 🌐, 🔗, 📱
- Design: 🎨, 🖌️, 🎭
- Tools: 🔧, ⚙️, 🔩

#### 5. Update Sitemap

Edit `public/sitemap.xml` to add your tool URL:

```xml
<url>
  <loc>https://devutil.xyz/your-tool</loc>
  <lastmod>2025-01-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

#### 6. Test Your Tool

```bash
# Start dev server
npm run dev

# Test checklist:
# ✅ Navigate to /your-tool
# ✅ Tool loads without errors
# ✅ Input/output works correctly
# ✅ Error handling works
# ✅ Copy button works
# ✅ Dark mode looks good
# ✅ Mobile responsive
# ✅ No console errors
# ✅ SEO meta tags appear in <head>
```

#### 7. Document Your Tool

Add entry to README.md if needed, and update this guide if you discover any missing steps.

## 🎨 Styling Guidelines

### Tailwind CSS Best Practices

We use Tailwind CSS exclusively - no custom CSS classes. Common patterns:

#### Layout & Containers

```tsx
// Main container
<div className="max-w-4xl mx-auto">           // Centered, max width
<div className="max-w-6xl mx-auto">           // Wider for complex tools
<div className="max-w-7xl mx-auto">           // Full width tools

// Spacing
<div className="space-y-6">                   // Vertical spacing between children
<div className="flex gap-4">                  // Horizontal spacing
<div className="p-6">                         // Padding all sides
<div className="px-6 py-3">                   // Horizontal & vertical padding
```

#### Cards & Containers

```tsx
// Card/Box
<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 p-6">
  Content
</div>

// Shadow variants
<div className="shadow-sm">                   // Subtle shadow
<div className="shadow-md">                   // Medium shadow
<div className="shadow-lg">                   // Large shadow
```

#### Buttons

```tsx
// Primary button
<button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
  Action
</button>

// Secondary button
<button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors">
  Cancel
</button>

// Danger button
<button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
  Delete
</button>

// Icon button
<button className="p-2 text-primary-600 hover:text-primary-700 transition-colors">
  📋
</button>
```

#### Form Elements

```tsx
// Text input
<input
  type="text"
  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  placeholder="Enter text..."
/>

// Textarea
<textarea
  className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  placeholder="Enter text..."
/>

// Select dropdown
<select className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
  <option>Option 1</option>
</select>
```

#### Typography

```tsx
// Headings
<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
<h3 className="text-xl font-medium text-gray-900 dark:text-white">

// Body text
<p className="text-gray-900 dark:text-white">                    // Primary text
<p className="text-gray-600 dark:text-gray-400">                // Secondary text
<p className="text-sm text-gray-500 dark:text-gray-500">       // Small text

// Code/Monospace
<code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
<pre className="font-mono text-sm whitespace-pre-wrap">
```

### Dark Mode - ALWAYS Required

**Every component MUST support dark mode.** Always provide both light and dark variants:

```tsx
// ✅ CORRECT: Both light and dark modes
<div className="bg-white dark:bg-gray-800">
  <p className="text-gray-900 dark:text-white">Text</p>
  <div className="border border-gray-300 dark:border-gray-600">
    Content
  </div>
</div>

// ❌ WRONG: Only light mode
<div className="bg-white">
  <p className="text-gray-900">Text</p>
</div>
```

**Common Dark Mode Patterns:**

- Background: `bg-white dark:bg-gray-800`
- Text: `text-gray-900 dark:text-white`
- Secondary text: `text-gray-600 dark:text-gray-400`
- Borders: `border-gray-300 dark:border-gray-600`
- Hover states: `hover:bg-gray-100 dark:hover:bg-gray-700`

### Responsive Design

Design mobile-first, then add larger breakpoints:

```tsx
// Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

// Mobile first, then desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// Hidden on mobile, visible on desktop
<div className="hidden md:block">

// Responsive spacing
<div className="p-4 md:p-6 lg:p-8">

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">
```

## 🧩 Common Utilities & Helpers

### Copy to Clipboard

Standard pattern using the helper utility:

```tsx
import { useState } from "react";

const [copied, setCopied] = useState(false);

const handleCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
};

// Usage in JSX
<button
  onClick={() => handleCopy(result)}
  className="p-2 text-primary-600 hover:text-primary-700 transition-colors"
  title={copied ? "Copied!" : "Copy to clipboard"}
>
  {copied ? "✓" : "📋"}
</button>;
```

### Download File

Download generated content as a file:

```tsx
const handleDownload = (content: string, filename: string, mimeType: string = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Usage examples
<button onClick={() => handleDownload(jsonOutput, 'data.json', 'application/json')}>
  Download JSON 💾
</button>

<button onClick={() => handleDownload(csvOutput, 'export.csv', 'text/csv')}>
  Download CSV 💾
</button>
```

### Format File Size

Display human-readable file sizes:

```tsx
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

// Usage
<p className="text-sm text-gray-600 dark:text-gray-400">
  File size: {formatFileSize(jsonString.length)} (
  {jsonString.length.toLocaleString()} bytes)
</p>;
```

### Toast Notifications

We use `react-hot-toast` for user feedback:

```tsx
import toast from "react-hot-toast";

// Success notification
toast.success("Conversion completed successfully!");

// Error notification
toast.error("Invalid input format");

// Loading state
const toastId = toast.loading("Processing your data...");
// ... perform async operation ...
toast.success("Processing complete!", { id: toastId }); // Replace loading toast

// Custom duration
toast.success("Copied to clipboard!", { duration: 2000 });

// Info notification (styled as success)
toast("Tip: You can drag and drop files", { icon: "💡" });
```

### Local Storage Utilities

Save user preferences and settings:

```tsx
// Save to localStorage
const saveToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }
};

// Load from localStorage
const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.error("Failed to load from localStorage:", err);
    return defaultValue;
  }
};

// Usage in component
const [indentSpaces, setIndentSpaces] = useState(() =>
  loadFromLocalStorage("json-indent-spaces", 2)
);

useEffect(() => {
  saveToLocalStorage("json-indent-spaces", indentSpaces);
}, [indentSpaces]);
```

### Debounce Hook

Debounce user input for performance:

```tsx
import { useState, useEffect } from "react";

const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Usage
const [input, setInput] = useState("");
const debouncedInput = useDebounce(input, 500);

useEffect(() => {
  // This only runs 500ms after user stops typing
  if (debouncedInput) {
    processInput(debouncedInput);
  }
}, [debouncedInput]);
```

## 🧪 Testing

### Test Structure

Write tests for your components in the `tests/` directory:

```tsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Base64Encoder from "../src/pages/Base64Encoder";

describe("Base64Encoder", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Base64Encoder />
      </BrowserRouter>
    );
  });

  it("renders the component", () => {
    expect(screen.getByText(/Base64 Encoder/i)).toBeInTheDocument();
  });

  it("encodes text to base64", () => {
    const input = screen.getByPlaceholderText(/Enter text to encode/i);
    fireEvent.change(input, { target: { value: "Hello" } });

    const encoded = screen.getByText(/SGVsbG8=/);
    expect(encoded).toBeInTheDocument();
  });

  it("handles empty input", () => {
    const input = screen.getByPlaceholderText(/Enter text to encode/i);
    fireEvent.change(input, { target: { value: "" } });

    // Should not crash
    expect(screen.getByText(/Base64 Encoder/i)).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test Base64Encoder
```

### Testing Checklist

When testing a new tool:

- ✅ Component renders without errors
- ✅ Input handling works correctly
- ✅ Output is generated as expected
- ✅ Error handling works (invalid input, edge cases)
- ✅ Copy button functions
- ✅ Clear/Reset button works
- ✅ Download functionality (if applicable)
- ✅ File upload (if applicable)
- ✅ Dark mode styling is correct
- ✅ Responsive layout works on mobile

## 💡 Best Practices

### 1. Privacy First 🔒

**All processing happens client-side. Never send user data to external servers.**

```tsx
// ✅ GOOD: Client-side processing
const encoded = btoa(input);

// ❌ BAD: Sending to external API
fetch("https://api.example.com/encode", { body: input });
```

### 2. Error Handling

Always handle errors gracefully with user-friendly messages:

```tsx
try {
  const result = JSON.parse(input);
  setOutput(result);
} catch (error) {
  toast.error("Invalid JSON format. Please check your input.");
  setError("Parse error: " + error.message);
}
```

### 3. Input Validation

Validate input before processing:

```tsx
const handleConvert = () => {
  if (!input.trim()) {
    toast.error("Please enter some text");
    return;
  }

  if (input.length > 1000000) {
    toast.error("Input is too large (max 1MB)");
    return;
  }

  // Process input
  processInput(input);
};
```

### 4. Type Safety

Use TypeScript types for all functions and props:

```tsx
// Define types for state
interface ToolState {
  input: string;
  output: string;
  error: string | null;
  isProcessing: boolean;
}

// Type function parameters
const formatJSON = (data: unknown, spaces: number = 2): string => {
  return JSON.stringify(data, null, spaces);
};

// Type event handlers
const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setInput(e.target.value);
};
```

### 5. Accessibility ♿

Make tools accessible to all users:

```tsx
<label htmlFor="input-text" className="block text-sm font-medium mb-2">
  Input Text
</label>
<textarea
  id="input-text"
  aria-label="Input text to process"
  aria-describedby="input-help"
  className="w-full..."
/>
<p id="input-help" className="text-sm text-gray-500 mt-1">
  Enter the text you want to process
</p>
```

### 6. Performance Optimization

```tsx
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Heavy rendering
});

// Debounce heavy operations
const debouncedProcess = useDebounce(input, 300);

// Lazy load heavy dependencies
const parseYAML = async (text: string) => {
  const yaml = await import("js-yaml");
  return yaml.load(text);
};
```

### 7. Code Organization

Keep components clean and focused:

```tsx
// ✅ GOOD: Single responsibility
const EncoderInput = ({ value, onChange }) => {
  /* ... */
};
const EncoderOutput = ({ value, onCopy }) => {
  /* ... */
};
const EncoderControls = ({ onClear, onSwap }) => {
  /* ... */
};

// ❌ BAD: Too much in one component
const Encoder = () => {
  // 500 lines of code...
};
```

### 8. Responsive Design

Always test on multiple screen sizes:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Mobile: stacked, Desktop: side-by-side */}
</div>

<button className="w-full sm:w-auto px-6 py-3">
  {/* Full width on mobile, auto on desktop */}
</button>
```

## 🌐 Browser Compatibility

DevUtil is tested and supported on modern browsers:

| Browser     | Minimum Version   | Status             |
| ----------- | ----------------- | ------------------ |
| **Chrome**  | Latest 2 versions | ✅ Fully Supported |
| **Firefox** | Latest 2 versions | ✅ Fully Supported |
| **Safari**  | Latest 2 versions | ✅ Fully Supported |
| **Edge**    | Latest 2 versions | ✅ Fully Supported |
| **Opera**   | Latest version    | ✅ Supported       |
| **Brave**   | Latest version    | ✅ Supported       |

### Feature Requirements

Most tools require:

- ES6+ JavaScript support
- Web Crypto API (for hash tools)
- Clipboard API (for copy functionality)
- localStorage (for preferences)

### Testing Across Browsers

```bash
# Use BrowserStack or similar for cross-browser testing
# Or test manually on:

# macOS
- Safari (native)
- Chrome
- Firefox

# Windows
- Edge (native)
- Chrome
- Firefox

# Mobile (via browser dev tools or real devices)
- iOS Safari
- Android Chrome
```

## 🚀 Deployment

DevUtil is a static site that can be deployed to any hosting service.

### Build for Production

```bash
# Create production build
npm run build

# Output will be in the dist/ directory
# dist/
#   ├── index.html
#   ├── assets/
#   │   ├── index-[hash].js
#   │   ├── index-[hash].css
#   └── sitemap.xml
```

### Deployment Options

#### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Or connect GitHub repository:**

1. Go to vercel.com
2. Import your GitHub repository
3. Vercel auto-detects Vite configuration
4. Deploy with one click

#### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

**Or use Netlify UI:**

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

#### 3. GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

**Note:** Update `vite.config.ts` with base path:

```ts
export default defineConfig({
  base: "/your-repo-name/",
  // ...
});
```

#### 4. Cloudflare Pages

1. Push code to GitHub
2. Go to Cloudflare Pages dashboard
3. Connect repository
4. Build command: `npm run build`
5. Build output: `dist`
6. Deploy

#### 5. Docker (Self-Hosted)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

Build and run:

```bash
docker build -t devutil .
docker run -p 8080:80 devutil
```

### Environment Configuration

No environment variables are required since all processing is client-side.

**Optional: Analytics**

If you want to add analytics, create `.env`:

```bash
VITE_GA_ID=G-XXXXXXXXXX
VITE_DOMAIN=devutil.xyz
```

Then use in code:

```tsx
const gaId = import.meta.env.VITE_GA_ID;
```

### Post-Deployment Checklist

After deploying, verify:

- ✅ All pages load correctly
- ✅ Routing works (no 404s on refresh)
- ✅ All tools function properly
- ✅ Copy/download features work
- ✅ SEO meta tags are correct
- ✅ Sitemap is accessible at `/sitemap.xml`
- ✅ Dark mode persists
- ✅ Mobile responsive
- ✅ HTTPS is enabled
- ✅ Custom domain configured (if applicable)

## 🐛 Troubleshooting

### Development Issues

#### Port 3000 already in use

```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- --port 3001
```

#### TypeScript errors

```bash
# Check for TypeScript errors
npx tsc --noEmit

# If errors persist, try:
rm -rf node_modules package-lock.json
npm install

# Clear TypeScript cache
rm -rf node_modules/.vite
```

#### Module not found errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
rm -rf dist

# Restart dev server
npm run dev
```

#### Hot reload not working

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Check if you're editing the correct file
# Make sure file is saved (Cmd+S / Ctrl+S)

# Try restarting dev server
# Ctrl+C to stop, then npm run dev
```

### Build Issues

#### Build fails with memory error

```bash
# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

#### Missing files in dist/

```bash
# Ensure public/ files are included
# Check vite.config.ts publicDir setting

# Clean and rebuild
rm -rf dist
npm run build
```

#### Large bundle size

```bash
# Analyze bundle
npm run build
# Check dist/ folder sizes

# Consider:
# - Lazy loading heavy components
# - Code splitting
# - Removing unused dependencies
```

### Runtime Issues

#### Copy to clipboard not working

This usually happens in non-HTTPS environments:

```tsx
// Use fallback method
const fallbackCopy = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
};
```

#### localStorage not working

Check browser privacy settings:

```tsx
const isLocalStorageAvailable = () => {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch {
    return false;
  }
};
```

#### Dark mode not persisting

Check localStorage implementation:

```tsx
// Make sure theme is saved on change
useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);

// And loaded on mount
useEffect(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}, []);
```

### Deployment Issues

#### 404 on page refresh (SPA routing)

Configure your hosting for SPA:

**Vercel** - Add `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify** - Add `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Nginx**:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

#### Assets not loading

Check `vite.config.ts` base path:

```ts
export default defineConfig({
  base: "/", // For root domain
  // OR
  base: "/subdirectory/", // For subdirectory
});
```

#### SEO meta tags not showing

Verify in browser DevTools:

```bash
# Check <head> section contains:
# - <title>
# - <meta name="description">
# - <meta property="og:*">
# - <meta name="twitter:*">
```

Use tools:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

## 📚 Resources

### Official Documentation

- [React Documentation](https://react.dev/) - React fundamentals
- [TypeScript Documentation](https://www.typescriptlang.org/) - TypeScript guide
- [Vite Documentation](https://vitejs.dev/) - Vite build tool
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS
- [React Router](https://reactrouter.com/) - Client-side routing

### Libraries Used

- [crypto-js](https://www.npmjs.com/package/crypto-js) - Cryptographic functions
- [uuid](https://www.npmjs.com/package/uuid) - UUID generation
- [marked](https://marked.js.org/) - Markdown parser
- [papaparse](https://www.papaparse.com/) - CSV parser
- [js-yaml](https://github.com/nodeca/js-yaml) - YAML parser
- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) - XML parser
- [qrcode](https://www.npmjs.com/package/qrcode) - QR code generator
- [react-hot-toast](https://react-hot-toast.com/) - Toast notifications

### Tools & Services

- [Can I Use](https://caniuse.com/) - Browser compatibility checker
- [BundlePhobia](https://bundlephobia.com/) - Package size analyzer
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing
- [WebPageTest](https://www.webpagetest.org/) - Performance testing

### SEO Tools

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Ahrefs Free Tools](https://ahrefs.com/free-seo-tools)

## 🤝 Getting Help

### Documentation

1. Check this guide (DEVELOPMENT.md)
2. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
3. Read [README.md](./README.md) for project overview
4. Check [SEO_IMPLEMENTATION.md](./SEO_IMPLEMENTATION.md) for SEO details

### Community

- **Issues**: [GitHub Issues](https://github.com/devendrapratap02/devutil/issues)

  - Search existing issues before creating new ones
  - Provide detailed reproduction steps
  - Include browser and OS information

- **Discussions**: GitHub Discussions (if enabled)
  - Ask questions
  - Share ideas
  - Help others

### Contact

- **Email**: devendrapratapsinghcs@gmail.com
- **GitHub**: [@devendrapratap02](https://github.com/devendrapratap02)

---

**Happy coding! 🚀**

If you found this guide helpful, please star ⭐ the repository on GitHub!
