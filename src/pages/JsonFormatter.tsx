import { useState } from 'react'
import toast from 'react-hot-toast'

export default function JsonFormatter() {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [error, setError] = useState('')

    const formatJson = () => {
        try {
            setError('')
            const parsed = JSON.parse(input)
            setOutput(JSON.stringify(parsed, null, 2))
            toast.success('JSON formatted successfully!')
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Invalid JSON'
            setError(errorMessage)
            setOutput('')
            toast.error('Invalid JSON')
        }
    }

    const minifyJson = () => {
        try {
            setError('')
            const parsed = JSON.parse(input)
            setOutput(JSON.stringify(parsed))
            toast.success('JSON minified successfully!')
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Invalid JSON'
            setError(errorMessage)
            setOutput('')
            toast.error('Invalid JSON')
        }
    }

    const clearAll = () => {
        setInput('')
        setOutput('')
        setError('')
    }

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                JSON Formatter
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Input JSON
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder='{"name": "John", "age": 30}'
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Output
                    </label>
                    <textarea
                        value={output}
                        readOnly
                        className="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                        placeholder="Formatted JSON will appear here..."
                    />
                </div>
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-800 dark:text-red-200 text-sm font-mono">{error}</p>
                </div>
            )}

            <div className="mt-6 flex gap-4">
                <button
                    onClick={formatJson}
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                >
                    Format
                </button>
                <button
                    onClick={minifyJson}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                    Minify
                </button>
                <button
                    onClick={clearAll}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                    Clear
                </button>
            </div>
        </div>
    )
}
