import { Link } from 'react-router-dom'

const popularTools = [
    { name: 'Data Transform', path: '/data-transform', icon: '�', description: 'Convert between JSON, CSV, YAML, TOML, XML' },
    { name: 'Encoding/Decoding', path: '/encoding', icon: '🔤', description: 'Base64, URL, HTML, Base32/58 encoding' },
    { name: 'Text Utilities', path: '/text-utilities', icon: '📝', description: 'Case converter, text counter, cleaner' },
    { name: 'Generator Toolkit', path: '/generators', icon: '🎲', description: 'UUID, Password, Random, Lorem Ipsum' },
    { name: 'Hash & Verify', path: '/hash-verify', icon: '#️⃣', description: 'Generate hashes, HMAC, password strength' },
    { name: 'JWT Decoder', path: '/jwt-decoder', icon: '🎫', description: 'Decode and inspect JWT tokens' },
    { name: 'Code Formatter', path: '/code-formatter', icon: '✨', description: 'Beautify/minify HTML, CSS, JS, JSON' },
    { name: 'Color Picker', path: '/color-picker', icon: '🎨', description: 'HEX, RGB, HSL color converter' },
]

export default function Home() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Developer Utilities
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    A collection of useful tools for everyday development tasks
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    🔒 All tools run locally in your browser - your data never leaves your device
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularTools.map((tool) => (
                    <Link
                        key={tool.path}
                        to={tool.path}
                        className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-start">
                            <span className="text-4xl mr-4">{tool.icon}</span>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {tool.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
