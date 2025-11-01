import { Link, useLocation } from 'react-router-dom'
import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'

const tools = [
    {
        category: 'Core Utilities',
        items: [
            { name: 'Data Transform', path: '/data-transform', icon: '🔄', description: 'JSON, CSV, YAML, TOML, XML' },
            { name: 'Encoding/Decoding', path: '/encoding', icon: '🔤', description: 'Base64, URL, HTML, Base32/58' },
            { name: 'Text Utilities', path: '/text-utilities', icon: '📝', description: 'Case, counter, cleaner' },
        ],
    },
    {
        category: 'Security & Identity',
        items: [
            { name: 'Generator Toolkit', path: '/generators', icon: '🎲', description: 'UUID, Password, Random, Lorem' },
            { name: 'Hash & Verify', path: '/hash-verify', icon: '#️⃣', description: 'Hash, HMAC, password strength' },
            { name: 'JWT Decoder', path: '/jwt-decoder', icon: '🎫', description: 'Decode & inspect JWT tokens' },
        ],
    },
    {
        category: 'Code & Development',
        items: [
            { name: 'Code Formatter', path: '/code-formatter', icon: '✨', description: 'Beautify/minify code' },
            { name: 'JSON Tools', path: '/json-tools', icon: '📋', description: 'Diff, Path evaluator' },
            { name: 'Regex Tester', path: '/regex-tester', icon: '🔎', description: 'Test & build patterns' },
            { name: 'Code Diff', path: '/code-diff', icon: '🔀', description: 'Compare code/text' },
        ],
    },
    {
        category: 'Web & Design',
        items: [
            { name: 'Color Picker', path: '/color-picker', icon: '🎨', description: 'HEX, RGB, HSL converter' },
            { name: 'URL Tools', path: '/url-tools', icon: '🔗', description: 'Parser, builder, query string' },
            { name: 'SEO Generator', path: '/seo-generator', icon: '🏷️', description: 'Meta, robots, sitemap' },
            { name: 'QR Code', path: '/qr-code', icon: '📱', description: 'Generate & decode' },
        ],
    },
    {
        category: 'Utilities',
        items: [
            { name: 'Timestamp Tools', path: '/timestamp-tools', icon: '⏰', description: 'Unix, Cron expression' },
        ],
    },
    // {
    //     category: 'Developer Playground',
    //     items: [
    //         { name: 'Markdown Previewer', path: '/markdown-previewer', icon: '📝', description: 'Live markdown editor' },
    //         { name: 'HTML Playground', path: '/html-playground', icon: '🌐', description: 'HTML/CSS/JS preview' },
    //         { name: 'JavaScript Runner', path: '/js-runner', icon: '🟨', description: 'Execute JS in sandbox' },
    //         { name: 'Regex Playground', path: '/regex-playground', icon: '🎮', description: 'Interactive regex testing' },
    //     ],
    // },
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
                    fixed md:sticky top-0 left-0 z-50 md:z-0
                    w-64 h-screen md:h-full
                    bg-dark-card border-r border-dark-border
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0
                    flex flex-col flex-shrink-0
                `}
            >
                <div className="flex-shrink-0 p-4 border-b border-dark-border">
                    {/* Mobile close button */}
                    <button
                        onClick={onClose}
                        className="md:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-dark-100 transition-colors"
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                className="w-full px-3 py-2 pl-10 text-sm bg-dark-100 border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-500"
                            />
                            <svg 
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
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
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            {category.category}
                        </h3>
                        <ul className="space-y-1">
                            {category.items.map((tool) => (
                                <li key={tool.path}>
                                    <Link
                                        to={tool.path}
                                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            location.pathname === tool.path
                                                ? 'bg-primary-500/20 text-primary-400'
                                                : 'text-gray-300 hover:bg-dark-100 hover:text-primary-400'
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
