import { Link } from 'react-router-dom'

const popularTools = [
    { name: 'JSON Formatter', path: '/json-formatter', icon: '📋', description: 'Format and validate JSON' },
    { name: 'Base64 Encoder/Decoder', path: '/base64', icon: '🔤', description: 'Encode and decode Base64' },
    { name: 'Hash Generator', path: '/hash-generator', icon: '#️⃣', description: 'Generate MD5, SHA hashes' },
    { name: 'Password Generator', path: '/password-generator', icon: '🔐', description: 'Create secure passwords' },
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

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Privacy First
                </h3>
                <p className="text-blue-800 dark:text-blue-200">
                    All utilities on DevUtil run entirely in your browser. No data is sent to any server,
                    ensuring complete privacy and security for your sensitive information.
                </p>
            </div>
        </div>
    )
}
