# devutil.xyz

> A comprehensive collection of developer utilities for everyday tasks

## 🚀 Overview

DevUtil is a web-based toolkit designed to help developers perform common daily tasks efficiently. All tools run locally in your browser - no data is sent to any server, ensuring your privacy and security.

## ✨ Features

### 🔄 Core Utilities

- **Data Transform** - Convert between JSON, CSV, YAML, TOML, and XML formats
- **Encoding/Decoding** - Encode/decode Base64, URL, HTML entities, Base32/58, and Data URIs
- **Text Utilities** - Case converter (camelCase, snake_case, etc.), text counter, and text cleaner

### 🔐 Security & Identity

- **Generator Toolkit** - Generate UUIDs, passwords, random strings/numbers, and Lorem Ipsum text
- **Hash & Verify** - Generate MD5, SHA-1, SHA-256, SHA-512 hashes, HMAC signatures, and test password strength
- **JWT Decoder** - Decode and inspect JWT tokens (offline)

### 💻 Code & Development

- **Code Formatter** - Beautify and minify HTML, CSS, JavaScript, SQL, and XML
- **JSON Tools** - Compare JSON files (diff) and query using JSONPath
- **Regex Tester** - Test and build regular expressions with syntax highlighting
- **Code Diff** - Compare code and text differences

### 🎨 Web & Design

- **Color Picker** - Pick and convert colors between HEX, RGB, and HSL formats
- **URL Tools** - Parse, build URLs, and generate query strings
- **SEO Generator** - Generate meta tags, robots.txt, and sitemap.xml files
- **QR Code** - Generate and decode QR codes

### ⚙️ Utilities

- **Timestamp Tools** - Convert Unix timestamps and build Cron expressions

### 🎮 Developer Playground

- **Markdown Previewer** - Live markdown editor with preview
- **HTML Playground** - Interactive HTML + CSS + JS playground
- **JavaScript Runner** - Execute JavaScript in sandboxed environment
- **Regex Playground** - Interactive regex testing environment

## 🛠️ Tech Stack

- **Frontend Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context/Hooks
- **Code Editor**: Monaco Editor / CodeMirror
- **Testing**: Vitest + React Testing Library

## 📦 Project Structure

```
devutil/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components for each utility
│   ├── utils/            # Helper functions and utilities
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── tests/                # Test files
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/devendrapratap02/devutil.git
cd devutil

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🎯 Roadmap

### Phase 1: Foundation ✅

- [x] Core project setup with React + TypeScript + Vite
- [x] Implement basic UI layout with navigation and search
- [x] Data Transform utility (JSON, CSV, YAML, TOML, XML converter)
- [x] Sidebar with fuzzy search
- [x] Responsive design with mobile support

### Phase 2: Core Utilities (In Progress)

- [ ] **Encoding/Decoding** - Base64, URL, HTML, Base32/58, Data URI
- [ ] **Text Utilities** - Case converter, text counter, text cleaner
- [ ] **Generator Toolkit** - UUID, Password, Random, Lorem Ipsum

### Phase 3: Security & Development Tools

- [ ] **Hash & Verify** - Hash generator, HMAC, password strength tester
- [ ] **JWT Decoder** - Decode and inspect JWT tokens
- [ ] **Code Formatter** - Beautify/minify HTML/CSS/JS/SQL/XML
- [ ] **JSON Tools** - JSON Diff, JSONPath evaluator

### Phase 4: Code & Design Tools

- [ ] **Regex Tester** - Test and build regex patterns
- [ ] **Code Diff** - Compare code/text differences
- [ ] **Color Picker** - HEX, RGB, HSL converter and picker
- [ ] **URL Tools** - URL parser, builder, query string generator

### Phase 5: Advanced Tools

- [ ] **SEO Generator** - Meta tags, robots.txt, sitemap.xml
- [ ] **QR Code** - Generate and decode QR codes
- [ ] **Timestamp Tools** - Unix converter, Cron expression builder

### Phase 6: Developer Playground

- [ ] **Markdown Previewer** - Live markdown editor
- [ ] **HTML Playground** - Interactive HTML/CSS/JS environment
- [ ] **JavaScript Runner** - Sandboxed JS execution
- [ ] **Regex Playground** - Interactive regex testing

### Phase 7: Enhancement Features

- [ ] Dark/light theme toggle
- [ ] Favorites/bookmarks for frequently used tools
- [ ] Keyboard shortcuts
- [ ] Tool history (LocalStorage)
- [ ] Export/Import functionality
- [ ] Progressive Web App (PWA) support
- [ ] Offline support

### Phase 8: Future Ideas

- [ ] Shareable links with encoded data
- [ ] Multi-tab support within tools
- [ ] Custom tool configurations
- [ ] Tool usage analytics (privacy-preserving)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy

All tools run entirely in your browser. No data is transmitted to any server, ensuring complete privacy and security for your sensitive information.

## 📧 Contact

Devendra Pratap Singh - [@devendrapratap02](https://github.com/devendrapratap02)

Project Link: [https://github.com/devendrapratap02/devutil](https://github.com/devendrapratap02/devutil)
