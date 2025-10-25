export interface ToolMeta {
    title: string
    description: string
    keywords: string[]
    canonical: string
    toolName: string
    toolDescription: string
}

export const toolsMetadata: Record<string, ToolMeta> = {
    home: {
        title: 'devutil.xyz - Free Developer Utilities, Online Code Tools & Privacy-First Solutions',
        description: 'devutil.xyz is your Swiss Army Knife for developers: a privacy-first, comprehensive suite of free online developer tools. Instantly format code, test regex, convert data, generate hashes, and more—no registration, no tracking, just results.',
        keywords: [
            'devutil.xyz', 'devutil tools', 'free developer utilities', 'online code tools', 'privacy-first developer tools', 'no registration developer tools',
            'developer tools', 'online utilities', 'dev tools', 'programming tools', 'web development tools', 'coding tools',
            'developer utilities', 'software tools', 'programmer utilities', 'web tools', 'instant code formatter', 'test regex online',
            'convert json to csv', 'beautify code online', 'generate secure hashes online', 'jwt decoder', 'uuid generator', 'text utilities',
            'data transformation', 'markdown previewer', 'html playground', 'javascript runner', 'url parser', 'color picker', 'qr code generator',
            'no tracking developer tools', 'fast developer tools', 'developer tools suite', 'developer swiss army knife', 'developer productivity tools'
        ],
        canonical: '/',
        toolName: 'devutil.xyz',
        toolDescription: 'devutil.xyz: The Swiss Army Knife for Developers - free, privacy-focused online utilities for code, data, and productivity.'
    },
    dataTransform: {
        title: 'JSON to CSV & CSV to JSON Converter | Free Online Data Transform Tool - devutil.xyz',
        description: 'Convert JSON to CSV and CSV to JSON instantly with devutil.xyz. Free, privacy-first data transformation tool with real-time preview—perfect for developers, analysts, and migration tasks. No registration, no tracking.',
        keywords: ['json to csv', 'csv to json', 'data conversion', 'json converter', 'csv converter', 'data transformation', 'json parser', 'devutil.xyz', 'data transform tool', 'online data converter', 'privacy-first data tools', 'free developer utilities'],
        canonical: '/data-transform',
        toolName: 'Data Transform',
        toolDescription: 'Convert between JSON and CSV formats instantly with devutil.xyz - privacy-focused, no sign-up required.'
    },
    encoding: {
        title: 'Base64 Encode/Decode | URL Encode/Decode | Free Online Encoding Tool - devutil.xyz',
        description: 'Encode and decode text instantly with devutil.xyz. Free Base64, URL, and more encoding/decoding tools—privacy-first, no registration, fast results for developers.',
        keywords: ['base64 encode', 'base64 decode', 'url encode', 'url decode', 'encoding tool', 'decoding tool', 'base64 converter', 'devutil.xyz', 'online encoding', 'privacy-first encoding tool', 'developer utilities'],
        canonical: '/encoding',
        toolName: 'Encoding & Decoding',
        toolDescription: 'Encode and decode text using Base64, URL, and more with devutil.xyz - privacy-focused, instant results.'
    },
    textUtilities: {
        title: 'Text Utilities | Case Converter, Word Counter, Text Tools - devutil.xyz',
        description: 'Manipulate and analyze text instantly with devutil.xyz. Free online text utilities: case converter, word/character counter, text reversal, and more. Privacy-first, no sign-up.',
        keywords: ['text tools', 'case converter', 'word counter', 'character counter', 'uppercase', 'lowercase', 'text manipulation', 'devutil.xyz', 'online text utilities', 'privacy-first text tools', 'developer tools'],
        canonical: '/text-utilities',
        toolName: 'Text Utilities',
        toolDescription: 'Comprehensive text manipulation and analysis tools by devutil.xyz - privacy-focused, free, and instant.'
    },
    generators: {
        title: 'UUID, Random String & Lorem Ipsum Generator | Free Online Tool - devutil.xyz',
        description: 'Generate UUIDs, random strings, numbers, hex values, and Lorem Ipsum text instantly with devutil.xyz. Free, privacy-first generator toolkit for developers—no registration needed.',
        keywords: ['uuid generator', 'random string generator', 'lorem ipsum generator', 'random number generator', 'guid generator', 'hex generator', 'devutil.xyz', 'online generator', 'developer utilities', 'privacy-first generator tool'],
        canonical: '/generators',
        toolName: 'Generator Toolkit',
        toolDescription: 'Generate UUIDs, random values, and Lorem Ipsum text with devutil.xyz - privacy-focused, free, and instant.'
    },
    hashVerify: {
        title: 'Hash Generator & HMAC Tool | MD5, SHA256, SHA512 | Password Strength Checker - devutil.xyz',
        description: 'Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512), HMAC signatures, and test password strength with devutil.xyz. Free, privacy-first security tools for developers.',
        keywords: ['hash generator', 'md5', 'sha256', 'sha512', 'hmac', 'password strength', 'cryptographic hash', 'security tool', 'devutil.xyz', 'online hash tool', 'privacy-first security tools'],
        canonical: '/hash-verify',
        toolName: 'Hash & Verify',
        toolDescription: 'Generate hashes, HMAC signatures, and verify password strength with devutil.xyz - privacy-focused, free, and instant.'
    },
    jwtDecoder: {
        title: 'JWT Decoder | Decode & Inspect JWT Tokens Online | Free Tool - devutil.xyz',
        description: 'Decode and inspect JWT (JSON Web Token) tokens online with devutil.xyz. View header, payload, and signature with human-readable timestamps. Free, privacy-first JWT debugging tool for developers.',
        keywords: ['jwt decoder', 'jwt debugger', 'json web token', 'jwt parser', 'token decoder', 'jwt inspector', 'decode jwt', 'devutil.xyz', 'online jwt tool', 'privacy-first jwt decoder'],
        canonical: '/jwt-decoder',
        toolName: 'JWT Decoder',
        toolDescription: 'Decode and inspect JWT tokens with timestamp analysis using devutil.xyz - privacy-focused, free, and instant.'
    },
    codeFormatter: {
        title: 'Code Formatter | Beautify JavaScript, JSON, HTML, CSS Online - devutil.xyz',
        description: 'Format and beautify code online with devutil.xyz. Supports JavaScript, JSON, HTML, CSS, and more. Free, privacy-first code formatter with syntax highlighting and indentation options.',
        keywords: ['code formatter', 'beautify code', 'javascript formatter', 'json formatter', 'html formatter', 'css formatter', 'code beautifier', 'devutil.xyz', 'online code formatter', 'privacy-first code tools'],
        canonical: '/code-formatter',
        toolName: 'Code Formatter',
        toolDescription: 'Format and beautify code with syntax highlighting using devutil.xyz - privacy-focused, free, and instant.'
    },
    jsonTools: {
        title: 'JSON Tools | JSON Validator, Formatter & Editor Online - devutil.xyz',
        description: 'Validate, format, and edit JSON online with devutil.xyz. Real-time JSON syntax validation with error highlighting. Free, privacy-first JSON tools for developers.',
        keywords: ['json validator', 'json formatter', 'json editor', 'json parser', 'json tools', 'validate json', 'format json', 'devutil.xyz', 'online json tools', 'privacy-first json validator'],
        canonical: '/json-tools',
        toolName: 'JSON Tools',
        toolDescription: 'Validate, format, and manipulate JSON data with devutil.xyz - privacy-focused, free, and instant.'
    },
    regexTester: {
        title: 'Regex Tester | Test Regular Expressions Online | RegEx Tool - devutil.xyz',
        description: 'Test regular expressions online with real-time matching and highlighting using devutil.xyz. Free, privacy-first regex tester tool with pattern examples and syntax help for developers.',
        keywords: ['regex tester', 'regular expression tester', 'regex tool', 'regex matcher', 'regex validator', 'test regex', 'regex debugger', 'devutil.xyz', 'online regex tester', 'privacy-first regex tool'],
        canonical: '/regex-tester',
        toolName: 'Regex Tester',
        toolDescription: 'Test and debug regular expressions with real-time matching using devutil.xyz - privacy-focused, free, and instant.'
    },
    codeDiff: {
        title: 'Code Diff Tool | Compare Code Online | Text Difference Checker - devutil.xyz',
        description: 'Compare code and text files online with devutil.xyz. Side-by-side diff viewer with syntax highlighting. Free, privacy-first code comparison tool for developers.',
        keywords: ['code diff', 'text diff', 'compare code', 'diff tool', 'code comparison', 'text comparison', 'diff viewer', 'devutil.xyz', 'online code diff', 'privacy-first diff tool'],
        canonical: '/code-diff',
        toolName: 'Code Diff',
        toolDescription: 'Compare and visualize differences between code files with devutil.xyz - privacy-focused, free, and instant.'
    },
    colorPicker: {
        title: 'Color Picker | HEX, RGB, HSL Color Tool | Palette Generator - devutil.xyz',
        description: 'Pick colors and convert between HEX, RGB, HSL, and HSLA formats with devutil.xyz. Generate color palettes and gradients. Free, privacy-first online color picker tool for developers.',
        keywords: ['color picker', 'hex color', 'rgb color', 'hsl color', 'color converter', 'color palette', 'color tool', 'devutil.xyz', 'online color picker', 'privacy-first color tool'],
        canonical: '/color-picker',
        toolName: 'Color Picker',
        toolDescription: 'Pick and convert colors between different formats using devutil.xyz - privacy-focused, free, and instant.'
    },
    urlTools: {
        title: 'URL Tools | URL Parser, Encoder & Decoder Online - devutil.xyz',
        description: 'Parse, encode, and decode URLs for safe transmission with devutil.xyz. Free, privacy-first online URL manipulation tool for developers—no registration needed.',
        keywords: ['url parser', 'url encoder', 'url decoder', 'url tools', 'parse url', 'encode url', 'decode url', 'devutil.xyz', 'online url tools', 'privacy-first url parser'],
        canonical: '/url-tools',
        toolName: 'URL Tools',
        toolDescription: 'Parse, encode, and decode URLs with detailed component breakdown using devutil.xyz - privacy-focused, free, and instant.'
    },
    seoGenerator: {
        title: 'SEO Meta Tag Generator | Open Graph & Twitter Card Generator - devutil.xyz',
        description: 'Generate SEO meta tags, Open Graph tags, and Twitter Cards with devutil.xyz. Preview how your content appears on search engines and social media. Free, privacy-first SEO tools for developers.',
        keywords: ['seo meta tags', 'meta tag generator', 'open graph', 'twitter cards', 'seo tools', 'meta tags', 'social media tags', 'devutil.xyz', 'online seo tools', 'privacy-first seo generator'],
        canonical: '/seo-generator',
        toolName: 'SEO Generator',
        toolDescription: 'Generate SEO meta tags and social media cards with devutil.xyz - privacy-focused, free, and instant.'
    },
    qrCode: {
        title: 'QR Code Generator | Create QR Codes Online | Free Tool - devutil.xyz',
        description: 'Generate QR codes instantly for URLs, text, email, phone numbers, and more with devutil.xyz. Customize size and download as PNG. Free, privacy-first online QR code generator for developers.',
        keywords: ['qr code generator', 'create qr code', 'qr code maker', 'generate qr code', 'free qr code', 'qr code tool', 'devutil.xyz', 'online qr code generator', 'privacy-first qr code tool'],
        canonical: '/qr-code',
        toolName: 'QR Code Generator',
        toolDescription: 'Generate customizable QR codes for various content types using devutil.xyz - privacy-focused, free, and instant.'
    },
    timestampTools: {
        title: 'Unix Timestamp Converter | Epoch Time Converter | Date Tool - devutil.xyz',
        description: 'Convert Unix timestamps to readable dates and vice versa with devutil.xyz. Current timestamp generator with timezone support. Free, privacy-first epoch time converter tool for developers.',
        keywords: ['unix timestamp', 'epoch converter', 'timestamp converter', 'unix time', 'epoch time', 'date converter', 'time converter', 'devutil.xyz', 'online timestamp converter', 'privacy-first time tools'],
        canonical: '/timestamp-tools',
        toolName: 'Timestamp Tools',
        toolDescription: 'Convert between Unix timestamps and human-readable dates using devutil.xyz - privacy-focused, free, and instant.'
    },
    markdownPreviewer: {
        title: 'Markdown Previewer | Live Markdown Editor & Preview - devutil.xyz',
        description: 'Write and preview Markdown in real-time with devutil.xyz. Live Markdown editor with side-by-side preview and syntax highlighting. Free, privacy-first online Markdown tool for developers.',
        keywords: ['markdown editor', 'markdown previewer', 'markdown tool', 'md editor', 'markdown viewer', 'live markdown', 'markdown preview', 'devutil.xyz', 'online markdown editor', 'privacy-first markdown tool'],
        canonical: '/markdown-previewer',
        toolName: 'Markdown Previewer',
        toolDescription: 'Write and preview Markdown with live rendering using devutil.xyz - privacy-focused, free, and instant.'
    },
    htmlPlayground: {
        title: 'HTML Playground | Live HTML CSS JS Editor | Code Sandbox - devutil.xyz',
        description: 'Live HTML, CSS, and JavaScript editor with instant preview using devutil.xyz. Create and test web pages in your browser. Free, privacy-first online HTML playground for developers.',
        keywords: ['html playground', 'html editor', 'css editor', 'javascript editor', 'code sandbox', 'html live editor', 'web playground', 'devutil.xyz', 'online html editor', 'privacy-first html playground'],
        canonical: '/html-playground',
        toolName: 'HTML Playground',
        toolDescription: 'Interactive HTML, CSS, and JavaScript editor with live preview using devutil.xyz - privacy-focused, free, and instant.'
    },
    jsRunner: {
        title: 'JavaScript Runner | Run JS Code Online | JavaScript Console - devutil.xyz',
        description: 'Run JavaScript code online with console output using devutil.xyz. Test JavaScript snippets instantly in your browser. Free, privacy-first online JavaScript executor for developers.',
        keywords: ['javascript runner', 'run javascript', 'javascript console', 'javascript executor', 'js runner', 'javascript online', 'test javascript', 'devutil.xyz', 'online javascript runner', 'privacy-first js tools'],
        canonical: '/js-runner',
        toolName: 'JavaScript Runner',
        toolDescription: 'Execute JavaScript code with real-time console output using devutil.xyz - privacy-focused, free, and instant.'
    },
    regexPlayground: {
        title: 'Regex Playground | Interactive Regular Expression Tool - devutil.xyz',
        description: 'Interactive regular expression playground with pattern testing and visualization using devutil.xyz. Learn and test regex patterns online. Free, privacy-first regex tool for developers.',
        keywords: ['regex playground', 'regex tool', 'regular expression', 'regex visualizer', 'regex tester', 'pattern matching', 'devutil.xyz', 'online regex playground', 'privacy-first regex tool'],
        canonical: '/regex-playground',
        toolName: 'Regex Playground',
        toolDescription: 'Interactive regular expression testing and learning tool with devutil.xyz - privacy-focused, free, and instant.'
    }
}
