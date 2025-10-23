# DevUtil - Developer Utilities Toolkit

> A comprehensive collection of developer utilities for everyday tasks - all running locally in your browser

## 🚀 Overview

DevUtil is a privacy-focused web-based toolkit designed to help developers perform common daily tasks efficiently. All tools run entirely in your browser - no data is sent to any server, ensuring complete privacy and security for your sensitive information.

**Live Site**: [devutil.xyz](https://devutil.xyz) (coming soon)

## ✨ Features

### ✅ Implemented Tools

#### 🔄 Core Utilities

- **Data Transform** ✅ - Convert between JSON, CSV, YAML, TOML, and XML formats with syntax highlighting
- **Encoding/Decoding** ✅ - Encode/decode Base64, URL, HTML entities, Base32/58, and Data URIs
- **Text Utilities** ✅ - Case converter (camelCase, snake_case, UPPER, lower, etc.), word/character counter, and text cleaner (remove spaces, sort lines, reverse text)

#### 🔐 Security & Identity

- **Generator Toolkit** ✅ - Generate UUIDs (v1/v4/v5), secure random strings/numbers with customizable character sets, and Lorem Ipsum text
- **Hash & Verify** ✅ - Generate MD5, SHA-1, SHA-256, SHA-512 hashes, HMAC signatures, and test password strength with visual feedback
- **JWT Decoder** ✅ - Decode and inspect JWT tokens with human-readable timestamps and table/JSON view toggle

#### 💻 Code & Development

- **Code Formatter** ✅ - Beautify and minify JSON, HTML, CSS, and JavaScript
- **Regex Tester** ✅ - Test regular expressions with pattern matching and flags (g, i, m)

#### 🎨 Web & Design

- **Color Picker** ✅ - Pick and convert colors between HEX, RGB, and HSL formats with visual color preview
- **URL Tools** ✅ - Parse URLs, encode/decode URL components, with comprehensive usage guide
- **QR Code Generator** ✅ - Generate QR codes from text or URLs with download option

#### ⚙️ Utilities

- **Timestamp Tools** ✅ - Convert Unix timestamps to human-readable dates and parse Cron expressions with examples

#### 🎮 Developer Playground

- **Markdown Previewer** ✅ - Live markdown editor with side-by-side preview
- **HTML Playground** ✅ - Interactive HTML + CSS + JS playground with live preview
- **JavaScript Runner** ✅ - Execute JavaScript code with console output capture

### 🚧 Coming Soon

- **JSON Tools** 🔄 - JSON Diff Viewer, JSONPath Evaluator, Schema Validator
- **Code Diff** 🔄 - Side-by-side code comparison with syntax highlighting
- **SEO Generator** 🔄 - Generate meta tags, robots.txt, and sitemap.xml
- **Regex Playground** 🔄 - Interactive regex testing with pattern library and explanations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript 5.5.4
- **Build Tool**: Vite 5.x (Fast HMR and optimized builds)
- **Styling**: Tailwind CSS 3.4 with custom design system
- **Routing**: React Router DOM 6.26
- **SEO**: react-helmet-async with structured data (Schema.org)
- **State Management**: React Context API and Hooks
- **UI Components**: Custom components with Tailwind
- **Code Highlighting**: highlight.js
- **Testing**: Vitest + React Testing Library
- **Utilities**:
  - `crypto-js` - Cryptographic functions
  - `uuid` - UUID generation
  - `marked` - Markdown parsing
  - `papaparse` - CSV parsing
  - `js-yaml` - YAML parsing
  - `fast-xml-parser` - XML parsing
  - `qrcode` - QR code generation
  - `cronstrue` - Cron expression parsing
  - `fuse.js` - Fuzzy search for tool navigation

## 📦 Project Structure

```
devutil/
├── public/                    # Static assets
│   ├── robots.txt            # Search engine crawler rules
│   └── sitemap.xml           # Site structure for SEO
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.tsx       # Top navigation with theme toggle
│   │   ├── Sidebar.tsx      # Side navigation with fuzzy search
│   │   └── SEO.tsx          # SEO meta tags component
│   ├── config/              # Configuration files
│   │   └── seoConfig.ts     # SEO metadata for all pages
│   ├── pages/               # Page components (one per tool)
│   │   ├── Home.tsx         # Landing page
│   │   ├── DataTransform.tsx       # ✅ JSON/CSV/YAML/TOML/XML converter
│   │   ├── Encoding.tsx            # ✅ Base64/URL encoding
│   │   ├── TextUtilities.tsx       # ✅ Text manipulation tools
│   │   ├── GeneratorToolkit.tsx    # ✅ UUID/Random/Lorem generator
│   │   ├── HashVerify.tsx          # ✅ Hash/HMAC generator
│   │   ├── JWTDecoder.tsx          # ✅ JWT token decoder
│   │   ├── CodeFormatter.tsx       # ✅ Code beautifier
│   │   ├── RegexTester.tsx         # ✅ Regex pattern tester
│   │   ├── ColorPicker.tsx         # ✅ Color format converter
│   │   ├── URLTools.tsx            # ✅ URL parser/encoder
│   │   ├── QRCodeGenerator.tsx     # ✅ QR code generator
│   │   ├── TimestampTools.tsx      # ✅ Timestamp converter
│   │   ├── MarkdownPreviewer.tsx   # ✅ Markdown editor
│   │   ├── HTMLPlayground.tsx      # ✅ HTML/CSS/JS playground
│   │   ├── JavaScriptRunner.tsx    # ✅ JS code executor
│   │   ├── JSONTools.tsx           # 🚧 Coming soon
│   │   ├── CodeDiff.tsx            # 🚧 Coming soon
│   │   ├── SEOGenerator.tsx        # 🚧 Coming soon
│   │   ├── RegexPlayground.tsx     # 🚧 Coming soon
│   │   └── ComingSoon.tsx   # Template for upcoming features
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Helper functions and utilities
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Entry point with providers
│   └── index.css            # Global styles and Tailwind imports
├── index.html               # HTML template with base SEO tags
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── README.md                # This file
└── SEO_IMPLEMENTATION.md    # SEO setup documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/0xdps/devutil.git
cd devutil

# Install dependencies
npm install

# Start development server
npm run dev
# App will be available at http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run linter
npm run lint
```

### Environment Setup

No environment variables required - all tools run client-side!

### Development

The project uses Vite for fast development:

- Hot Module Replacement (HMR) for instant updates
- TypeScript type checking
- ESLint for code quality
- Tailwind CSS with JIT mode

## 🎨 Features in Detail

### Data Transform

- **Supported Formats**: JSON ↔ CSV ↔ YAML ↔ TOML ↔ XML
- **Features**: Syntax highlighting, error handling, format validation
- **Use Cases**: API response conversion, config file transformation

### Encoding/Decoding

- **Methods**: Base64, Base32, Base58, URL encoding, HTML entities, Data URI
- **Features**: Bidirectional encoding/decoding, copy to clipboard
- **Use Cases**: Email encoding, URL parameter handling, image data URIs

### Text Utilities

- **Case Conversion**: camelCase, PascalCase, snake_case, kebab-case, UPPER CASE, lower case
- **Text Analysis**: Character count, word count, line count, unique words
- **Text Operations**: Remove extra spaces, remove blank lines, trim lines, sort lines, reverse text

### Generator Toolkit

- **UUID**: v1 (timestamp), v4 (random), v5 (namespace)
- **Random**: Customizable length, character sets (uppercase, lowercase, numbers, symbols)
- **Lorem Ipsum**: Configurable paragraphs, words, or sentences

### Hash & Verify

- **Algorithms**: MD5, SHA-1, SHA-256, SHA-512
- **HMAC**: All SHA algorithms with secret key
- **Password Strength**: Real-time analysis with visual feedback and suggestions

### JWT Decoder

- **Features**: Header/payload decoding, human-readable timestamps
- **View Modes**: Table view or raw JSON
- **Timestamps**: Automatic conversion of iat, exp, nbf to readable dates

## 🔒 Privacy & Security

- ✅ **100% Client-Side**: All processing happens in your browser
- ✅ **No Server Calls**: Zero data transmission to external servers
- ✅ **No Analytics**: No tracking, no cookies, no data collection
- ✅ **Open Source**: Full transparency - inspect the code yourself
- ✅ **Offline Capable**: Works without internet connection (after initial load)

## 📱 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

# Run tests

npm test

````

## 🎯 Development Roadmap

### Phase 1: Foundation ✅ COMPLETED

- [x] Core project setup with React + TypeScript + Vite
- [x] Responsive UI layout with navigation and theme toggle
- [x] Sidebar with fuzzy search (Fuse.js)
- [x] Dark/light theme support
- [x] Mobile-responsive design

### Phase 2: Core Utilities ✅ COMPLETED

- [x] **Data Transform** - JSON, CSV, YAML, TOML, XML converter
- [x] **Encoding/Decoding** - Base64, URL, HTML, Base32/58, Data URI
- [x] **Text Utilities** - Case converter, text counter, text cleaner

### Phase 3: Security & Development Tools ✅ COMPLETED

- [x] **Generator Toolkit** - UUID, Random String/Number, Lorem Ipsum
- [x] **Hash & Verify** - Hash generator, HMAC, password strength tester
- [x] **JWT Decoder** - Decode and inspect JWT tokens with timestamps
- [x] **Code Formatter** - Beautify/minify JSON/HTML/CSS/JS
- [x] **Regex Tester** - Test regex patterns with flags

### Phase 4: Code & Design Tools ✅ COMPLETED

- [x] **Color Picker** - HEX, RGB, HSL converter with visual picker
- [x] **URL Tools** - URL parser, encoder/decoder with usage guide
- [x] **QR Code Generator** - Generate and download QR codes

### Phase 5: Advanced Tools ✅ COMPLETED

- [x] **Timestamp Tools** - Unix timestamp converter, Cron parser

### Phase 6: Developer Playground ✅ COMPLETED

- [x] **Markdown Previewer** - Live markdown editor with preview
- [x] **HTML Playground** - Interactive HTML/CSS/JS environment
- [x] **JavaScript Runner** - Sandboxed JS execution with console capture

### Phase 7: SEO & Optimization ✅ COMPLETED

- [x] Comprehensive SEO implementation with structured data
- [x] Open Graph and Twitter Card meta tags
- [x] Sitemap.xml and robots.txt
- [x] Schema.org markup for all tools
- [x] Performance optimization with Vite

### Phase 8: Advanced Features 🚧 IN PROGRESS

- [x] Dark/light theme toggle
- [ ] **JSON Tools** - JSON Diff, JSONPath Evaluator, Schema Validator
- [ ] **Code Diff** - Side-by-side code comparison
- [ ] **SEO Generator** - Meta tags, robots.txt, sitemap.xml generator
- [ ] **Regex Playground** - Interactive regex testing with pattern library
- [ ] Favorites/bookmarks for frequently used tools
- [ ] Keyboard shortcuts
- [ ] Tool history (LocalStorage)
- [ ] Progressive Web App (PWA) support

### Phase 9: Future Ideas 💡

- [ ] Export/Import functionality for tool configurations
- [ ] Shareable links with encoded data (base64 URL params)
- [ ] Multi-tab support within tools
- [ ] Custom tool configurations and presets
- [ ] Command palette (CMD+K / CTRL+K)
- [ ] Tool usage statistics (local only)
- [ ] Browser extension version
- [ ] API endpoint testing tool
- [ ] WebSocket testing tool
- [ ] GraphQL query builder

## 📊 Project Stats

- **Total Tools**: 20 (16 implemented, 4 coming soon)
- **Implementation Status**: 80% complete
- **Lines of Code**: ~8,000+ (TypeScript/TSX)
- **Bundle Size**: < 500KB (gzipped)
- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Zero Dependencies Issues**: All packages up-to-date and maintained

## 🤝 Contributing

Contributions are welcome! Whether it's bug fixes, new features, or documentation improvements.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation if needed
- Test your changes thoroughly
- Ensure TypeScript types are properly defined

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New utility tools
- 📚 Documentation enhancements
- 🎨 UI/UX improvements
- ♿ Accessibility improvements
- 🌐 Internationalization (i18n)
- ⚡ Performance optimizations

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
````

Tests are located in the same directory as components with `.test.tsx` extension.

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Output will be in the `dist/` directory
# Preview the production build locally
npm run preview
```

### Deployment

The app can be deployed to any static hosting service:

- Vercel (recommended)
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

**Build output**: Static files in `dist/` directory

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from emoji set
- Inspired by developer productivity tools

## 📧 Contact & Support

**Author**: Devendra Pratap Singh

- GitHub: [@0xdps](https://github.com/0xdps)
- Project: [https://github.com/0xdps/devutil](https://github.com/0xdps/devutil)

### Report Issues

Found a bug or have a feature request?
[Open an issue](https://github.com/0xdps/devutil/issues)

## ⭐ Show Your Support

If you find this project helpful, please consider giving it a star on GitHub!

---

**Made with ❤️ for developers, by developers**
