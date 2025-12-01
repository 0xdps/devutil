# Developer Utilities Tool

> A comprehensive, privacy-first collection of developer utilities for everyday tasks—all running locally in your browser.

## 🚀 Overview

**Developer Utilities Tool** is a modern, open-source web application that provides developers with a powerful suite of productivity tools. Every tool runs entirely in your browser—no server calls, no data transmission, no tracking. It's perfect for quick conversions, encoding/decoding, code formatting, testing, and more.

**Live Site**: [devutil.xyz](https://devutil.xyz) | **Repository**: [0xdps/devutil-tools](https://github.com/0xdps/devutil-tools)

## ✨ Key Features

### 🔒 Privacy First
- **100% Client-Side Processing**: All tools run in your browser
- **Zero Server Calls**: Your data never leaves your device
- **No Tracking**: No analytics, cookies, or data collection
- **Open Source**: Full transparency—inspect the code yourself
- **Offline Capable**: Works without internet after initial load

### 🎯 16+ Implemented Tools

#### 🔄 Data & Conversion Tools
- **Data Transform** - Convert between JSON, CSV, YAML, TOML, and XML with syntax highlighting
- **Encoding/Decoding** - Base64, Base32, Base58, URL encoding, HTML entities, and Data URIs
- **Text Utilities** - Case converter, character/word counter, text cleaner, line sorter, text reverser

#### 🔐 Security & Cryptography
- **Generator Toolkit** - UUID (v1/v4/v5), secure random strings/numbers, Lorem Ipsum text
- **Hash & Verify** - MD5, SHA-1, SHA-256, SHA-512 hashes, HMAC signatures, password strength analyzer
- **JWT Decoder** - Decode and inspect JWT tokens with human-readable timestamps

#### 💻 Code & Development
- **Code Formatter** - Beautify/minify JSON, HTML, CSS, JavaScript
- **Regex Tester** - Test regular expressions with pattern matching and global/case-insensitive/multiline flags
- **Code Diff** - Side-by-side code comparison (scaffolded, coming soon)

#### 🎨 Web & Design
- **Color Picker** - Convert between HEX, RGB, HSL formats with visual picker
- **URL Tools** - Parse URLs, encode/decode components, query string analyzer
- **QR Code Generator** - Generate and download QR codes from text or URLs

#### ⚙️ Utilities & Tools
- **Timestamp Tools** - Convert Unix timestamps to dates, parse Cron expressions
- **SEO Generator** - Generate meta tags, Open Graph cards, Twitter Cards (scaffolded, coming soon)

#### 🎮 Developer Playgrounds
- **Markdown Previewer** - Live markdown editor with side-by-side preview
- **HTML Playground** - Interactive HTML + CSS + JS editor with live preview
- **JavaScript Runner** - Execute JavaScript code with console output capture

### 🚧 Planned Features
- **JSON Tools** - JSON Diff, JSONPath evaluator, Schema validator
- **Regex Playground** - Interactive regex testing with pattern library
- **API Tester** - REST/GraphQL request builder
- Favorites/bookmarks for frequently used tools
- Keyboard shortcuts for power users
- Tool usage history (local storage)
- Progressive Web App (PWA) support
- Shareable links with encoded data

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3.1** - UI framework with hooks and context
- **TypeScript 5.5.4** - Type-safe development
- **Vite 5.x** - Fast build tool with HMR
- **Tailwind CSS 3.4** - Utility-first styling
- **React Router 6.26** - Client-side routing

### Key Libraries
| Library | Purpose |
|---------|---------|
| `react-helmet-async` | SEO meta tags per route |
| `crypto-js` | Cryptographic functions |
| `uuid` | UUID generation |
| `marked` | Markdown parsing and rendering |
| `highlight.js` | Code syntax highlighting |
| `papaparse` | CSV parsing and generation |
| `js-yaml` | YAML parsing |
| `fast-xml-parser` | XML parsing |
| `qrcode` | QR code generation |
| `cronstrue` | Cron expression parsing |
| `fuse.js` | Fuzzy search for tool navigation |
| `diff` | Text/code comparison |
| `react-hot-toast` | Toast notifications |

## 📦 Project Structure

```
devutil-tools/
├── public/                   # Static assets & SEO files
│   ├── robots.txt            # Search engine crawler rules
│   ├── sitemap.xml           # Site structure for SEO
│   ├── 404.html              # 404 error page
│   └── CNAME                 # Custom domain config
│
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx        # Top navigation with theme toggle
│   │   ├── Sidebar.tsx       # Side navigation with fuzzy search
│   │   ├── Footer.tsx        # Footer component
│   │   ├── Layout.tsx        # Main layout wrapper
│   │   ├── Modal.tsx         # Modal component
│   │   ├── CustomSelect.tsx  # Custom select dropdown
│   │   ├── Logo.tsx          # Logo component
│   │   └── SEO.tsx           # SEO meta tags component
│   │
│   ├── config/               # Configuration files
│   │   └── seoConfig.ts      # SEO metadata for all pages and tools
│   │
│   ├── pages/                # Page components (one per tool)
│   │   ├── Home.tsx                    # Landing page
│   │   ├── DataTransform.tsx           # JSON/CSV/YAML/TOML/XML converter
│   │   ├── Encoding.tsx                # Base64/URL encoding
│   │   ├── TextUtilities.tsx           # Text manipulation tools
│   │   ├── GeneratorToolkit.tsx        # UUID/Random/Lorem generator
│   │   ├── HashVerify.tsx              # Hash/HMAC generator & password checker
│   │   ├── JWTDecoder.tsx              # JWT token decoder
│   │   ├── CodeFormatter.tsx           # Code beautifier/minifier
│   │   ├── RegexTester.tsx             # Regex pattern tester
│   │   ├── ColorPicker.tsx             # Color format converter
│   │   ├── URLTools.tsx                # URL parser/encoder
│   │   ├── QRCodeGenerator.tsx         # QR code generator
│   │   ├── TimestampTools.tsx          # Timestamp converter & Cron parser
│   │   ├── MarkdownPreviewer.tsx       # Markdown live editor
│   │   ├── HTMLPlayground.tsx          # HTML/CSS/JS sandbox
│   │   ├── JavaScriptRunner.tsx        # JavaScript executor
│   │   ├── JSONTools.tsx               # (Coming soon)
│   │   ├── CodeDiff.tsx                # (Coming soon)
│   │   ├── SEOGenerator.tsx            # (Coming soon)
│   │   ├── RegexPlayground.tsx         # (Coming soon)
│   │   ├── ComingSoon.tsx              # Template for future tools
│   │   └── NotFound.tsx                # 404 page
│   │
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Shared types and interfaces
│   │
│   ├── utils/                # Utility functions
│   │   └── helpers.ts        # Copy to clipboard, download file helpers
│   │
│   ├── App.tsx               # Main app component with routing
│   ├── App.css               # App-specific styles
│   ├── main.tsx              # Entry point with providers
│   ├── index.css             # Global styles & Tailwind imports
│   └── vite-env.d.ts         # Vite environment types
│
├── scripts/                  # Build and utility scripts
│   ├── postbuild.sh          # Post-build hook
│   └── prerender.mjs         # Pre-rendering script for SEO
│
├── docs/                     # Documentation
│   └── (Additional docs as needed)
│
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tsconfig.node.json       # TypeScript config for build tools
├── vite.config.ts           # Vite build configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── LICENSE                  # MIT License
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm, yarn, or pnpm

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/0xdps/devutil-tools.git
cd devutil-tools

# Install dependencies
npm install

# Start development server (HMR enabled)
npm run dev
# App available at http://localhost:5173

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint

# Run tests
npm run test
```

### Environment Variables
**None required!** All tools run client-side with no backend dependencies.

## 📖 Tool Documentation

### Data Transformation Tools

#### Data Transform
Convert data between multiple formats with syntax validation.
- **Supported Formats**: JSON ↔ CSV ↔ YAML ↔ TOML ↔ XML
- **Features**: Real-time syntax highlighting, error detection, format validation
- **Route**: `/data-transform`

#### Encoding/Decoding
Encode and decode text using various algorithms.
- **Methods**: Base64, Base32, Base58, URL encoding, HTML entities, Data URIs
- **Features**: Bidirectional conversion, copy to clipboard
- **Route**: `/encoding`

#### Text Utilities
Manipulate and analyze text content.
- **Case Conversion**: camelCase → PascalCase → snake_case → kebab-case → UPPER → lower
- **Analysis**: Character count, word count, line count, unique word count
- **Operations**: Remove extra spaces, remove blank lines, trim whitespace, sort lines, reverse text
- **Route**: `/text-utilities`

### Security & Cryptography Tools

#### Generator Toolkit
Generate various types of random data.
- **UUID**: v1 (timestamp-based), v4 (random), v5 (namespace-based)
- **Random Generation**: Customizable length, character sets (upper, lower, numbers, symbols)
- **Lorem Ipsum**: Configurable paragraphs, words, or sentences
- **Route**: `/generators`

#### Hash & Verify
Generate and verify cryptographic hashes.
- **Algorithms**: MD5, SHA-1, SHA-256, SHA-512
- **HMAC**: All SHA algorithms with optional secret key
- **Password Strength**: Real-time analysis with visual feedback, strength indicators, and suggestions
- **Route**: `/hash-verify`

#### JWT Decoder
Decode and analyze JWT tokens.
- **Features**: Header/payload decoding, human-readable timestamps
- **View Modes**: Table view for structured display, raw JSON view
- **Timestamps**: Automatic conversion of iat, exp, nbf fields to readable dates
- **Route**: `/jwt-decoder`

### Code & Development Tools

#### Code Formatter
Beautify and minify code.
- **Languages**: JSON, HTML, CSS, JavaScript
- **Features**: Syntax highlighting, configurable indentation
- **Options**: Beautify or minify, bracket spacing control
- **Route**: `/code-formatter`

#### Regex Tester
Test and debug regular expressions.
- **Features**: Pattern matching with real-time highlighting
- **Flags**: Global (g), Case-insensitive (i), Multiline (m)
- **Display**: Matched results with visual highlighting
- **Route**: `/regex-tester`

### Web & Design Tools

#### Color Picker
Convert and analyze colors.
- **Formats**: HEX ↔ RGB ↔ HSL ↔ HSLA
- **Visual Picker**: Interactive color selection
- **Features**: Copy color values, color preview
- **Route**: `/color-picker`

#### URL Tools
Parse and manipulate URLs.
- **Parsing**: Break down URLs into components (protocol, host, path, query, fragment)
- **Encoding/Decoding**: URL component encoding, query string analysis
- **Features**: Copy components, usage examples
- **Route**: `/url-tools`

#### QR Code Generator
Generate QR codes for various content types.
- **Input Types**: Text, URLs, email addresses, phone numbers
- **Features**: Customizable size, PNG download
- **Use Cases**: Link sharing, contact information, WiFi networks
- **Route**: `/qr-code`

### Utilities

#### Timestamp Tools
Convert between Unix timestamps and human-readable dates.
- **Conversion**: Unix timestamp ↔ ISO date string
- **Current Time**: Generate current timestamp
- **Cron Parser**: Parse and explain Cron expressions with examples
- **Timezone Support**: UTC timezone handling
- **Route**: `/timestamp-tools`

### Developer Playgrounds

#### Markdown Previewer
Live markdown editor with side-by-side preview.
- **Editor**: Full markdown syntax support
- **Preview**: Real-time rendering as you type
- **Features**: Syntax highlighting in editor
- **Route**: `/markdown-previewer`

#### HTML Playground
Interactive sandbox for HTML, CSS, and JavaScript.
- **Editors**: Separate tabs for HTML, CSS, and JavaScript
- **Preview**: Live preview pane with instant updates
- **Features**: Console output capture, error handling
- **Route**: `/html-playground`

#### JavaScript Runner
Execute JavaScript code with console capture.
- **Execution**: Safe sandboxed environment
- **Console**: Capture console.log, console.error output
- **Features**: Variable inspection, error messages
- **Use Cases**: Test snippets, debug code, learn JavaScript
- **Route**: `/js-runner`

## 🎯 Development Roadmap

### ✅ Phase 1-6: Foundation & Core Tools (COMPLETED)
- React + TypeScript + Vite setup with Tailwind CSS
- Responsive UI with dark/light theme toggle
- Sidebar with fuzzy search navigation
- All core utilities (16 tools implemented)
- SEO implementation with structured data
- Mobile-responsive design

### 🚧 Phase 7: Advanced Features (IN PROGRESS)
- [ ] JSON Tools suite (Diff, JSONPath, Schema Validator)
- [ ] Code Diff tool with side-by-side comparison
- [ ] SEO Generator for meta tags and cards
- [ ] Regex Playground with pattern library
- [ ] Favorites/bookmarks system
- [ ] Keyboard shortcuts
- [ ] Tool usage history (LocalStorage)

### 💡 Phase 8: Future Enhancements
- Progressive Web App (PWA) support
- Shareable links with encoded data
- API/REST endpoint tester
- GraphQL query builder
- WebSocket testing tool
- curl → code converter
- Environment variables diff & masker
- JWT/JWE token generator
- Browser extension version
- Command palette (Cmd+K / Ctrl+K)
- Multi-language support (i18n)

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| Total Tools | 20 (16 implemented, 4 coming soon) |
| Implementation Status | 80% |
| TypeScript/TSX Code | ~8,000+ lines |
| Bundle Size (gzipped) | < 500KB |
| Lighthouse Score | 95+ |
| Browser Support | Chrome, Firefox, Safari, Edge (last 2 versions) |
| Zero Dependencies Issues | ✅ All packages maintained |

## 🔧 Development Guide

### Adding a New Tool

1. **Create Component**
   ```bash
   # Create new file in src/pages/
   touch src/pages/MyNewTool.tsx
   ```

2. **Add SEO Configuration**
   - Edit `src/config/seoConfig.ts`
   - Add metadata entry for the tool

3. **Update Routing**
   - Add route in `src/App.tsx`

4. **Update Navigation**
   - Add to sidebar list in `src/components/Sidebar.tsx`
   - Update `public/sitemap.xml`

5. **Component Template**
   ```tsx
   import SEO from '../components/SEO'
   import { toolsMetadata } from '../config/seoConfig'
   
   export default function MyNewTool() {
     const meta = toolsMetadata.myNewTool
     
     return (
       <>
         <SEO
           title={meta.title}
           description={meta.description}
           keywords={meta.keywords}
           canonical={meta.canonical}
         />
         {/* Your tool UI here */}
       </>
     )
   }
   ```

### Code Style Guidelines

- **React**: Use functional components with hooks
- **TypeScript**: Define types for all props and return values
- **Styling**: Utility-first Tailwind CSS approach
- **Components**: Keep components focused and reusable
- **Utilities**: Extract common logic to `src/utils/`
- **Naming**: Clear, descriptive names for variables and functions

### Styling Conventions

```tsx
// Use Tailwind utility classes
<div className="max-w-4xl mx-auto px-4">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
    Title
  </h1>
</div>

// Container sizing
max-w-4xl: Most tools
max-w-6xl: Wider layouts

// Spacing
space-y-4: Vertical rhythm
space-x-4: Horizontal spacing
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

Tests are co-located with components using `.test.tsx` extension.

## 📦 Building for Production

```bash
# Build optimized production bundle
npm run build

# Output: static files in dist/ directory

# Preview production build
npm run preview
```

### Deployment Options

- **Vercel** (recommended) - Built-in optimizations for Vite
- **Netlify** - Automatic deployments from git
- **GitHub Pages** - Static hosting via workflow
- **Cloudflare Pages** - Edge deployment
- **AWS S3 + CloudFront** - Scalable CDN delivery

**Output**: Static files in `dist/` directory (no server required)

## 🔒 Privacy & Security

### Privacy Guarantees
- ✅ **100% Client-Side**: All processing happens in your browser
- ✅ **No Server Calls**: Zero data transmission to external servers
- ✅ **No Analytics**: No tracking, no cookies, no data collection
- ✅ **Open Source**: Full transparency—inspect code yourself
- ✅ **Offline Capable**: Works without internet after initial load

### Security Notes
- Uses standard cryptographic libraries (crypto-js)
- Password strength checker provides recommendations (not a security guarantee)
- Client-side processing means sensitive data never leaves your device
- No user accounts or authentication required

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Chromium | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| Mobile Chrome | Last 2 versions |
| Mobile Safari | Last 2 versions |

## 🤝 Contributing

Contributions are welcome! Whether it's bug fixes, new features, or documentation improvements, we'd love your help.

### How to Contribute

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request** with description of changes

### Contribution Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation if needed
- Test changes thoroughly
- Ensure TypeScript types are properly defined
- Keep components focused and reusable

### Areas for Contribution

- 🐛 **Bug Fixes**: Report and fix issues
- ✨ **New Tools**: Implement new utilities
- 📚 **Documentation**: Improve or add docs
- 🎨 **UI/UX**: Design improvements and polish
- ♿ **Accessibility**: A11y enhancements
- 🌐 **Internationalization**: i18n support
- ⚡ **Performance**: Optimization opportunities
- 🧪 **Tests**: Improve test coverage

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with passion using:
- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- Open source community

## 📧 Contact & Support

**Author**: Devendra Pratap Singh
- **GitHub**: [@0xdps](https://github.com/0xdps)
- **Repository**: [github.com/0xdps/devutil-tools](https://github.com/0xdps/devutil-tools)

### Report Issues

Found a bug or have a feature request?
- [Open an Issue](https://github.com/0xdps/devutil-tools/issues)
- [Start a Discussion](https://github.com/0xdps/devutil-tools/discussions)

### Feature Requests

Have an idea for a new tool or feature? Please open an issue with:
- Clear description of the feature
- Use case and benefits
- Example of how it would work

## ⭐ Show Your Support

If you find this project helpful, please consider:
- ⭐ Starring this repository
- 🔗 Sharing with other developers
- 💬 Providing feedback and suggestions
- 🤝 Contributing improvements

---

**Made with ❤️ for developers, by developers**

*Last Updated: December 2025*
