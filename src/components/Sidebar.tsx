import { Link, useLocation } from 'react-router-dom'

const tools = [
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

export default function Sidebar() {
    const location = useLocation()

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm min-h-[calc(100vh-4rem)] p-4">
            <nav className="space-y-6">
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
                                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === tool.path
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
        </aside>
    )
}
