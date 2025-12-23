export interface ToolMeta {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  toolName: string;
  toolDescription: string;
}

export const toolsMetadata: Record<string, ToolMeta> = {
  home: {
    title:
      "Developer Utilities Tool - Free Developer Utilities, Online Code Tools & Privacy-First Solutions",
    description:
      "Developer Utilities Tool is your Swiss Army Knife for developers: a privacy-first, comprehensive suite of free online developer tools. Instantly format code, test regex, convert data, generate hashes, and more—no registration, no tracking, just results.",
    keywords: [
      "Developer Utilities Tool",
      "devutil tools",
      "free developer utilities",
      "online code tools",
      "privacy-first developer tools",
      "no registration developer tools",
      "developer tools",
      "online utilities",
      "dev tools",
      "programming tools",
      "web development tools",
      "coding tools",
      "developer utilities",
      "software tools",
      "programmer utilities",
      "web tools",
      "instant code formatter",
      "test regex online",
      "convert json to csv",
      "beautify code online",
      "generate secure hashes online",
      "jwt decoder",
      "uuid generator",
      "text utilities",
      "data transformation",
      "markdown previewer",
      "html playground",
      "javascript runner",
      "url parser",
      "color picker",
      "qr code generator",
      "no tracking developer tools",
      "fast developer tools",
      "developer tools suite",
      "developer swiss army knife",
      "developer productivity tools",
    ],
    canonical: "/",
    toolName: "Developer Utilities Tool",
    toolDescription:
      "Developer Utilities Tool: The Swiss Army Knife for Developers - free, privacy-focused online utilities for code, data, and productivity.",
  },
  dataTransform: {
    title:
      "JSON to CSV & CSV to JSON Converter | Free Online Data Transform Tool - Developer Utilities Tool",
    description:
      "Convert JSON to CSV and CSV to JSON instantly with Developer Utilities Tool. Free, privacy-first data transformation tool with real-time preview—perfect for developers, analysts, and migration tasks. No registration, no tracking.",
    keywords: [
      "json to csv",
      "csv to json",
      "data conversion",
      "json converter",
      "csv converter",
      "data transformation",
      "json parser",
      "Developer Utilities Tool",
      "data transform tool",
      "online data converter",
      "privacy-first data tools",
      "free developer utilities",
    ],
    canonical: "/data-transform",
    toolName: "Data Transform",
    toolDescription:
      "Convert between JSON and CSV formats instantly with Developer Utilities Tool - privacy-focused, no sign-up required.",
  },
  encoding: {
    title:
      "Base64 Encode/Decode | URL Encode/Decode | Free Online Encoding Tool - Developer Utilities Tool",
    description:
      "Encode and decode text instantly with Developer Utilities Tool. Free Base64, URL, and more encoding/decoding tools—privacy-first, no registration, fast results for developers.",
    keywords: [
      "base64 encode",
      "base64 decode",
      "url encode",
      "url decode",
      "encoding tool",
      "decoding tool",
      "base64 converter",
      "Developer Utilities Tool",
      "online encoding",
      "privacy-first encoding tool",
      "developer utilities",
    ],
    canonical: "/encoding",
    toolName: "Encoding & Decoding",
    toolDescription:
      "Encode and decode text using Base64, URL, and more with Developer Utilities Tool - privacy-focused, instant results.",
  },
  textUtilities: {
    title:
      "Text Utilities | Case Converter, Word Counter, Text Tools - Developer Utilities Tool",
    description:
      "Manipulate and analyze text instantly with Developer Utilities Tool. Free online text utilities: case converter, word/character counter, text reversal, and more. Privacy-first, no sign-up.",
    keywords: [
      "text tools",
      "case converter",
      "word counter",
      "character counter",
      "uppercase",
      "lowercase",
      "text manipulation",
      "Developer Utilities Tool",
      "online text utilities",
      "privacy-first text tools",
      "developer tools",
    ],
    canonical: "/text-utilities",
    toolName: "Text Utilities",
    toolDescription:
      "Comprehensive text manipulation and analysis tools by Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  generators: {
    title:
      "UUID, Random String & Lorem Ipsum Generator | Free Online Tool - Developer Utilities Tool",
    description:
      "Generate UUIDs, random strings, numbers, hex values, and Lorem Ipsum text instantly with Developer Utilities Tool. Free, privacy-first generator toolkit for developers—no registration needed.",
    keywords: [
      "uuid generator",
      "random string generator",
      "lorem ipsum generator",
      "random number generator",
      "guid generator",
      "hex generator",
      "Developer Utilities Tool",
      "online generator",
      "developer utilities",
      "privacy-first generator tool",
    ],
    canonical: "/generators",
    toolName: "Generator Toolkit",
    toolDescription:
      "Generate UUIDs, random values, and Lorem Ipsum text with Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  hashVerify: {
    title:
      "Hash Generator & HMAC Tool | MD5, SHA256, SHA512 | Password Strength Checker - Developer Utilities Tool",
    description:
      "Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512), HMAC signatures, and test password strength with Developer Utilities Tool. Free, privacy-first security tools for developers.",
    keywords: [
      "hash generator",
      "md5",
      "sha256",
      "sha512",
      "hmac",
      "password strength",
      "cryptographic hash",
      "security tool",
      "Developer Utilities Tool",
      "online hash tool",
      "privacy-first security tools",
    ],
    canonical: "/hash-verify",
    toolName: "Hash & Verify",
    toolDescription:
      "Generate hashes, HMAC signatures, and verify password strength with Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  jwtDecoder: {
    title:
      "JWT Decoder | Decode & Inspect JWT Tokens Online | Free Tool - Developer Utilities Tool",
    description:
      "Decode and inspect JWT (JSON Web Token) tokens online with Developer Utilities Tool. View header, payload, and signature with human-readable timestamps. Free, privacy-first JWT debugging tool for developers.",
    keywords: [
      "jwt decoder",
      "jwt debugger",
      "json web token",
      "jwt parser",
      "token decoder",
      "jwt inspector",
      "decode jwt",
      "Developer Utilities Tool",
      "online jwt tool",
      "privacy-first jwt decoder",
    ],
    canonical: "/jwt-decoder",
    toolName: "JWT Decoder",
    toolDescription:
      "Decode and inspect JWT tokens with timestamp analysis using Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  codeAndJsonTools: {
    title:
      "Code & JSON Tools | Code Formatter, JSON Validator, JSONPath & Diff - Developer Utilities Tool",
    description:
      "Format code (HTML, CSS, JavaScript) and manipulate JSON (format, validate, JSONPath query, diff) in one unified workspace. Free, privacy-first developer tools.",
    keywords: [
      "code formatter",
      "json tools",
      "beautify code",
      "javascript formatter",
      "json formatter",
      "html formatter",
      "css formatter",
      "json validator",
      "jsonpath",
      "json diff",
      "code beautifier",
      "Developer Utilities Tool",
      "online code formatter",
      "privacy-first code tools",
    ],
    canonical: "/code-formatter",
    toolName: "Code & JSON Tools",
    toolDescription:
      "Format code and manipulate JSON in a unified workspace with Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  codeFormatter: {
    title:
      "Code & JSON Tools | Code Formatter, JSON Validator, JSONPath & Diff - Developer Utilities Tool",
    description:
      "Format code (HTML, CSS, JavaScript) and manipulate JSON (format, validate, JSONPath query, diff) in one unified workspace. Free, privacy-first developer tools.",
    keywords: [
      "code formatter",
      "json tools",
      "beautify code",
      "javascript formatter",
      "json formatter",
      "html formatter",
      "css formatter",
      "json validator",
      "jsonpath",
      "json diff",
      "code beautifier",
      "Developer Utilities Tool",
      "online code formatter",
      "privacy-first code tools",
    ],
    canonical: "/code-formatter",
    toolName: "Code & JSON Tools",
    toolDescription:
      "Format code and manipulate JSON in a unified workspace with Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  jsonTools: {
    title:
      "Code & JSON Tools | Code Formatter, JSON Validator, JSONPath & Diff - Developer Utilities Tool",
    description:
      "Format code (HTML, CSS, JavaScript) and manipulate JSON (format, validate, JSONPath query, diff) in one unified workspace. Free, privacy-first developer tools.",
    keywords: [
      "code formatter",
      "json tools",
      "beautify code",
      "javascript formatter",
      "json formatter",
      "html formatter",
      "css formatter",
      "json validator",
      "jsonpath",
      "json diff",
      "code beautifier",
      "Developer Utilities Tool",
      "online code formatter",
      "privacy-first code tools",
    ],
    canonical: "/json-tools",
    toolName: "Code & JSON Tools",
    toolDescription:
      "Format code and manipulate JSON in a unified workspace with Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  regexTester: {
    title:
      "Regex Tester | Test Regular Expressions Online | RegEx Tool - Developer Utilities Tool",
    description:
      "Test regular expressions online with real-time matching and highlighting using Developer Utilities Tool. Free, privacy-first regex tester tool with pattern examples and syntax help for developers.",
    keywords: [
      "regex tester",
      "regular expression tester",
      "regex tool",
      "regex matcher",
      "regex validator",
      "test regex",
      "regex debugger",
      "Developer Utilities Tool",
      "online regex tester",
      "privacy-first regex tool",
    ],
    canonical: "/regex-tester",
    toolName: "Regex Tester",
    toolDescription:
      "Test and debug regular expressions with real-time matching using Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  codeDiff: {
    title:
      "Text Diff Tool | Compare Text Files Online | File Difference Checker - Developer Utilities Tool",
    description:
      "Compare text files, code, and documents online with Developer Utilities Tool. Upload files or paste text. Side-by-side diff viewer with line-by-line change detection. Free, privacy-first text comparison tool.",
    keywords: [
      "text diff",
      "file diff",
      "compare files",
      "diff tool",
      "text comparison",
      "file comparison",
      "diff viewer",
      "compare text online",
      "file difference",
      "Developer Utilities Tool",
      "online text diff",
      "privacy-first diff tool",
    ],
    canonical: "/code-diff",
    toolName: "Text Diff",
    toolDescription:
      "Compare and visualize differences between text files and documents with Developer Utilities Tool - privacy-focused, free, and instant. Supports file uploads.",
  },
  colorPicker: {
    title:
      "Color Picker | HEX, RGB, HSL Color Tool | Palette Generator - Developer Utilities Tool",
    description:
      "Pick colors and convert between HEX, RGB, HSL, and HSLA formats with Developer Utilities Tool. Generate color palettes and gradients. Free, privacy-first online color picker tool for developers.",
    keywords: [
      "color picker",
      "hex color",
      "rgb color",
      "hsl color",
      "color converter",
      "color palette",
      "color tool",
      "Developer Utilities Tool",
      "online color picker",
      "privacy-first color tool",
    ],
    canonical: "/color-picker",
    toolName: "Color Picker",
    toolDescription:
      "Pick and convert colors between different formats using Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  urlTools: {
    title:
      "URL Tools | URL Parser, Encoder & Decoder Online - Developer Utilities Tool",
    description:
      "Parse, encode, and decode URLs for safe transmission with Developer Utilities Tool. Free, privacy-first online URL manipulation tool for developers—no registration needed.",
    keywords: [
      "url parser",
      "url encoder",
      "url decoder",
      "url tools",
      "parse url",
      "encode url",
      "decode url",
      "Developer Utilities Tool",
      "online url tools",
      "privacy-first url parser",
    ],
    canonical: "/url-tools",
    toolName: "URL Tools",
    toolDescription:
      "Parse, encode, and decode URLs with detailed component breakdown using Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  seoGenerator: {
    title:
      "SEO Meta Tag Generator | Open Graph & Twitter Card Generator - Developer Utilities Tool",
    description:
      "Generate SEO meta tags, Open Graph tags, and Twitter Cards with Developer Utilities Tool. Preview how your content appears on search engines and social media. Free, privacy-first SEO tools for developers.",
    keywords: [
      "seo meta tags",
      "meta tag generator",
      "open graph",
      "twitter cards",
      "seo tools",
      "meta tags",
      "social media tags",
      "Developer Utilities Tool",
      "online seo tools",
      "privacy-first seo generator",
    ],
    canonical: "/seo-generator",
    toolName: "SEO Generator",
    toolDescription:
      "Generate SEO meta tags and social media cards with Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  qrCode: {
    title:
      "QR Code Generator | Create QR Codes Online | Free Tool - Developer Utilities Tool",
    description:
      "Generate QR codes instantly for URLs, text, email, phone numbers, and more with Developer Utilities Tool. Customize size and download as PNG. Free, privacy-first online QR code generator for developers.",
    keywords: [
      "qr code generator",
      "create qr code",
      "qr code maker",
      "generate qr code",
      "free qr code",
      "qr code tool",
      "Developer Utilities Tool",
      "online qr code generator",
      "privacy-first qr code tool",
    ],
    canonical: "/qr-code",
    toolName: "QR Code Generator",
    toolDescription:
      "Generate customizable QR codes for various content types using Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  timestampTools: {
    title:
      "Unix Timestamp Converter | Epoch Time Converter | Date Tool - Developer Utilities Tool",
    description:
      "Convert Unix timestamps to readable dates and vice versa with Developer Utilities Tool. Current timestamp generator with timezone support. Free, privacy-first epoch time converter tool for developers.",
    keywords: [
      "unix timestamp",
      "epoch converter",
      "timestamp converter",
      "unix time",
      "epoch time",
      "date converter",
      "time converter",
      "Developer Utilities Tool",
      "online timestamp converter",
      "privacy-first time tools",
    ],
    canonical: "/timestamp-tools",
    toolName: "Timestamp Tools",
    toolDescription:
      "Convert between Unix timestamps and human-readable dates using Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  timezoneCompare: {
    title:
      "Timezone Compare | Multiple Timezone Converter | World Clock - Developer Utilities Tool",
    description:
      "Compare current times across multiple timezones in real-time with Developer Utilities Tool. Perfect for coordinating with global teams. Free, privacy-first timezone comparison tool.",
    keywords: [
      "timezone compare",
      "world clock",
      "timezone converter",
      "multiple timezones",
      "timezone comparison",
      "global time",
      "timezone tool",
      "Developer Utilities Tool",
      "online timezone compare",
      "privacy-first timezone tool",
    ],
    canonical: "/timezone-compare",
    toolName: "Timezone Compare",
    toolDescription:
      "Compare current times across multiple timezones in real-time using Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  markdownPreviewer: {
    title:
      "Markdown Previewer | Live Markdown Editor & Preview - Developer Utilities Tool",
    description:
      "Write and preview Markdown in real-time with Developer Utilities Tool. Live Markdown editor with side-by-side preview and syntax highlighting. Free, privacy-first online Markdown tool for developers.",
    keywords: [
      "markdown editor",
      "markdown previewer",
      "markdown tool",
      "md editor",
      "markdown viewer",
      "live markdown",
      "markdown preview",
      "Developer Utilities Tool",
      "online markdown editor",
      "privacy-first markdown tool",
    ],
    canonical: "/markdown-previewer",
    toolName: "Markdown Previewer",
    toolDescription:
      "Write and preview Markdown with live rendering using Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  htmlPlayground: {
    title:
      "HTML Playground | Live HTML CSS JS Editor | Code Sandbox - Developer Utilities Tool",
    description:
      "Live HTML, CSS, and JavaScript editor with instant preview using Developer Utilities Tool. Create and test web pages in your browser. Free, privacy-first online HTML playground for developers.",
    keywords: [
      "html playground",
      "html editor",
      "css editor",
      "javascript editor",
      "code sandbox",
      "html live editor",
      "web playground",
      "Developer Utilities Tool",
      "online html editor",
      "privacy-first html playground",
    ],
    canonical: "/html-playground",
    toolName: "HTML Playground",
    toolDescription:
      "Interactive HTML, CSS, and JavaScript editor with live preview using Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  jsRunner: {
    title:
      "JavaScript Runner | Run JS Code Online | JavaScript Console - Developer Utilities Tool",
    description:
      "Run JavaScript code online with console output using Developer Utilities Tool. Test JavaScript snippets instantly in your browser. Free, privacy-first online JavaScript executor for developers.",
    keywords: [
      "javascript runner",
      "run javascript",
      "javascript console",
      "javascript executor",
      "js runner",
      "javascript online",
      "test javascript",
      "Developer Utilities Tool",
      "online javascript runner",
      "privacy-first js tools",
    ],
    canonical: "/js-runner",
    toolName: "JavaScript Runner",
    toolDescription:
      "Execute JavaScript code with real-time console output using Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  regexPlayground: {
    title:
      "Regex Playground | Interactive Regular Expression Tool - Developer Utilities Tool",
    description:
      "Interactive regular expression playground with pattern testing and visualization using Developer Utilities Tool. Learn and test regex patterns online. Free, privacy-first regex tool for developers.",
    keywords: [
      "regex playground",
      "regex tool",
      "regular expression",
      "regex visualizer",
      "regex tester",
      "pattern matching",
      "Developer Utilities Tool",
      "online regex playground",
      "privacy-first regex tool",
    ],
    canonical: "/regex-playground",
    toolName: "Regex Playground",
    toolDescription:
      "Interactive regular expression testing and learning tool with Developer Utilities Tool - privacy-focused, free, and instant.",
  },
  contribution: {
    title:
      "Contribute | Developer Utilities Tool - Open Source Developer Tools",
    description:
      "Learn how to contribute to Developer Utilities Tool. Join our open-source community and help build better developer tools. Report bugs, suggest features, or submit pull requests.",
    keywords: [
      "contribute",
      "open source",
      "github",
      "developer tools",
      "community",
      "pull request",
      "bug report",
      "feature request",
      "Developer Utilities Tool",
      "open source contribution",
    ],
    canonical: "/contribute",
    toolName: "Contribution Guide",
    toolDescription:
      "Guide to contributing to Developer Utilities Tool - join our open-source community and help make these tools better for everyone.",
  },
};
