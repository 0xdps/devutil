import { Link, useLocation } from 'react-router-dom'

const tools = [
    {
        category: 'Data Transform',
        items: [
            { name: 'Data Converter', path: '/data-transform', icon: '🔄' },
        ],
    },
    {
        category: 'Text & Data',
        items: [
            { name: 'JSON Formatter', path: '/json-formatter', icon: '📋' },
            { name: 'CSV Parser', path: '/csv-parser', icon: '📊' },
            { name: 'YAML Converter', path: '/yaml-converter', icon: '📝' },
        ],
    },
    {
        category: 'Encoding',
        items: [
            { name: 'Base64', path: '/base64', icon: '🔤' },
            { name: 'URL Encoder', path: '/url-encoder', icon: '🔗' },
            { name: 'Hash Generator', path: '/hash-generator', icon: '#️⃣' },
        ],
    },
    {
        category: 'Security',
        items: [
            { name: 'Password Generator', path: '/password-generator', icon: '🔐' },
            { name: 'UUID Generator', path: '/uuid-generator', icon: '🆔' },
        ],
    },
]

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation()

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

                    <nav className="space-y-6 mt-12 md:mt-0">
                {tools.map((category) => (
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
