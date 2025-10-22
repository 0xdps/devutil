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
        title: 'devutil.xyz - Free Developer Utilities & Tools Online',
        description: 'A comprehensive collection of free online developer tools for everyday tasks. Encode/decode, generate UUIDs, format code, parse JWT tokens, and more. No registration required.',
        keywords: ['developer tools', 'online utilities', 'dev tools', 'programming tools', 'free developer tools', 'web development tools', 'coding tools'],
        canonical: '/',
        toolName: 'devutil.xyz',
        toolDescription: 'Complete suite of developer utilities and tools for developers'
    },
    dataTransform: {
        title: 'JSON to CSV & CSV to JSON Converter | Free Online Data Transform Tool',
        description: 'Convert JSON to CSV and CSV to JSON instantly. Free online data transformation tool with real-time preview. Perfect for data analysis and migration tasks.',
        keywords: ['json to csv', 'csv to json', 'data conversion', 'json converter', 'csv converter', 'data transformation', 'json parser'],
        canonical: '/data-transform',
        toolName: 'Data Transform',
        toolDescription: 'Convert between JSON and CSV formats with ease'
    },
    encoding: {
        title: 'Base64 Encode/Decode | URL Encode/Decode | Free Online Encoding Tool',
        description: 'Free Base64 and URL encoding/decoding tool. Encode and decode text instantly in your browser. Supports Base64, URL encoding, and more encoding formats.',
        keywords: ['base64 encode', 'base64 decode', 'url encode', 'url decode', 'encoding tool', 'decoding tool', 'base64 converter'],
        canonical: '/encoding',
        toolName: 'Encoding & Decoding',
        toolDescription: 'Encode and decode text using Base64, URL encoding, and more'
    },
    textUtilities: {
        title: 'Text Utilities | Case Converter, Word Counter, Text Tools',
        description: 'Free text manipulation tools: uppercase/lowercase converter, word counter, character counter, text reversal, and more. Process text instantly in your browser.',
        keywords: ['text tools', 'case converter', 'word counter', 'character counter', 'uppercase', 'lowercase', 'text manipulation'],
        canonical: '/text-utilities',
        toolName: 'Text Utilities',
        toolDescription: 'Comprehensive text manipulation and analysis tools'
    },
    generators: {
        title: 'UUID, Random String & Lorem Ipsum Generator | Free Online Tool',
        description: 'Generate UUIDs (v1, v4, v5), random strings, random numbers, hex values, and Lorem Ipsum text. Free online generator tool for developers.',
        keywords: ['uuid generator', 'random string generator', 'lorem ipsum generator', 'random number generator', 'guid generator', 'hex generator'],
        canonical: '/generators',
        toolName: 'Generator Toolkit',
        toolDescription: 'Generate UUIDs, random values, and Lorem Ipsum text'
    },
    hashVerify: {
        title: 'Hash Generator & HMAC Tool | MD5, SHA256, SHA512 | Password Strength Checker',
        description: 'Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) and HMAC signatures. Test password strength with detailed feedback. Free online security tool.',
        keywords: ['hash generator', 'md5', 'sha256', 'sha512', 'hmac', 'password strength', 'cryptographic hash', 'security tool'],
        canonical: '/hash-verify',
        toolName: 'Hash & Verify',
        toolDescription: 'Generate hashes, HMAC signatures, and verify password strength'
    },
    jwtDecoder: {
        title: 'JWT Decoder | Decode & Inspect JWT Tokens Online | Free Tool',
        description: 'Decode and inspect JWT (JSON Web Token) tokens online. View header, payload, and signature with human-readable timestamps. Free JWT debugging tool.',
        keywords: ['jwt decoder', 'jwt debugger', 'json web token', 'jwt parser', 'token decoder', 'jwt inspector', 'decode jwt'],
        canonical: '/jwt-decoder',
        toolName: 'JWT Decoder',
        toolDescription: 'Decode and inspect JWT tokens with timestamp analysis'
    },
    codeFormatter: {
        title: 'Code Formatter | Beautify JavaScript, JSON, HTML, CSS Online',
        description: 'Format and beautify code online. Supports JavaScript, JSON, HTML, CSS, and more. Free code formatter with syntax highlighting and indentation options.',
        keywords: ['code formatter', 'beautify code', 'javascript formatter', 'json formatter', 'html formatter', 'css formatter', 'code beautifier'],
        canonical: '/code-formatter',
        toolName: 'Code Formatter',
        toolDescription: 'Format and beautify code with syntax highlighting'
    },
    jsonTools: {
        title: 'JSON Tools | JSON Validator, Formatter & Editor Online',
        description: 'Validate, format, and edit JSON online. Real-time JSON syntax validation with error highlighting. Free JSON tools for developers.',
        keywords: ['json validator', 'json formatter', 'json editor', 'json parser', 'json tools', 'validate json', 'format json'],
        canonical: '/json-tools',
        toolName: 'JSON Tools',
        toolDescription: 'Validate, format, and manipulate JSON data'
    },
    regexTester: {
        title: 'Regex Tester | Test Regular Expressions Online | RegEx Tool',
        description: 'Test regular expressions online with real-time matching and highlighting. Free regex tester tool with pattern examples and syntax help.',
        keywords: ['regex tester', 'regular expression tester', 'regex tool', 'regex matcher', 'regex validator', 'test regex', 'regex debugger'],
        canonical: '/regex-tester',
        toolName: 'Regex Tester',
        toolDescription: 'Test and debug regular expressions with real-time matching'
    },
    codeDiff: {
        title: 'Code Diff Tool | Compare Code Online | Text Difference Checker',
        description: 'Compare code and text files online. Side-by-side diff viewer with syntax highlighting. Free code comparison tool for developers.',
        keywords: ['code diff', 'text diff', 'compare code', 'diff tool', 'code comparison', 'text comparison', 'diff viewer'],
        canonical: '/code-diff',
        toolName: 'Code Diff',
        toolDescription: 'Compare and visualize differences between code files'
    },
    colorPicker: {
        title: 'Color Picker | HEX, RGB, HSL Color Tool | Palette Generator',
        description: 'Pick colors and convert between HEX, RGB, HSL, and HSLA formats. Generate color palettes and gradients. Free online color picker tool.',
        keywords: ['color picker', 'hex color', 'rgb color', 'hsl color', 'color converter', 'color palette', 'color tool'],
        canonical: '/color-picker',
        toolName: 'Color Picker',
        toolDescription: 'Pick and convert colors between different formats'
    },
    urlTools: {
        title: 'URL Tools | URL Parser, Encoder & Decoder Online',
        description: 'Parse URLs to extract components. Encode and decode URLs for safe transmission. Free online URL manipulation tool for developers.',
        keywords: ['url parser', 'url encoder', 'url decoder', 'url tools', 'parse url', 'encode url', 'decode url'],
        canonical: '/url-tools',
        toolName: 'URL Tools',
        toolDescription: 'Parse, encode, and decode URLs with detailed component breakdown'
    },
    seoGenerator: {
        title: 'SEO Meta Tag Generator | Open Graph & Twitter Card Generator',
        description: 'Generate SEO meta tags, Open Graph tags, and Twitter Cards. Preview how your content appears on search engines and social media.',
        keywords: ['seo meta tags', 'meta tag generator', 'open graph', 'twitter cards', 'seo tools', 'meta tags', 'social media tags'],
        canonical: '/seo-generator',
        toolName: 'SEO Generator',
        toolDescription: 'Generate SEO meta tags and social media cards'
    },
    qrCode: {
        title: 'QR Code Generator | Create QR Codes Online | Free Tool',
        description: 'Generate QR codes instantly for URLs, text, email, phone numbers, and more. Customize size and download as PNG. Free online QR code generator.',
        keywords: ['qr code generator', 'create qr code', 'qr code maker', 'generate qr code', 'free qr code', 'qr code tool'],
        canonical: '/qr-code',
        toolName: 'QR Code Generator',
        toolDescription: 'Generate customizable QR codes for various content types'
    },
    timestampTools: {
        title: 'Unix Timestamp Converter | Epoch Time Converter | Date Tool',
        description: 'Convert Unix timestamps to readable dates and vice versa. Current timestamp generator with timezone support. Free epoch time converter tool.',
        keywords: ['unix timestamp', 'epoch converter', 'timestamp converter', 'unix time', 'epoch time', 'date converter', 'time converter'],
        canonical: '/timestamp-tools',
        toolName: 'Timestamp Tools',
        toolDescription: 'Convert between Unix timestamps and human-readable dates'
    },
    markdownPreviewer: {
        title: 'Markdown Previewer | Live Markdown Editor & Preview',
        description: 'Write and preview Markdown in real-time. Live Markdown editor with side-by-side preview and syntax highlighting. Free online Markdown tool.',
        keywords: ['markdown editor', 'markdown previewer', 'markdown tool', 'md editor', 'markdown viewer', 'live markdown', 'markdown preview'],
        canonical: '/markdown-previewer',
        toolName: 'Markdown Previewer',
        toolDescription: 'Write and preview Markdown with live rendering'
    },
    htmlPlayground: {
        title: 'HTML Playground | Live HTML CSS JS Editor | Code Sandbox',
        description: 'Live HTML, CSS, and JavaScript editor with instant preview. Create and test web pages in your browser. Free online HTML playground.',
        keywords: ['html playground', 'html editor', 'css editor', 'javascript editor', 'code sandbox', 'html live editor', 'web playground'],
        canonical: '/html-playground',
        toolName: 'HTML Playground',
        toolDescription: 'Interactive HTML, CSS, and JavaScript editor with live preview'
    },
    jsRunner: {
        title: 'JavaScript Runner | Run JS Code Online | JavaScript Console',
        description: 'Run JavaScript code online with console output. Test JavaScript snippets instantly in your browser. Free online JavaScript executor.',
        keywords: ['javascript runner', 'run javascript', 'javascript console', 'javascript executor', 'js runner', 'javascript online', 'test javascript'],
        canonical: '/js-runner',
        toolName: 'JavaScript Runner',
        toolDescription: 'Execute JavaScript code with real-time console output'
    },
    regexPlayground: {
        title: 'Regex Playground | Interactive Regular Expression Tool',
        description: 'Interactive regular expression playground with pattern testing and visualization. Learn and test regex patterns online.',
        keywords: ['regex playground', 'regex tool', 'regular expression', 'regex visualizer', 'regex tester', 'pattern matching'],
        canonical: '/regex-playground',
        toolName: 'Regex Playground',
        toolDescription: 'Interactive regular expression testing and learning tool'
    }
}
