import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Base64Tool() {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [error, setError] = useState('')

    const encode = () => {
        try {
            setError('')
            const encoded = btoa(input)
            setOutput(encoded)
            toast.success('Encoded successfully!')
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Encoding failed'
            setError(errorMessage)
            setOutput('')
            toast.error('Encoding failed')
        }
    }

    const decode = () => {
        try {
            setError('')
            const decoded = atob(input)
            setOutput(decoded)
            toast.success('Decoded successfully!')
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Decoding failed - invalid Base64'
            setError(errorMessage)
            setOutput('')
            toast.error('Decoding failed')
        }
    }

    const clearAll = () => {
        setInput('')
        setOutput('')
        setError('')
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(output)
            toast.success('Copied to clipboard!')
        } catch (err) {
            toast.error('Failed to copy to clipboard')
        }
    }

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Base64 Encoder/Decoder
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Input
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter text to encode or Base64 to decode..."
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Output
                        </label>
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                            >
                                Copy
                            </button>
                        )}
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        className="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                        placeholder="Result will appear here..."
                    />
                </div>
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                </div>
            )}

            <div className="mt-6 flex gap-4">
                <button
                    onClick={encode}
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                >
                    Encode
                </button>
                <button
                    onClick={decode}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                    Decode
                </button>
                <button
                    onClick={clearAll}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                    Clear
                </button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    About Base64
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                    Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format.
                    It's commonly used for encoding data in email, URLs, and data URIs.
                </p>
            </div>
        </div>
    )
}
