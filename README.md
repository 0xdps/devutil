# devutil.xyz

> A comprehensive collection of developer utilities for everyday tasks

## 🚀 Overview

DevUtil is a web-based toolkit designed to help developers perform common daily tasks efficiently. All tools run locally in your browser - no data is sent to any server, ensuring your privacy and security.

## ✨ Features

### 🧩 JSON Tools

- **JSON Formatter & Validator** - Format, validate, and beautify JSON
- **JSON Minifier / Beautifier** - Optimize JSON size
- **JSON to YAML Converter** - Convert JSON to YAML format
- **YAML to JSON Converter** - Convert YAML to JSON format
- **JSON to CSV Converter** - Transform JSON data to CSV
- **JSON Diff** - Compare two JSON files
- **JSON Path Evaluator** - Query JSON using JSONPath

### 🔤 Text & String Tools

- **Base64 Encoder/Decoder** - Encode and decode Base64 strings
- **URL Encoder/Decoder** - Encode and decode URLs
- **HTML Escape/Unescape** - Convert HTML entities
- **String Case Converter** - Convert between camelCase, snake_case, kebab-case, PascalCase
- **UUID Generator** - Generate UUIDs (v1, v4, v5)
- **Lorem Ipsum Generator** - Generate placeholder text
- **Word/Character/Line Counter** - Count text statistics
- **Text Cleaner** - Remove duplicates, trim, and clean text

### 🔒 Encryption & Hashing

- **Hash Generator** - Generate MD5, SHA-1, SHA-256, SHA-512 hashes
- **HMAC Generator** - Generate HMAC signatures
- **AES Encrypt/Decrypt** - AES encryption for sensitive text
- **RSA Key Pair Generator** - Generate RSA public/private keys
- **JWT Decoder** - Decode and inspect JWT tokens (offline)
- **Password Strength Tester** - Test password security
- **Password Generator** - Generate secure random passwords

### 🌐 Web Tools

- **HTTP Header Parser** - Parse and analyze HTTP headers
- **User-Agent Decoder** - Decode user agent strings
- **URL Parser & Builder** - Parse and construct URLs
- **Query String Generator** - Build query strings
- **Meta Tag Generator** - Generate HTML meta tags
- **Robots.txt Generator** - Create robots.txt files
- **Sitemap.xml Generator** - Generate XML sitemaps

### 🧠 Data Tools

- **CSV to JSON Converter** - Convert CSV to JSON
- **JSON to CSV Converter** - Convert JSON to CSV
- **XML to JSON Converter** - Transform XML to JSON
- **JSON to XML Converter** - Transform JSON to XML
- **Excel to JSON Parser** - Parse .xlsx files to JSON
- **Data URI Generator** - Create data URIs
- **Base32/Base58 Encoder** - Encode/decode Base32 and Base58

### 🎨 Code Formatters & Converters

- **HTML/CSS/JS Beautifier** - Format and beautify code
- **SQL Formatter** - Format SQL queries
- **XML Formatter** - Format and validate XML
- **HTML/CSS/JS Minifier** - Minify code for production
- **Regex Tester & Builder** - Test regular expressions with highlighting
- **Code Diff Viewer** - Compare code differences

### ⚙️ Utility Generators

- **UUID/GUID Generator** - Generate unique identifiers
- **Random String/Number Generator** - Generate random values
- **Color Picker** - Pick and convert colors (HEX, RGB, HSL)
- **Unix Timestamp Converter** - Convert timestamps to readable dates
- **QR Code Generator/Decoder** - Generate and decode QR codes
- **Cron Expression Generator** - Build and parse cron expressions

### 💬 Developer Playground

- **JavaScript Runner** - Execute JavaScript in sandboxed environment
- **Markdown Previewer** - Live markdown editor with preview
- **HTML Previewer** - Interactive HTML + CSS + JS playground
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
- [x] Implement basic UI layout with navigation
- [x] JSON formatter utility
- [x] Base64 encoder/decoder

### Phase 2: Essential Tools (In Progress)

- [ ] CSV parser & converter
- [ ] URL encoder/decoder
- [ ] Hash generator (MD5, SHA-1, SHA-256, SHA-512)
- [ ] Password generator & strength tester
- [ ] UUID/GUID generator
- [ ] Regex tester with syntax highlighting
- [ ] Text case converter
- [ ] HTML escape/unescape

### Phase 3: Advanced Tools

- [ ] JWT decoder
- [ ] AES encryption/decryption
- [ ] Diff checker (text & code)
- [ ] Color picker & converter
- [ ] Unix timestamp converter
- [ ] QR code generator
- [ ] Lorem ipsum generator
- [ ] Markdown previewer

### Phase 4: Code Tools

- [ ] HTML/CSS/JS beautifier
- [ ] Code minifier
- [ ] SQL formatter
- [ ] XML formatter
- [ ] JavaScript playground
- [ ] HTML previewer

### Phase 5: Data Converters

- [ ] JSON to YAML converter
- [ ] JSON to CSV converter
- [ ] XML to JSON converter
- [ ] Excel to JSON parser
- [ ] Data URI generator
- [ ] Cron expression builder

### Phase 6: Web Tools

- [ ] HTTP header parser
- [ ] User-agent decoder
- [ ] URL parser & builder
- [ ] Meta tag generator
- [ ] Robots.txt generator
- [ ] Query string builder

### Phase 7: Enhancement Features

- [ ] Dark/light theme toggle
- [ ] Search across all tools
- [ ] Favorites/bookmarks for frequently used tools
- [ ] Keyboard shortcuts
- [ ] Tool history (LocalStorage)
- [ ] Export/Import functionality
- [ ] Progressive Web App (PWA) support
- [ ] Offline support

### Phase 8: Advanced Features

- [ ] Public API access
- [ ] Browser extension
- [ ] VS Code plugin
- [ ] Shareable links with encoded data
- [ ] Multi-tab support
- [ ] Custom tool configurations

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
