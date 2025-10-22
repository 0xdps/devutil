import { Link, useLocation } from 'react-router-dom'
import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'

const tools = [
    {
        category: 'Data Converters',
        items: [
            { name: 'Data Transform', path: '/data-transform', icon: '🔄', description: 'JSON, CSV, YAML, TOML, XML' },
            { name: 'JSON Diff', path: '/json-diff', icon: '🔍', description: '' },
            { name: 'JSON Path Evaluator', path: '/json-path', icon: '🛤️', description: '' },
        ],
    },
    {
        category: 'Text & String Tools',
        items: [
            { name: 'Base64 Encoder/Decoder', path: '/base64', icon: '🔤', description: '' },
            { name: 'URL Encoder/Decoder', path: '/url-encoder', icon: '🔗', description: '' },
            { name: 'HTML Escape/Unescape', path: '/html-escape', icon: '🏷️', description: '' },
            { name: 'String Case Converter', path: '/case-converter', icon: '🔡', description: '' },
            { name: 'UUID Generator', path: '/uuid-generator', icon: '🆔', description: '' },
            { name: 'Lorem Ipsum Generator', path: '/lorem-ipsum', icon: '📝', description: '' },
            { name: 'Word/Character/Line Counter', path: '/text-counter', icon: '�', description: '' },
            { name: 'Text Cleaner', path: '/text-cleaner', icon: '🧹', description: '' },
        ],
    },
    {
        category: 'Encryption & Hashing',
        items: [
            { name: 'Hash Generator', path: '/hash-generator', icon: '#️⃣', description: '' },
            { name: 'HMAC Generator', path: '/hmac-generator', icon: '🔐', description: '' },
            { name: 'AES Encrypt/Decrypt', path: '/aes-encryption', icon: '�', description: '' },
            { name: 'RSA Key Pair Generator', path: '/rsa-generator', icon: '🔑', description: '' },
            { name: 'JWT Decoder', path: '/jwt-decoder', icon: '🎫', description: '' },
            { name: 'Password Strength Tester', path: '/password-tester', icon: '💪', description: '' },
            { name: 'Password Generator', path: '/password-generator', icon: '�', description: '' },
        ],
    },
    {
        category: 'Web Tools',
        items: [
            { name: 'HTTP Header Parser', path: '/http-header-parser', icon: '�', description: '' },
            { name: 'User-Agent Decoder', path: '/user-agent-decoder', icon: '�️', description: '' },
            { name: 'URL Parser & Builder', path: '/url-parser', icon: '🔗', description: '' },
            { name: 'Query String Generator', path: '/query-string', icon: '❓', description: '' },
            { name: 'Meta Tag Generator', path: '/meta-tag-generator', icon: '🏷️', description: '' },
            { name: 'Robots.txt Generator', path: '/robots-generator', icon: '🤖', description: '' },
            { name: 'Sitemap.xml Generator', path: '/sitemap-generator', icon: '🗺️', description: '' },
        ],
    },
    {
        category: 'Data Tools',
        items: [
            { name: 'Excel to JSON Parser', path: '/excel-to-json', icon: '📊', description: '' },
            { name: 'Data URI Generator', path: '/data-uri-generator', icon: '📦', description: '' },
            { name: 'Base32/Base58 Encoder', path: '/base32-base58', icon: '🔢', description: '' },
        ],
    },
    {
        category: 'Code Formatters & Converters',
        items: [
            { name: 'HTML/CSS/JS Beautifier', path: '/code-beautifier', icon: '✨', description: '' },
            { name: 'SQL Formatter', path: '/sql-formatter', icon: '🗄️', description: '' },
            { name: 'XML Formatter', path: '/xml-formatter', icon: '📄', description: '' },
            { name: 'HTML/CSS/JS Minifier', path: '/code-minifier', icon: '📦', description: '' },
            { name: 'Regex Tester & Builder', path: '/regex-tester', icon: '🔎', description: '' },
            { name: 'Code Diff Viewer', path: '/code-diff', icon: '🔀', description: '' },
        ],
    },
    {
        category: 'Utility Generators',
        items: [
            { name: 'UUID/GUID Generator', path: '/uuid-guid-generator', icon: '🆔', description: '' },
            { name: 'Random String/Number Generator', path: '/random-generator', icon: '🎲', description: '' },
            { name: 'Color Picker', path: '/color-picker', icon: '🎨', description: '' },
            { name: 'Unix Timestamp Converter', path: '/timestamp-converter', icon: '⏰', description: '' },
            { name: 'QR Code Generator/Decoder', path: '/qr-code', icon: '📱', description: '' },
            { name: 'Cron Expression Generator', path: '/cron-generator', icon: '⏱️', description: '' },
        ],
    },
    {
        category: 'Developer Playground',
        items: [
            { name: 'JavaScript Runner', path: '/js-runner', icon: '🟨', description: '' },
            { name: 'Markdown Previewer', path: '/markdown-previewer', icon: '📝', description: '' },
            { name: 'HTML Previewer', path: '/html-previewer', icon: '🌐', description: '' },
            { name: 'Regex Playground', path: '/regex-playground', icon: '�', description: '' },
        ],
    },
]

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState('')

    // Flatten all tools for searching
    const allTools = useMemo(() => {
        return tools.flatMap(category => 
            category.items.map(item => ({
                ...item,
                category: category.category
            }))
        )
    }, [])

    // Configure fuzzy search
    const fuse = useMemo(() => {
        return new Fuse(allTools, {
            keys: ['name', 'category'],
            threshold: 0.3,
            includeScore: true,
        })
    }, [allTools])

    // Get filtered tools based on search
    const filteredTools = useMemo(() => {
        if (!searchQuery.trim()) {
            return tools
        }

        const results = fuse.search(searchQuery)
        const matchedTools = results.map(result => result.item)

        // Group matched tools by category
        const grouped: { [key: string]: typeof tools[0]['items'] } = {}
        matchedTools.forEach(tool => {
            if (!grouped[tool.category]) {
                grouped[tool.category] = []
            }
            grouped[tool.category].push({
                name: tool.name,
                path: tool.path,
                icon: tool.icon,
                description: tool.description
            })
        })

        return Object.entries(grouped).map(([category, items]) => ({
            category,
            items
        }))
    }, [searchQuery, fuse])

    return (
        <>
            {/* Mobile overlay backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:relative top-0 left-0 z-50 md:z-0
                    w-64 h-screen md:h-[calc(100vh-4rem)]
                    bg-white dark:bg-gray-800 shadow-lg
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    flex flex-col
                `}
            >
                <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
                    {/* Mobile close button */}
                    <button
                        onClick={onClose}
                        className="md:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Search input */}
                    <div className="mt-12 md:mt-0">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search tools..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-3 py-2 pl-10 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                            <svg 
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto p-4">
                    <nav className="space-y-6">
                {filteredTools.map((category) => (
                    <div key={category.category}>
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            {category.category}
                        </h3>
                        <ul className="space-y-1">
                            {category.items.map((tool) => (
                                <li key={tool.path}>
                                    <Link
                                        to={tool.path}
                                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            location.pathname === tool.path
                                                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <span className="mr-2">{tool.icon}</span>
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                    </nav>
                </div>
            </aside>
        </>
    )
}
