import { useState } from 'react'
import toast from 'react-hot-toast'

export default function URLTools() {
  const [url, setUrl] = useState('')
  const [parsed, setParsed] = useState<URL | null>(null)

  const parseURL = () => {
    try {
      const urlObj = new URL(url)
      setParsed(urlObj)
      toast.success('URL parsed')
    } catch {
      toast.error('Invalid URL')
    }
  }

  const encode = () => {
    setUrl(encodeURIComponent(url))
    toast.success('Encoded')
  }

  const decode = () => {
    try {
      setUrl(decodeURIComponent(url))
      toast.success('Decoded')
    } catch {
      toast.error('Invalid encoded URL')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">URL Tools</h1>
      
      <div className="space-y-6">
        <div>
          <textarea
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg resize-none font-mono"
            placeholder="Enter URL..."
          />
          <div className="flex gap-4 mt-4">
            <button onClick={parseURL} className="px-6 py-3 bg-primary-600 text-white rounded-lg">
              Parse
            </button>
            <button onClick={encode} className="px-6 py-3 bg-green-600 text-white rounded-lg">
              Encode
            </button>
            <button onClick={decode} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              Decode
            </button>
          </div>
        </div>

        {parsed && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border space-y-2">
            <h2 className="text-xl font-semibold mb-4">Parsed URL</h2>
            <div><strong>Protocol:</strong> {parsed.protocol}</div>
            <div><strong>Host:</strong> {parsed.host}</div>
            <div><strong>Hostname:</strong> {parsed.hostname}</div>
            <div><strong>Port:</strong> {parsed.port || '(default)'}</div>
            <div><strong>Pathname:</strong> {parsed.pathname}</div>
            <div><strong>Search:</strong> {parsed.search || '(none)'}</div>
            <div><strong>Hash:</strong> {parsed.hash || '(none)'}</div>
          </div>
        )}

        {/* Guide Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📚 Usage Guide</h2>
          
          <div className="space-y-6">
            {/* Parse Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">🔍 URL Parser</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Break down any URL into its components to understand its structure.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm font-mono text-gray-800 dark:text-gray-200 mb-2">
                  Example: <span className="text-primary-600 dark:text-primary-400">https://api.example.com:8080/v1/users?page=2&limit=10#results</span>
                </p>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 mt-3">
                  <div>→ <strong>Protocol:</strong> https:</div>
                  <div>→ <strong>Hostname:</strong> api.example.com</div>
                  <div>→ <strong>Port:</strong> 8080</div>
                  <div>→ <strong>Pathname:</strong> /v1/users</div>
                  <div>→ <strong>Query:</strong> ?page=2&limit=10</div>
                  <div>→ <strong>Hash:</strong> #results</div>
                </div>
              </div>
            </div>

            {/* Encode Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">✅ URL Encoder</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Convert special characters to percent-encoded format for safe URL transmission.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-mono text-gray-800 dark:text-gray-200">
                      Input: <span className="text-red-600 dark:text-red-400">Hello World! How are you?</span>
                    </p>
                    <p className="font-mono text-gray-800 dark:text-gray-200 mt-1">
                      Output: <span className="text-green-600 dark:text-green-400">Hello%20World!%20How%20are%20you%3F</span>
                    </p>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-300 dark:border-gray-600">
                    <strong>Common encodings:</strong> Space→%20, !→%21, ?→%3F, &→%26, =→%3D
                  </div>
                </div>
              </div>
            </div>

            {/* Decode Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">🔓 URL Decoder</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Convert percent-encoded URLs back to human-readable format.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-mono text-gray-800 dark:text-gray-200">
                      Input: <span className="text-blue-600 dark:text-blue-400">user%40example.com%2Fprofile%3Fid%3D123</span>
                    </p>
                    <p className="font-mono text-gray-800 dark:text-gray-200 mt-1">
                      Output: <span className="text-purple-600 dark:text-purple-400">user@example.com/profile?id=123</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">💡 Common Use Cases</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">🔧 API Development</div>
                  <div className="text-blue-700 dark:text-blue-300 text-xs">Encode query parameters with special characters</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="font-medium text-green-900 dark:text-green-100 mb-1">🐛 Debugging</div>
                  <div className="text-green-700 dark:text-green-300 text-xs">Parse complex URLs to understand structure</div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="font-medium text-purple-900 dark:text-purple-100 mb-1">🔐 Security Analysis</div>
                  <div className="text-purple-700 dark:text-purple-300 text-xs">Decode obfuscated URLs to see content</div>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="font-medium text-orange-900 dark:text-orange-100 mb-1">🌐 Web Development</div>
                  <div className="text-orange-700 dark:text-orange-300 text-xs">Validate and extract URL components</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
