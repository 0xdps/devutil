import { Link, useLocation } from 'react-router-dom'
import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'

const tools = [
    {
        category: 'Data Transform',
        items: [
            { name: 'Data Converter', path: '/data-transform', icon: '🔄', description: 'JSON, CSV, YAML, TOML, XML' },
        ],
    },
    {
        category: 'Text & Data',
        items: [
            { name: 'JSON Formatter', path: '/json-formatter', icon: '📋', description: '' },
            { name: 'CSV Parser', path: '/csv-parser', icon: '📊', description: '' },
            { name: 'YAML Converter', path: '/yaml-converter', icon: '📝', description: '' },
        ],
    },
    {
        category: 'Encoding',
        items: [
            { name: 'Base64', path: '/base64', icon: '🔤', description: '' },
            { name: 'URL Encoder', path: '/url-encoder', icon: '🔗', description: '' },
            { name: 'Hash Generator', path: '/hash-generator', icon: '#️⃣', description: '' },
        ],
    },
    {
        category: 'Security',
        items: [
            { name: 'Password Generator', path: '/password-generator', icon: '🔐', description: '' },
            { name: 'UUID Generator', path: '/uuid-generator', icon: '🆔', description: '' },
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
                    w-64 h-screen md:h-auto md:min-h-[calc(100vh-4rem)]
                    bg-white dark:bg-gray-800 shadow-lg
                    overflow-y-auto
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="p-4">
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
                    <div className="mb-6 mt-12 md:mt-0">
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
